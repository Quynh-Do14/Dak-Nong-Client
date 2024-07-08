import React, { useEffect, useRef, useState } from "react";
import MainLayout from "../../../infratructure/common/layout/main-layout";
import { useLocation } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import api from "../../../infratructure/api";
import {
  DSSTYLEBANDO,
  formatDate,
  getPreviousDay,
  removeAccents,
  removeDiacriticsAndSpaces,
} from "../common";
import { DATALICHTRINH } from "../common/datalichtrinh";
import * as turf from "@turf/turf";
import { Modal } from "antd";
import InputDateMap from "../../../infratructure/common/input/input-date-map";
import LoadingFullPageMap from "../../../infratructure/common/controls/loadingMap";
import * as MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import useTranslate from "../../../core/common/hook/useTranslate";
import { translationData } from "../../../infratructure/utils/helper";
mapboxgl.accessToken =
  "pk.eyJ1IjoibnRkMTAxMDIwMDAiLCJhIjoiY2tvbzJ4anl1MDZjMzJwbzNpcnA5NXZpcCJ9.dePfFDv0RlCLnWoDq1zHlw";

const myArray = ["primary", "success", "danger", "warning", "info"];
function getRandomValueFromArray(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

const BanDoTong = () => {
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
  const [isBieuDo, setIsBieuDo] = useState(true);

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

        map.addSource("DakNong2022_Sentinel_tiff", {
          type: "image",
          url: "http://103.130.212.145:46928/api/public/anhvetinh/DakNong2022_Sentinel_tiff.gif",
          coordinates: [
            [107.20629162700004, 12.812316930000065],
            [108.11636491700006, 12.812316930000065],
            [108.11636491700006, 11.74900376100004],
            [107.20629162700004, 11.74900376100004],
          ],
        });
        map.addLayer({
          id: "DakNong2022_Sentinel_tiff",
          type: "raster",
          source: "DakNong2022_Sentinel_tiff",
          paint: {
            "raster-fade-duration": 0,
          },
        });

        map.setLayoutProperty(
          "DakNong2022_Sentinel_tiff",
          "visibility",
          "none"
        );

        map.addSource("LC_daknong_tiff", {
          type: "image",
          url: "http://103.130.212.145:46928/api/public/anhvetinh/LC_daknong_tiff.gif",
          coordinates: [
            [107.20629162700004, 12.812316930000065],
            [108.11636491700006, 12.812316930000065],
            [108.11636491700006, 11.74900376100004],
            [107.20629162700004, 11.74900376100004],
          ],
        });
        map.addLayer({
          id: "LC_daknong_tiff",
          type: "raster",
          source: "LC_daknong_tiff",
          paint: {
            "raster-fade-duration": 0,
          },
        });

        map.setLayoutProperty(
          "LC_daknong_tiff",
          "visibility",
          "none"
        );

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
            uriImg = "https://cdn-icons-png.flaticon.com/512/7006/7006898.png";
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

        map.addSource("tuyen_dl", {
          type: "geojson",
          data: `http://103.130.212.145:46928/api/diaDiem/shp/tuyen_dl`,
        });
        map.addLayer({
          id: `tuyen_dl`,
          type: "line",
          source: "tuyen_dl",
          layout: {},
          paint: {
            "line-color": "#1b84ff",
            "line-width": 6,
          },
        });
        map.addLayer({
          id: "tuyen_dl_labels",
          type: "symbol",
          source: "tuyen_dl",
          layout: {
            "text-field": ["get", "tentuyen"],
            "text-font": ["Open Sans Regular", "Arial Unicode MS Regular"],
            "text-size": 16,
            "symbol-placement": "line",
            "text-rotation-alignment": "map",
            "text-allow-overlap": true, // Cho phép nhãn chồng lên nhau
            "text-ignore-placement": true, // Bỏ qua việc đặt nhãn sao cho không chồng lên nhau
          },
          paint: {
            "text-color": "#000000",
            "text-halo-color": "#ffffff",
            "text-halo-width": 3,
          },
        });

        map.loadImage(
          "https://cdn-icons-png.flaticon.com/128/862/862819.png",
          (error, image) => {
            if (error) throw error;
            map.addImage(`cho`, image);
          }
        );
        map.addSource("cho", {
          type: "geojson",
          data: `http://103.130.212.145:46928/api/diaDiem/shp/tonghop_point?where=and phanloai like 'Chợ'`,
        });
        map.addLayer({
          id: `cho`,
          type: "symbol",
          source: "cho",
          layout: {
            "icon-image": `cho`,
            // "icon-allow-overlap": true,
            "icon-size": 0.2,
            "icon-offset": [0, -17],
            "text-field": ["get", "tenrutgon"],
            "text-size": 11,
            "text-offset": [0, 2],
          },
          paint: {
            "text-color": "#004eff",
            "text-halo-color": "#fff",
            "text-halo-width": 2,
          },
        });
        map.on("click", `cho`, (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const html = `<div>
            
              <div style="
                  padding: 20px;
              ">
                      <p style="
              color: #d32f2f;
              font-size: 11px;
              text-transform: uppercase;
              ">${e.features[0].properties.phanloai}</p>
                      <a href="#" style="
              color: #333;
              font-size: 18px;
              width: 240px;
              font-weight: 500;
              ">${e.features[0].properties.tendaydu}</a>
                      <p style="
              font-size: 11px;
              color: #333;
              font-weight: 400;
              ">${e.features[0].properties.info}</p>
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
              ">${e.features[0].properties.ghichu}</p>
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
        map.on("mouseenter", `cho`, () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", `cho`, () => {
          map.getCanvas().style.cursor = "";
        });

        map.loadImage(
          "https://cdn-icons-png.flaticon.com/128/2749/2749678.png",
          (error, image) => {
            if (error) throw error;
            map.addImage(`benhvien`, image);
          }
        );
        map.addSource("benhvien", {
          type: "geojson",
          data: `http://103.130.212.145:46928/api/diaDiem/shp/tonghop_point?where=and phanloai like 'Bệnh viện'`,
        });
        map.addLayer({
          id: `benhvien`,
          type: "symbol",
          source: "benhvien",
          layout: {
            "icon-image": `benhvien`,
            // "icon-allow-overlap": true,
            "icon-size": 0.2,
            "icon-offset": [0, -17],
            "text-field": ["get", "tenrutgon"],
            "text-size": 11,
            "text-offset": [0, 2],
          },
          paint: {
            "text-color": "#004eff",
            "text-halo-color": "#fff",
            "text-halo-width": 2,
          },
        });
        map.on("click", `benhvien`, (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const html = `<div>
            
              <div style="
                  padding: 20px;
              ">
                      <p style="
              color: #d32f2f;
              font-size: 11px;
              text-transform: uppercase;
              ">${e.features[0].properties.phanloai}</p>
                      <a href="#" style="
              color: #333;
              font-size: 18px;
              width: 240px;
              font-weight: 500;
              ">${e.features[0].properties.tendaydu}</a>
                      <p style="
              font-size: 11px;
              color: #333;
              font-weight: 400;
              ">${e.features[0].properties.info}</p>
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
              ">${e.features[0].properties.ghichu}</p>
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
        map.on("mouseenter", `benhvien`, () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", `benhvien`, () => {
          map.getCanvas().style.cursor = "";
        });

        map.loadImage(
          "https://cdn-icons-png.flaticon.com/128/1669/1669668.png",
          (error, image) => {
            if (error) throw error;
            map.addImage(`nganhang`, image);
          }
        );
        map.addSource("nganhang", {
          type: "geojson",
          data: `http://103.130.212.145:46928/api/diaDiem/shp/tonghop_point?where=and phanloai like 'Ngân hàng'`,
        });
        map.addLayer({
          id: `nganhang`,
          type: "symbol",
          source: "nganhang",
          layout: {
            "icon-image": `nganhang`,
            // "icon-allow-overlap": true,
            "icon-size": 0.2,
            "icon-offset": [0, -17],
            "text-field": ["get", "tenrutgon"],
            "text-size": 11,
            "text-offset": [0, 2],
          },
          paint: {
            "text-color": "#004eff",
            "text-halo-color": "#fff",
            "text-halo-width": 2,
          },
        });
        map.on("click", `nganhang`, (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const html = `<div>
            
              <div style="
                  padding: 20px;
              ">
                      <p style="
              color: #d32f2f;
              font-size: 11px;
              text-transform: uppercase;
              ">${e.features[0].properties.phanloai}</p>
                      <a href="#" style="
              color: #333;
              font-size: 18px;
              width: 240px;
              font-weight: 500;
              ">${e.features[0].properties.tendaydu}</a>
                      <p style="
              font-size: 11px;
              color: #333;
              font-weight: 400;
              ">${e.features[0].properties.info}</p>
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
              ">${e.features[0].properties.ghichu}</p>
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
        map.on("mouseenter", `nganhang`, () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", `nganhang`, () => {
          map.getCanvas().style.cursor = "";
        });

        map.loadImage(
          "https://cdn-icons-png.flaticon.com/128/3514/3514407.png",
          (error, image) => {
            if (error) throw error;
            map.addImage(`sieuthitrungtamthuongmai`, image);
          }
        );
        map.addSource("sieuthitrungtamthuongmai", {
          type: "geojson",
          data: `http://103.130.212.145:46928/api/diaDiem/shp/tonghop_point?where=and phanloai like 'Siêu thị, trung tâm thương mại'`,
        });
        map.addLayer({
          id: `sieuthitrungtamthuongmai`,
          type: "symbol",
          source: "sieuthitrungtamthuongmai",
          layout: {
            "icon-image": `sieuthitrungtamthuongmai`,
            // "icon-allow-overlap": true,
            "icon-size": 0.2,
            "icon-offset": [0, -17],
            "text-field": ["get", "tenrutgon"],
            "text-size": 11,
            "text-offset": [0, 2],
          },
          paint: {
            "text-color": "#004eff",
            "text-halo-color": "#fff",
            "text-halo-width": 2,
          },
        });
        map.on("click", `sieuthitrungtamthuongmai`, (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const html = `<div>
            
              <div style="
                  padding: 20px;
              ">
                      <p style="
              color: #d32f2f;
              font-size: 11px;
              text-transform: uppercase;
              ">${e.features[0].properties.phanloai}</p>
                      <a href="#" style="
              color: #333;
              font-size: 18px;
              width: 240px;
              font-weight: 500;
              ">${e.features[0].properties.tendaydu}</a>
                      <p style="
              font-size: 11px;
              color: #333;
              font-weight: 400;
              ">${e.features[0].properties.info}</p>
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
              ">${e.features[0].properties.ghichu}</p>
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
        map.on("mouseenter", `sieuthitrungtamthuongmai`, () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", `sieuthitrungtamthuongmai`, () => {
          map.getCanvas().style.cursor = "";
        });

        map.loadImage(
          "https://cdn-icons-png.flaticon.com/128/1946/1946788.png",
          (error, image) => {
            if (error) throw error;
            map.addImage(`khachsan`, image);
          }
        );
        map.addSource("khachsan", {
          type: "geojson",
          data: `http://103.130.212.145:46928/api/diaDiem/shp/tonghop_point?where=and phanloai like 'Khách sạn'`,
        });
        map.addLayer({
          id: `khachsan`,
          type: "symbol",
          source: "khachsan",
          layout: {
            "icon-image": `khachsan`,
            // "icon-allow-overlap": true,
            "icon-size": 0.2,
            "icon-offset": [0, -17],
            "text-field": ["get", "tenrutgon"],
            "text-size": 11,
            "text-offset": [0, 2],
          },
          paint: {
            "text-color": "#004eff",
            "text-halo-color": "#fff",
            "text-halo-width": 2,
          },
        });
        map.on("click", `khachsan`, (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const html = `<div>
            
              <div style="
                  padding: 20px;
              ">
                      <p style="
              color: #d32f2f;
              font-size: 11px;
              text-transform: uppercase;
              ">${e.features[0].properties.phanloai}</p>
                      <a href="#" style="
              color: #333;
              font-size: 18px;
              width: 240px;
              font-weight: 500;
              ">${e.features[0].properties.tendaydu}</a>
                      <p style="
              font-size: 11px;
              color: #333;
              font-weight: 400;
              ">${e.features[0].properties.info}</p>
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
              ">${e.features[0].properties.ghichu}</p>
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
        map.on("mouseenter", `khachsan`, () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", `khachsan`, () => {
          map.getCanvas().style.cursor = "";
        });

        map.loadImage(
          "https://cdn-icons-png.flaticon.com/128/2316/2316474.png",
          (error, image) => {
            if (error) throw error;
            map.addImage(`nhakhach`, image);
          }
        );
        map.addSource("nhakhach", {
          type: "geojson",
          data: `http://103.130.212.145:46928/api/diaDiem/shp/tonghop_point?where=and phanloai like 'Nhà khách'`,
        });
        map.addLayer({
          id: `nhakhach`,
          type: "symbol",
          source: "nhakhach",
          layout: {
            "icon-image": `nhakhach`,
            // "icon-allow-overlap": true,
            "icon-size": 0.2,
            "icon-offset": [0, -17],
            "text-field": ["get", "tenrutgon"],
            "text-size": 11,
            "text-offset": [0, 2],
          },
          paint: {
            "text-color": "#004eff",
            "text-halo-color": "#fff",
            "text-halo-width": 2,
          },
        });
        map.on("click", `nhakhach`, (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const html = `<div>
            
              <div style="
                  padding: 20px;
              ">
                      <p style="
              color: #d32f2f;
              font-size: 11px;
              text-transform: uppercase;
              ">${e.features[0].properties.phanloai}</p>
                      <a href="#" style="
              color: #333;
              font-size: 18px;
              width: 240px;
              font-weight: 500;
              ">${e.features[0].properties.tendaydu}</a>
                      <p style="
              font-size: 11px;
              color: #333;
              font-weight: 400;
              ">${e.features[0].properties.info}</p>
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
              ">${e.features[0].properties.ghichu}</p>
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
        map.on("mouseenter", `nhakhach`, () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", `nhakhach`, () => {
          map.getCanvas().style.cursor = "";
        });

        map.loadImage(
          "https://cdn-icons-png.flaticon.com/128/1476/1476071.png",
          (error, image) => {
            if (error) throw error;
            map.addImage(`nhanghi`, image);
          }
        );
        map.addSource("nhanghi", {
          type: "geojson",
          data: `http://103.130.212.145:46928/api/diaDiem/shp/tonghop_point?where=and phanloai like 'Nhà nghỉ'`,
        });
        map.addLayer({
          id: `nhanghi`,
          type: "symbol",
          source: "nhanghi",
          layout: {
            "icon-image": `nhanghi`,
            // "icon-allow-overlap": true,
            "icon-size": 0.2,
            "icon-offset": [0, -17],
            "text-field": ["get", "tenrutgon"],
            "text-size": 11,
            "text-offset": [0, 2],
          },
          paint: {
            "text-color": "#004eff",
            "text-halo-color": "#fff",
            "text-halo-width": 2,
          },
        });
        map.on("click", `nhanghi`, (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const html = `<div>
            
              <div style="
                  padding: 20px;
              ">
                      <p style="
              color: #d32f2f;
              font-size: 11px;
              text-transform: uppercase;
              ">${e.features[0].properties.phanloai}</p>
                      <a href="#" style="
              color: #333;
              font-size: 18px;
              width: 240px;
              font-weight: 500;
              ">${e.features[0].properties.tendaydu}</a>
                      <p style="
              font-size: 11px;
              color: #333;
              font-weight: 400;
              ">${e.features[0].properties.info}</p>
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
              ">${e.features[0].properties.ghichu}</p>
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
        map.on("mouseenter", `nhanghi`, () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", `nhanghi`, () => {
          map.getCanvas().style.cursor = "";
        });

        map.loadImage(
          "https://cdn-icons-png.flaticon.com/128/8503/8503966.png",
          (error, image) => {
            if (error) throw error;
            map.addImage(`nhahang`, image);
          }
        );
        map.addSource("nhahang", {
          type: "geojson",
          data: `http://103.130.212.145:46928/api/diaDiem/shp/tonghop_point?where=and phanloai like 'Nhà hàng'`,
        });
        map.addLayer({
          id: `nhahang`,
          type: "symbol",
          source: "nhahang",
          layout: {
            "icon-image": `nhahang`,
            // "icon-allow-overlap": true,
            "icon-size": 0.2,
            "icon-offset": [0, -17],
            "text-field": ["get", "tenrutgon"],
            "text-size": 11,
            "text-offset": [0, 2],
          },
          paint: {
            "text-color": "#004eff",
            "text-halo-color": "#fff",
            "text-halo-width": 2,
          },
        });
        map.on("click", `nhahang`, (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const html = `<div>
            
              <div style="
                  padding: 20px;
              ">
                      <p style="
              color: #d32f2f;
              font-size: 11px;
              text-transform: uppercase;
              ">${e.features[0].properties.phanloai}</p>
                      <a href="#" style="
              color: #333;
              font-size: 18px;
              width: 240px;
              font-weight: 500;
              ">${e.features[0].properties.tendaydu}</a>
                      <p style="
              font-size: 11px;
              color: #333;
              font-weight: 400;
              ">${e.features[0].properties.info}</p>
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
              ">${e.features[0].properties.ghichu}</p>
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
        map.on("mouseenter", `nhahang`, () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", `nhahang`, () => {
          map.getCanvas().style.cursor = "";
        });

        map.loadImage(
          "https://cdn-icons-png.flaticon.com/128/11891/11891773.png",
          (error, image) => {
            if (error) throw error;
            map.addImage(`quanan`, image);
          }
        );
        map.addSource("quanan", {
          type: "geojson",
          data: `http://103.130.212.145:46928/api/diaDiem/shp/tonghop_point?where=and phanloai like 'Quán ăn'`,
        });
        map.addLayer({
          id: `quanan`,
          type: "symbol",
          source: "quanan",
          layout: {
            "icon-image": `quanan`,
            // "icon-allow-overlap": true,
            "icon-size": 0.2,
            "icon-offset": [0, -17],
            "text-field": ["get", "tenrutgon"],
            "text-size": 11,
            "text-offset": [0, 2],
          },
          paint: {
            "text-color": "#004eff",
            "text-halo-color": "#fff",
            "text-halo-width": 2,
          },
        });
        map.on("click", `quanan`, (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const html = `<div>
            
              <div style="
                  padding: 20px;
              ">
                      <p style="
              color: #d32f2f;
              font-size: 11px;
              text-transform: uppercase;
              ">${e.features[0].properties.phanloai}</p>
                      <a href="#" style="
              color: #333;
              font-size: 18px;
              width: 240px;
              font-weight: 500;
              ">${e.features[0].properties.tendaydu}</a>
                      <p style="
              font-size: 11px;
              color: #333;
              font-weight: 400;
              ">${e.features[0].properties.info}</p>
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
              ">${e.features[0].properties.ghichu}</p>
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
        map.on("mouseenter", `quanan`, () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", `quanan`, () => {
          map.getCanvas().style.cursor = "";
        });

        map.loadImage(
          "https://cdn-icons-png.flaticon.com/128/831/831497.png",
          (error, image) => {
            if (error) throw error;
            map.addImage(`rapchieuphim`, image);
          }
        );
        map.addSource("rapchieuphim", {
          type: "geojson",
          data: `http://103.130.212.145:46928/api/diaDiem/shp/tonghop_point?where=and phanloai like 'Rạp chiếu phim'`,
        });
        map.addLayer({
          id: `rapchieuphim`,
          type: "symbol",
          source: "rapchieuphim",
          layout: {
            "icon-image": `rapchieuphim`,
            // "icon-allow-overlap": true,
            "icon-size": 0.2,
            "icon-offset": [0, -17],
            "text-field": ["get", "tenrutgon"],
            "text-size": 11,
            "text-offset": [0, 2],
          },
          paint: {
            "text-color": "#004eff",
            "text-halo-color": "#fff",
            "text-halo-width": 2,
          },
        });
        map.on("click", `rapchieuphim`, (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const html = `<div>
            
              <div style="
                  padding: 20px;
              ">
                      <p style="
              color: #d32f2f;
              font-size: 11px;
              text-transform: uppercase;
              ">${e.features[0].properties.phanloai}</p>
                      <a href="#" style="
              color: #333;
              font-size: 18px;
              width: 240px;
              font-weight: 500;
              ">${e.features[0].properties.tendaydu}</a>
                      <p style="
              font-size: 11px;
              color: #333;
              font-weight: 400;
              ">${e.features[0].properties.info}</p>
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
              ">${e.features[0].properties.ghichu}</p>
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
        map.on("mouseenter", `rapchieuphim`, () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", `rapchieuphim`, () => {
          map.getCanvas().style.cursor = "";
        });

        map.loadImage(
          "https://cdn-icons-png.flaticon.com/128/4300/4300059.png",
          (error, image) => {
            if (error) throw error;
            map.addImage(`ctyluhanhnoidia`, image);
          }
        );
        map.addSource("ctyluhanhnoidia", {
          type: "geojson",
          data: `http://103.130.212.145:46928/api/diaDiem/shp/tonghop_point?where=and phanloai like 'Cty lữ hành nội địa'`,
        });
        map.addLayer({
          id: `ctyluhanhnoidia`,
          type: "symbol",
          source: "ctyluhanhnoidia",
          layout: {
            "icon-image": `ctyluhanhnoidia`,
            // "icon-allow-overlap": true,
            "icon-size": 0.2,
            "icon-offset": [0, -17],
            "text-field": ["get", "tenrutgon"],
            "text-size": 11,
            "text-offset": [0, 2],
          },
          paint: {
            "text-color": "#004eff",
            "text-halo-color": "#fff",
            "text-halo-width": 2,
          },
        });
        map.on("click", `ctyluhanhnoidia`, (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const html = `<div>
            
              <div style="
                  padding: 20px;
              ">
                      <p style="
              color: #d32f2f;
              font-size: 11px;
              text-transform: uppercase;
              ">${e.features[0].properties.phanloai}</p>
                      <a href="#" style="
              color: #333;
              font-size: 18px;
              width: 240px;
              font-weight: 500;
              ">${e.features[0].properties.tendaydu}</a>
                      <p style="
              font-size: 11px;
              color: #333;
              font-weight: 400;
              ">${e.features[0].properties.info}</p>
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
              ">${e.features[0].properties.ghichu}</p>
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
        map.on("mouseenter", `ctyluhanhnoidia`, () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", `ctyluhanhnoidia`, () => {
          map.getCanvas().style.cursor = "";
        });

        map.loadImage(
          "https://cdn-icons-png.flaticon.com/128/1040/1040993.png",
          (error, image) => {
            if (error) throw error;
            map.addImage(`cosoluutrukhac`, image);
          }
        );
        map.addSource("cosoluutrukhac", {
          type: "geojson",
          data: `http://103.130.212.145:46928/api/diaDiem/shp/tonghop_point?where=and phanloai like 'Cơ sở lưu trú khác'`,
        });
        map.addLayer({
          id: `cosoluutrukhac`,
          type: "symbol",
          source: "cosoluutrukhac",
          layout: {
            "icon-image": `cosoluutrukhac`,
            // "icon-allow-overlap": true,
            "icon-size": 0.2,
            "icon-offset": [0, -17],
            "text-field": ["get", "tenrutgon"],
            "text-size": 11,
            "text-offset": [0, 2],
          },
          paint: {
            "text-color": "#004eff",
            "text-halo-color": "#fff",
            "text-halo-width": 2,
          },
        });
        map.on("click", `cosoluutrukhac`, (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const html = `<div>
            
              <div style="
                  padding: 20px;
              ">
                      <p style="
              color: #d32f2f;
              font-size: 11px;
              text-transform: uppercase;
              ">${e.features[0].properties.phanloai}</p>
                      <a href="#" style="
              color: #333;
              font-size: 18px;
              width: 240px;
              font-weight: 500;
              ">${e.features[0].properties.tendaydu}</a>
                      <p style="
              font-size: 11px;
              color: #333;
              font-weight: 400;
              ">${e.features[0].properties.info}</p>
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
              ">${e.features[0].properties.ghichu}</p>
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
        map.on("mouseenter", `cosoluutrukhac`, () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", `cosoluutrukhac`, () => {
          map.getCanvas().style.cursor = "";
        });

        map.addSource("khoanhvungdulich", {
          type: "geojson",
          data: `http://103.130.212.145:46928/api/diadiem/shp/khoanh_vung_diem_dl_hapdan`,
        });
        map.addLayer({
          id: "khoanhvungdulich",
          type: "fill",
          source: "khoanhvungdulich",
          layout: {},
          paint: {
            "fill-color": "#ff003d",
            "fill-opacity": 0.2,
          },
        });
        map.addLayer({
          id: "outline-khoanhvungdulich",
          type: "line",
          source: "khoanhvungdulich",
          layout: {},
          paint: {
            "line-color": "#ff003d",
            "line-width": 2,
          },
        });

        map.loadImage(
          "https://cdn-icons-png.flaticon.com/128/1934/1934285.png",
          (error, image) => {
            if (error) throw error;
            map.addImage(`khudulich`, image);
          }
        );
        map.addSource("khudulich", {
          type: "geojson",
          data: `http://103.130.212.145:46928/api/diaDiem/shp/diemdl_daknong?where=and phanloai like 'Khu du lịch'`,
        });
        map.addLayer({
          id: `khudulich`,
          type: "symbol",
          source: "khudulich",
          layout: {
            "icon-image": `khudulich`,
            // "icon-allow-overlap": true,
            "icon-size": 0.2,
            "icon-offset": [0, -17],
            "text-field": ["get", "tenngan"],
            "text-size": 11,
            "text-offset": [0, 2],
          },
          paint: {
            "text-color": "#004eff",
            "text-halo-color": "#fff",
            "text-halo-width": 2,
          },
        });
        map.on("click", `khudulich`, (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const html = `<div>
            
              <div style="
                  padding: 20px;
              ">
                      <p style="
              color: #d32f2f;
              font-size: 11px;
              text-transform: uppercase;
              ">${e.features[0].properties.phanloai}</p>
                      <a href="#" style="
              color: #333;
              font-size: 18px;
              width: 240px;
              font-weight: 500;
              ">${e.features[0].properties.tenngan}</a>
                      <p style="
              font-size: 11px;
              color: #333;
              font-weight: 400;
              ">${e.features[0].properties.tendaydu}</p>
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
              ">${e.features[0].properties.ghichukhac ?? ""}</p>
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
        map.on("mouseenter", `khudulich`, () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", `khudulich`, () => {
          map.getCanvas().style.cursor = "";
        });

        map.loadImage(
          "https://cdn-icons-png.flaticon.com/128/5454/5454117.png",
          (error, image) => {
            if (error) throw error;
            map.addImage(`hangdongdiachat`, image);
          }
        );
        map.addSource("hangdongdiachat", {
          type: "geojson",
          data: `http://103.130.212.145:46928/api/diaDiem/shp/diemdl_daknong?where=and phanloai like 'Hang động địa chất'`,
        });
        map.addLayer({
          id: `hangdongdiachat`,
          type: "symbol",
          source: "hangdongdiachat",
          layout: {
            "icon-image": `hangdongdiachat`,
            // "icon-allow-overlap": true,
            "icon-size": 0.2,
            "icon-offset": [0, -17],
            "text-field": ["get", "tenngan"],
            "text-size": 11,
            "text-offset": [0, 2],
          },
          paint: {
            "text-color": "#004eff",
            "text-halo-color": "#fff",
            "text-halo-width": 2,
          },
        });
        map.on("click", `hangdongdiachat`, (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const html = `<div>
            
              <div style="
                  padding: 20px;
              ">
                      <p style="
              color: #d32f2f;
              font-size: 11px;
              text-transform: uppercase;
              ">${e.features[0].properties.phanloai}</p>
                      <a href="#" style="
              color: #333;
              font-size: 18px;
              width: 240px;
              font-weight: 500;
              ">${e.features[0].properties.tenngan}</a>
                      <p style="
              font-size: 11px;
              color: #333;
              font-weight: 400;
              ">${e.features[0].properties.tendaydu}</p>
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
              ">${e.features[0].properties.ghichukhac ?? ""}</p>
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
        map.on("mouseenter", `hangdongdiachat`, () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", `hangdongdiachat`, () => {
          map.getCanvas().style.cursor = "";
        });

        map.loadImage(
          "https://cdn-icons-png.flaticon.com/128/3158/3158062.png",
          (error, image) => {
            if (error) throw error;
            map.addImage(`songsuoi`, image);
          }
        );
        map.addSource("songsuoi", {
          type: "geojson",
          data: `http://103.130.212.145:46928/api/diaDiem/shp/diemdl_daknong?where=and phanloai like 'Sông, suối'`,
        });
        map.addLayer({
          id: `songsuoi`,
          type: "symbol",
          source: "songsuoi",
          layout: {
            "icon-image": `songsuoi`,
            // "icon-allow-overlap": true,
            "icon-size": 0.2,
            "icon-offset": [0, -17],
            "text-field": ["get", "tenngan"],
            "text-size": 11,
            "text-offset": [0, 2],
          },
          paint: {
            "text-color": "#004eff",
            "text-halo-color": "#fff",
            "text-halo-width": 2,
          },
        });
        map.on("click", `songsuoi`, (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const html = `<div>
            
              <div style="
                  padding: 20px;
              ">
                      <p style="
              color: #d32f2f;
              font-size: 11px;
              text-transform: uppercase;
              ">${e.features[0].properties.phanloai}</p>
                      <a href="#" style="
              color: #333;
              font-size: 18px;
              width: 240px;
              font-weight: 500;
              ">${e.features[0].properties.tenngan}</a>
                      <p style="
              font-size: 11px;
              color: #333;
              font-weight: 400;
              ">${e.features[0].properties.tendaydu}</p>
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
              ">${e.features[0].properties.ghichukhac ?? ""}</p>
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
        map.on("mouseenter", `songsuoi`, () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", `songsuoi`, () => {
          map.getCanvas().style.cursor = "";
        });

        map.loadImage(
          "https://cdn-icons-png.flaticon.com/128/3660/3660590.png",
          (error, image) => {
            if (error) throw error;
            map.addImage(`ditichlichsu`, image);
          }
        );
        map.addSource("ditichlichsu", {
          type: "geojson",
          data: `http://103.130.212.145:46928/api/diaDiem/shp/diemdl_daknong?where=and phanloai like 'Di tích lịch sử'`,
        });
        map.addLayer({
          id: `ditichlichsu`,
          type: "symbol",
          source: "ditichlichsu",
          layout: {
            "icon-image": `ditichlichsu`,
            // "icon-allow-overlap": true,
            "icon-size": 0.2,
            "icon-offset": [0, -17],
            "text-field": ["get", "tenngan"],
            "text-size": 11,
            "text-offset": [0, 2],
          },
          paint: {
            "text-color": "#004eff",
            "text-halo-color": "#fff",
            "text-halo-width": 2,
          },
        });
        map.on("click", `ditichlichsu`, (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const html = `<div>
            
              <div style="
                  padding: 20px;
              ">
                      <p style="
              color: #d32f2f;
              font-size: 11px;
              text-transform: uppercase;
              ">${e.features[0].properties.phanloai}</p>
                      <a href="#" style="
              color: #333;
              font-size: 18px;
              width: 240px;
              font-weight: 500;
              ">${e.features[0].properties.tenngan}</a>
                      <p style="
              font-size: 11px;
              color: #333;
              font-weight: 400;
              ">${e.features[0].properties.tendaydu}</p>
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
              ">${e.features[0].properties.ghichukhac ?? ""}</p>
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
        map.on("mouseenter", `ditichlichsu`, () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", `ditichlichsu`, () => {
          map.getCanvas().style.cursor = "";
        });

        map.loadImage(
          "https://cdn-icons-png.flaticon.com/128/756/756089.png",
          (error, image) => {
            if (error) throw error;
            map.addImage(`thac`, image);
          }
        );
        map.addSource("thac", {
          type: "geojson",
          data: `http://103.130.212.145:46928/api/diaDiem/shp/diemdl_daknong?where=and phanloai like 'Thác'`,
        });
        map.addLayer({
          id: `thac`,
          type: "symbol",
          source: "thac",
          layout: {
            "icon-image": `thac`,
            // "icon-allow-overlap": true,
            "icon-size": 0.2,
            "icon-offset": [0, -17],
            "text-field": ["get", "tenngan"],
            "text-size": 11,
            "text-offset": [0, 2],
          },
          paint: {
            "text-color": "#004eff",
            "text-halo-color": "#fff",
            "text-halo-width": 2,
          },
        });
        map.on("click", `thac`, (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const html = `<div>
            
              <div style="
                  padding: 20px;
              ">
                      <p style="
              color: #d32f2f;
              font-size: 11px;
              text-transform: uppercase;
              ">${e.features[0].properties.phanloai}</p>
                      <a href="#" style="
              color: #333;
              font-size: 18px;
              width: 240px;
              font-weight: 500;
              ">${e.features[0].properties.tenngan}</a>
                      <p style="
              font-size: 11px;
              color: #333;
              font-weight: 400;
              ">${e.features[0].properties.tendaydu}</p>
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
              ">${e.features[0].properties.ghichukhac ?? ""}</p>
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
        map.on("mouseenter", `thac`, () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", `thac`, () => {
          map.getCanvas().style.cursor = "";
        });

        map.loadImage(
          "https://cdn-icons-png.flaticon.com/128/3719/3719852.png",
          (error, image) => {
            if (error) throw error;
            map.addImage(`ho`, image);
          }
        );
        map.addSource("ho", {
          type: "geojson",
          data: `http://103.130.212.145:46928/api/diaDiem/shp/diemdl_daknong?where=and phanloai like 'Hồ'`,
        });
        map.addLayer({
          id: `ho`,
          type: "symbol",
          source: "ho",
          layout: {
            "icon-image": `ho`,
            // "icon-allow-overlap": true,
            "icon-size": 0.2,
            "icon-offset": [0, -17],
            "text-field": ["get", "tenngan"],
            "text-size": 11,
            "text-offset": [0, 2],
          },
          paint: {
            "text-color": "#004eff",
            "text-halo-color": "#fff",
            "text-halo-width": 2,
          },
        });
        map.on("click", `ho`, (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const html = `<div>
            
              <div style="
                  padding: 20px;
              ">
                      <p style="
              color: #d32f2f;
              font-size: 11px;
              text-transform: uppercase;
              ">${e.features[0].properties.phanloai}</p>
                      <a href="#" style="
              color: #333;
              font-size: 18px;
              width: 240px;
              font-weight: 500;
              ">${e.features[0].properties.tenngan}</a>
                      <p style="
              font-size: 11px;
              color: #333;
              font-weight: 400;
              ">${e.features[0].properties.tendaydu}</p>
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
              ">${e.features[0].properties.ghichukhac ?? ""}</p>
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
        map.on("mouseenter", `ho`, () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", `ho`, () => {
          map.getCanvas().style.cursor = "";
        });

        map.loadImage(
          "https://cdn-icons-png.flaticon.com/128/2169/2169407.png",
          (error, image) => {
            if (error) throw error;
            map.addImage(`congvien`, image);
          }
        );
        map.addSource("congvien", {
          type: "geojson",
          data: `http://103.130.212.145:46928/api/diaDiem/shp/diemdl_daknong?where=and phanloai like 'Công viên'`,
        });
        map.addLayer({
          id: `congvien`,
          type: "symbol",
          source: "congvien",
          layout: {
            "icon-image": `congvien`,
            // "icon-allow-overlap": true,
            "icon-size": 0.2,
            "icon-offset": [0, -17],
            "text-field": ["get", "tenngan"],
            "text-size": 11,
            "text-offset": [0, 2],
          },
          paint: {
            "text-color": "#004eff",
            "text-halo-color": "#fff",
            "text-halo-width": 2,
          },
        });
        map.on("click", `congvien`, (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const html = `<div>
            
              <div style="
                  padding: 20px;
              ">
                      <p style="
              color: #d32f2f;
              font-size: 11px;
              text-transform: uppercase;
              ">${e.features[0].properties.phanloai}</p>
                      <a href="#" style="
              color: #333;
              font-size: 18px;
              width: 240px;
              font-weight: 500;
              ">${e.features[0].properties.tenngan}</a>
                      <p style="
              font-size: 11px;
              color: #333;
              font-weight: 400;
              ">${e.features[0].properties.tendaydu}</p>
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
              ">${e.features[0].properties.ghichukhac ?? ""}</p>
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
        map.on("mouseenter", `congvien`, () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", `congvien`, () => {
          map.getCanvas().style.cursor = "";
        });

        map.loadImage(
          "https://cdn-icons-png.flaticon.com/128/2414/2414579.png",
          (error, image) => {
            if (error) throw error;
            map.addImage(`tuvien`, image);
          }
        );
        map.addSource("tuvien", {
          type: "geojson",
          data: `http://103.130.212.145:46928/api/diaDiem/shp/diemdl_daknong?where=and phanloai like 'Tu viện'`,
        });
        map.addLayer({
          id: `tuvien`,
          type: "symbol",
          source: "tuvien",
          layout: {
            "icon-image": `tuvien`,
            // "icon-allow-overlap": true,
            "icon-size": 0.2,
            "icon-offset": [0, -17],
            "text-field": ["get", "tenngan"],
            "text-size": 11,
            "text-offset": [0, 2],
          },
          paint: {
            "text-color": "#004eff",
            "text-halo-color": "#fff",
            "text-halo-width": 2,
          },
        });
        map.on("click", `tuvien`, (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const html = `<div>
            
              <div style="
                  padding: 20px;
              ">
                      <p style="
              color: #d32f2f;
              font-size: 11px;
              text-transform: uppercase;
              ">${e.features[0].properties.phanloai}</p>
                      <a href="#" style="
              color: #333;
              font-size: 18px;
              width: 240px;
              font-weight: 500;
              ">${e.features[0].properties.tenngan}</a>
                      <p style="
              font-size: 11px;
              color: #333;
              font-weight: 400;
              ">${e.features[0].properties.tendaydu}</p>
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
              ">${e.features[0].properties.ghichukhac ?? ""}</p>
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
        map.on("mouseenter", `tuvien`, () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", `tuvien`, () => {
          map.getCanvas().style.cursor = "";
        });

        map.loadImage(
          "https://cdn-icons-png.flaticon.com/128/3033/3033239.png",
          (error, image) => {
            if (error) throw error;
            map.addImage(`trangtrai`, image);
          }
        );
        map.addSource("trangtrai", {
          type: "geojson",
          data: `http://103.130.212.145:46928/api/diaDiem/shp/diemdl_daknong?where=and phanloai like 'Trang trại'`,
        });
        map.addLayer({
          id: `trangtrai`,
          type: "symbol",
          source: "trangtrai",
          layout: {
            "icon-image": `trangtrai`,
            // "icon-allow-overlap": true,
            "icon-size": 0.2,
            "icon-offset": [0, -17],
            "text-field": ["get", "tenngan"],
            "text-size": 11,
            "text-offset": [0, 2],
          },
          paint: {
            "text-color": "#004eff",
            "text-halo-color": "#fff",
            "text-halo-width": 2,
          },
        });
        map.on("click", `trangtrai`, (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const html = `<div>
            
              <div style="
                  padding: 20px;
              ">
                      <p style="
              color: #d32f2f;
              font-size: 11px;
              text-transform: uppercase;
              ">${e.features[0].properties.phanloai}</p>
                      <a href="#" style="
              color: #333;
              font-size: 18px;
              width: 240px;
              font-weight: 500;
              ">${e.features[0].properties.tenngan}</a>
                      <p style="
              font-size: 11px;
              color: #333;
              font-weight: 400;
              ">${e.features[0].properties.tendaydu}</p>
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
              ">${e.features[0].properties.ghichukhac ?? ""}</p>
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
        map.on("mouseenter", `trangtrai`, () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", `trangtrai`, () => {
          map.getCanvas().style.cursor = "";
        });

        map.loadImage(
          "https://cdn-icons-png.flaticon.com/128/4840/4840947.png",
          (error, image) => {
            if (error) throw error;
            map.addImage(`thienvien`, image);
          }
        );
        map.addSource("thienvien", {
          type: "geojson",
          data: `http://103.130.212.145:46928/api/diaDiem/shp/diemdl_daknong?where=and phanloai like 'Thiền viện'`,
        });
        map.addLayer({
          id: `thienvien`,
          type: "symbol",
          source: "thienvien",
          layout: {
            "icon-image": `thienvien`,
            // "icon-allow-overlap": true,
            "icon-size": 0.2,
            "icon-offset": [0, -17],
            "text-field": ["get", "tenngan"],
            "text-size": 11,
            "text-offset": [0, 2],
          },
          paint: {
            "text-color": "#004eff",
            "text-halo-color": "#fff",
            "text-halo-width": 2,
          },
        });
        map.on("click", `thienvien`, (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const html = `<div>
            
              <div style="
                  padding: 20px;
              ">
                      <p style="
              color: #d32f2f;
              font-size: 11px;
              text-transform: uppercase;
              ">${e.features[0].properties.phanloai}</p>
                      <a href="#" style="
              color: #333;
              font-size: 18px;
              width: 240px;
              font-weight: 500;
              ">${e.features[0].properties.tenngan}</a>
                      <p style="
              font-size: 11px;
              color: #333;
              font-weight: 400;
              ">${e.features[0].properties.tendaydu}</p>
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
              ">${e.features[0].properties.ghichukhac ?? ""}</p>
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
        map.on("mouseenter", `thienvien`, () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", `thienvien`, () => {
          map.getCanvas().style.cursor = "";
        });

        map.loadImage(
          "https://cdn-icons-png.flaticon.com/128/5300/5300933.png",
          (error, image) => {
            if (error) throw error;
            map.addImage(`baotangnhatrungbay`, image);
          }
        );
        map.addSource("baotangnhatrungbay", {
          type: "geojson",
          data: `http://103.130.212.145:46928/api/diaDiem/shp/diemdl_daknong?where=and phanloai like 'Bảo tàng, nhà trưng bày'`,
        });
        map.addLayer({
          id: `baotangnhatrungbay`,
          type: "symbol",
          source: "baotangnhatrungbay",
          layout: {
            "icon-image": `baotangnhatrungbay`,
            // "icon-allow-overlap": true,
            "icon-size": 0.2,
            "icon-offset": [0, -17],
            "text-field": ["get", "tenngan"],
            "text-size": 11,
            "text-offset": [0, 2],
          },
          paint: {
            "text-color": "#004eff",
            "text-halo-color": "#fff",
            "text-halo-width": 2,
          },
        });
        map.on("click", `baotangnhatrungbay`, (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const html = `<div>
            
              <div style="
                  padding: 20px;
              ">
                      <p style="
              color: #d32f2f;
              font-size: 11px;
              text-transform: uppercase;
              ">${e.features[0].properties.phanloai}</p>
                      <a href="#" style="
              color: #333;
              font-size: 18px;
              width: 240px;
              font-weight: 500;
              ">${e.features[0].properties.tenngan}</a>
                      <p style="
              font-size: 11px;
              color: #333;
              font-weight: 400;
              ">${e.features[0].properties.tendaydu}</p>
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
              ">${e.features[0].properties.ghichukhac ?? ""}</p>
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
        map.on("mouseenter", `baotangnhatrungbay`, () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", `baotangnhatrungbay`, () => {
          map.getCanvas().style.cursor = "";
        });

        map.loadImage(
          "https://cdn-icons-png.flaticon.com/128/2095/2095642.png",
          (error, image) => {
            if (error) throw error;
            map.addImage(`chua`, image);
          }
        );
        map.addSource("chua", {
          type: "geojson",
          data: `http://103.130.212.145:46928/api/diaDiem/shp/diemdl_daknong?where=and phanloai like 'Chùa'`,
        });
        map.addLayer({
          id: `chua`,
          type: "symbol",
          source: "chua",
          layout: {
            "icon-image": `chua`,
            // "icon-allow-overlap": true,
            "icon-size": 0.2,
            "icon-offset": [0, -17],
            "text-field": ["get", "tenngan"],
            "text-size": 11,
            "text-offset": [0, 2],
          },
          paint: {
            "text-color": "#004eff",
            "text-halo-color": "#fff",
            "text-halo-width": 2,
          },
        });
        map.on("click", `chua`, (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const html = `<div>
            
              <div style="
                  padding: 20px;
              ">
                      <p style="
              color: #d32f2f;
              font-size: 11px;
              text-transform: uppercase;
              ">${e.features[0].properties.phanloai}</p>
                      <a href="#" style="
              color: #333;
              font-size: 18px;
              width: 240px;
              font-weight: 500;
              ">${e.features[0].properties.tenngan}</a>
                      <p style="
              font-size: 11px;
              color: #333;
              font-weight: 400;
              ">${e.features[0].properties.tendaydu}</p>
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
              ">${e.features[0].properties.ghichukhac ?? ""}</p>
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
        map.on("mouseenter", `chua`, () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", `chua`, () => {
          map.getCanvas().style.cursor = "";
        });

        map.loadImage(
          "https://cdn-icons-png.flaticon.com/128/553/553968.png",
          (error, image) => {
            if (error) throw error;
            map.addImage(`tuongdai`, image);
          }
        );
        map.addSource("tuongdai", {
          type: "geojson",
          data: `http://103.130.212.145:46928/api/diaDiem/shp/diemdl_daknong?where=and phanloai like 'Tượng đài'`,
        });
        map.addLayer({
          id: `tuongdai`,
          type: "symbol",
          source: "tuongdai",
          layout: {
            "icon-image": `tuongdai`,
            // "icon-allow-overlap": true,
            "icon-size": 0.2,
            "icon-offset": [0, -17],
            "text-field": ["get", "tenngan"],
            "text-size": 11,
            "text-offset": [0, 2],
          },
          paint: {
            "text-color": "#004eff",
            "text-halo-color": "#fff",
            "text-halo-width": 2,
          },
        });
        map.on("click", `tuongdai`, (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const html = `<div>
            
              <div style="
                  padding: 20px;
              ">
                      <p style="
              color: #d32f2f;
              font-size: 11px;
              text-transform: uppercase;
              ">${e.features[0].properties.phanloai}</p>
                      <a href="#" style="
              color: #333;
              font-size: 18px;
              width: 240px;
              font-weight: 500;
              ">${e.features[0].properties.tenngan}</a>
                      <p style="
              font-size: 11px;
              color: #333;
              font-weight: 400;
              ">${e.features[0].properties.tendaydu}</p>
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
              ">${e.features[0].properties.ghichukhac ?? ""}</p>
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
        map.on("mouseenter", `tuongdai`, () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", `tuongdai`, () => {
          map.getCanvas().style.cursor = "";
        });

        map.loadImage(
          "https://cdn-icons-png.flaticon.com/128/3660/3660499.png",
          (error, image) => {
            if (error) throw error;
            map.addImage(`khac`, image);
          }
        );
        map.addSource("khac", {
          type: "geojson",
          data: `http://103.130.212.145:46928/api/diaDiem/shp/diemdl_daknong?where=and phanloai like 'Khác'`,
        });
        map.addLayer({
          id: `khac`,
          type: "symbol",
          source: "khac",
          layout: {
            "icon-image": `khac`,
            // "icon-allow-overlap": true,
            "icon-size": 0.2,
            "icon-offset": [0, -17],
            "text-field": ["get", "tenngan"],
            "text-size": 11,
            "text-offset": [0, 2],
          },
          paint: {
            "text-color": "#004eff",
            "text-halo-color": "#fff",
            "text-halo-width": 2,
          },
        });
        map.on("click", `khac`, (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const html = `<div>
            
              <div style="
                  padding: 20px;
              ">
                      <p style="
              color: #d32f2f;
              font-size: 11px;
              text-transform: uppercase;
              ">${e.features[0].properties.phanloai}</p>
                      <a href="#" style="
              color: #333;
              font-size: 18px;
              width: 240px;
              font-weight: 500;
              ">${e.features[0].properties.tenngan}</a>
                      <p style="
              font-size: 11px;
              color: #333;
              font-weight: 400;
              ">${e.features[0].properties.tendaydu}</p>
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
              ">${e.features[0].properties.ghichukhac ?? ""}</p>
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
        map.on("mouseenter", `khac`, () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", `khac`, () => {
          map.getCanvas().style.cursor = "";
        });

        map.loadImage(
          "https://cdn-icons-png.flaticon.com/128/1609/1609077.png",
          (error, image) => {
            if (error) throw error;
            map.addImage(`khubaotonthiennhien`, image);
          }
        );
        map.addSource("khubaotonthiennhien", {
          type: "geojson",
          data: `http://103.130.212.145:46928/api/diaDiem/shp/dl_tunhien?where=and phanloai like 'Khu bảo tồn thiên nhiên'`,
        });
        map.addLayer({
          id: `khubaotonthiennhien`,
          type: "symbol",
          source: "khubaotonthiennhien",
          layout: {
            "icon-image": `khubaotonthiennhien`,
            // "icon-allow-overlap": true,
            "icon-size": 0.2,
            "icon-offset": [0, -17],
            "text-field": ["get", "tendiemdl"],
            "text-size": 11,
            "text-offset": [0, 2],
          },
          paint: {
            "text-color": "#004eff",
            "text-halo-color": "#fff",
            "text-halo-width": 2,
          },
        });
        map.on("click", `khubaotonthiennhien`, (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const html = `<div>
            
              <div style="
                  padding: 20px;
              ">
                      <p style="
              color: #d32f2f;
              font-size: 11px;
              text-transform: uppercase;
              ">${e.features[0].properties.phanloai}</p>
                      <a href="#" style="
              color: #333;
              font-size: 18px;
              width: 240px;
              font-weight: 500;
              ">${e.features[0].properties.tendiemdl}</a>
                      <p style="
              font-size: 11px;
              color: #333;
              font-weight: 400;
              ">${e.features[0].properties.nguon}</p>
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
              ">${e.features[0].properties.thongtin}</p>
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
        map.on("mouseenter", `khubaotonthiennhien`, () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", `khubaotonthiennhien`, () => {
          map.getCanvas().style.cursor = "";
        });

        map.loadImage(
          "https://cdn-icons-png.flaticon.com/128/7810/7810475.png",
          (error, image) => {
            if (error) throw error;
            map.addImage(`vuonquocgia`, image);
          }
        );
        map.addSource("vuonquocgia", {
          type: "geojson",
          data: `http://103.130.212.145:46928/api/diaDiem/shp/dl_tunhien?where=and phanloai like 'Vườn quốc gia'`,
        });
        map.addLayer({
          id: `vuonquocgia`,
          type: "symbol",
          source: "vuonquocgia",
          layout: {
            "icon-image": `vuonquocgia`,
            // "icon-allow-overlap": true,
            "icon-size": 0.2,
            "icon-offset": [0, -17],
            "text-field": ["get", "tendiemdl"],
            "text-size": 11,
            "text-offset": [0, 2],
          },
          paint: {
            "text-color": "#004eff",
            "text-halo-color": "#fff",
            "text-halo-width": 2,
          },
        });
        map.on("click", `vuonquocgia`, (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const html = `<div>
            
              <div style="
                  padding: 20px;
              ">
                      <p style="
              color: #d32f2f;
              font-size: 11px;
              text-transform: uppercase;
              ">${e.features[0].properties.phanloai}</p>
                      <a href="#" style="
              color: #333;
              font-size: 18px;
              width: 240px;
              font-weight: 500;
              ">${e.features[0].properties.tendiemdl}</a>
                      <p style="
              font-size: 11px;
              color: #333;
              font-weight: 400;
              ">${e.features[0].properties.nguon}</p>
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
              ">${e.features[0].properties.thongtin}</p>
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
        map.on("mouseenter", `vuonquocgia`, () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", `vuonquocgia`, () => {
          map.getCanvas().style.cursor = "";
        });

        map.loadImage(
          "https://cdn-icons-png.flaticon.com/128/2169/2169335.png",
          (error, image) => {
            if (error) throw error;
            map.addImage(`song`, image);
          }
        );
        map.addSource("song", {
          type: "geojson",
          data: `http://103.130.212.145:46928/api/diaDiem/shp/dl_tunhien?where=and phanloai like 'Sông'`,
        });
        map.addLayer({
          id: `song`,
          type: "symbol",
          source: "song",
          layout: {
            "icon-image": `song`,
            // "icon-allow-overlap": true,
            "icon-size": 0.2,
            "icon-offset": [0, -17],
            "text-field": ["get", "tendiemdl"],
            "text-size": 11,
            "text-offset": [0, 2],
          },
          paint: {
            "text-color": "#004eff",
            "text-halo-color": "#fff",
            "text-halo-width": 2,
          },
        });
        map.on("click", `song`, (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const html = `<div>
            
              <div style="
                  padding: 20px;
              ">
                      <p style="
              color: #d32f2f;
              font-size: 11px;
              text-transform: uppercase;
              ">${e.features[0].properties.phanloai}</p>
                      <a href="#" style="
              color: #333;
              font-size: 18px;
              width: 240px;
              font-weight: 500;
              ">${e.features[0].properties.tendiemdl}</a>
                      <p style="
              font-size: 11px;
              color: #333;
              font-weight: 400;
              ">${e.features[0].properties.nguon}</p>
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
              ">${e.features[0].properties.thongtin}</p>
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
        map.on("mouseenter", `song`, () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", `song`, () => {
          map.getCanvas().style.cursor = "";
        });

        map.loadImage(
          "https://cdn-icons-png.flaticon.com/128/3722/3722876.png",
          (error, image) => {
            if (error) throw error;
            map.addImage(`dao`, image);
          }
        );
        map.addSource("dao", {
          type: "geojson",
          data: `http://103.130.212.145:46928/api/diaDiem/shp/dl_tunhien?where=and phanloai like 'Đảo'`,
        });
        map.addLayer({
          id: `dao`,
          type: "symbol",
          source: "dao",
          layout: {
            "icon-image": `dao`,
            // "icon-allow-overlap": true,
            "icon-size": 0.2,
            "icon-offset": [0, -17],
            "text-field": ["get", "tendiemdl"],
            "text-size": 11,
            "text-offset": [0, 2],
          },
          paint: {
            "text-color": "#004eff",
            "text-halo-color": "#fff",
            "text-halo-width": 2,
          },
        });
        map.on("click", `dao`, (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const html = `<div>
            
              <div style="
                  padding: 20px;
              ">
                      <p style="
              color: #d32f2f;
              font-size: 11px;
              text-transform: uppercase;
              ">${e.features[0].properties.phanloai}</p>
                      <a href="#" style="
              color: #333;
              font-size: 18px;
              width: 240px;
              font-weight: 500;
              ">${e.features[0].properties.tendiemdl}</a>
                      <p style="
              font-size: 11px;
              color: #333;
              font-weight: 400;
              ">${e.features[0].properties.nguon}</p>
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
              ">${e.features[0].properties.thongtin}</p>
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
        map.on("mouseenter", `dao`, () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", `dao`, () => {
          map.getCanvas().style.cursor = "";
        });

        map.loadImage(
          "https://cdn-icons-png.flaticon.com/128/472/472743.png",
          (error, image) => {
            if (error) throw error;
            map.addImage(`nuilua`, image);
          }
        );
        map.addSource("nuilua", {
          type: "geojson",
          data: `http://103.130.212.145:46928/api/diaDiem/shp/dl_tunhien?where=and phanloai like 'Núi lửa'`,
        });
        map.addLayer({
          id: `nuilua`,
          type: "symbol",
          source: "nuilua",
          layout: {
            "icon-image": `nuilua`,
            // "icon-allow-overlap": true,
            "icon-size": 0.2,
            "icon-offset": [0, -17],
            "text-field": ["get", "tendiemdl"],
            "text-size": 11,
            "text-offset": [0, 2],
          },
          paint: {
            "text-color": "#004eff",
            "text-halo-color": "#fff",
            "text-halo-width": 2,
          },
        });
        map.on("click", `nuilua`, (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const html = `<div>
            
              <div style="
                  padding: 20px;
              ">
                      <p style="
              color: #d32f2f;
              font-size: 11px;
              text-transform: uppercase;
              ">${e.features[0].properties.phanloai}</p>
                      <a href="#" style="
              color: #333;
              font-size: 18px;
              width: 240px;
              font-weight: 500;
              ">${e.features[0].properties.tendiemdl}</a>
                      <p style="
              font-size: 11px;
              color: #333;
              font-weight: 400;
              ">${e.features[0].properties.nguon}</p>
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
              ">${e.features[0].properties.thongtin}</p>
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
        map.on("mouseenter", `nuilua`, () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", `nuilua`, () => {
          map.getCanvas().style.cursor = "";
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
        {isLopBanDo &&
          dsDanhMucDiaDiemDuLich.length > 0 &&
          dsDiemDuLich.features.length && (
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
                {translate("touristAttraction")} :{" "}
                {dsDiemDuLich.features.length}{" "}
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
                                ? "https://cdn-icons-png.flaticon.com/512/7006/7006898.png"
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
              <p
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  padding: 8,
                  color: "#050505",
                  margin: "0px 12px",
                }}
              >
                {translate("satelliteImage")}
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
                      name={`DakNong2022_Sentinel_tiff`}
                      id={`DakNong2022_Sentinel_tiff`}
                      value={`DakNong2022_Sentinel_tiff`}
                      style={{
                        marginRight: 8,
                      }}
                      onClick={btDiaDiemDuLich}
                      defaultChecked={false}
                    />
                    <img
                      style={{
                        width: 25,
                        height: 25,
                        marginRight: 8,
                      }}
                      src={
                        "https://cdn-icons-png.flaticon.com/128/3301/3301722.png"
                      }
                      alt=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`DakNong2022_Sentinel_tiff`}
                      style={{
                        margin: 0,
                      }}
                    >
                      {translate("satelliteImage")}
                    </label>
                  </div>
                </div>
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
                {translate("tourismFacilities")}
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
                      name={`cho`}
                      id={`cho`}
                      value={`cho`}
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
                        "https://cdn-icons-png.flaticon.com/128/862/862819.png"
                      }
                      alt=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`cho`}
                      style={{
                        margin: 0,
                      }}
                    >
                      {translate("market")}
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
                      name={`benhvien`}
                      id={`benhvien`}
                      value={`benhvien`}
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
                        "https://cdn-icons-png.flaticon.com/128/2749/2749678.png"
                      }
                      alt=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`benhvien`}
                      style={{
                        margin: 0,
                      }}
                    >
                      {translate("hospital")}
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
                      name={`nganhang`}
                      id={`nganhang`}
                      value={`nganhang`}
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
                        "https://cdn-icons-png.flaticon.com/128/1669/1669668.png"
                      }
                      alt=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`nganhang`}
                      style={{
                        margin: 0,
                      }}
                    >
                      {translate("bank")}
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
                      name={`sieuthitrungtamthuongmai`}
                      id={`sieuthitrungtamthuongmai`}
                      value={`sieuthitrungtamthuongmai`}
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
                        "https://cdn-icons-png.flaticon.com/128/3514/3514407.png"
                      }
                      alt=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`sieuthitrungtamthuongmai`}
                      style={{
                        margin: 0,
                      }}
                    >
                      {translate("supermarketsTradeCenters")}
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
                      name={`khachsan`}
                      id={`khachsan`}
                      value={`khachsan`}
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
                        "https://cdn-icons-png.flaticon.com/128/1946/1946788.png"
                      }
                      alt=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`khachsan`}
                      style={{
                        margin: 0,
                      }}
                    >
                      {translate("hotel")}
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
                      name={`nhakhach`}
                      id={`nhakhach`}
                      value={`nhakhach`}
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
                        "https://cdn-icons-png.flaticon.com/128/2316/2316474.png"
                      }
                      alt=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`nhakhach`}
                      style={{
                        margin: 0,
                      }}
                    >
                      {translate("guestHouse")}
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
                      name={`nhanghi`}
                      id={`nhanghi`}
                      value={`nhanghi`}
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
                        "https://cdn-icons-png.flaticon.com/128/1476/1476071.png"
                      }
                      alt=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`nhanghi`}
                      style={{
                        margin: 0,
                      }}
                    >
                      {translate("budgetMotel")}
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
                      name={`nhahang`}
                      id={`nhahang`}
                      value={`nhahang`}
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
                        "https://cdn-icons-png.flaticon.com/128/8503/8503966.png"
                      }
                      alt=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`nhahang`}
                      style={{
                        margin: 0,
                      }}
                    >
                      {translate("restaurant")}
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
                      name={`quanan`}
                      id={`quanan`}
                      value={`quanan`}
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
                        "https://cdn-icons-png.flaticon.com/128/11891/11891773.png"
                      }
                      alt=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`quanan`}
                      style={{
                        margin: 0,
                      }}
                    >
                      {translate("eatery")}
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
                      name={`rapchieuphim`}
                      id={`rapchieuphim`}
                      value={`rapchieuphim`}
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
                        "https://cdn-icons-png.flaticon.com/128/831/831497.png"
                      }
                      alt=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`rapchieuphim`}
                      style={{
                        margin: 0,
                      }}
                    >
                      {translate("cinema")}
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
                      name={`ctyluhanhnoidia`}
                      id={`ctyluhanhnoidia`}
                      value={`ctyluhanhnoidia`}
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
                        "https://cdn-icons-png.flaticon.com/128/4300/4300059.png"
                      }
                      alt=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`ctyluhanhnoidia`}
                      style={{
                        margin: 0,
                      }}
                    >
                      {translate("domesticCirculationCompany")}
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
                      name={`cosoluutrukhac`}
                      id={`cosoluutrukhac`}
                      value={`cosoluutrukhac`}
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
                        "https://cdn-icons-png.flaticon.com/128/1040/1040993.png"
                      }
                      alt=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`cosoluutrukhac`}
                      style={{
                        margin: 0,
                      }}
                    >
                      {translate("otherAccommodationFacilities")}
                    </label>
                  </div>
                </div>
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
                {translate("touristFlow")}
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
                      name={`khudulich`}
                      id={`khudulich`}
                      value={`khudulich`}
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
                        "https://cdn-icons-png.flaticon.com/128/1934/1934285.png"
                      }
                      alt=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`khudulich`}
                      style={{
                        margin: 0,
                      }}
                    >
                      {translate("touristArea")}
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
                      name={`hangdongdiachat`}
                      id={`hangdongdiachat`}
                      value={`hangdongdiachat`}
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
                        "https://cdn-icons-png.flaticon.com/128/5454/5454117.png"
                      }
                      alt=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`hangdongdiachat`}
                      style={{
                        margin: 0,
                      }}
                    >
                      {translate("geologicalCave")}
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
                      name={`songsuoi`}
                      id={`songsuoi`}
                      value={`songsuoi`}
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
                        "https://cdn-icons-png.flaticon.com/128/3158/3158062.png"
                      }
                      alt=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`songsuoi`}
                      style={{
                        margin: 0,
                      }}
                    >
                      {translate("riverStream")}
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
                      name={`ditichlichsu`}
                      id={`ditichlichsu`}
                      value={`ditichlichsu`}
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
                        "https://cdn-icons-png.flaticon.com/128/3660/3660590.png"
                      }
                      alt=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`ditichlichsu`}
                      style={{
                        margin: 0,
                      }}
                    >
                      {translate("historicalSites")}
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
                      name={`thac`}
                      id={`thac`}
                      value={`thac`}
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
                        "https://cdn-icons-png.flaticon.com/128/756/756089.png"
                      }
                      alt=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`thac`}
                      style={{
                        margin: 0,
                      }}
                    >
                      {translate("waterfall")}
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
                      name={`ho`}
                      id={`ho`}
                      value={`ho`}
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
                        "https://cdn-icons-png.flaticon.com/128/3719/3719852.png"
                      }
                      alt=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`ho`}
                      style={{
                        margin: 0,
                      }}
                    >
                      {translate("lake")}
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
                      name={`congvien`}
                      id={`congvien`}
                      value={`congvien`}
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
                        "https://cdn-icons-png.flaticon.com/128/2169/2169407.png"
                      }
                      alt=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`congvien`}
                      style={{
                        margin: 0,
                      }}
                    >
                      {translate("park")}
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
                      name={`tuvien`}
                      id={`tuvien`}
                      value={`tuvien`}
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
                        "https://cdn-icons-png.flaticon.com/128/2414/2414579.png"
                      }
                      alt=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`tuvien`}
                      style={{
                        margin: 0,
                      }}
                    >
                      {translate("abbey")}
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
                      name={`trangtrai`}
                      id={`trangtrai`}
                      value={`trangtrai`}
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
                        "https://cdn-icons-png.flaticon.com/128/3033/3033239.png"
                      }
                      alt=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`trangtrai`}
                      style={{
                        margin: 0,
                      }}
                    >
                      {translate("farm")}
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
                      name={`thienvien`}
                      id={`thienvien`}
                      value={`thienvien`}
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
                        "https://cdn-icons-png.flaticon.com/128/4840/4840947.png"
                      }
                      alt=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`thienvien`}
                      style={{
                        margin: 0,
                      }}
                    >
                      {translate("monastery")}
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
                      name={`baotangnhatrungbay`}
                      id={`baotangnhatrungbay`}
                      value={`baotangnhatrungbay`}
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
                        "https://cdn-icons-png.flaticon.com/128/5300/5300933.png"
                      }
                      alt=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`baotangnhatrungbay`}
                      style={{
                        margin: 0,
                      }}
                    >
                      {translate("museumsGalleries")}
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
                      name={`chua`}
                      id={`chua`}
                      value={`chua`}
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
                        "https://cdn-icons-png.flaticon.com/128/2095/2095642.png"
                      }
                      alt=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`chua`}
                      style={{
                        margin: 0,
                      }}
                    >
                      {translate("pagoda")}
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
                      name={`tuongdai`}
                      id={`tuongdai`}
                      value={`tuongdai`}
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
                        "https://cdn-icons-png.flaticon.com/128/553/553968.png"
                      }
                      alt=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`tuongdai`}
                      style={{
                        margin: 0,
                      }}
                    >
                      {translate("monument")}
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
                      name={`khac`}
                      id={`khac`}
                      value={`khac`}
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
                        "https://cdn-icons-png.flaticon.com/128/3660/3660499.png"
                      }
                      alt=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`khac`}
                      style={{
                        margin: 0,
                      }}
                    >
                      {translate("other")}
                    </label>
                  </div>
                </div>
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
                {translate("touristRoutes")}
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
                      name={`tuyen_dl`}
                      id={`tuyen_dl`}
                      value={`tuyen_dl`}
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
                        "https://cdn-icons-png.flaticon.com/128/5264/5264589.png"
                      }
                      alt=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`tuyen_dl`}
                      style={{
                        margin: 0,
                      }}
                    >
                      {translate("touristRoutes")}
                    </label>
                  </div>
                </div>
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
                Vùng điểm du lịch hấp dẫn
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
                      name={`khoanhvungdulich`}
                      id={`khoanhvungdulich`}
                      value={`khoanhvungdulich`}
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
                        "https://cdn-icons-png.flaticon.com/128/3283/3283435.png"
                      }
                      alt=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`khoanhvungdulich`}
                      style={{
                        margin: 0,
                      }}
                    >
                      {translate("attractiveTouristDestinationArea")}
                    </label>
                  </div>
                </div>
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
                {translate("naturalTourismResources")}
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
                      name={`khubaotonthiennhien`}
                      id={`khubaotonthiennhien`}
                      value={`khubaotonthiennhien`}
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
                        "https://cdn-icons-png.flaticon.com/128/1609/1609077.png"
                      }
                      alt=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`khubaotonthiennhien`}
                      style={{
                        margin: 0,
                      }}
                    >
                      {translate("natureReserve")}
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
                      name={`vuonquocgia`}
                      id={`vuonquocgia`}
                      value={`vuonquocgia`}
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
                        "https://cdn-icons-png.flaticon.com/128/7810/7810475.png"
                      }
                      alt=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`vuonquocgia`}
                      style={{
                        margin: 0,
                      }}
                    >
                      {translate("nationalParks")}
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
                      name={`hangdongdiachat`}
                      id={`hangdongdiachat`}
                      value={`hangdongdiachat`}
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
                        "https://cdn-icons-png.flaticon.com/128/9180/9180798.png"
                      }
                      alt=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`hangdongdiachat`}
                      style={{
                        margin: 0,
                      }}
                    >
                      {translate("geologicalCave")}
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
                      name={`song`}
                      id={`song`}
                      value={`song`}
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
                        "https://cdn-icons-png.flaticon.com/128/2169/2169335.png"
                      }
                      alt=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`song`}
                      style={{
                        margin: 0,
                      }}
                    >
                      {translate("river")}
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
                      name={`thac`}
                      id={`thac`}
                      value={`thac`}
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
                        "https://cdn-icons-png.flaticon.com/128/756/756089.png"
                      }
                      alt=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`thac`}
                      style={{
                        margin: 0,
                      }}
                    >
                      {translate("waterfall")}
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
                      name={`ho`}
                      id={`ho`}
                      value={`ho`}
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
                        "https://cdn-icons-png.flaticon.com/128/3719/3719852.png"
                      }
                      alt=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`ho`}
                      style={{
                        margin: 0,
                      }}
                    >
                      {translate("lake")}
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
                      name={`dao`}
                      id={`dao`}
                      value={`dao`}
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
                        "https://cdn-icons-png.flaticon.com/128/3722/3722876.png"
                      }
                      alt=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`dao`}
                      style={{
                        margin: 0,
                      }}
                    >
                      {translate("isLand")}
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
                      name={`nuilua`}
                      id={`nuilua`}
                      value={`nuilua`}
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
                        "https://cdn-icons-png.flaticon.com/128/472/472743.png"
                      }
                      alt=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`nuilua`}
                      style={{
                        margin: 0,
                      }}
                    >
                      {translate("volcano")}
                    </label>
                  </div>
                </div>
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
                {translate("culturalTourismResources")}
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
                      name={`chua`}
                      id={`chua`}
                      value={`chua`}
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
                        "https://cdn-icons-png.flaticon.com/128/2322/2322127.png"
                      }
                      alt=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`chua`}
                      style={{
                        margin: 0,
                      }}
                    >
                      {translate("pagoda")}
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
                      name={`ditichlichsu`}
                      id={`ditichlichsu`}
                      value={`ditichlichsu`}
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
                        "https://cdn-icons-png.flaticon.com/128/3660/3660590.png"
                      }
                      alt=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`ditichlichsu`}
                      style={{
                        margin: 0,
                      }}
                    >
                      {translate("historicalSites")}
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
                      name={`tuongdai`}
                      id={`tuongdai`}
                      value={`tuongdai`}
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
                        "https://cdn-icons-png.flaticon.com/128/4926/4926642.png"
                      }
                      alt=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`tuongdai`}
                      style={{
                        margin: 0,
                      }}
                    >
                      {translate("monument")}
                    </label>
                  </div>
                </div>
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
                {translate("anhvetinhlopphu")}
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
                      name={`LC_daknong_tiff`}
                      id={`LC_daknong_tiff`}
                      value={`LC_daknong_tiff`}
                      style={{
                        marginRight: 8,
                      }}
                      onClick={btDiaDiemDuLich}
                    />
                    <img
                      style={{
                        width: 25,
                        height: 25,
                        marginRight: 8,
                      }}
                      src={
                        "https://cdn-icons-png.flaticon.com/128/14106/14106352.png"
                      }
                      alt=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`LC_daknong_tiff`}
                      style={{
                        margin: 0,
                      }}
                    >
                      {translate("anhvetinhlopphu")}
                    </label>
                  </div>
                </div>
                <div
                  className="d-flex align-items-center"
                  style={{ padding: "8px 12px" }}
                >
                  <div className="form-check" style={{ paddingLeft: 0 }}>
                    <img
                      src="http://103.130.212.145:46928/api/public/anhvetinh/z5327157684746_75715c1a873120cc3fb97a411f8f25ad.jpg"
                      alt=""
                    />
                  </div>
                </div>
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
        {isBieuDo && (
          <div
            style={{
              backgroundColor: "#fff",
              padding: 4,
              position: "absolute",
              top: 12,
              right: 50,
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
                {translate("touristFlowChart")}
              </p>
              <button
                type="button"
                // className="close"
                aria-label="Close"
                onClick={() => {
                  setIsBieuDo(false);
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
                paddingLeft: 20,
              }}
            >
              <div
                className="d-flex align-items-center"
                style={{ padding: "8px 12px", flexWrap: "wrap" }}
              >
                <img
                  src="http://103.130.212.145:46928/api/public/bieudo/doanhthu.png"
                  alt=""
                  style={{
                    maxWidth: "100%",
                    marginBottom: 20,
                  }}
                />
                <img
                  src="http://103.130.212.145:46928/api/public/bieudo/khachnoidia.png"
                  alt=""
                  style={{
                    maxWidth: "100%",
                    marginBottom: 20,
                  }}
                />
                <img
                  src="http://103.130.212.145:46928/api/public/bieudo/khachquocte.png"
                  alt=""
                  style={{
                    maxWidth: "100%",
                    marginBottom: 20,
                  }}
                />
                <img
                  src="http://103.130.212.145:46928/api/public/bieudo/nhanluc.png"
                  alt=""
                  style={{
                    maxWidth: "100%",
                    marginBottom: 20,
                  }}
                />
              </div>
            </div>
          </div>
        )}
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

export default BanDoTong;
