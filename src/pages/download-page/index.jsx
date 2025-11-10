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
              href="https://api.bandodulichdaknong.vn/api/public/DuLichDakNong.apk"
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
              target="_blank"
              href="itms-services:///?action=download-manifest&amp;url=https://api.bandodulichdaknong.vn/api/lichtrinh/plistTaiApp"
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
