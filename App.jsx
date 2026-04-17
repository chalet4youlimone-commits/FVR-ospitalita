import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    type: "barca",
    paid: false,
  });

  const addItem = () => {
    if (!newItem.name) return;
    setItems([
      ...items,
      {
        ...newItem,
        id: Date.now(),
        x: 200,
        y: 200,
      },
    ]);
    setNewItem({ name: "", type: "barca", paid: false });
  };

  const updateItemPosition = (id, x, y) => {
    setItems(items.map((i) => (i.id === id ? { ...i, x, y } : i)));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        FVR Ospitalità - Piazzale
      </h1>

      {/* INPUT */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Nome mezzo"
          value={newItem.name}
          onChange={(e) =>
            setNewItem({ ...newItem, name: e.target.value })
          }
          className="border p-2"
        />

        <select
          value={newItem.type}
          onChange={(e) =>
            setNewItem({ ...newItem, type: e.target.value })
          }
          className="border p-2"
        >
          <option value="barca">Barca</option>
          <option value="carrello">Carrello</option>
          <option value="furgone">Furgone</option>
          <option value="rib">RIB</option>
        </select>

        <button
          onClick={addItem}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Aggiungi
        </button>
      </div>

      {/* MAPPA */}
      <div className="relative w-full h-[600px] border bg-gray-100 overflow-hidden">
        {items.map((item) => (
          <div
            key={item.id}
            draggable
            onDragEnd={(e) => {
              const rect =
                e.currentTarget.parentNode.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              updateItemPosition(item.id, x, y);
            }}
            onClick={() =>
              setItems(
                items.map((i) =>
                  i.id === item.id
                    ? { ...i, paid: !i.paid }
                    : i
                )
              )
            }
            className={`absolute px-3 py-1 rounded cursor-move text-sm text-white ${
              item.paid ? "bg-green-600" : "bg-red-600"
            }`}
            style={{ left: item.x, top: item.y }}
          >
            {item.name}
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-500 mt-3">
        Trascina i mezzi e clicca per segnare pagato / non pagato.
      </p>
    </div>
  );
}
