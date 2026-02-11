import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Rectangle,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function ZoneManagement() {
  const [zones, setZones] = useState([
    {
      id: "ZONE-1",
      name: "Sector Alpha",
      bounds: [
        [28.60, 77.18],
        [28.62, 77.21],
      ],
      level: "SAFE",
    },
    {
      id: "ZONE-2",
      name: "Sector Bravo",
      bounds: [
        [28.63, 77.22],
        [28.65, 77.25],
      ],
      level: "ALERT",
    },
    {
      id: "ZONE-3",
      name: "Sector Charlie",
      bounds: [
        [28.59, 77.23],
        [28.61, 77.26],
      ],
      level: "CRITICAL",
    },
  ]);

  const [selectedZone, setSelectedZone] = useState(null);

  const levelColor = (level) => {
    switch (level) {
      case "SAFE":
        return "green";
      case "ALERT":
        return "orange";
      case "CRITICAL":
        return "red";
      default:
        return "blue";
    }
  };

  const updateZoneLevel = (id, newLevel) => {
    setZones((prev) =>
      prev.map((z) =>
        z.id === id ? { ...z, level: newLevel } : z
      )
    );
  };

  const deleteZone = (id) => {
    setZones((prev) => prev.filter((z) => z.id !== id));
    setSelectedZone(null);
  };

  const addZone = () => {
    const newZone = {
      id: `ZONE-${zones.length + 1}`,
      name: `Sector ${zones.length + 1}`,
      bounds: [
        [28.60 + Math.random() * 0.05, 77.18 + Math.random() * 0.05],
        [28.62 + Math.random() * 0.05, 77.21 + Math.random() * 0.05],
      ],
      level: "SAFE",
    };
    setZones((prev) => [...prev, newZone]);
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Zone Management
          </h1>
          <p className="text-slate-400 text-sm">
            Interactive disaster zone control panel.
          </p>
        </div>

        <button
          onClick={addZone}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-semibold"
        >
          + Add Zone
        </button>
      </div>

      <div className="grid grid-cols-12 gap-8">

        {/* MAP */}
        <div className="col-span-8 bg-[#121f32] rounded-2xl p-4 border border-blue-500/10 shadow-xl">

          <MapContainer
            center={[28.6139, 77.209]}
            zoom={12}
            className="h-[500px] w-full rounded-xl"
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution="&copy; OpenStreetMap"
            />

            {zones.map((zone) => (
              <Rectangle
                key={zone.id}
                bounds={zone.bounds}
                pathOptions={{
                  color: levelColor(zone.level),
                  fillColor: levelColor(zone.level),
                  fillOpacity: 0.3,
                  weight:
                    selectedZone?.id === zone.id ? 4 : 2,
                }}
                eventHandlers={{
                  click: () => setSelectedZone(zone),
                }}
              >
                <Popup>
                  <div>
                    <h3 className="font-bold">{zone.name}</h3>
                    <p>Status: {zone.level}</p>
                  </div>
                </Popup>
              </Rectangle>
            ))}

          </MapContainer>

        </div>

        {/* RIGHT PANEL */}
        <div className="col-span-4 bg-[#121f32] rounded-2xl p-6 border border-blue-500/10 shadow-xl">

          {!selectedZone ? (
            <p className="text-slate-400 text-sm">
              Click on a zone to manage it.
            </p>
          ) : (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {selectedZone.name}
                </h2>
                <p className="text-xs text-slate-400">
                  ID: {selectedZone.id}
                </p>
              </div>

              {/* Change Level */}
              <div>
                <label className="text-xs text-slate-400">
                  Risk Level
                </label>

                <select
                  value={selectedZone.level}
                  onChange={(e) =>
                    updateZoneLevel(
                      selectedZone.id,
                      e.target.value
                    )
                  }
                  className="w-full mt-2 bg-[#162435] px-3 py-2 rounded-lg text-sm"
                >
                  <option value="SAFE">SAFE</option>
                  <option value="ALERT">ALERT</option>
                  <option value="CRITICAL">CRITICAL</option>
                </select>
              </div>

              {/* Delete */}
              <button
                onClick={() => deleteZone(selectedZone.id)}
                className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg text-sm font-semibold"
              >
                Delete Zone
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
