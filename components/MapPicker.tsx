"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet's default icon issue in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface MapPickerProps {
  position: [number, number] | null;
  onLocationSelect: (lat: number, lng: number) => void;
  readOnly?: boolean;
}

function LocationMarker({ position, onLocationSelect, readOnly }: MapPickerProps) {
  const map = useMapEvents({
    click(e) {
      if (readOnly) return;
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  
  useEffect(() => {
    if (position) {
      const currentZoom = map.getZoom();
      map.flyTo(position, currentZoom < 15 ? 15 : currentZoom);
    }
  }, [position, map]);

  return position === null ? null : (
    <Marker position={position}></Marker>
  );
}

export default function MapPicker({ position, onLocationSelect, readOnly = false }: MapPickerProps) {
  // Default to New Delhi coordinates
  const defaultPosition: [number, number] = [28.6139, 77.2090];
  const center = position || defaultPosition;

  return (
    <div className="h-[300px] w-full rounded-md overflow-hidden border relative" style={{ zIndex: 0 }}>
      <MapContainer 
        center={center} 
        zoom={13} 
        scrollWheelZoom={true} 
        style={{ height: "100%", width: "100%", zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker position={position} onLocationSelect={onLocationSelect} readOnly={readOnly} />
      </MapContainer>
    </div>
  );
}
