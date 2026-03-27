"use client";

import { useState } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import Canvas from "@/components/canvas/Canvas";
import RightPanel from "@/components/rightpanel/RightPanel";

export default function Home() {
  const [nodes, setNodes] = useState<any[]>([]);

  // ✏️ update text
  const updateNodeLabel = (id: string, value: string) => {
    setNodes((prev) =>
      prev.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                label: value,
                onChange: updateNodeLabel,
              },
            }
          : node
      )
    );
  };

  // ➕ add node
  const addNode = () => {
    const newNode = {
      id: (nodes.length + 1).toString(),
      position: {
        x: 150 + (nodes.length % 3) * 300,
        y: 150 + Math.floor(nodes.length / 3) * 200,
      },
      data: {
        label: `Node ${nodes.length + 1}`,
        onChange: updateNodeLabel,
        deleteNode: deleteNode,
      },
      type: "custom",
    };

    setNodes((prev) => [...prev, newNode]);
  };

  // 💾 save
  const saveFlow = () => {
    localStorage.setItem("flow", JSON.stringify(nodes));
    alert("Saved!");
  };

  const deleteNode = (id: string) => {
  setNodes((prev) => prev.filter((node) => node.id !== id));
};

const loadFlow = () => {
  const data = localStorage.getItem("flow");
  if (data) {
    setNodes(JSON.parse(data));
    alert("Loaded!");
  }
};

  return (
    <div className="flex h-screen">

      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white">
        <Sidebar addNode={addNode} saveFlow={saveFlow} loadFlow={loadFlow} />
      </div>

      {/* Canvas */}
      <div className="flex-1 h-screen bg-white">
        <Canvas nodes={nodes} setNodes={setNodes} />
      </div>

      {/* Right Panel */}
      <div className="w-72 bg-gray-900 text-white">
        <RightPanel />
      </div>

    </div>
  );
}