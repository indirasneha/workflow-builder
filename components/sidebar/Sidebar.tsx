export default function Sidebar({ addNode, saveFlow, loadFlow }: any) {
  return (
    <div className="h-full bg-gray-900 p-4 text-white">

      <h2 className="text-xl font-bold mb-4">Nodes</h2>

      <button
        onClick={addNode}
        className="bg-blue-500 px-3 py-2 rounded w-full"
      >
        Add Text Node
      </button>

      <button
        onClick={saveFlow}
        className="bg-green-500 px-3 py-2 rounded mt-3 w-full"
      >
        Save Flow
      </button>

      <button
        onClick={loadFlow}
        className="bg-yellow-500 px-3 py-2 rounded mt-3 w-full"
      >
        Load Flow
      </button>

    </div>
  );
}