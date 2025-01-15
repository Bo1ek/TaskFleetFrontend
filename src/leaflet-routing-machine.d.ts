declare module "leaflet-routing-machine" {
  import * as L from "leaflet";

  namespace Routing {
    interface Waypoint {
      latLng: L.LatLng;
      name?: string;
    }

    interface ControlOptions {
      waypoints: Array<L.LatLng | Waypoint>;
      routeWhileDragging?: boolean;
      lineOptions?: {
        styles: Array<{ color: string; weight: number }>;
      };
      createMarker?: (i: number, waypoint: Waypoint, n: number) => L.Marker | undefined;
    }

    class Control extends L.Control {
      getPlan(): Plan | undefined;
    }

    interface Plan {
      setWaypoints(waypoints: Array<L.LatLng | Waypoint>): void;
    }

    function control(options: ControlOptions): Control;
  }

  export default Routing;
}

declare namespace L {
  namespace Routing {
    function control(options: Routing.ControlOptions): Routing.Control;
  }
}
