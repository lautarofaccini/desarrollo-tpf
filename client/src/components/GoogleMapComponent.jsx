import {
  APIProvider,
  Map,
  AdvancedMarker,
  AdvancedMarkerAnchorPoint,
} from "@vis.gl/react-google-maps";

const GoogleMapComponent = () => {
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
    borderRadius: "16px",
  };

  const center = {
    lat: -27.4372388, // Coordenadas de la Bienal del Chaco
    lng: -58.9813493,
  };

  return (
    <APIProvider apiKey={import.meta.env.API_KEY}>
      <Map
        style={mapContainerStyle}
        defaultCenter={center}
        defaultZoom={16}
        gestureHandling={"greedy"}
        mapId="DEMO_MAP_ID"
      >
        <AdvancedMarker
          position={center}
          anchorPoint={AdvancedMarkerAnchorPoint.TOP_LEFT}
        />
      </Map>
    </APIProvider>
  );
};

export default GoogleMapComponent;
