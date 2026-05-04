import { useRef, useState } from 'react';

import { TreeNode, type TreeNodeData } from './TreeNode';

function addChildImmutable(
  root: TreeNodeData,
  parentId: number,
  newChild: TreeNodeData,
): TreeNodeData {
  if (root.id === parentId) {
    return {
      ...root,
      children: [...root.children, newChild],
    };
  }

  return {
    ...root,
    children: root.children.map((child) =>
      addChildImmutable(child, parentId, newChild),
    ),
  };
}

export function Tree() {
  const nextIdRef = useRef(1);
  const [tree, setTree] = useState<TreeNodeData>({
    id: 0,
    children: [],
  });

  const onAddNode = (parent: TreeNodeData) => {
    const newChild: TreeNodeData = {
      id: nextIdRef.current++,
      children: [],
    };
    setTree((prev) => addChildImmutable(prev, parent.id, newChild));
  };

  return (
    <div>
      <TreeNode node={tree} onAddNode={onAddNode} />
    </div>
  );
}
