/**
 * Dot-notation paths to string leaves in a nested message object (compile-time only).
 */
export type Join<K extends string, P extends string> = P extends ''
  ? K
  : `${P}.${K}`;

export type LeafPaths<T, P extends string = ''> = T extends string
  ? P extends ''
    ? never
    : P
  : {
      [K in keyof T & string]: T[K] extends string
        ? Join<K, P>
        : LeafPaths<T[K], Join<K, P>>;
    }[keyof T & string];
