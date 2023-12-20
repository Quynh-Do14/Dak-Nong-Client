import './App.css';
import { ROUTE_PATH } from './core/common/appRouter';
import HomePage from './pages/home-page';
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path={ROUTE_PATH.HOME_PAGE} element={<HomePage />} />

          {/* <Route path={ROUTE_PATH.DESTINATION} element={<DestinationPage />} />
          <Route path={ROUTE_PATH.VIEW_DESTINATION} element={<DestinationDetail />} />

          <Route path={ROUTE_PATH.ARTICLE} element={<ArticlePage />} />
          <Route path={ROUTE_PATH.VIEW_ARTICLE} element={<AritcleDetail />} />

          <Route path={ROUTE_PATH.FESTIVAL} element={<FestivalPage />} />
          <Route path={ROUTE_PATH.VIEW_FESTIVAL} element={<FestivalDetail />} />

          <Route path={ROUTE_PATH.SPECIALTY} element={<SpecialtyPage />} />
          <Route path={ROUTE_PATH.VIEW_SPECIALTY} element={<SpecialtyDetail />} /> */}
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
