import React, { useEffect, useRef, useState } from "react";
import MainLayout from "../../infratructure/common/layout/main-layout";
import { useLocation } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import api from "../../infratructure/api";

mapboxgl.accessToken =
  "pk.eyJ1IjoibnRkMTAxMDIwMDAiLCJhIjoiY2tvbzJ4anl1MDZjMzJwbzNpcnA5NXZpcCJ9.dePfFDv0RlCLnWoDq1zHlw";

function convertToGeoJSON(data) {
  var geoJSON = {
    type: "FeatureCollection",
    features: [],
  };

  for (var i = 0; i < data.length; i++) {
    var location = {
      type: "Feature",
      properties: data[i],
      geometry: {
        type: "Point",
        coordinates: [parseFloat(data[i].long), parseFloat(data[i].lat)],
      },
    };

    geoJSON.features.push(location);
  }

  return geoJSON;
}

const ExtraComponent = () => {
  const location = useLocation();
  const receivedProps = location.state;
  const mapContainer = useRef();
  console.log("receivedProps", receivedProps.it);
  //// receivedProps.it là cái {id, quanHuyen}
  const [map, setMap] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [dsDiemDuLich, setDsDiemDuLich] = useState([]);

  const fecthData = async () => {
    // document.getElementById("map").scrollIntoView()

    const response = await api.getAllDiaDiemByHuyenBanDo(
      `idQuanHuyen=${receivedProps.it.id}`,
      setLoading
    );

    console.log(convertToGeoJSON(response.data.diaDiems));

    setDsDiemDuLich(convertToGeoJSON(response.data.diaDiems));

    let map = new mapboxgl.Map({
      container: mapContainer.current,
      zoom: 9,
      center: receivedProps.it.latlong,
      style: "mapbox://styles/mapbox/streets-v12",
    });

    setMap(map);
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true,
      }),
      "bottom-right"
    );
    map.addControl(new mapboxgl.NavigationControl());

    map.on("load", () => {
      // Load an image from an external URL.
      map.loadImage(
        "https://cdn-icons-png.flaticon.com/512/169/169477.png",
        (error, image) => {
          if (error) throw error;

          // Add the image to the map style.
          map.addImage("pointTravel", image);

          // Add a data source containing one point feature.
          map.addSource("pointTravel", {
            type: "geojson",
            data: convertToGeoJSON(response.data.diaDiems),
          });

          // Add a layer to use the image to represent the data.
          map.addLayer({
            id: "pointTravel",
            type: "symbol",
            source: "pointTravel", // reference the data source
            layout: {
              "icon-image": "pointTravel", // reference the image
              "icon-size": 0.05,
            },
          });
        }
      );

      map.on("click", `pointTravel`, (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const html = `<div>
        <img src="${
          e.features[0].properties.hinhAnh.indexOf("https") != -1
            ? e.features[0].properties.hinhAnh
            : `http://14.248.94.155:9022/${e.features[0].properties.hinhAnh}`
        }" alt="" style="min-width: 280px;min-height: 120px;">
        <div style="
            padding: 20px;
        ">
            <p style="
    color: #d32f2f;
    font-size: 11px;
    text-transform: uppercase;
">${e.features[0].properties.tenDanhMuc}</p>
            <a href="/destination-view?${
              e.features[0].properties.idDiaDiem
            }" style="
    color: #333;
    font-size: 18px;
    width: 240px;
    font-weight: 500;
">${e.features[0].properties.tenDiaDiem}</a>
            <p style="
    font-size: 11px;
    color: #333;
    font-weight: 400;
">${e.features[0].properties.gioMoCua} - ${
          e.features[0].properties.gioDongCua
        }</p>
            <p style="
    width: 240px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    font-size: 13px;
    line-height: 1.6;
    color: #333;
">${e.features[0].properties.moTa}</p>
        </div>
    </div>`;

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        map.flyTo({
          center: e.features[0].geometry.coordinates,
          essential: true,
          duration: 1000,
        });

        new mapboxgl.Popup().setLngLat(coordinates).setHTML(html).addTo(map);
      });

      map.on("mouseenter", `pointTravel`, () => {
        map.getCanvas().style.cursor = "pointer";
      });

      map.on("mouseleave", `pointTravel`, () => {
        map.getCanvas().style.cursor = "";
      });
    });
  };

  useEffect(() => {
    fecthData();
  }, []);

  return (
    <MainLayout className="bg-white">
      <div
        style={{
          width: "100%",
          height: 121,
        }}
      ></div>
      <section
        style={{
          width: "100%",
          height: 822,
          // backgroundColor: "#000",
        }}
      >
        <div id="map" ref={mapContainer}></div>
      </section>
    </MainLayout>
  );
};

export default ExtraComponent;
