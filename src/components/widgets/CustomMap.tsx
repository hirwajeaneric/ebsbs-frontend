// import "./App.css";
import { useEffect, useState } from "react";
import { Map, Marker} from "@vis.gl/react-google-maps";

type Props = {
  coordinates: string
}
export default function CustomMap({ coordinates }: Props) {
  // shows marker on London by default
  const [markerLocation, setMarkerLocation] = useState({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    if (coordinates) {
      const [lat, lng] = coordinates.split(",");
      setMarkerLocation({
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      });
    }
  },[coordinates])

  return (
    <div className="w-full h-80 rounded-lg">
      <Map
        style={{ borderRadius: "20px" }}
        defaultZoom={13}
        defaultCenter={markerLocation}
        gestureHandling={"greedy"}
        disableDefaultUI
      >
        <Marker position={markerLocation} />
      </Map>
    </div>
  );
}
