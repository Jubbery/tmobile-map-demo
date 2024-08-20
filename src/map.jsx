import * as React from "react";
import Map, { GeolocateControl, ScaleControl } from "react-map-gl";
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoianViYmVyeSIsImEiOiJjbTAyc2hrNHgwNG80Mmpvcm9ybzNlaXV2In0.37JKaeTyNf9WkWrnd0L_ow"; // Set your mapbox token here

export default function MapView() {
  const mapStyle = useSelector((s) => s.mapStyle);
  const viewState = useSelector((s) => s.viewState);
  const dispatch = useDispatch();

  const onMove = useCallback((evt) => {
    dispatch({ type: "setViewState", payload: evt.viewState });
  }, []);

  return (
    <Map
      {...viewState}
      onMove={onMove}
      mapStyle={mapStyle}
      mapboxAccessToken={MAPBOX_TOKEN}
      style={{ height: "90vh", width: "100%" }}
    >
      <GeolocateControl />
      <ScaleControl />
    </Map>
  );
}
