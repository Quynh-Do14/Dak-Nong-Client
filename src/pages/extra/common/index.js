import MapboxDark from "../../../asset/img/extra-map/Mapbox-Dark.png";
import MapboxLight from "../../../asset/img/extra-map/Mapbox-Light.png";
import MapboxNavigationDay from "../../../asset/img/extra-map/Mapbox-Navigation-Day.png";
import MapboxNavigationNight from "../../../asset/img/extra-map/Mapbox-Navigation-Night.png";
import MaxboxOutdoors from "../../../asset/img/extra-map/Mapbox-Outdoors.png";
import MapboxSatelliteStreets from "../../../asset/img/extra-map/Mapbox-Satellite-Streets.png";
import MapboxSatellite from "../../../asset/img/extra-map/Mapbox-Satellite.png";
import MapboxStreets from "../../../asset/img/extra-map/Mapbox-Streets.png";


export function removeDiacriticsAndSpaces(inputString) {
  // Loại bỏ dấu và chuyển thành chữ thường
  const strippedString = inputString
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  // Loại bỏ khoảng trắng và thay thế bằng dấu gạch ngang
  const result = strippedString.replace(/\s+/g, "");

  return result;
}

export const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export const DSSTYLEBANDO = [
  {
    name: "Streets",
    img: MapboxStreets,
    uri: "mapbox://styles/mapbox/streets-v12",
    select: true,
  },
  {
    name: "Outdoors",
    img: MaxboxOutdoors,
    uri: "mapbox://styles/mapbox/outdoors-v12",
    select: false,
  },
  {
    name: "Light",
    img: MapboxLight,
    uri: "mapbox://styles/mapbox/light-v11",
    select: false,
  },
  {
    name: "Dark",
    img: MapboxDark,
    uri: "mapbox://styles/mapbox/dark-v11",
    select: false,
  },
  {
    name: "Satellite",
    img: MapboxSatellite,
    uri: "mapbox://styles/mapbox/satellite-v9",
    select: false,
  },
  {
    name: "Satellite Streets",
    img: MapboxSatelliteStreets,
    uri: "mapbox://styles/mapbox/satellite-streets-v12",
    select: false,
  },
  {
    name: "Navigation Day",
    img: MapboxNavigationDay,
    uri: "mapbox://styles/mapbox/navigation-day-v1",
    select: false,
  },
  {
    name: "Navigation Night",
    img: MapboxNavigationNight,
    uri: "mapbox://styles/mapbox/navigation-night-v1",
    select: false,
  },
];

export function formatDate(date) {
  // Lấy thông tin năm, tháng và ngày từ đối tượng Date
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Thêm '0' ở đầu nếu tháng chỉ có một chữ số
  const day = String(date.getDate()).padStart(2, '0'); // Thêm '0' ở đầu nếu ngày chỉ có một chữ số

  // Tạo chuỗi ngày dạng "YYYY-MM-DD"
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

export function getPreviousDay(date) {
  // Tạo một bản sao của đối tượng Date để tránh thay đổi giá trị của đối tượng gốc
  const previousDay = new Date(date);

  // Giảm giá trị ngày của đối tượng Date
  previousDay.setDate(date.getDate() - 10);

  // Kiểm tra nếu giá trị ngày là 0, chuyển đến ngày cuối cùng của tháng trước đó
  if (previousDay.getDate() <= 0) {
      previousDay.setMonth(previousDay.getMonth() - 1);
      previousDay.setDate(new Date(previousDay.getFullYear(), previousDay.getMonth() + 1, 0).getDate());
  }

  return previousDay;
}

