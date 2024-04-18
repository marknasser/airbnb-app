"use client";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
  center?: number[];
}

const Map: React.FC<MapProps> = ({ center }) => {
  const [leafletLoaded, setLeafletLoaded] = useState(false);

  useEffect(() => {
    // Load Leaflet and related dependencies only in the browser environment
    if (typeof window !== "undefined" && !leafletLoaded) {
      import("leaflet").then((L) => {
        // Load marker icons and shadow images
        const markerIcon2x = require("leaflet/dist/images/marker-icon-2x.png");
        const markerIcon = require("leaflet/dist/images/marker-icon.png");
        const markerShadow = require("leaflet/dist/images/marker-shadow.png");

        // Merge options for marker icons
        L.Icon.Default.mergeOptions({
          iconUrl: markerIcon.default,
          iconRetinaUrl: markerIcon2x.default,
          shadowUrl: markerShadow.default,
        });

        // Set Leaflet as loaded
        setLeafletLoaded(true);
      });
    }
  }, [leafletLoaded]);

  const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  return (
    <div style={{ height: "400px" }}>
      {leafletLoaded && (
        <MapContainer
          center={(center as L.LatLngExpression) || [51, -0.09]}
          zoom={6}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url={url} attribution={attribution} />
          {center && <Marker position={center as L.LatLngExpression} />}
        </MapContainer>
      )}
    </div>
  );
};

export default Map;
