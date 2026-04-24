export interface TreeNodeData {
  id: number;
  children: TreeNodeData[];
}

type TreeNodeProps = {
  node: TreeNodeData;
  onAddNode: (node: TreeNodeData) => void;
};

export function TreeNode({ node, onAddNode }: TreeNodeProps) {
  const children = node.children ?? [];

  return (
    <div>
      <span>Node {node.id}</span>{' '}
      <button type="button" onClick={() => onAddNode(node)}>
        Add child
      </button>

      <ul>
        {children.map((child) => (
          <li key={child.id}>
            <TreeNode node={child} onAddNode={onAddNode} />
          </li>
        ))}
      </ul>
    </div>
  );
}
