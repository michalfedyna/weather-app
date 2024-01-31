import React, { FC } from "react";
import { Marker } from "react-leaflet";

type LocationMarkerProps = {
  position?: { lat: number; lng: number };
};

const LocationMarker: FC<LocationMarkerProps> = ({ position }) => {
  if (!position) return null;

  return <Marker position={position} />;
};

export { LocationMarker };
