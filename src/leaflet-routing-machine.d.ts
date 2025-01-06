declare module "leaflet-routing-machine" {
    import * as L from "leaflet";
  
    namespace Routing {
      interface Waypoint {
        latLng: L.LatLng;
        name?: string;
      }
  
      interface ControlOptions {
        waypoints: Waypoint[] | L.LatLng[];
        routeWhileDragging?: boolean;
        lineOptions?: {
          styles: { color: string; weight: number }[];
        };
        createMarker?: (i: number, waypoint: Waypoint) => L.Marker;
      }
  
      function control(options: any): any;
    }
  
    export default Routing;
  }
  
  declare namespace L {
    namespace Routing {
      function control(options: Routing.ControlOptions): L.Routing.Control;
    }
  }
  