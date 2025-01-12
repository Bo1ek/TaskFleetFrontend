import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";

type RoutingMachineProps = {
  start: [number, number];
  end: [number, number];
};
type Waypoint = {
  latLng: L.LatLng; 
};

const RoutingMachine: React.FC<RoutingMachineProps> = ({ start, end }) => {
  const map = useMap(); 

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(start[0], start[1]),
        L.latLng(end[0], end[1]),
      ],
      routeWhileDragging: true,
      lineOptions: {
        styles: [{ color: "blue", weight: 4 }], 
      },
      createMarker: (i: number, waypoint: Waypoint, n: number) => {
        return L.marker(waypoint.latLng, {
          draggable: false,
        });
      },
    });

    routingControl.addTo(map);

    return () => {
      if (map.hasLayer(routingControl)) {
        map.removeControl(routingControl);
      }
    };
  }, [map, start, end]);

  return null; 
};

export default RoutingMachine;
