import "./App.css";
import { ROUTE_PATH } from "./core/common/appRouter";
import HomePage from "./pages/home-page";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import TourPage from "./pages/tour";
import TourDetail from "./pages/tour/view";
import ArticlePage from "./pages/article";
import ArticleDetail from "./pages/article/view";
import FestivalPage from "./pages/festival";
import FestivalDetail from "./pages/festival/view";
import SpecialtyPage from "./pages/specialty";
import SpecialtyDetail from "./pages/specialty/view";
import RecoilOutsideComponent from "./infratructure/recoil-outside/recoil.service";
import { RecoilRoot } from "recoil";
import ExtraComponent from "./pages/extra";
import RestaurantPage from "./pages/restaurant";
import RestaurantDetail from "./pages/restaurant/view";
import HotelPage from "./pages/hotel";
import HotelDetail from "./pages/hotel/view";
import DownLoadPage from "./pages/download-page";
import BanDoTaiNguyenDuLichTuNhien from "./pages/extra/components/BanDoTaiNguyenDuLichTuNhien";
import BanDoTaiNguyenDuLichVanHoa from "./pages/extra/components/BanDoTaiNguyenDuLichVanHoa";
import BanDoTuyenDuLich from "./pages/extra/components/BanDoTuyenDuLich";
import BanDoCoSoVatChatDuLich from "./pages/extra/components/BanDoCoSoVatChatDuLich";
import BanDoAnhVeTinh from "./pages/extra/components/BanDoAnhVeTinh";
import BanDoLopPhu from "./pages/extra/components/BanDoLopPhu";
import BanDoLuongKhachDuLich from "./pages/extra/components/BanDoLuongKhachDuLich";

const RouteRoot = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTE_PATH.HOME_PAGE} element={<HomePage />} />

        <Route path={ROUTE_PATH.TOUR} element={<TourPage />} />
        <Route path={ROUTE_PATH.VIEW_TOUR} element={<TourDetail />} />

        <Route path={ROUTE_PATH.ARTICLE} element={<ArticlePage />} />
        <Route path={ROUTE_PATH.VIEW_ARTICLE} element={<ArticleDetail />} />

        <Route path={ROUTE_PATH.FESTIVAL} element={<FestivalPage />} />
        <Route path={ROUTE_PATH.VIEW_FESTIVAL} element={<FestivalDetail />} />

        <Route path={ROUTE_PATH.SPECIALTY} element={<SpecialtyPage />} />
        <Route path={ROUTE_PATH.VIEW_SPECIALTY} element={<SpecialtyDetail />} />

        <Route path={ROUTE_PATH.RESTAURANT} element={<RestaurantPage />} />
        <Route
          path={ROUTE_PATH.VIEW_RESTAURANT}
          element={<RestaurantDetail />}
        />

        <Route path={ROUTE_PATH.HOTEL} element={<HotelPage />} />
        <Route path={ROUTE_PATH.VIEW_HOTEL} element={<HotelDetail />} />

        <Route path={ROUTE_PATH.LAYOUT_MAP} element={<ExtraComponent />} />

        <Route path={ROUTE_PATH.DOWNLOAD} element={<DownLoadPage />} />

        <Route
          path={`/bandotainguyendulichtunhien`}
          element={<BanDoTaiNguyenDuLichTuNhien />}
        />
        <Route
          path={`/bandotainguyendulichvanhoa`}
          element={<BanDoTaiNguyenDuLichVanHoa />}
        />
        <Route path={`/bandotuyendulich`} element={<BanDoTuyenDuLich />} />

        <Route
          path={`/bandocosovatchatdulich`}
          element={<BanDoCoSoVatChatDuLich />}
        />

        <Route path={`/bandoanhvetinh`} element={<BanDoAnhVeTinh />} />

        <Route path={`/bandolopphu`} element={<BanDoLopPhu />} />

        <Route
          path={`/bandoluongkhachdulich`}
          element={<BanDoLuongKhachDuLich />}
        />

        {/* <Route path={ROUTE_PATH.DESTINATION} element={<DestinationPage />} />
    <Route path={ROUTE_PATH.VIEW_DESTINATION} element={<DestinationDetail />} />
*/}
      </Routes>
    </BrowserRouter>
  );
};
function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <RecoilOutsideComponent />
        <RouteRoot />
      </RecoilRoot>
    </div>
  );
}

export default App;
