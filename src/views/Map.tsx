import React, { FC } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import { LocationMarker } from "../components/LocationMarker";
import { MapController } from "../components/MapController";

export type MapProps = {
  position?: {
    lat: number;
    lng: number;
  };
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
  onClick: (e: { lat: number; lng: number }) => void;
};

const Map: FC<MapProps> = ({ center, position, zoom, onClick }) => {
  return (
    <MapContainer
      className="map"
      center={[center.lat, center.lng]}
      zoom={zoom}
      scrollWheelZoom
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker position={position} />
      <MapController onClick={onClick} position={position} zoom={zoom} />
    </MapContainer>
  );
};

export { Map };
