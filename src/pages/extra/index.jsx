import React, { useEffect, useRef, useState } from "react";
import MainLayout from "../../infratructure/common/layout/main-layout";
import { useLocation } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import api from "../../infratructure/api";
import { removeAccents, removeDiacriticsAndSpaces } from "./common";

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
  //   console.log("receivedProps", receivedProps.it);
  //// receivedProps.it là cái {id, quanHuyen}
  const [map, setMap] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [dsDiemDuLich, setDsDiemDuLich] = useState([]);
  const [dsDanhMucDiaDiemDuLich, setDsDanhMucDiaDiemDuLich] = useState([]);
  const [textSearch, setTextSearch] = useState("");
  const [dsDiaDiemSearch, setDsDiaDiemSearch] = useState([]);

  const fecthData = async () => {
    // document.getElementById("map").scrollIntoView()

    let map = new mapboxgl.Map({
      container: mapContainer.current,
      zoom: 8.5,
      center: [107.701881, 12.210116],
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

    const resGetDiaDiemGeometry = await api.getAllDiaDiemBanDo(``, setLoading);
    const resGetDanhMucConCuaDanhMuc = await api.getDanhMucConCuaDanhMuc(
      `idDanhMuc=${1}`,
      setLoading
    );

    var dataDsDiaDiemGeoJson = { ...resGetDiaDiemGeometry };
    setDsDiemDuLich(dataDsDiaDiemGeoJson);
    setDsDanhMucDiaDiemDuLich(resGetDanhMucConCuaDanhMuc.result);
    console.log(resGetDanhMucConCuaDanhMuc);
    if (resGetDiaDiemGeometry.features && resGetDanhMucConCuaDanhMuc.success) {
      map.on("load", () => {
        resGetDanhMucConCuaDanhMuc.result.map((v) => {
          var uriImg = "";

          if (
            v.tenDanhMuc == "Văn hóa - lịch sử" &&
            dataDsDiaDiemGeoJson.features.filter(
              (v) => v.properties.tenDanhMuc == "Văn hóa - lịch sử"
            ).length > 0
          ) {
            uriImg = "https://cdn-icons-png.flaticon.com/512/5778/5778440.png";
          }
          if (
            v.tenDanhMuc == "Địa điểm tâm linh" &&
            dataDsDiaDiemGeoJson.features.filter(
              (v) => v.properties.tenDanhMuc == "Địa điểm tâm linh"
            ).length > 0
          ) {
            uriImg = "https://cdn-icons-png.flaticon.com/512/2510/2510482.png";
          }
          if (
            v.tenDanhMuc == "Du lịch khám phá" &&
            dataDsDiaDiemGeoJson.features.filter(
              (v) => v.properties.tenDanhMuc == "Du lịch khám phá"
            ).length > 0
          ) {
            uriImg =
              "https://iconape.com/wp-content/png_logo_vector/google-discover.png";
          }
          if (
            v.tenDanhMuc == "Du lịch sinh thái" &&
            dataDsDiaDiemGeoJson.features.filter(
              (v) => v.properties.tenDanhMuc == "Du lịch sinh thái"
            ).length > 0
          ) {
            uriImg =
              "https://images.squarespace-cdn.com/content/v1/5b07c60a96e76f9f641cdad6/1626769467137-PUUVF03Q49KZMCVTQ1PC/Conservation.png";
          }
          if (
            v.tenDanhMuc == "Du lịch nghỉ dưỡng" &&
            dataDsDiaDiemGeoJson.features.filter(
              (v) => v.properties.tenDanhMuc == "Du lịch nghỉ dưỡng"
            ).length > 0
          ) {
            uriImg = "https://cdn-icons-png.flaticon.com/512/5273/5273660.png";
          }
          if (
            v.tenDanhMuc == "Công trình kiến trúc" &&
            dataDsDiaDiemGeoJson.features.filter(
              (v) => v.properties.tenDanhMuc == "Công trình kiến trúc"
            ).length > 0
          ) {
            uriImg =
              "https://cdn4.iconfinder.com/data/icons/hotel-105/64/hotel_building_architecture_tourism_travel_five_star-512.png";
          }
          if (
            v.tenDanhMuc == "Du lịch giải trí" &&
            dataDsDiaDiemGeoJson.features.filter(
              (v) => v.properties.tenDanhMuc == "Du lịch giải trí"
            ).length > 0
          ) {
            uriImg =
              "https://cdn1.iconfinder.com/data/icons/travel-and-vacation-16/80/vector_825_06-512.png";
          }
          if (
            v.tenDanhMuc == "Thương mại - ẩm thực" &&
            dataDsDiaDiemGeoJson.features.filter(
              (v) => v.properties.tenDanhMuc == "Thương mại - ẩm thực"
            ).length > 0
          ) {
            uriImg = "https://cdn-icons-png.flaticon.com/512/1205/1205756.png";
          }
          if (
            v.tenDanhMuc == "Khu bảo tồn" &&
            dataDsDiaDiemGeoJson.features.filter(
              (v) => v.properties.tenDanhMuc == "Khu bảo tồn"
            ).length > 0
          ) {
            uriImg = "https://cdn-icons-png.flaticon.com/512/3937/3937245.png";
          }
          if (uriImg != "") {
            map.loadImage(uriImg, (error, image) => {
              if (error) throw error;
              map.addImage(`img${v.idDanhMucDiaDiem}`, image);
            });
          }
        });
        // Load an image from an external URL.
        map.addSource("ranhGioiTinh", {
          type: "geojson",
          data: `http://14.248.94.155:46928/api/quanHuyen/ranhGioiTinh`,
        });
        map.addLayer({
          id: "ranhGioiTinh",
          type: "fill",
          source: "ranhGioiTinh",
          layout: {},
          paint: {
            "fill-color": "#f1416c",
            "fill-opacity": 0.0,
          },
        });
        map.addLayer({
          id: "outline-ranhGioiTinh",
          type: "line",
          source: "ranhGioiTinh",
          layout: {},
          paint: {
            "line-color": "#f1416c",
            "line-width": 6,
          },
        });

        map.addSource("ranhGioiHuyen", {
          type: "geojson",
          data: `http://14.248.94.155:46928/api/quanHuyen/ranhGioiHuyen`,
        });
        map.addLayer({
          id: "ranhGioiHuyen",
          type: "fill",
          source: "ranhGioiHuyen",
          layout: {},
          paint: {
            "fill-color": "#50cd89",
            "fill-opacity": 0.0,
          },
        });
        map.addLayer({
          id: "outline-ranhGioiHuyen",
          type: "line",
          source: "ranhGioiHuyen",
          layout: {},
          paint: {
            "line-color": "#50cd89",
            "line-width": 2,
          },
        });

        map.addSource("diaDiemDuLich", {
          type: "geojson",
          data: `http://14.248.94.155:46928/api/diaDiem/getAllDiaDiemBanDo`,
        });

        for (const feature of dataDsDiaDiemGeoJson.features) {
          // Add a layer for this symbol type if it hasn't been added already.
          if (!map.getLayer(`poi-${feature.properties.idDanhMuc}`)) {
            map.addLayer({
              id: `poi-${feature.properties.idDanhMuc}`,
              type: "symbol",
              source: "diaDiemDuLich",
              layout: {
                "icon-image": `img${feature.properties.idDanhMuc}`,
                // "icon-allow-overlap": true,
                "icon-size": 0.05,
                "text-field": ["get", "tenDiaDiem"],
                "text-size": 11,
                "text-offset": [0, 2],
                "icon-offset": [0, -17],
              },
              paint: {
                "text-color": "#004eff",
                "text-halo-color": "#fff",
                "text-halo-width": 2,
              },
              filter: ["==", "idDanhMuc", feature.properties.idDanhMuc],
            });

            map.on("click", `poi-${feature.properties.idDanhMuc}`, (e) => {
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

              new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(html)
                .addTo(map);
            });

            map.on("mouseenter", `poi-${feature.properties.idDanhMuc}`, () => {
              map.getCanvas().style.cursor = "pointer";
            });

            map.on("mouseleave", `poi-${feature.properties.idDanhMuc}`, () => {
              map.getCanvas().style.cursor = "";
            });
          }
        }
      });
    }
  };

  useEffect(() => {
    fecthData();
  }, []);

  const btDiaDiemDuLich = (e) => {
    document.getElementById(e.target.value).checked = e.target.checked;
    map.setLayoutProperty(
      e.target.value,
      "visibility",
      e.target.checked ? "visible" : "none"
    );
  };

  const searchDiaDiem = (e) => {
    setTextSearch(e.target.value);
    if (e.target.value != "") {
      var dsDiaDiem = [...dsDiemDuLich.features];
      var dsDiaDiemSearch = dsDiaDiem.filter(
        (v) =>
          removeAccents(v.properties.tenDiaDiem.toLowerCase()).indexOf(
            removeAccents(e.target.value)
          ) != -1
      );
      setDsDiaDiemSearch(dsDiaDiemSearch);
    } else {
      setDsDiaDiemSearch([]);
    }
  };

  const clickItemSearhDiaDiem = (e) => {
    setTextSearch("");
    setDsDiaDiemSearch([]);
    const popup = document.getElementsByClassName("mapboxgl-popup");
    if (popup.length) {
      popup[0].remove();
    }
    const html = `<div>
              <img src="${
                e.properties.hinhAnh.indexOf("https") != -1
                  ? e.properties.hinhAnh
                  : `http://14.248.94.155:9022/${e.properties.hinhAnh}`
              }" alt="" style="min-width: 280px;min-height: 120px;">
              <div style="
                  padding: 20px;
              ">
                  <p style="
          color: #d32f2f;
          font-size: 11px;
          text-transform: uppercase;
      ">${e.properties.tenDanhMuc}</p>
      <a href="/destination-view?${e.properties.idDiaDiem}" style="
          color: #333;
          font-size: 18px;
          width: 240px;
          font-weight: 500;
      ">${e.properties.tenDiaDiem}</a>
                  <p style="
          font-size: 11px;
          color: #333;
          font-weight: 400;
      ">${e.properties.gioMoCua} - ${e.properties.gioDongCua}</p>
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
      ">${e.properties.moTa}</p>
              </div>
          </div>`;
    map.flyTo({
      center: e.geometry.coordinates,
      essential: true,
      duration: 1000,
    });

    new mapboxgl.Popup()
      .setLngLat(e.geometry.coordinates)
      .setHTML(html)
      .addTo(map);
  };

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
          position: "relative",
          width: "100%",
          height: "calc(100vh - 121px)",
          // backgroundColor: "#000",
        }}
      >
        <div id="map" ref={mapContainer}></div>
        {dsDanhMucDiaDiemDuLich.length > 0 && (
          <div
            style={{
              backgroundColor: "#fff",
              padding: 4,
              position: "absolute",
              top: 12,
              left: 12,
              boxShadow: `0px 0px 10px rgba(0, 0, 0, 0.2)`,
            }}
          >
            <p
              style={{
                fontSize: 15,
                fontWeight: 500,
                padding: 8,
                color: "#333",
                textAlign: "center",
                borderBottom: "1px solid #ccc",
                margin: "0px 12px",
              }}
            >
              Các loại hình du lịch
            </p>
            {dsDanhMucDiaDiemDuLich.map(
              (v, k) =>
                dsDiemDuLich.features.filter(
                  (va) => va.properties.tenDanhMuc == v.tenDanhMuc
                ).length > 0 && (
                  <div
                    key={k}
                    className="d-flex align-items-center"
                    style={{ padding: "8px 12px" }}
                  >
                    <input
                      type="checkbox"
                      name={`poi-${v.idDanhMucDiaDiem}`}
                      id={`poi-${v.idDanhMucDiaDiem}`}
                      value={`poi-${v.idDanhMucDiaDiem}`}
                      style={{
                        marginRight: 8,
                      }}
                      onClick={btDiaDiemDuLich}
                      defaultChecked={true}
                    />
                    <img
                      style={{
                        width: 25,
                        height: 25,
                        marginRight: 8,
                      }}
                      src={
                        v.tenDanhMuc == "Văn hóa - lịch sử"
                          ? "https://cdn-icons-png.flaticon.com/512/5778/5778440.png"
                          : v.tenDanhMuc == "Địa điểm tâm linh"
                          ? "https://cdn-icons-png.flaticon.com/512/2510/2510482.png"
                          : v.tenDanhMuc == "Du lịch khám phá"
                          ? "https://iconape.com/wp-content/png_logo_vector/google-discover.png"
                          : v.tenDanhMuc == "Du lịch sinh thái"
                          ? "https://images.squarespace-cdn.com/content/v1/5b07c60a96e76f9f641cdad6/1626769467137-PUUVF03Q49KZMCVTQ1PC/Conservation.png"
                          : v.tenDanhMuc == "Du lịch nghỉ dưỡng"
                          ? "https://cdn-icons-png.flaticon.com/512/5273/5273660.png"
                          : v.tenDanhMuc == "Công trình kiến trúc"
                          ? "https://cdn4.iconfinder.com/data/icons/hotel-105/64/hotel_building_architecture_tourism_travel_five_star-512.png"
                          : v.tenDanhMuc == "Du lịch giải trí"
                          ? "https://cdn1.iconfinder.com/data/icons/travel-and-vacation-16/80/vector_825_06-512.png"
                          : v.tenDanhMuc == "Thương mại - ẩm thực"
                          ? "https://cdn-icons-png.flaticon.com/512/1205/1205756.png"
                          : v.tenDanhMuc == "Khu bảo tồn"
                          ? "https://cdn-icons-png.flaticon.com/512/3937/3937245.png"
                          : ""
                      }
                      alt=""
                    />
                    <label
                      htmlFor={`poi-${v.idDanhMucDiaDiem}`}
                      style={{
                        margin: 0,
                      }}
                    >
                      {v.tenDanhMuc}
                    </label>
                  </div>
                )
            )}
          </div>
        )}
        <div
          style={{
            position: "absolute",
            top: 12,
            right: 70,
          }}
        >
          <div
            className="d-flex form-group"
            style={{
              boxShadow: `0px 0px 10px rgba(0, 0, 0, 0.2)`,
            }}
          >
            <button className="onsearch">
              <i className="fa fa-map-marker"></i>
            </button>
            <input
              type="text"
              name=""
              id=""
              value={textSearch}
              onChange={(e) => searchDiaDiem(e)}
              style={{
                width: 260,
                backgroundColor: "#fff",
                border: "1px solid #f1f1f1",
                borderRadius: 0,
                boxShadow: "none",
                color: "#777",
                fontSize: 15,
                fontWeight: 300,
                height: 50,
                marginBottom: 0,
                padding: "10px 20px",
              }}
              placeholder="Nhập từ khoá để tìm kiếm"
            />
          </div>
          {dsDiaDiemSearch.length > 0 && (
            <div
              id="style-5"
              style={{
                width: 310,
                maxHeight: 250,
                backgroundColor: "#fff",
                overflow: "hidden",
                overflowY: "auto",
                boxShadow: `0px 0px 10px rgba(0, 0, 0, 0.2)`,
              }}
            >
              {dsDiaDiemSearch.map((v, k) => (
                <div
                  key={k}
                  className="d-flex align-items-center itemSearch"
                  style={{
                    padding: "8px 22px",
                    textAlign: "left",
                  }}
                  onClick={() => clickItemSearhDiaDiem(v)}
                >
                  <i className="fa fa-map-marker"></i>
                  <div
                    className="justify-content-center"
                    style={{
                      marginLeft: 24,
                    }}
                  >
                    <p
                      style={{
                        fontSize: 13,
                        color: "#333",
                        marginBottom: -4,
                        fontWeight: "bold",
                      }}
                    >
                      {v.properties.tenDiaDiem}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 11,
                        fontWeight: 400,
                        marginTop: -4,
                      }}
                    >
                      {v.properties.tenDanhMuc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default ExtraComponent;
