/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { AttackData } from "@/data/attackData";

interface AttackMapProps {
    center: AttackData;
}

// Corrige o ícone padrão do Leaflet no React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

// Componente interno que atualiza o centro do mapa
function MapUpdater({ center }: { center: AttackData }) {
    const map = useMap();
    useEffect(() => {
        map.setView([center.lat, center.lng], center.zoom);
    }, [center, map]);
    return null;
}

export function AttackMap({ center }: AttackMapProps) {
    return (
        <MapContainer
            center={[center.lat, center.lng]}
            zoom={center.zoom}
            className="w-full h-full rounded-lg z-0"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapUpdater center={center} />

            <Marker position={[center.lat, center.lng]}>
                <Popup>
                    <strong>{center.bairro}</strong>
                    <br />
                    Ataques: {center.ataques ?? "?"}
                </Popup>
            </Marker>
        </MapContainer>
    );
}
