import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Navbar from "../components/Navbar";
import api from "../api/axios";
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const Map = () => {
  const [journals, setJournals] = useState([]);
  const [center, setCenter] = useState([31.1048, 77.1734]);

  const currentUserId = "YOUR_USER_ID"; // replace later

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const res = await api.get("/journals");
        setJournals(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchJournals();
  }, []);

  const getNearby = () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      try {
        const res = await api.get(`/journals/nearby?lat=${lat}&lng=${lng}`);
        setJournals(res.data);
        setCenter([lat, lng]);
      } catch (err) {
        console.error(err);
      }
    });
  };

  const handleMapClick = async (e) => {
    const { lat, lng } = e.latlng;

    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    );
    const data = await res.json();

    const locationName = data.display_name;

    window.location.href = `/create?lat=${lat}&lng=${lng}&name=${encodeURIComponent(locationName)}`;
  };

  const userIcon = new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    iconSize: [32, 32],
  });

  const otherIcon = new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
    iconSize: [32, 32],
  });

  return (
    <>
      <Navbar />


      <div className="h-[calc(100vh-80px)] w-full relative">
        
        <MapContainer
          center={center}
          zoom={5}
          className="h-full w-full"   
          whenCreated={(map) => {
            map.on("click", handleMapClick);
          }}
        >
          <TileLayer
            attribution="© OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/*  CORRECT CLUSTER USAGE */}
          <MarkerClusterGroup>
            {journals.map((journal) => {
              if (!journal.location?.coordinates) return null;

              const [lng, lat] = journal.location.coordinates;

              return (
                <Marker
                  key={journal._id}
                  position={[lat, lng]}
                  icon={
                    journal.user?._id === currentUserId
                      ? userIcon
                      : otherIcon
                  }
                >
                  <Popup>
                    <div className="w-48">
                      <h3 className="font-bold">{journal.title}</h3>

                      <p className="text-sm text-gray-500">
                        {journal.location.name}
                      </p>

                      {journal.images?.[0] && (
                        <img
                          src={journal.images[0]}
                          className="w-full h-24 object-cover rounded mt-2"
                        />
                      )}

                      <p className="text-xs mt-2 line-clamp-3">
                        {journal.story}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MarkerClusterGroup>
        </MapContainer>

        {/*  BUTTON FIX */}
        <button
          onClick={getNearby}
          className="absolute top-4 right-4 z-[1000] bg-white px-4 py-2 rounded-xl shadow"
        >
          📍 Nearby
        </button>
      </div>
    </>
  );
};

export default Map;
