import {
  Component,
  type ErrorInfo,
  type ReactNode,
  Suspense,
  useCallback,
  useEffect,
  useId,
  useState,
} from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import {
  Center,
  Environment,
  Html,
  OrbitControls,
  useGLTF,
  useProgress,
} from '@react-three/drei';

import styles from './gltf-app.module.css';

const DEFAULT_MODEL_PATH = '/models/pixellabs-glb-3347.glb';

function revokeModelUrlIfBlob(url: string | null | undefined, clearLoader = true) {
  if (!url) return;
  if (clearLoader) {
    useGLTF.clear(url);
  }
  if (url.startsWith('blob:')) {
    URL.revokeObjectURL(url);
  }
}

/** Match doc guidance: cap upload size to protect client memory. */
const MAX_GLB_BYTES = 50 * 1024 * 1024;

const ACCEPT = '.glb,.gltf,model/gltf-binary,model/gltf+json';

function isAllowedModelFile(f: File): boolean {
  const byName = /\.(glb|gltf)$/i.test(f.name);
  const t = f.type;
  if (
    t === 'model/gltf+json' ||
    t === 'model/gltf-binary' ||
    t === 'application/octet-stream'
  ) {
    return true;
  }
  return byName;
}

type ModelErrorBoundaryProps = {
  children: ReactNode;
  onError: (message: string) => void;
  resetKey: string | null;
};

type ModelErrorBoundaryState = { error: Error | null };

class ModelErrorBoundary extends Component<
  ModelErrorBoundaryProps,
  ModelErrorBoundaryState
> {
  override state: ModelErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ModelErrorBoundaryState {
    return { error };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('GLTF load/render error', error, errorInfo);
  }

  override componentDidUpdate(
    prevProps: ModelErrorBoundaryProps,
    prevState: ModelErrorBoundaryState,
  ): void {
    if (prevProps.resetKey !== this.props.resetKey) {
      this.setState({ error: null });
      return;
    }
    if (this.state.error && this.state.error !== prevState.error) {
      this.props.onError(this.state.error.message);
    }
  }

  override render(): ReactNode {
    if (this.state.error) {
      return null;
    }
    return this.props.children;
  }
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

function WebGLContextListener({
  onContextLost,
}: {
  onContextLost: () => void;
}) {
  const gl = useThree((s) => s.gl);
  useEffect(() => {
    const canvas = gl.domElement;
    const onLost = (e: Event) => {
      e.preventDefault();
      onContextLost();
    };
    const onRestored = () => {
      /* optional: rebuild scene; soft reload is often enough for apps */
    };
    canvas.addEventListener('webglcontextlost', onLost, false);
    canvas.addEventListener('webglcontextrestored', onRestored, false);
    return () => {
      canvas.removeEventListener('webglcontextlost', onLost);
      canvas.removeEventListener('webglcontextrestored', onRestored);
    };
  }, [gl, onContextLost]);
  return null;
}

function LoadStatus() {
  const { active, progress } = useProgress();
  if (!active) return null;
  return (
    <Html center>
      <div className={styles.loadBadge}>
        Loading {Math.round(progress)}%
      </div>
    </Html>
  );
}

type GltfModelProps = { url: string };

function GltfModel({ url }: GltfModelProps) {
  const gltf = useGLTF(url);
  return (
    <Center>
      <primitive object={gltf.scene} />
    </Center>
  );
}

export function GltfApp() {
  const fileInputId = useId();
  const [modelUrl, setModelUrl] = useState<string>(DEFAULT_MODEL_PATH);
  const [status, setStatus] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const onGltfError = useCallback((message: string) => {
    setLoadError(message);
  }, []);

  const onContextLost = useCallback(() => {
    setLoadError('WebGL context was lost. Try reloading the page.');
  }, []);

  useEffect(() => {
    return () => {
      revokeModelUrlIfBlob(modelUrl, true);
    };
  }, [modelUrl]);

  const onFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      e.target.value = '';
      if (!file) return;
      if (!isAllowedModelFile(file)) {
        setStatus('Please choose a .glb or .gltf file.');
        return;
      }
      if (file.size > MAX_GLB_BYTES) {
        setStatus(
          `File is too large. Maximum size is ${MAX_GLB_BYTES / (1024 * 1024)} MB.`,
        );
        return;
      }
      setStatus(null);
      setLoadError(null);
      setModelUrl(URL.createObjectURL(file));
    },
    [],
  );

  return (
    <div className={styles.root}>
      <header className={styles.toolbar}>
        <h1 className={styles.title}>GLB viewer</h1>
        <div className={styles.tools}>
          <label className={styles.fileLabel} htmlFor={fileInputId}>
            Upload model
          </label>
          <input
            id={fileInputId}
            className={styles.fileInput}
            type="file"
            accept={ACCEPT}
            onChange={onFileChange}
          />
          {status ? <p className={styles.hint}>{status}</p> : null}
          {loadError ? <p className={styles.error}>{loadError}</p> : null}
        </div>
      </header>
      <div className={styles.canvasWrap}>
        <Canvas
          className={styles.canvas}
          dpr={prefersReducedMotion ? 1 : [1, 2]}
          gl={{ antialias: true }}
          camera={{ fov: 50, position: [2.2, 1.4, 2.8] }}
        >
          <WebGLContextListener onContextLost={onContextLost} />
          <color attach="background" args={['#0c0c0f']} />
          <ambientLight intensity={0.35} />
          <directionalLight
            position={[4, 6, 3]}
            intensity={1.1}
            castShadow={false}
          />
          <Environment preset="city" />
          <OrbitControls makeDefault minDistance={0.25} maxDistance={200} />
          <LoadStatus />
          <ModelErrorBoundary resetKey={modelUrl} onError={onGltfError}>
            <Suspense fallback={null}>
              <GltfModel url={modelUrl} />
            </Suspense>
          </ModelErrorBoundary>
        </Canvas>
      </div>
    </div>
  );
}
