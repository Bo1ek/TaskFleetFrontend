import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";

type RoutingMachineProps = {
  start: [number, number];
  end: [number, number];
  onRouteGenerated: (routeCoordinates: [number, number][]) => void;
};

const RoutingMachine: React.FC<RoutingMachineProps> = ({ start, end, onRouteGenerated }) => {
  const map = useMap();
  const routingControlRef = useRef<ReturnType<typeof L.Routing.control> | null>(null);


  useEffect(() => {
    if (!map || !start || !end) return;

    // Initialize routing control if it doesn't already exist
    if (!routingControlRef.current) {
      routingControlRef.current = L.Routing.control({
        waypoints: [
          L.latLng(start[0], start[1]),
          L.latLng(end[0], end[1]),
        ],
        routeWhileDragging: true,
        lineOptions: {
          styles: [{ color: "blue", weight: 4 }], // Customize route appearance
        },
        createMarker: () => null, // No markers
      });

      // Add event listener for route found
      routingControlRef.current.on("routesfound", (e: any) => {
        const coordinates = e.routes[0].coordinates.map((coord: any) => [coord.lat, coord.lng]);
        onRouteGenerated(coordinates); // Notify parent of the route's coordinates
      });

      routingControlRef.current.on("routingerror", (err: any) => {
        console.error("Routing error:", err);
      });

      // Add control to the map
      routingControlRef.current.addTo(map);
    } else {
      // Update waypoints if the routing control already exists
      routingControlRef.current.setWaypoints([
        L.latLng(start[0], start[1]),
        L.latLng(end[0], end[1]),
      ]);
    }

    return () => {
      // Do not remove the routing control unless the component is unmounted
    };
  }, [map, start, end, onRouteGenerated]);

  return null;
};

export default RoutingMachine;