import React from "react";
import "../../asset/css/download-page.css";
const DownLoadPage = () => {
  return (
    <section className="bg-white">
      <div className="download-page">
        <div className="container">
          <h1 className="title">Tải ứng dụng </h1>
          <div className="btn-part">
            <a
              href="http://103.130.212.145:46928/api/public/DuLichDakNong.apk"
              className="btn-download d-flex align-items-center justify-content-center"
            >
              <div>
                <i
                  className="fa fa-android icon-download"
                  aria-hidden="true"
                ></i>
              </div>
              <div className="name-btn">Dành cho Android</div>
            </a>
            <a
              href="itms-services:///?action=download-manifest&amp;amp;url=https://drive.ekgis.vn/AppMobile/CayXanhCu.plist"
              className="btn-download d-flex align-items-center justify-content-center"
            >
              <div>
                <i className="fa fa-apple icon-download" aria-hidden="true"></i>
              </div>
              <div className="name-btn">Dành cho IOS</div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownLoadPage;
