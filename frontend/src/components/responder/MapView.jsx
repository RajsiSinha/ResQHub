import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function MapView() {
  return (
    <MapContainer
      center={[28.6139, 77.209]} // Delhi example
      zoom={12}
      className="w-full h-full"
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Incident Marker */}
      <Marker position={[28.6239, 77.219]}>
        <Popup>
          High Severity Fire Reported
        </Popup>
      </Marker>

      {/* Responder Marker */}
      <Marker position={[28.6039, 77.199]}>
        <Popup>
          Your Unit Location
        </Popup>
      </Marker>
    </MapContainer>
  );
}
