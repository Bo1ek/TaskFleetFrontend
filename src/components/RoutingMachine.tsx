import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";

type RoutingMachineProps = {
  start: [number, number];
  end: [number, number];
};

const RoutingMachine: React.FC<RoutingMachineProps> = ({ start, end }) => {
  const map = useMap(); 

  const routingControlRef = useRef<ReturnType<typeof L.Routing.control> | null>(null);

  useEffect(() => {
    if (!map || !start || !end) return;

    if (routingControlRef.current) {
      try {
        routingControlRef.current.getPlan()?.setWaypoints([]); 
        map.removeControl(routingControlRef.current);
      } catch (error) {
        console.error("Error while removing routing control:", error);
      }
    }

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(start[0], start[1]),
        L.latLng(end[0], end[1]),
      ],
      routeWhileDragging: true,
      lineOptions: {
        styles: [{ color: "blue", weight: 4 }], 
      },
      createMarker: () => null, 
    });


    routingControl.addTo(map);

    routingControlRef.current = routingControl;


    return () => {
      if (routingControlRef.current) {
        try {
          routingControlRef.current.getPlan()?.setWaypoints([]); 
          map.removeControl(routingControlRef.current); 
          routingControlRef.current = null; 
        } catch (error) {
          console.error("Error while cleaning up routing control:", error);
        }
      }
    };
  }, [map, start, end]);

  return null;
};

export default RoutingMachine;
