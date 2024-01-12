import { Endpoint } from "../../core/common/appRouter";
// import request from "./makeRequest";
import * as apiLinks from "../../core/common/apiLinks";
import request from "./makeRequest";

const api = {
  login: (data, callBack, setLoading) =>
    request.login(
      `${apiLinks.API}${Endpoint.Auth.Login}`,
      data,
      callBack,
      setLoading,
      "Đăng nhập"
    ),

  register: (data, callBack, setLoading) =>
    request.login(
      `${apiLinks.API}${Endpoint.Auth.Register}`,
      data,
      callBack,
      setLoading,
      "Đăng kí"
    ),

  // upload: (data, setLoading) =>
  //   requestDuong.postUploadFile(
  //     `${apiLinks.API}${Endpoint.Module.Upload}`,
  //     data,
  //     setLoading
  //   ),

  ////// map
  // getDiaDiemGeometry: (params) =>
  //   requestDuong.get(
  //     `${apiLinks.API}${Endpoint.Module.DiaDiem}/geometry?${params}`
  //   ),
  getDanhMucConCuaDanhMuc: (params, setLoading) =>
    request.get(
      `${apiLinks.API}${Endpoint.Module.DiaDiem}/getDanhMucConCuaDanhMuc?${params}`,
      setLoading
    ),
  //////
  getAllDiaDiem: (params, setLoading) =>
    request.get(
      `${apiLinks.API}${Endpoint.Module.DiaDiem}/${params}`,
      setLoading
    ),
  getAllDiaDiemBanDo: (params, setLoading) =>
    request.get(
      `${apiLinks.API}${Endpoint.Module.DiaDiem}/getAllDiaDiemBanDo?${params}`,
      setLoading
    ),
  getAllDiemLuuTruBanDo: (params, setLoading) =>
    request.get(
      `${apiLinks.API}${Endpoint.Module.DiaDiem}/getAllDiemLuuTruBanDo?${params}`,
      setLoading
    ),
  getAllDiemAmThucBanDo: (params, setLoading) =>
    request.get(
      `${apiLinks.API}${Endpoint.Module.DiaDiem}/getAllDiemAmThucBanDo?${params}`,
      setLoading
    ),
  getAllDiemPhuongTienBanDo: (params, setLoading) =>
    request.get(
      `${apiLinks.API}${Endpoint.Module.DiaDiem}/getAllDiemPhuongTienBanDo?${params}`,
      setLoading
    ),

  getDiaDiemById: (params, setLoading) =>
    request.get(
      `${apiLinks.API}${Endpoint.Module.DiaDiem}/${params}`,
      setLoading
    ),

  danhGiaDiaDiem: (data, callBack, setLoading) => {
    request.post(
      `${apiLinks.API}${Endpoint.Module.Evaluate}/diadiem`,
      data,
      callBack,
      setLoading
    );
  },
  getAllDanhGiaDiaDiem: (params, setLoading) =>
    request.get(
      `${apiLinks.API}${Endpoint.Module.Evaluate}?${params}`,
      setLoading
    ),
  ///////

  //////
  getAllTinTuc: (params, setLoading) =>
    request.get(
      `${apiLinks.API}${Endpoint.Module.TinTuc}/${params}`,
      setLoading
    ),
  getTinTucById: (params, setLoading) =>
    request.get(
      `${apiLinks.API}${Endpoint.Module.TinTuc}/${params.id}`,
      setLoading
    ),
  ///////
  getAllQuanHuyen: (params, setLoading) =>
    request.get(`${apiLinks.API}${Endpoint.Module.District}`, setLoading),

  getHinhAnhByIdDiaDiem: (params, setLoading) =>
    request.get(
      `${apiLinks.API}${Endpoint.Module.Files}?idDiaDiem=${params}`,
      setLoading
    ),
  xemAnhVeTinh: (params, setLoading) =>
    request.get(`${apiLinks.API}/gee/xemAnhVeTinh?${params}`, setLoading),
};
export default api;
