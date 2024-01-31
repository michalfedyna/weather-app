import { FC, useEffect } from "react";
import { useMap } from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";

type PositionResponderProps = {
  position?: { lat: number; lng: number };
  zoom: number;
  onClick: (e: { lat: number; lng: number }) => void;
};

const MapController: FC<PositionResponderProps> = ({
  position,
  zoom,
  onClick,
}) => {
  const map = useMap();

  useEffect(() => {
    if (!position) return;

    map.flyTo(position, zoom);
  }, [map, position, zoom]);

  useEffect(() => {
    map.addEventListener("click", (e: LeafletMouseEvent) => {
      onClick({ lat: e.latlng.lat, lng: e.latlng.lng });
    });

    return () => {
      map.removeEventListener("click");
    };
  }, []);

  return null;
};

export { MapController };
