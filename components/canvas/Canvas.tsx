"use client";

import ReactFlow, {
  Background,
  Controls,
  addEdge,
  useEdgesState,
  Handle,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";

const CustomNode = ({ id, data }: any) => {
  return (
    <div
      style={{
        padding: 10,
        border: "1px solid black",
        borderRadius: 5,
        background: "white",
        minWidth: 120,
        position: "relative",
      }}
    >
      {/* ❌ DELETE BUTTON */}
      <button
        onClick={() => data.deleteNode(id)}
        style={{
          position: "absolute",
          top: -10,
          right: -10,
          background: "red",
          color: "white",
          borderRadius: "50%",
          width: 20,
          height: 20,
          fontSize: 12,
          cursor: "pointer",
        }}
      >
        x
      </button>

      {/* INPUT HANDLE */}
      <Handle type="target" position={Position.Left} />

      {/* TEXT INPUT */}
      <input
        value={data.label}
        onChange={(e) => data.onChange(id, e.target.value)}
        style={{
          border: "none",
          outline: "none",
          width: "100%",
        }}
      />

      {/* OUTPUT HANDLE */}
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

// 🔥 IMPORTANT: outside component
const nodeTypes = {
  custom: CustomNode,
};

export default function Canvas({ nodes, setNodes }: any) {
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // connect nodes
  const onConnect = (params: any) => {
    setEdges((eds: any) => addEdge(params, eds));
  };

  const onNodesDelete = (deleted: any) => {
  setNodes((prev: any) =>
    prev.filter(
      (node: any) => !deleted.some((d: any) => d.id === node.id)
    )
  );
};

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodesDelete={onNodesDelete}   // 🔥 THIS LINE YOU ASKED
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}