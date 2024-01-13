import React, { useEffect, useRef, useState } from "react";
import MainLayout from "../../infratructure/common/layout/main-layout";
import BannerCommon from "../../infratructure/common/controls/banner";
import { ROUTE_PATH } from "../../core/common/appRouter";
import LoadingFullPage from "../../infratructure/common/controls/loading";
import { useLocation } from "react-router-dom";
import api from "../../infratructure/api";
import Constants from "../../core/common/constant";
import RelationDestination from "../../infratructure/common/controls/relation-destination";
import {
  showImageCommon,
  translationData,
} from "../../infratructure/utils/helper";
import useTranslate from "../../core/common/hook/useTranslate";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoibnRkMTAxMDIwMDAiLCJhIjoiY2tvbzJ4anl1MDZjMzJwbzNpcnA5NXZpcCJ9.dePfFDv0RlCLnWoDq1zHlw";

const TourDetail = () => {
  const [loading, setLoading] = useState(false);
  const [detailTour, setDetailTour] = useState({});
  const [dsDiaDiemLienQuan, setDiaDiemLienQuan] = useState([]);
  const [tabSelect, setTabSelect] = useState(0);
  const location = useLocation();
  const mapContainer = useRef();

  const [dsDiemDuLich, setDsDiemDuLich] = useState([]);
  const [dsLuuTru, setDsLuuTru] = useState([]);
  const [dsAmThuc, setDsAmThuc] = useState([]);
  const [dsPhuongTien, setDsPhuongTien] = useState([]);
  const [dsDiemDichVu, setDsDiemDichVu] = useState([]);
  const [map, setMap] = useState({});

  const param = location.search.replace("?", "");
  const { translate } = useTranslate();

  const onGetDetailDiemDenAsync = async () => {
    const response = await api.getDiaDiemById(
      `dichvu/top/${param}?idDanhMuc=${Constants.CategoryConfig.Location.value}`,
      setLoading
    );
    setDetailTour(response.diaDiem);
    const responses = await api.getAllDiaDiem(
      `dichvu/top?idDanhMuc=${response.diaDiem.idDanhMuc}&${
        Constants.Params.limit
      }=${3}&idQuanHuyen=${response.diaDiem.idQuanHuyen}`,
      setLoading
    );
    setDiaDiemLienQuan(responses.data.diaDiems);
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

  const fecthData = async () => {
    var dsDiaDiem = [];

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

    dsDiaDiem = [
      ...resGetLuuTruGeometry.features.concat(
        ...resGetAmThucGeometry.features,
        ...resGetPhuongTienGeometry.features
      ),
    ];

    const response = await api.getDiaDiemById(
      `dichvu/top/${param}?idDanhMuc=${Constants.CategoryConfig.Location.value}`,
      setLoading
    );

    if (response) {
      var dsDiaDiemSearch = [];
      dsDiaDiemSearch = filterByDistance(
        dsDiaDiem,
        response.diaDiem.lat,
        response.diaDiem.long,
        15
      );

      console.log("dsDiaDiemSearch", dsDiaDiemSearch);

      setDsDiemDichVu(dsDiaDiemSearch);

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
          zoom: 11,
          center: [response.diaDiem.long, response.diaDiem.lat],
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
              uriImg =
                "https://cdn-icons-png.flaticon.com/512/5778/5778440.png";
            }
            if (
              v.tenDanhMuc == "Địa điểm tâm linh" &&
              dataDsDiaDiemGeoJson.features.filter(
                (v) => v.properties.tenDanhMuc == "Địa điểm tâm linh"
              ).length > 0
            ) {
              uriImg =
                "https://cdn-icons-png.flaticon.com/512/2510/2510482.png";
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
                "https://cdn-icons-png.flaticon.com/512/3104/3104941.png";
            }
            if (
              v.tenDanhMuc == "Du lịch nghỉ dưỡng" &&
              dataDsDiaDiemGeoJson.features.filter(
                (v) => v.properties.tenDanhMuc == "Du lịch nghỉ dưỡng"
              ).length > 0
            ) {
              uriImg =
                "https://cdn-icons-png.flaticon.com/512/5273/5273660.png";
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
              uriImg =
                "https://cdn-icons-png.flaticon.com/512/1205/1205756.png";
            }
            if (
              v.tenDanhMuc == "Khu bảo tồn" &&
              dataDsDiaDiemGeoJson.features.filter(
                (v) => v.properties.tenDanhMuc == "Khu bảo tồn"
              ).length > 0
            ) {
              uriImg =
                "https://cdn-icons-png.flaticon.com/512/3937/3937245.png";
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
              uriImg =
                "https://cdn-icons-png.flaticon.com/512/7059/7059852.png";
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
              uriImg =
                "https://cdn-icons-png.flaticon.com/512/4287/4287725.png";
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
              uriImg =
                "https://cdn-icons-png.flaticon.com/512/1986/1986937.png";
            }
            if (
              v.tenDanhMuc == "Xe đạp" &&
              dataDsPhuongTienGeoJson.features.filter(
                (v) => v.properties.tenDanhMuc == "Xe đạp"
              ).length > 0
            ) {
              uriImg =
                "https://cdn-icons-png.flaticon.com/512/2972/2972185.png";
            }
            if (
              v.tenDanhMuc == "Ô tô" &&
              dataDsPhuongTienGeoJson.features.filter(
                (v) => v.properties.tenDanhMuc == "Ô tô"
              ).length > 0
            ) {
              uriImg =
                "https://cdn-icons-png.flaticon.com/512/2554/2554936.png";
            }
            if (
              v.tenDanhMuc == "Xe điện" &&
              dataDsPhuongTienGeoJson.features.filter(
                (v) => v.properties.tenDanhMuc == "Xe điện"
              ).length > 0
            ) {
              uriImg =
                "https://cdn-icons-png.flaticon.com/512/1574/1574055.png";
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
            data: `http://14.248.94.155:46928/api/quanHuyen/ranhGioiHuyen`,
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
            data: `http://14.248.94.155:46928/api/quanHuyen/ranhGioiTinh`,
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
            data: {
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  properties: response.diaDiem,
                  geometry: {
                    coordinates: [response.diaDiem.long, response.diaDiem.lat],
                    type: "Point",
                  },
                },
              ],
            },
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

              map.on(
                "mouseenter",
                `poi-${feature.properties.idDanhMuc}`,
                () => {
                  map.getCanvas().style.cursor = "pointer";
                }
              );

              map.on(
                "mouseleave",
                `poi-${feature.properties.idDanhMuc}`,
                () => {
                  map.getCanvas().style.cursor = "";
                }
              );
            }
          }

          map.addSource("luuTru", {
            type: "geojson",
            data: `http://14.248.94.155:46928/api/diaDiem/getAllDiemLuuTruBanDo`,
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

              map.on(
                "mouseenter",
                `poi-${feature.properties.idDanhMuc}`,
                () => {
                  map.getCanvas().style.cursor = "pointer";
                }
              );

              map.on(
                "mouseleave",
                `poi-${feature.properties.idDanhMuc}`,
                () => {
                  map.getCanvas().style.cursor = "";
                }
              );
            }
          }

          map.addSource("amThuc", {
            type: "geojson",
            data: `http://14.248.94.155:46928/api/diaDiem/getAllDiemAmThucBanDo`,
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

              map.on(
                "mouseenter",
                `poi-${feature.properties.idDanhMuc}`,
                () => {
                  map.getCanvas().style.cursor = "pointer";
                }
              );

              map.on(
                "mouseleave",
                `poi-${feature.properties.idDanhMuc}`,
                () => {
                  map.getCanvas().style.cursor = "";
                }
              );
            }
          }

          map.addSource("phuongTien", {
            type: "geojson",
            data: `http://14.248.94.155:46928/api/diaDiem/getAllDiemPhuongTienBanDo`,
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

              map.on(
                "mouseenter",
                `poi-${feature.properties.idDanhMuc}`,
                () => {
                  map.getCanvas().style.cursor = "pointer";
                }
              );

              map.on(
                "mouseleave",
                `poi-${feature.properties.idDanhMuc}`,
                () => {
                  map.getCanvas().style.cursor = "";
                }
              );
            }
          }
        });
      }
    }
  };

  useEffect(() => {
    onGetDetailDiemDenAsync().then((_) => {});
    fecthData();
  }, []);

  return (
    <MainLayout className={"bg-white"}>
      <BannerCommon
        title={translationData(detailTour.tenDiaDiem, detailTour.tenDiaDiemUS)}
        redirect={ROUTE_PATH.TOUR}
        redirectPage={"Tour"}
        currentPage={"detail"}
      />
      <section className="package-details">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="package-details-left-container">
                <div className="package-tab">
                  <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                      {Constants.TabDetailTour.list.map((it, index) => (
                        <button
                          key={index}
                          onClick={() => setTabSelect(index)}
                          className={`nav-link ${
                            tabSelect == index ? "active" : ""
                          }`}
                          id="nav-home-tab"
                          type="button"
                          role="tab"
                        >
                          <i className={`${it.icon} mr-10`}></i>
                          {translate(it.name)}{" "}
                        </button>
                      ))}
                    </div>
                  </nav>
                  <div className="tab-content mb-20" id="nav-tabContent">
                    {tabSelect === 0 ? (
                      <div
                        className="tab-pane fade show active"
                        id="nav-home"
                        role="tabpanel"
                        aria-labelledby="nav-home-tab"
                        tabindex="0"
                      >
                        <div className="pkg-nav-contant">
                          <img
                            src={
                              detailTour.hinhAnh?.indexOf("http") == -1
                                ? showImageCommon(detailTour.hinhAnh)
                                : detailTour.hinhAnh
                            }
                            alt="img"
                            className=""
                          />
                        </div>
                      </div>
                    ) : tabSelect === 1 && detailTour.uriVideo ? (
                      <div
                        className="tab-pane fade show active"
                        id="nav-home"
                        role="tabpanel"
                        aria-labelledby="nav-home-tab"
                        tabindex="0"
                      >
                        <div className="pkg-nav-contant">
                          <div className="nav-list">
                            <video style={{ width: "100%" }} controls>
                              <source
                                src={detailTour.uriVideo}
                                type="video/mp4"
                              />
                            </video>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="tab-pane fade show active"
                        id="nav-home"
                        role="tabpanel"
                        aria-labelledby="nav-home-tab"
                        tabindex="0"
                      >
                        <div className="pkg-nav-contant">
                          <img
                            src={
                              detailTour.hinhAnh?.indexOf("http") == -1
                                ? showImageCommon(detailTour.hinhAnh)
                                : detailTour.hinhAnh
                            }
                            alt="img"
                            className=""
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pkg-common-title">
                  <h4>{translate("detail")} </h4>
                </div>
                <p className="text-align-justify">
                  {translationData(detailTour.moTa, detailTour.moTaUS)}{" "}
                </p>

                <div className="pkg-list-info">
                  <ul>
                    <li>
                      <h6>{translate("destination")} :</h6>{" "}
                      <span>
                        {translationData(
                          detailTour.tenDiaDiem,
                          detailTour.tenDiaDiemUS
                        )}
                      </span>
                    </li>
                    <li>
                      <h6>{translate("type")} :</h6>{" "}
                      <span>{translate(detailTour.tenDanhMuc)}</span>
                    </li>
                    <li>
                      <h6>{translate("address")} :</h6>{" "}
                      <span>
                        {translationData(
                          detailTour.diaChi,
                          detailTour.diaChiUS
                        )}
                      </span>
                    </li>
                    <li>
                      <h6>{translate("price")} :</h6>{" "}
                      <span>
                        {detailTour.giaVe === Constants.FreePrice
                          ? translationData(
                              detailTour.giaVe,
                              detailTour.giaVeUS
                            )
                          : detailTour.giaVe == null
                          ? translate("free")
                          : `Chỉ từ: ${detailTour.giaVe}`}
                      </span>
                    </li>
                    <li>
                      <h6>{translate("openTime")} :</h6>{" "}
                      <span>
                        {detailTour.gioMoCua} - {detailTour.gioDongCua}
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="pkg-info-container">
                  <ul>
                    <li className="d-flex align-items-center">
                      <div className="mr-10">
                        <i className="fa fa-star"></i>
                      </div>
                      <div>{detailTour.soSaoTrungBinh}</div>
                    </li>
                    <li className="d-flex align-items-center">
                      <div className="mr-10">
                        <i className="fa fa-eye"></i>
                      </div>
                      <div>
                        ({detailTour.luotXem} {translate("view")}){" "}
                      </div>
                    </li>
                    <li className="d-flex align-items-center">
                      <div className="mr-10">
                        <i className="fa fa-wifi"></i>
                      </div>
                      <div>Wi-fi</div>
                    </li>
                  </ul>
                  <ul>
                    <li className="d-flex align-items-center">
                      <div className="mr-10">
                        <i className="fa fa-gear"></i>
                      </div>
                      <div>{translate("serviceAttentive")} </div>
                    </li>
                    <li className="d-flex align-items-center">
                      <div className="mr-10">
                        <i className="fa fa-car"></i>
                      </div>
                      <div>{translate("transportation")} </div>
                    </li>
                  </ul>
                </div>

                {/* <div className="faq-accordion ">
                                    <div className="accordion" id="accordionExample">
                                        <div className="accordion-item">
                                            <h4 className="accordion-header" id="headingOne">
                                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                    Why are your tours so expensive?
                                                </button>
                                            </h4>
                                            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                <div className="accordion-body">
                                                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some injected or words which don’t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn’t anything embarrassing hidden in the middle of text.
                                                </div>
                                            </div>
                                        </div>

                                        <div className="accordion-item">
                                            <h4 className="accordion-header" id="headingTwo">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                    How will contact with us?
                                                </button>
                                            </h4>
                                            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                                <div className="accordion-body">
                                                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some injected or words which don’t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn’t anything embarrassing hidden in the middle of text.
                                                </div>
                                            </div>
                                        </div>

                                        <div className="accordion-item">
                                            <h4 className="accordion-header" id="headingThree">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                    How to book the new tour for 2 persons?
                                                </button>
                                            </h4>
                                            <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                                <div className="accordion-body">
                                                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some injected or words which don’t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn’t anything embarrassing hidden in the middle of text.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                <div
                  style={{
                    width: "100%",
                    height: 500,
                  }}
                  ref={mapContainer}
                ></div>

                <RelationDestination
                  title={translate("relatedSchedule")}
                  data={dsDiaDiemLienQuan}
                />
              </div>
            </div>

            {/* <div className="col-lg-4">
                            <div className="package-details-right-container">
                                <div className="destination-common-title">
                                    <h4>{translate("makeReservation")}</h4>
                                </div>

                                <div className="package-details-right-form">
                                    <form>
                                        <div className="form-label">
                                            <label><i className="fa fa-pencil"></i></label>
                                            <input type="text" placeholder="Họ và tên *" required />
                                        </div>
                                        <div className="form-label">
                                            <label><i className="fa fa-envelope"></i></label>
                                            <input type="email" placeholder="Email *" required />
                                        </div>
                                        <div className="form-label">
                                            <label><i className="fa fa-phone"></i></label>
                                            <input type="text" placeholder="SĐT" />
                                        </div>
                                        <div className="form-label">
                                            <label><i className="fa fa-calendar"></i></label>
                                            <input type="text" placeholder="Check - In" />
                                        </div>
                                        <div className="form-label">
                                            <label><i className="fa fa-calendar"></i></label>
                                            <input type="text" placeholder="Check - Out" />
                                        </div>
                                        <div className="form-label">
                                            <label><i className="fa fa-user"></i></label>
                                            <input type="text" placeholder="Số người" />
                                        </div>
                                        <div className="form-label">
                                            <label><i className="fa fa-pencil"></i></label>
                                            <input type="text" placeholder="Số vé *" required />
                                        </div>
                                        <div className="form-label">
                                            <label><i className="fa fa-circle-question"></i></label>
                                            <input type="text" placeholder="Ghi chú" />
                                        </div>
                                        <button type="submit">Đăng kí</button>
                                    </form>
                                </div>
                            </div>
                        </div> */}
          </div>
        </div>
      </section>
      <LoadingFullPage loading={loading} />
    </MainLayout>
  );
};

export default TourDetail;
