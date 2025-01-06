import React, { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

interface RoutingMachineProps {
  start: [number, number] | null; 
  end: [number, number] | null;  
}

const RoutingMachine: React.FC<RoutingMachineProps> = ({ start, end }) => {
  const map = useMap();
  const routingControlRef = useRef<any>(null); 

  useEffect(() => {
    if (routingControlRef.current) {
      try {
        map.removeControl(routingControlRef.current);
      } catch (error) {
        console.warn("Error while removing routing control (likely safe to ignore):", error);
      }
      routingControlRef.current = null; 
    }

    if (!start || !end) {
      return;
    }

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(start[0], start[1]),
        L.latLng(end[0], end[1]),
      ],
      routeWhileDragging: true,
      lineOptions: {
        styles: [{ color: "blue", weight: 6 }],
      },
      createMarker: (i: number, waypoint: { latLng: L.LatLng }) =>
        L.marker(waypoint.latLng, { draggable: true }),
    });

    routingControl.addTo(map);
    routingControlRef.current = routingControl; 

    routingControl.on("routingerror", (error: any) => {
      console.error("Routing error:", error);
    });

    return () => {
      if (routingControlRef.current) {
        try {
          map.removeControl(routingControlRef.current);
        } catch (error) {
          console.warn("Error while cleaning up routing control during unmount:", error);
        }
        routingControlRef.current = null; 
      }
    };
  }, [map, start, end]); 

  return null;
};

export default RoutingMachine;
