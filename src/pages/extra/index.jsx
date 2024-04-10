import React, { useEffect, useRef, useState } from "react";
import MainLayout from "../../infratructure/common/layout/main-layout";
import { useLocation } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import api from "../../infratructure/api";
import {
  DSSTYLEBANDO,
  formatDate,
  getPreviousDay,
  removeAccents,
  removeDiacriticsAndSpaces,
} from "./common";
import { DATALICHTRINH } from "./common/datalichtrinh";
import * as turf from "@turf/turf";
import { Modal } from "antd";
import InputDateMap from "../../infratructure/common/input/input-date-map";
import LoadingFullPageMap from "../../infratructure/common/controls/loadingMap";
import * as MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import useTranslate from "../../core/common/hook/useTranslate";
import { translationData } from "../../infratructure/utils/helper";
mapboxgl.accessToken =
  "pk.eyJ1IjoibnRkMTAxMDIwMDAiLCJhIjoiY2tvbzJ4anl1MDZjMzJwbzNpcnA5NXZpcCJ9.dePfFDv0RlCLnWoDq1zHlw";

const myArray = ["primary", "success", "danger", "warning", "info"];
function getRandomValueFromArray(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

const ExtraComponent = () => {
  const location = useLocation();
  const receivedProps = location.state;
  const mapContainer = useRef();
  //   console.log("receivedProps", receivedProps.it);
  //// receivedProps.it là cái {id, quanHuyen}
  const [map, setMap] = useState({});
  const [loading, setLoading] = useState(false);
  const [dsDiemDuLich, setDsDiemDuLich] = useState([]);
  const [dsLuuTru, setDsLuuTru] = useState([]);
  const [dsAmThuc, setDsAmThuc] = useState([]);
  const [dsPhuongTien, setDsPhuongTien] = useState([]);

  const [dsDanhMucDiaDiemDuLich, setDsDanhMucDiaDiemDuLich] = useState([]);
  const [dsDanhMucLuuTru, setDsDanhMucLuuTru] = useState([]);
  const [dsDanhMucAmThuc, setDsDanhMucAmThuc] = useState([]);
  const [dsDanhMucPhuongTien, setDsDanhMucPhuongTien] = useState([]);

  const [textSearch, setTextSearch] = useState("");
  const [dsDiaDiemSearch, setDsDiaDiemSearch] = useState([]);
  const [dsDiaDiemTuLichTrinh, setDsDiaDiemTuLichTrinh] = useState([]);
  const [lichTrinh, setLichTrinh] = useState({});
  const [anhVeTinh, setAnhVeTinh] = useState({});

  const [visibleXemAnhVeTinh, setVisibleXemAnhVeTinh] = useState(false);
  const [isGoiYLichTrinh, setIsGoiYLichTrinh] = useState(false);
  const [isLopBanDo, setIsLopBanDo] = useState(true);
  const [isDanhSachBanDo, setIsDanhSachBanDo] = useState(false);
  const [dsStyleBanDo, setDsStyleBanDo] = useState(DSSTYLEBANDO);
  const [isTimDuong, setIsTimDuong] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const [selectSearch, setSelectSearch] = useState("DIEMDULICH");

  const [gps, setGPS] = useState([0, 0]);

  const [startDate, setStartDate] = useState(
    new Date(getPreviousDay(new Date()))
  );
  const [endDate, setEndDate] = useState(new Date());

  const { translate } = useTranslate();

  const renderDropdownSearch = () => {
    if (selectSearch == "DIEMDULICH") {
      return (
        <i
          className="fa-brands fa-canadian-maple-leaf"
          style={{
            fontSize: 22,
            color: "#FE7524",
          }}
        ></i>
      );
    }
    if (selectSearch == "NHAHANG") {
      return (
        <i
          className="fa-solid fa-utensils"
          style={{
            fontSize: 22,
            color: "#FE7524",
          }}
        ></i>
      );
    }
    if (selectSearch == "LUUTRU") {
      return (
        <i
          className="fa-solid fa-hotel"
          style={{
            fontSize: 22,
            color: "#FE7524",
          }}
        ></i>
      );
    }
    if (selectSearch == "KHOANGCACH") {
      return (
        <i
          className="fa-solid fa-street-view"
          style={{
            fontSize: 22,
            color: "#FE7524",
          }}
        ></i>
      );
    }
  };

  const renderDropdownSearchItem = () => {
    if (selectSearch == "DIEMDULICH") {
      return <i className="fa-brands fa-canadian-maple-leaf"></i>;
    }
    if (selectSearch == "NHAHANG") {
      return <i className="fa-solid fa-utensils"></i>;
    }
    if (selectSearch == "LUUTRU") {
      return <i className="fa-solid fa-hotel"></i>;
    }
    if (selectSearch == "KHOANGCACH") {
      return <i className="fa-solid fa-street-view"></i>;
    }
  };

  const [dataLichTrinh, setDataLichTrinh] = useState([]);
  const fecthData = async (style = dsStyleBanDo[0]) => {
    // document.getElementById("map").scrollIntoView()
    navigator.geolocation.getCurrentPosition(
      (e) => {
        console.log([e.coords.longitude, e.coords.latitude]);
        setGPS([e.coords.longitude, e.coords.latitude]);
      },
      (e) => {
        console.log(e);
      }
    );
    const resGetAllLichTrinh = await api.getAllLichTrinh(``, setLoading);
    var dt = resGetAllLichTrinh.data.lichTrinhs;
    dt = dt.map((v) => {
      v.geometry = JSON.parse(v.geometry);
      v.danhSachDiaDiem = JSON.parse(v.danhSachDiaDiem);
      return v;
    });
    setDataLichTrinh(dt);

    const resGetDiaDiemGeometry = await api.getAllDiaDiemBanDo(``, setLoading);
    const resGetLuuTruGeometry = await api.getAllDiemLuuTruBanDo(
      ``,
      setLoading
    );
    const resGetAmThucGeometry = await api.getAllDiemAmThucBanDo(
      ``,
      setLoading
    );
    const resGetPhuongTienGeometry = await api.getAllDiemPhuongTienBanDo(
      ``,
      setLoading
    );

    const resGetDanhMucConCuaDanhMucDiaDiem = await api.getDanhMucConCuaDanhMuc(
      `idDanhMuc=${1}`,
      setLoading
    );
    const resGetDanhMucConCuaDanhMucLuuTru = await api.getDanhMucConCuaDanhMuc(
      `idDanhMuc=${2}`,
      setLoading
    );
    const resGetDanhMucConCuaDanhMucAmThuc = await api.getDanhMucConCuaDanhMuc(
      `idDanhMuc=${3}`,
      setLoading
    );
    const resGetDanhMucConCuaDanhMucPhuongTien =
      await api.getDanhMucConCuaDanhMuc(`idDanhMuc=${4}`, setLoading);

    var dataDsDiaDiemGeoJson = { ...resGetDiaDiemGeometry };
    setDsDiemDuLich(dataDsDiaDiemGeoJson);
    var dataDsLuuTruGeoJson = { ...resGetLuuTruGeometry };
    setDsLuuTru(dataDsLuuTruGeoJson);
    var dataDsAmThucGeoJson = { ...resGetAmThucGeometry };
    setDsAmThuc(dataDsAmThucGeoJson);
    var dataDsPhuongTienGeoJson = { ...resGetPhuongTienGeometry };
    setDsPhuongTien(dataDsPhuongTienGeoJson);

    setDsDanhMucDiaDiemDuLich(resGetDanhMucConCuaDanhMucDiaDiem.result);
    setDsDanhMucLuuTru(resGetDanhMucConCuaDanhMucLuuTru.result);
    setDsDanhMucAmThuc(resGetDanhMucConCuaDanhMucAmThuc.result);
    setDsDanhMucPhuongTien(resGetDanhMucConCuaDanhMucPhuongTien.result);

    if (
      resGetDiaDiemGeometry.features &&
      resGetDanhMucConCuaDanhMucDiaDiem.success &&
      resGetLuuTruGeometry.features &&
      resGetDanhMucConCuaDanhMucLuuTru.success &&
      resGetAmThucGeometry.features &&
      resGetDanhMucConCuaDanhMucAmThuc.success &&
      resGetPhuongTienGeometry.features &&
      resGetDanhMucConCuaDanhMucPhuongTien.success
    ) {
      let map = new mapboxgl.Map({
        container: mapContainer.current,
        zoom: 9,
        center: [107.701881, 12.210116],
        style: style.uri,
        maxBounds: [
          [105.28341561584125, 11.124216559717311],
          [110.10349979292215, 13.31742184130907],
        ],
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
        map.addSource("mapbox-dem", {
          type: "raster-dem",
          url: "mapbox://mapbox.terrain-rgb",
          tileSize: 512,
          maxzoom: 14,
        });
        map.setTerrain({
          source: "mapbox-dem",
          exaggeration: 1.5,
        });

        resGetDanhMucConCuaDanhMucDiaDiem.result.map((v) => {
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
            uriImg = "https://cdn-icons-png.flaticon.com/512/3104/3104941.png";
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

        resGetDanhMucConCuaDanhMucLuuTru.result.map((v) => {
          var uriImg = "";
          if (
            v.tenDanhMuc == "Homestay" &&
            dataDsLuuTruGeoJson.features.filter(
              (v) => v.properties.tenDanhMuc == "Homestay"
            ).length > 0
          ) {
            uriImg = "https://cdn-icons-png.flaticon.com/512/7059/7059852.png";
          }
          if (
            v.tenDanhMuc == "Khách sạn" &&
            dataDsLuuTruGeoJson.features.filter(
              (v) => v.properties.tenDanhMuc == "Khách sạn"
            ).length > 0
          ) {
            uriImg = "https://cdn-icons-png.flaticon.com/512/235/235889.png";
          }
          if (
            v.tenDanhMuc == "Nhà nghỉ" &&
            dataDsLuuTruGeoJson.features.filter(
              (v) => v.properties.tenDanhMuc == "Nhà nghỉ"
            ).length > 0
          ) {
            uriImg =
              "https://cdn3.iconfinder.com/data/icons/flat-building-1/70/1-512.png";
          }
          if (uriImg != "") {
            map.loadImage(uriImg, (error, image) => {
              if (error) throw error;
              map.addImage(`img${v.idDanhMucDiaDiem}`, image);
            });
          }
        });

        resGetDanhMucConCuaDanhMucAmThuc.result.map((v) => {
          var uriImg = "";
          if (
            v.tenDanhMuc == "Nhà hàng" &&
            dataDsAmThucGeoJson.features.filter(
              (v) => v.properties.tenDanhMuc == "Nhà hàng"
            ).length > 0
          ) {
            uriImg = "https://cdn-icons-png.flaticon.com/512/4287/4287725.png";
          }
          if (uriImg != "") {
            map.loadImage(uriImg, (error, image) => {
              if (error) throw error;
              map.addImage(`img${v.idDanhMucDiaDiem}`, image);
            });
          }
        });

        resGetDanhMucConCuaDanhMucPhuongTien.result.map((v) => {
          var uriImg = "";
          if (
            v.tenDanhMuc == "Xe máy" &&
            dataDsPhuongTienGeoJson.features.filter(
              (v) => v.properties.tenDanhMuc == "Xe máy"
            ).length > 0
          ) {
            uriImg = "https://cdn-icons-png.flaticon.com/512/1986/1986937.png";
          }
          if (
            v.tenDanhMuc == "Xe đạp" &&
            dataDsPhuongTienGeoJson.features.filter(
              (v) => v.properties.tenDanhMuc == "Xe đạp"
            ).length > 0
          ) {
            uriImg = "https://cdn-icons-png.flaticon.com/512/2972/2972185.png";
          }
          if (
            v.tenDanhMuc == "Ô tô" &&
            dataDsPhuongTienGeoJson.features.filter(
              (v) => v.properties.tenDanhMuc == "Ô tô"
            ).length > 0
          ) {
            uriImg = "https://cdn-icons-png.flaticon.com/512/2554/2554936.png";
          }
          if (
            v.tenDanhMuc == "Xe điện" &&
            dataDsPhuongTienGeoJson.features.filter(
              (v) => v.properties.tenDanhMuc == "Xe điện"
            ).length > 0
          ) {
            uriImg = "https://cdn-icons-png.flaticon.com/512/1574/1574055.png";
          }
          if (uriImg != "") {
            map.loadImage(uriImg, (error, image) => {
              if (error) throw error;
              map.addImage(`img${v.idDanhMucDiaDiem}`, image);
            });
          }
        });

        map.addSource("ranhGioiHuyen", {
          type: "geojson",
          data: `http://103.130.212.145:46928/api/quanHuyen/ranhGioiHuyen`,
        });
        map.addLayer({
          id: "ranhGioiHuyen",
          type: "fill",
          source: "ranhGioiHuyen",
          layout: {},
          paint: {
            "fill-color": "#094174",
            "fill-opacity": 0.0,
          },
        });
        map.addLayer({
          id: "outline-ranhGioiHuyen",
          type: "line",
          source: "ranhGioiHuyen",
          layout: {},
          paint: {
            "line-color": "#094174",
            "line-width": 2,
          },
        });
        // Load an image from an external URL.
        map.addSource("ranhGioiTinh", {
          type: "geojson",
          data: `http://103.130.212.145:46928/api/quanHuyen/ranhGioiTinh`,
        });
        map.addLayer({
          id: "ranhGioiTinh",
          type: "fill",
          source: "ranhGioiTinh",
          layout: {},
          paint: {
            "fill-color": "#FE7524",
            "fill-opacity": 0.0,
          },
        });
        map.addLayer({
          id: "outline-ranhGioiTinh",
          type: "line",
          source: "ranhGioiTinh",
          layout: {},
          paint: {
            "line-color": "#FE7524",
            "line-width": 4,
          },
        });

        map.addSource("diaDiemDuLich", {
          type: "geojson",
          data: `http://103.130.212.145:46928/api/diaDiem/getAllDiaDiemBanDo`,
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
                : e.features[0].properties.hinhAnh.indexOf("http") != -1
                ? e.features[0].properties.hinhAnh
                : `http://103.130.212.145:46928/${e.features[0].properties.hinhAnh}`
            }" alt="" style="min-width: 280px;min-height: 120px;">
            <div style="
                padding: 20px;
            ">
                <p style="
        color: #d32f2f;
        font-size: 11px;
        text-transform: uppercase;
    ">${e.features[0].properties.tenDanhMuc}</p>
                <a href="/tour-view?${
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

        map.addSource("luuTru", {
          type: "geojson",
          data: `http://103.130.212.145:46928/api/diaDiem/getAllDiemLuuTruBanDo`,
        });

        for (const feature of dataDsLuuTruGeoJson.features) {
          // Add a layer for this symbol type if it hasn't been added already.
          if (!map.getLayer(`poi-${feature.properties.idDanhMuc}`)) {
            map.addLayer({
              id: `poi-${feature.properties.idDanhMuc}`,
              type: "symbol",
              source: "luuTru",
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
                : e.features[0].properties.hinhAnh.indexOf("http") != -1
                ? e.features[0].properties.hinhAnh
                : `http://103.130.212.145:46928/${e.features[0].properties.hinhAnh}`
            }" alt="" style="min-width: 280px;min-height: 120px;">
            <div style="
                padding: 20px;
            ">
                <p style="
        color: #d32f2f;
        font-size: 11px;
        text-transform: uppercase;
    ">${e.features[0].properties.tenDanhMuc}</p>
                <a href="/tour-view?${
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

        map.addSource("amThuc", {
          type: "geojson",
          data: `http://103.130.212.145:46928/api/diaDiem/getAllDiemAmThucBanDo`,
        });

        for (const feature of dataDsAmThucGeoJson.features) {
          // Add a layer for this symbol type if it hasn't been added already.
          if (!map.getLayer(`poi-${feature.properties.idDanhMuc}`)) {
            map.addLayer({
              id: `poi-${feature.properties.idDanhMuc}`,
              type: "symbol",
              source: "amThuc",
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
                : e.features[0].properties.hinhAnh.indexOf("http") != -1
                ? e.features[0].properties.hinhAnh
                : `http://103.130.212.145:46928/${e.features[0].properties.hinhAnh}`
            }" alt="" style="min-width: 280px;min-height: 120px;">
            <div style="
                padding: 20px;
            ">
                <p style="
        color: #d32f2f;
        font-size: 11px;
        text-transform: uppercase;
    ">${e.features[0].properties.tenDanhMuc}</p>
                <a href="/tour-view?${
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

        map.addSource("phuongTien", {
          type: "geojson",
          data: `http://103.130.212.145:46928/api/diaDiem/getAllDiemPhuongTienBanDo`,
        });

        for (const feature of dataDsPhuongTienGeoJson.features) {
          // Add a layer for this symbol type if it hasn't been added already.
          if (!map.getLayer(`poi-${feature.properties.idDanhMuc}`)) {
            map.addLayer({
              id: `poi-${feature.properties.idDanhMuc}`,
              type: "symbol",
              source: "phuongTien",
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
                : e.features[0].properties.hinhAnh.indexOf("http") != -1
                ? e.features[0].properties.hinhAnh
                : `http://103.130.212.145:46928/${e.features[0].properties.hinhAnh}`
            }" alt="" style="min-width: 280px;min-height: 120px;">
            <div style="
                padding: 20px;
            ">
                <p style="
        color: #d32f2f;
        font-size: 11px;
        text-transform: uppercase;
    ">${e.features[0].properties.tenDanhMuc}</p>
                <a href="/tour-view?${
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
    setIsLoading(false);
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

  function haversine(lat1, lon1, lat2, lon2) {
    // Chuyển đổi độ sang radian
    lat1 = (lat1 * Math.PI) / 180;
    lon1 = (lon1 * Math.PI) / 180;
    lat2 = (lat2 * Math.PI) / 180;
    lon2 = (lon2 * Math.PI) / 180;

    // Tính chênh lệch giữa các tọa độ
    const dlat = lat2 - lat1;
    const dlon = lon2 - lon1;

    // Áp dụng công thức haversine
    const a =
      Math.sin(dlat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2;
    const c = 2 * Math.asin(Math.sqrt(a));

    // Đường kính trái đất (theo đơn vị radian)
    const R = 6371;

    // Tính khoảng cách
    const distance = R * c;

    return distance;
  }

  // Hàm lọc mảng dựa trên khoảng cách
  function filterByDistance(array, myLat, myLon, maxDistance) {
    return array.filter((obj) => {
      const distance = haversine(
        myLat,
        myLon,
        obj.geometry.coordinates[1],
        obj.geometry.coordinates[0]
      );
      return distance <= maxDistance;
    });
  }

  const searchDiaDiem = (e) => {
    setTextSearch(e.target.value);
    if (e.target.value != "") {
      var dsDiaDiem = [];
      if (selectSearch == "DIEMDULICH") {
        dsDiaDiem = [...dsDiemDuLich.features];
      }
      if (selectSearch == "NHAHANG") {
        dsDiaDiem = [...dsAmThuc.features];
      }
      if (selectSearch == "LUUTRU") {
        dsDiaDiem = [...dsLuuTru.features];
      }
      if (selectSearch == "KHOANGCACH") {
        dsDiaDiem = [
          ...dsDiemDuLich.features.concat(
            ...dsAmThuc.features,
            ...dsLuuTru.features
          ),
        ];
      }
      var dsDiaDiemSearch = [];
      if (selectSearch == "KHOANGCACH") {
        dsDiaDiemSearch = filterByDistance(
          dsDiaDiem,
          gps[1],
          gps[0],
          parseInt(e.target.value)
        );
      } else {
        dsDiaDiemSearch = dsDiaDiem.filter(
          (v) =>
            removeAccents(v.properties.tenDiaDiem.toLowerCase()).indexOf(
              removeAccents(e.target.value.toLowerCase())
            ) != -1
        );
      }
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
                  : e.properties.hinhAnh.indexOf("http") != -1
                  ? e.properties.hinhAnh
                  : `http://103.130.212.145:46928/${e.features[0].properties.hinhAnh}`
              }" alt="" style="min-width: 280px;min-height: 120px;">
              <div style="
                  padding: 20px;
              ">
                  <p style="
          color: #d32f2f;
          font-size: 11px;
          text-transform: uppercase;
      ">${e.properties.tenDanhMuc}</p>
      <a href="/tour-view?${e.properties.idDiaDiem}" style="
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

  const openLichTrinh = (lichTrinh) => {
    setLichTrinh(lichTrinh);
    setDsDiaDiemTuLichTrinh(lichTrinh.danhSachDiaDiem);
    map.setZoom(11);
    if (map.getLayer("lichTrinh")) {
      // Layer tồn tại, có thể xoá nó ở đây
      map.removeLayer("lichTrinh");
    }
    if (map.getSource("lichTrinh")) {
      // Source tồn tại, có thể xoá nó ở đây
      map.removeSource("lichTrinh");
    }

    map.addSource("lichTrinh", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: lichTrinh.geometry,
          },
        ],
      },
    });

    map.addLayer({
      id: "lichTrinh",
      type: "line",
      source: "lichTrinh",
      layout: {},
      paint: {
        "line-color": "#FE7524",
        "line-width": 9,
      },
    });

    var features = turf.points(lichTrinh.geometry.coordinates);
    var center = turf.center(features);

    map.flyTo({
      center: center.geometry.coordinates,
      essential: true,
      duration: 1000,
    });
  };

  const xemAnhVeTinh = async () => {
    setIsLoading(true);
    var thoiGianBatDau = formatDate(new Date(startDate));
    var thoiGianKetThuc = formatDate(new Date(endDate));
    var loaiAnh = document.getElementById("loaiAnh").value;
    var doPhuMay =
      document.getElementById("doPhuMay").value == ""
        ? 100
        : document.getElementById("doPhuMay").value;
    const resXemAnhVeTinh = await api.xemAnhVeTinh(
      `thoiGianBatDau=${thoiGianBatDau}&thoiGianKetThuc=${thoiGianKetThuc}&doPhuMay=${doPhuMay}&loaiAnh=${loaiAnh}`,
      setLoading
    );
    if (resXemAnhVeTinh.success && resXemAnhVeTinh.result.anhVeTinh != "") {
      setAnhVeTinh(resXemAnhVeTinh.result);
      if (map.getLayer("anhVeTinh")) {
        map.removeLayer("anhVeTinh");
      }
      if (map.getSource("anhVeTinh")) {
        map.removeSource("anhVeTinh");
      }
      if (map.getLayer("anhChiSo")) {
        map.removeLayer("anhChiSo");
      }
      if (map.getSource("anhChiSo")) {
        map.removeSource("anhChiSo");
      }
      try {
        map.addSource("anhVeTinh", {
          type: "raster",
          tiles: [resXemAnhVeTinh.result.anhVeTinh],
        });
        map.addLayer(
          {
            id: "anhVeTinh",
            type: "raster",
            source: "anhVeTinh",
            minzoom: 0,
            maxzoom: 22,
          },
          "ranhGioiHuyen"
        );

        if (resXemAnhVeTinh.result.anhChiSo) {
          map.addSource("anhChiSo", {
            type: "raster",
            tiles: [resXemAnhVeTinh.result.anhChiSo],
          });
          map.addLayer(
            {
              id: "anhChiSo",
              type: "raster",
              source: "anhChiSo",
              minzoom: 0,
              maxzoom: 22,
            },
            "ranhGioiHuyen"
          );
        }

        // });
      } catch (error) {
        console.log(error);
      }
    }
    setVisibleXemAnhVeTinh(false);
    setIsLoading(false);
  };

  return (
    <MainLayout className="bg-white">
      <div
        style={{
          width: "100%",
          height: 104,
        }}
      ></div>
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "calc(100vh - 104px)",
          // backgroundColor: "#000",
        }}
      >
        <div id="map" ref={mapContainer}></div>
        {isLopBanDo && dsDanhMucDiaDiemDuLich.length > 0 && (
          <div
            style={{
              backgroundColor: "#fff",
              padding: 4,
              position: "absolute",
              top: 12,
              left: 10,
              boxShadow: `0px 0px 10px rgba(0, 0, 0, 0.2)`,
              width: 380,
              height: "calc(100vh - 104px - 180px)",
              overflowY: "scroll",
              paddingBottom: 12,
            }}
          >
            <div
              className="d-flex flex-row justify-content-between"
              style={{
                marginBottom: 12,
              }}
            >
              <p
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  padding: 8,
                  color: "#094174",
                  textAlign: "center",
                  borderBottom: "1px solid #ccc",
                  margin: "0px 12px",
                }}
              >
                {translate("type")}
              </p>
              <button
                type="button"
                // className="close"
                aria-label="Close"
                onClick={() => {
                  setIsLopBanDo(false);
                }}
                style={{
                  padding: "4px 16px",
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            {JSON.stringify(anhVeTinh) != "{}" &&
              anhVeTinh.anhVeTinh != "" &&
              anhVeTinh.anhChiSo != "" && (
                <>
                  <p
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                      padding: 8,
                      color: "#050505",
                      margin: "0px 12px",
                    }}
                  >
                    AVT ({anhVeTinh.thoiGianBatDau} -{" "}
                    {anhVeTinh.thoiGianKetThuc})
                  </p>
                  <div
                    style={{
                      paddingLeft: 20,
                    }}
                  >
                    <div
                      className="d-flex align-items-center"
                      style={{ padding: "8px 12px" }}
                    >
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name={`anhVeTinh`}
                          id={`anhVeTinh`}
                          value={`anhVeTinh`}
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
                            "https://cdn-icons-png.flaticon.com/512/3419/3419993.png"
                          }
                          alt=""
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`anhVeTinh`}
                          style={{
                            margin: 0,
                          }}
                        >
                          Sentinel 2
                        </label>
                      </div>
                    </div>
                    <div
                      className="d-flex align-items-center"
                      style={{ padding: "8px 12px" }}
                    >
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name={`anhChiSo`}
                          id={`anhChiSo`}
                          value={`anhChiSo`}
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
                            "https://thumb.tildacdn.com/tild3138-6438-4433-a266-383138636535/-/resize/592x/-/format/webp/RU_onesoil_12_NDVI_4.png"
                          }
                          alt=""
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`anhChiSo`}
                          style={{
                            margin: 0,
                          }}
                        >
                          NDVI
                        </label>
                      </div>
                    </div>
                  </div>
                </>
              )}
            <p
              style={{
                fontSize: 15,
                fontWeight: "bold",
                padding: 8,
                color: "#050505",
                margin: "0px 12px",
              }}
            >
              {translate("touristAttraction")} : {dsDiemDuLich.features.length}{" "}
              {translate("destination").replace("Địa điểm du lịch", "điểm")}
            </p>
            <div
              style={{
                paddingLeft: 20,
              }}
            >
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
                      <div className="form-check">
                        <input
                          className="form-check-input"
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
                              ? "https://cdn-icons-png.flaticon.com/512/3104/3104941.png"
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
                          className="form-check-label"
                          htmlFor={`poi-${v.idDanhMucDiaDiem}`}
                          style={{
                            margin: 0,
                          }}
                        >
                          {translationData(v.tenDanhMuc, v.tenDanhMucUS)} (
                          {
                            dsDiemDuLich.features.filter(
                              (va) => va.properties.tenDanhMuc == v.tenDanhMuc
                            ).length
                          }{" "}
                          {translate("destination").replace(
                            "Địa điểm du lịch",
                            "điểm"
                          )}
                          )
                        </label>
                      </div>
                    </div>
                  )
              )}
            </div>
            <p
              style={{
                fontSize: 15,
                fontWeight: "bold",
                padding: 8,
                color: "#050505",
                margin: "0px 12px",
              }}
            >
              {translate("accommodationPoint")}: {dsLuuTru.features.length}{" "}
              {translate("destination").replace("Địa điểm du lịch", "điểm")}
            </p>
            <div
              style={{
                paddingLeft: 20,
              }}
            >
              {dsDanhMucLuuTru.map(
                (v, k) =>
                  dsLuuTru.features.filter(
                    (va) => va.properties.tenDanhMuc == v.tenDanhMuc
                  ).length > 0 && (
                    <div
                      key={k}
                      className="d-flex align-items-center"
                      style={{ padding: "8px 12px" }}
                    >
                      <div className="form-check">
                        <input
                          className="form-check-input"
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
                            v.tenDanhMuc == "Homestay"
                              ? "https://cdn-icons-png.flaticon.com/512/7059/7059852.png"
                              : v.tenDanhMuc == "Khách sạn"
                              ? "https://cdn-icons-png.flaticon.com/512/235/235889.png"
                              : v.tenDanhMuc == "Nhà nghỉ"
                              ? "https://cdn3.iconfinder.com/data/icons/flat-building-1/70/1-512.png"
                              : ""
                          }
                          alt=""
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`poi-${v.idDanhMucDiaDiem}`}
                          style={{
                            margin: 0,
                          }}
                        >
                          {translationData(v.tenDanhMuc, v.tenDanhMucUS)} (
                          {
                            dsLuuTru.features.filter(
                              (va) => va.properties.tenDanhMuc == v.tenDanhMuc
                            ).length
                          }{" "}
                          {translate("destination").replace(
                            "Địa điểm du lịch",
                            "điểm"
                          )}
                          )
                        </label>
                      </div>
                    </div>
                  )
              )}
            </div>
            <p
              style={{
                fontSize: 15,
                fontWeight: "bold",
                padding: 8,
                color: "#050505",
                margin: "0px 12px",
              }}
            >
              {translate("cuisine")} : {dsAmThuc.features.length}{" "}
              {translate("destination").replace("Địa điểm du lịch", "điểm")}
            </p>
            <div
              style={{
                paddingLeft: 20,
              }}
            >
              {dsDanhMucAmThuc.map(
                (v, k) =>
                  dsAmThuc.features.filter(
                    (va) => va.properties.tenDanhMuc == v.tenDanhMuc
                  ).length > 0 && (
                    <div
                      key={k}
                      className="d-flex align-items-center"
                      style={{ padding: "8px 12px" }}
                    >
                      <div className="form-check">
                        <input
                          className="form-check-input"
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
                            v.tenDanhMuc == "Nhà hàng"
                              ? "https://cdn-icons-png.flaticon.com/512/4287/4287725.png"
                              : ""
                          }
                          alt=""
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`poi-${v.idDanhMucDiaDiem}`}
                          style={{
                            margin: 0,
                          }}
                        >
                          {translationData(v.tenDanhMuc, v.tenDanhMucUS)} (
                          {
                            dsAmThuc.features.filter(
                              (va) => va.properties.tenDanhMuc == v.tenDanhMuc
                            ).length
                          }{" "}
                          {translate("destination").replace(
                            "Địa điểm du lịch",
                            "điểm"
                          )}
                          )
                        </label>
                      </div>
                    </div>
                  )
              )}
            </div>
            <p
              style={{
                fontSize: 15,
                fontWeight: "bold",
                padding: 8,
                color: "#050505",
                margin: "0px 12px",
              }}
            >
              {translate("rentService")} : {dsPhuongTien.features.length}{" "}
              {translate("destination").replace("Địa điểm du lịch", "điểm")}
            </p>
            <div
              style={{
                paddingLeft: 20,
              }}
            >
              {dsDanhMucPhuongTien.map(
                (v, k) =>
                  dsPhuongTien.features.filter(
                    (va) => va.properties.tenDanhMuc == v.tenDanhMuc
                  ).length > 0 && (
                    <div
                      key={k}
                      className="d-flex align-items-center"
                      style={{ padding: "8px 12px" }}
                    >
                      <div className="form-check">
                        <input
                          className="form-check-input"
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
                            v.tenDanhMuc == "Xe máy"
                              ? "https://cdn-icons-png.flaticon.com/512/1986/1986937.png"
                              : v.tenDanhMuc == "Xe đạp"
                              ? "https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
                              : v.tenDanhMuc == "Ô tô"
                              ? "https://cdn-icons-png.flaticon.com/512/2554/2554936.png"
                              : v.tenDanhMuc == "Xe điện"
                              ? "https://cdn-icons-png.flaticon.com/512/1574/1574055.png"
                              : ""
                          }
                          alt=""
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`poi-${v.idDanhMucDiaDiem}`}
                          style={{
                            margin: 0,
                          }}
                        >
                          {translationData(v.tenDanhMuc, v.tenDanhMucUS)} (
                          {
                            dsPhuongTien.features.filter(
                              (va) => va.properties.tenDanhMuc == v.tenDanhMuc
                            ).length
                          }{" "}
                          {translate("destination").replace(
                            "Địa điểm du lịch",
                            "điểm"
                          )}
                          )
                        </label>
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
        )}
        {isDanhSachBanDo && (
          <div
            style={{
              backgroundColor: "#fff",
              padding: 4,
              position: "absolute",
              top: 12,
              left: 10,
              boxShadow: `0px 0px 10px rgba(0, 0, 0, 0.2)`,
              width: 300,
            }}
          >
            <div
              className="d-flex flex-row justify-content-between"
              style={{
                marginBottom: 16,
              }}
            >
              <p
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  padding: 8,
                  color: "#094174",
                  textAlign: "center",
                  borderBottom: "1px solid #ccc",
                  margin: "0px 12px",
                }}
              >
                {translate("listOfBasemaps")}
              </p>
              <button
                type="button"
                // className="close"
                aria-label="Close"
                onClick={() => {
                  setIsDanhSachBanDo(false);
                }}
                style={{
                  padding: "4px 16px",
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                flexWrap: "wrap",
              }}
            >
              {dsStyleBanDo.map((v, k) => (
                <div
                  onClick={() => {
                    setAnhVeTinh({});
                    setDsStyleBanDo(
                      dsStyleBanDo.map((sd) => {
                        if (v.name == sd.name) {
                          sd.select = true;
                        } else {
                          sd.select = false;
                        }
                        return sd;
                      })
                    );
                    fecthData(dsStyleBanDo[k]);
                  }}
                  key={k}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "33.33%",
                  }}
                >
                  <img
                    src={v.img}
                    alt=""
                    style={{
                      height: 52,
                      width: 52,
                      borderRadius: 10,
                      padding: 2,
                      border: `2px solid ${v.select ? "#FE7524" : "#fff"}`,
                    }}
                  />
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: 12,
                      color: "#70757a",
                      fontFamily: "cursive",
                    }}
                  >
                    {v.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div
          style={{
            position: "absolute",
            top: 12,
            right: 52,
          }}
        >
          <div
            className="d-flex form-group"
            style={{
              boxShadow: `0px 0px 10px rgba(0, 0, 0, 0.2)`,
            }}
          >
            <button
              className="dropdown-toggle onsearch"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {renderDropdownSearch()}
            </button>
            <ul className="dropdown-menu">
              {selectSearch != "DIEMDULICH" && (
                <li onClick={() => setSelectSearch("DIEMDULICH")}>
                  <a
                    className="dropdown-item"
                    href="#"
                    style={{
                      alignItems: "center",
                      display: "flex",
                      fontSize: 14,
                      marginBottom: 8,
                      color: "#094174",
                    }}
                  >
                    <i
                      className="fa-brands fa-canadian-maple-leaf"
                      style={{
                        fontSize: 22,
                        color: "#FE7524",
                        marginRight: 12,
                      }}
                    ></i>
                    {translate("searchDestination")}
                  </a>
                </li>
              )}
              {selectSearch != "NHAHANG" && (
                <li onClick={() => setSelectSearch("NHAHANG")}>
                  <a
                    className="dropdown-item"
                    href="#"
                    style={{
                      alignItems: "center",
                      display: "flex",
                      fontSize: 14,
                      marginBottom: 8,
                      color: "#094174",
                    }}
                  >
                    <i
                      className="fa-solid fa-utensils"
                      style={{
                        fontSize: 22,
                        color: "#FE7524",
                        marginRight: 12,
                      }}
                    ></i>
                    {translate("searchRestaurants")}
                  </a>
                </li>
              )}
              {selectSearch != "LUUTRU" && (
                <li onClick={() => setSelectSearch("LUUTRU")}>
                  <a
                    className="dropdown-item"
                    href="#"
                    style={{
                      alignItems: "center",
                      display: "flex",
                      fontSize: 14,
                      marginBottom: 8,
                      color: "#094174",
                    }}
                  >
                    <i
                      className="fa-solid fa-hotel"
                      style={{
                        fontSize: 22,
                        color: "#FE7524",
                        marginRight: 12,
                      }}
                    ></i>
                    {translate("searchAccommodationPoint")}
                  </a>
                </li>
              )}
              {selectSearch != "KHOANGCACH" && (
                <>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li onClick={() => setSelectSearch("KHOANGCACH")}>
                    <a
                      className="dropdown-item"
                      href="#"
                      style={{
                        alignItems: "center",
                        display: "flex",
                        fontSize: 14,
                        marginBottom: 8,
                        color: "#094174",
                      }}
                    >
                      <i
                        className="fa-solid fa-street-view"
                        style={{
                          fontSize: 22,
                          color: "#FE7524",
                          marginRight: 12,
                        }}
                      ></i>
                      {translate("searchDistance")}
                    </a>
                  </li>
                </>
              )}
            </ul>
            <input
              type={selectSearch == "KHOANGCACH" ? "number" : "text"}
              name=""
              id="searchToanVanMap"
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
              placeholder={
                selectSearch != "KHOANGCACH"
                  ? translate("searchKeyWord")
                  : translate("searchBK")
              }
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
                    borderBottom: "1px solid #fe752450",
                  }}
                  onClick={() => clickItemSearhDiaDiem(v)}
                >
                  {renderDropdownSearchItem()}
                  <div
                    className="justify-content-center"
                    style={{
                      marginLeft: 24,
                    }}
                  >
                    <p
                      style={{
                        fontSize: 13,
                        color: "#094174",
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
        {isGoiYLichTrinh && (
          <div
            style={{
              position: "absolute",
              bottom: 12,
              left: 52,
              right: 52,
              maxHeight: 250,
              boxShadow: `0px 0px 10px rgba(0, 0, 0, 0.2)`,
              backgroundColor: "#fff",
            }}
          >
            <div className="d-flex flex-row justify-content-between">
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  fontWeight: "bold",
                  paddingLeft: 16,
                  paddingTop: 8,
                  color: "#071437",
                }}
              >
                {translate("suggestedSchedule")}
              </p>
              <button
                type="button"
                // className="close"
                aria-label="Close"
                onClick={() => {
                  setIsGoiYLichTrinh(false);
                }}
                style={{
                  padding: "4px 16px",
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div
              id="style-6"
              className="d-flex flex-row"
              style={{
                overflow: "hidden",
                overflowX: "auto",
                paddingTop: 12,
                paddingBottom: 12,
                marginLeft: 12,
                marginRight: 12,
              }}
            >
              {dataLichTrinh.map((v, k) => (
                <div
                  className="detailLichTrinh"
                  onClick={() => openLichTrinh(v)}
                  key={k}
                  style={{
                    padding: 12,
                    border: "1px solid #FE7524",
                    borderRadius: 10,
                    borderStyle: "dashed",
                    marginRight: 12,
                    minWidth: 380,
                    flexDirection: "row",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 5,
                      backgroundColor: "#FE752430",
                      marginRight: 16,
                      padding: 8,
                    }}
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/827/827056.png"
                      alt=""
                    />
                  </div>
                  <div className="d-flex flex-column">
                    <p
                      style={{
                        fontSize: 14,
                        fontWeight: "bold",
                        color: "#071437",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        width: 192,
                      }}
                    >
                      {translationData(v.ten, v.tenUS)}
                    </p>
                    <p
                      style={{
                        fontSize: 13,
                        fontWeight: 300,
                        color: "#99a1b7",
                        margin: 0,
                      }}
                    >
                      {translate("numberDestination")}: {v.soDiaDiem}
                    </p>
                  </div>
                  <div className="d-flex flex-row align-items-center ml-4">
                    <i
                      className="fa fa-clock-o mr-1"
                      style={{
                        color: "#FE7524",
                        marginRight: 8,
                        marginLeft: 16,
                      }}
                    ></i>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 12,
                        color: "#FE7524",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {translationData(v.thoiGian, v.thoiGianUS)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {dsDiaDiemTuLichTrinh.length > 0 && (
          <div
            style={{
              backgroundColor: "#fff",
              padding: 20,
              position: "absolute",
              top: 79,
              right: 52,
              boxShadow: `0px 0px 10px rgba(0, 0, 0, 0.2)`,
              width: 310,
            }}
          >
            <div className="d-flex flex-row justify-content-between mb-2">
              <div className="d-flex flex-column">
                <p
                  style={{
                    fontSize: 14,
                    color: "#071437",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: 192,
                  }}
                >
                  {translationData(lichTrinh.ten, lichTrinh.tenUS)}
                </p>
                <p
                  style={{
                    fontSize: 13,
                    color: "#99a1b7",
                  }}
                >
                  {translate("numberDestination")} : {lichTrinh.soDiaDiem}
                </p>
              </div>
              <button
                type="button"
                // className="close"
                aria-label="Close"
                onClick={() => {
                  setDsDiaDiemTuLichTrinh([]);
                  setLichTrinh({});
                  if (map.getLayer("lichTrinh")) {
                    // Layer tồn tại, có thể xoá nó ở đây
                    map.removeLayer("lichTrinh");
                  }
                  if (map.getSource("lichTrinh")) {
                    // Source tồn tại, có thể xoá nó ở đây
                    map.removeSource("lichTrinh");
                  }
                }}
                style={{
                  padding: 20,
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="timeline-label">
              {/*begin::Item*/}
              {dsDiaDiemTuLichTrinh.length > 0 &&
                dsDiaDiemTuLichTrinh.map((v, k) => (
                  <div
                    className="timeline-item"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: 12,
                    }}
                    key={k}
                  >
                    {/*begin::Label*/}
                    <div
                      className="timeline-label"
                      style={{
                        fontSize: 13,
                        fontWeight: "bold",
                        marginRight: 11,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {translate("dest")} {k + 1}
                    </div>
                    {/*end::Label*/}
                    {/*begin::Badge*/}
                    <div className="timeline-badge">
                      <i
                        className={`fa fa-genderless text-${getRandomValueFromArray(
                          myArray
                        )}`}
                        style={{ fontSize: "1.75rem", marginTop: -5 }}
                      />
                    </div>
                    {/*end::Badge*/}
                    {/*begin::Text*/}
                    <div
                      className="timeline-content"
                      style={{
                        fontSize: 14,
                        fontWeight: "bold",
                        marginLeft: 12,
                        color: "#252f4a",
                      }}
                    >
                      {translationData(v.tenDiaDiem, v.tenDiaDiemUS)}
                      <br />
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 300,
                          color: "#99a1b7",
                          marginTop: 8,
                        }}
                      >
                        {translate("openTime")} : {v.gioMoCua}
                        <br />
                        {translate("closeTime")} : {v.gioDongCua}
                        <br />
                        {translate("price")} : {v.giaVe}
                      </div>
                    </div>
                    {/*end::Text*/}
                  </div>
                ))}
              <div
                className="timeline-item"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: 12,
                }}
              >
                {/*begin::Label*/}
                <div
                  className="timeline-label"
                  style={{
                    fontSize: 13,
                    fontWeight: "bold",
                    marginRight: 11,
                    whiteSpace: "nowrap",
                    color: "#fff",
                  }}
                >
                  {translate("locationC")}
                </div>
                {/*end::Label*/}
                {/*begin::Badge*/}
                <div className="timeline-badge">
                  <i
                    className={`fa fa-genderless text-${getRandomValueFromArray(
                      myArray
                    )}`}
                    style={{ fontSize: "1.75rem", marginTop: -5 }}
                  />
                </div>
                {/*end::Badge*/}
                {/*begin::Text*/}
                <div
                  className="timeline-content"
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    marginLeft: 12,
                    color: "#252f4a",
                  }}
                >
                  {translate("endSchedule")}
                </div>
                {/*end::Text*/}
              </div>
            </div>
          </div>
        )}
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: 10,
          }}
        >
          <button
            onClick={() => {
              setIsTimDuong("");
              map.removeControl(isTimDuong);
              setIsDanhSachBanDo(false);
              setIsLopBanDo(true);
            }}
            style={{
              width: 29,
              height: 29,
              display: "block",
              padding: 0,
              outline: "none",
              border: 0,
              boxSizing: "border-box",
              backgroundColor: "#fff",
              cursor: "pointer",
              boxShadow: "0 0 0 2px rgba(0,0,0,.1)",
              borderRadius: 4,
            }}
          >
            <i className="fa-solid fa-layer-group"></i>
          </button>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 50,
            left: 10,
          }}
        >
          <button
            onClick={() => {
              setIsTimDuong("");
              map.removeControl(isTimDuong);
              setIsLopBanDo(false);
              setIsDanhSachBanDo(true);
            }}
            style={{
              width: 29,
              height: 29,
              display: "block",
              padding: 0,
              outline: "none",
              border: 0,
              boxSizing: "border-box",
              backgroundColor: "#fff",
              cursor: "pointer",
              boxShadow: "0 0 0 2px rgba(0,0,0,.1)",
              borderRadius: 4,
            }}
          >
            <i className="fa-regular fa-map"></i>
          </button>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 90,
            left: 10,
          }}
        >
          <button
            onClick={() => {
              setIsLopBanDo(false);
              setIsDanhSachBanDo(false);
              if (isTimDuong != "") {
                setIsTimDuong("");
                map.removeControl(isTimDuong);
              } else {
                const directions = new MapboxDirections({
                  accessToken:
                    "pk.eyJ1IjoiYXlhYW56YXZlcmkiLCJhIjoiY2ttZHVwazJvMm95YzJvcXM3ZTdta21rZSJ9.WMpQsXd5ur2gP8kFjpBo8g",
                  unit: "metric",
                  profile: "mapbox/driving",
                });
                setIsTimDuong(directions);
                map.addControl(directions, "top-left");
              }
            }}
            style={{
              width: 29,
              height: 29,
              display: "block",
              padding: 0,
              outline: "none",
              border: 0,
              boxSizing: "border-box",
              backgroundColor: "#fff",
              cursor: "pointer",
              boxShadow: "0 0 0 2px rgba(0,0,0,.1)",
              borderRadius: 4,
            }}
          >
            {isTimDuong != "" ? (
              <i
                className="fa-regular fa-rectangle-xmark"
                style={{ color: "#f8285a" }}
              ></i>
            ) : (
              <i className="fa-solid fa-diamond-turn-right"></i>
            )}
          </button>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 50,
            right: 10,
          }}
        >
          <button
            onClick={() => setIsGoiYLichTrinh(true)}
            style={{
              width: 29,
              height: 29,
              display: "block",
              padding: 0,
              outline: "none",
              border: 0,
              boxSizing: "border-box",
              backgroundColor: "#fff",
              cursor: "pointer",
              boxShadow: "0 0 0 2px rgba(0,0,0,.1)",
              borderRadius: 4,
            }}
          >
            <i className="fa-solid fa-route"></i>
          </button>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 90,
            right: 10,
          }}
        >
          <button
            onClick={() => setVisibleXemAnhVeTinh(true)}
            style={{
              width: 29,
              height: 29,
              display: "block",
              padding: 0,
              outline: "none",
              border: 0,
              boxSizing: "border-box",
              backgroundColor: "#fff",
              cursor: "pointer",
              boxShadow: "0 0 0 2px rgba(0,0,0,.1)",
              borderRadius: 4,
            }}
          >
            <i className="fa-solid fa-images"></i>
          </button>
        </div>
        <Modal
          open={visibleXemAnhVeTinh}
          centered
          width={800}
          footer={false}
          onCancel={() => setVisibleXemAnhVeTinh(false)}
        >
          <div
            className="modal-content"
            style={{
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            }}
          >
            <div className="modal-header border-bottom-0">
              <button
                onClick={() => setVisibleXemAnhVeTinh(false)}
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-title text-center">
                <h2 style={{ marginBottom: 8, color: "#094174" }}>
                  {translate("viewSatelliteImages")}
                </h2>
                <div className="text-muted fw-semibold fs-8">
                  {translate("needSeeSatellite")}{" "}
                  <a
                    className="fw-bold"
                    style={{
                      color: "#fe7524",
                    }}
                  >
                    {translate("aPeriodOfTime")}
                  </a>
                  .
                </div>
              </div>
              <div
                className="col-12"
                style={{
                  padding: "8px 20px",
                }}
              >
                <div className="row d-flex flex-row col-12">
                  <div className="col-6">
                    <label for="loaiAnhLabel" className="form-label">
                      {translate("photoType")}
                    </label>
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="loaiAnhLabel">
                        <i className="fa-solid fa-images"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Sentinel 2"
                        value={"Sentinel 2"}
                        aria-describedby="loaiAnh"
                        disabled
                        id="loaiAnh"
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <label for="doPhuMayLabel" className="form-label">
                      {translate("cloudCover")}
                    </label>
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="doPhuMayLabel">
                        <i className="fa-brands fa-cloudversify"></i>
                      </span>
                      <input
                        type="number"
                        className="form-control"
                        placeholder={translate("enterCloudCover")}
                        aria-describedby="doPhuMay"
                        id="doPhuMay"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-12"
                style={{
                  padding: "8px 20px",
                }}
              >
                <div className="row d-flex flex-row col-12">
                  <div className="col-6">
                    <InputDateMap
                      title={translate("startDate")}
                      date={startDate}
                      setDate={setStartDate}
                    />
                  </div>
                  <div className="col-6">
                    <InputDateMap
                      title={translate("endDate")}
                      date={endDate}
                      setDate={setEndDate}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer d-flex justify-content-center">
            <button
              onClick={() => setVisibleXemAnhVeTinh(false)}
              type="button"
              style={{
                padding: "12px 24px",
                border: "1px solid #FE7524",
                borderRadius: 5,
                backgroundColor: "#fff",
                color: "#FE7524",
                fontWeight: "bold",
              }}
            >
              {translate("cancel")}
            </button>
            <button
              onClick={() => {
                xemAnhVeTinh();
              }}
              type="button"
              style={{
                padding: "12px 24px",
                border: "1px solid #FE7524",
                borderRadius: 5,
                backgroundColor: "#FE7524",
                color: "#fff",
              }}
            >
              {translate("viewPhoto")}
            </button>
          </div>
        </Modal>
      </section>
      <LoadingFullPageMap loading={isLoading} />
    </MainLayout>
  );
};

export default ExtraComponent;
