import * as React from "react";
import { useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Controls() {
  const viewState = useSelector((s) => s.viewState);
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState("");
  const [zoomValue, setZoomValue] = useState(viewState.zoom);
  const [hasError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setInputValue(
      `${viewState.longitude.toFixed(3)}, ${viewState.latitude.toFixed(3)}`
    );
    setZoomValue(viewState.zoom);
    setError(false);
    setErrorMessage("");
  }, [viewState]);

  const onChangeCoordinates = useCallback((evt) => {
    setInputValue(evt.target.value);
  }, []);

  const onChangeZoom = useCallback((evt) => {
    setZoomValue(evt.target.value);
  }, []);

  const onSubmit = useCallback(() => {
    const [lng, lat] = inputValue.split(",").map(Number);

    if (isNaN(lng) || isNaN(lat)) {
      setError(true);
      setErrorMessage("Coordinates must be numbers.");
      return;
    }

    if (Math.abs(lng) > 180 || Math.abs(lat) > 85) {
      setError(true);
      setErrorMessage(
        "Longitude must be between -180 and 180, and latitude between -85 and 85."
      );
      return;
    }

    dispatch({
      type: "setViewState",
      payload: {
        ...viewState,
        longitude: lng,
        latitude: lat,
        zoom: Number(zoomValue),
      },
    });
    setError(false);
    setErrorMessage("");
  }, [inputValue, zoomValue, viewState, dispatch]);

  const onReset = useCallback(() => {
    dispatch({
      type: "setViewState",
      payload: { longitude: 0, latitude: 0, zoom: 2 },
    });
    setError(false);
    setErrorMessage("");
  }, [dispatch]);

  return (
    <div
      style={{
        padding: 12,
        fontFamily: "sans-serif",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <div>
        <span>MAP CENTER: </span>
        <input
          type="text"
          value={inputValue}
          onChange={onChangeCoordinates}
          style={{ color: hasError ? "red" : "black" }}
        />
      </div>
      <div>
        <span>ZOOM LEVEL: </span>
        <input
          type="number"
          value={zoomValue}
          onChange={onChangeZoom}
          min="0"
          max="20"
          style={{ width: "60px" }}
        />
      </div>
      <div>
        <button onClick={onSubmit} style={{ marginRight: "8px" }}>
          GO
        </button>
        <button onClick={onReset}>RESET</button>
      </div>
      {hasError && (
        <div style={{ color: "red", marginTop: "8px" }}>{errorMessage}</div>
      )}
    </div>
  );
}
