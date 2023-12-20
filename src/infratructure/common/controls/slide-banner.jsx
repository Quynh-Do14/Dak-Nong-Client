import React from 'react';
import slide from "../../../asset/img/slide-banner.jpg";
import slide1 from "../../../asset/img/slide-banner2.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '../../../core/common/appRouter';
const dataImg = [
    { img: slide },
    { img: slide1 }
]
const SlideBanner = () => {
    const navigate = useNavigate();

    const onNavigate = () => {
        // navigate(ROUTE_PATH.DESTINATION)
    }


    return (
        // <section className="banner">
        //     <div className="banner-icon1">
        //         <img src="assets/images/icons/banner-icon-01.png" alt="icon" />
        //     </div>
        //     <div className="banner-icon2">
        //         <img src="assets/images/icons/banner-icon-02.png" alt="icon" />
        //     </div>
        //     <div className="pattern-layer" style={{ backgroundImage: "url(assets/images/shape/map.png)" }}></div>

        //     <div className="banner-carousel owl-theme owl-carousel">
        //         <div className="slide-item">
        //             <div className="container">
        //                 <div className="row">
        //                     <div className="col-lg-6">
        //                         <div className="banner-slide">
        //                             <div className="banner-content">
        //                                 <div className="banner-content-wrapper">
        //                                     <div className="banner-content-wrapper-inner">
        //                                         <h4>Explore the World</h4>
        //                                         <h2>Find your perfect <br />
        //                                             Tour at <span>travil!
        //                                                 <svg className="banner-text-shape" width="247" height="38" viewBox="0 0 247 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        //                                                     <path id="signature1" d="M3.18577 22.2125C3.18577 22.2125 155.675 -3.21963 241.039 14.2277" stroke="#FE7524" stroke-width="5" stroke-linecap="round" />
        //                                                     <path id="signature2" d="M3.55141 17.792C3.55141 17.792 158.876 1.54075 243.929 23.8236" stroke="#FE7524" stroke-width="5" stroke-linecap="round" />
        //                                                 </svg>
        //                                             </span>
        //                                         </h2>
        //                                         <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantiumtheresr doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto.</p>
        //                                         <div className="banner-btn-media">
        //                                             <div className="header-link-btn"><a href="tour-package.html" className="btn-1"> Book Now<span></span></a></div>
        //                                             <div className="banner-media">
        //                                                 <ul>
        //                                                     <li><a href="#">
        //                                                         <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        //                                                             <g clip-path="url(#clip0_47_244)">
        //                                                                 <path className="bannar-inastagram" d="M18.2327 0H6.76726C3.03573 0 0 3.03573 0 6.76726V18.2329C0 21.9642 3.03573 25 6.76726 25H18.2329C21.9642 25 25 21.9642 25 18.2329V6.76726C25 3.03573 21.9642 0 18.2327 0V0ZM12.5 19.3357C8.73068 19.3357 5.66424 16.2693 5.66424 12.5C5.66424 8.73068 8.73068 5.66424 12.5 5.66424C16.2693 5.66424 19.3357 8.73068 19.3357 12.5C19.3357 16.2693 16.2693 19.3357 12.5 19.3357ZM19.4992 7.27633C18.3853 7.27633 17.4793 6.37034 17.4793 5.25645C17.4793 4.14256 18.3853 3.23638 19.4992 3.23638C20.6131 3.23638 21.5192 4.14256 21.5192 5.25645C21.5192 6.37034 20.6131 7.27633 19.4992 7.27633Z" fill="#FE7524" />
        //                                                                 <path className="bannar-inastagram" d="M12.5 7.12988C9.53899 7.12988 7.12982 9.53886 7.12982 12.5C7.12982 15.461 9.53899 17.8701 12.5 17.8701C15.4611 17.8701 17.8701 15.461 17.8701 12.5C17.8701 9.53886 15.4611 7.12988 12.5 7.12988Z" fill="#FE7524" />
        //                                                                 <path className="bannar-inastagram" d="M19.4992 4.70215C19.1936 4.70215 18.9449 4.95087 18.9449 5.25642C18.9449 5.56198 19.1936 5.8107 19.4992 5.8107C19.8049 5.8107 20.0536 5.56217 20.0536 5.25642C20.0536 4.95068 19.8049 4.70215 19.4992 4.70215Z" fill="#FE7524" />
        //                                                             </g>
        //                                                             <defs>
        //                                                                 <clipPath id="clip0_47_244">
        //                                                                     <rect width="25" height="25" fill="white" />
        //                                                                 </clipPath>
        //                                                             </defs>
        //                                                         </svg>
        //                                                     </a>
        //                                                     </li>
        //                                                     <li><a href="#"><i className="fa-brands fa-twitter"></i></a></li>
        //                                                     <li><a href="#"><i className="fa-brands fa-linkedin"></i></a></li>
        //                                                     <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
        //                                                 </ul>
        //                                             </div>
        //                                         </div>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>

        //                     <div className="col-lg-6">
        //                         <div className="banner-right-content">
        //                             <div className="banner-right-image">
        //                                 <img src="assets/images/banner/banner-right-image.png" alt="banner-two-image" />
        //                             </div>
        //                             <div className="border-image">
        //                                 <img src="assets/images/shape/border-image.png" alt="border" />
        //                             </div>
        //                             <div className="banner-plane">
        //                                 <img src="assets/images/shape/banner-plan.png" alt="plan" />
        //                             </div>
        //                             <div className="banner-car">
        //                                 <img src="assets/images/shape/banner-car.png" alt="car" />
        //                             </div>
        //                             <div className="banner-vedio">
        //                                 <div className="banner-vedio-image">
        //                                     <img src="assets/images/banner/banner-vedio-image.png" alt="" />
        //                                     <div className="missiom-video-btn">
        //                                         <a href="https://www.youtube.com/watch?v=kS0X-yIsB64" target="_blank" className="hv-popup-link"><i className="fas fa-play"></i></a>
        //                                     </div>
        //                                 </div>
        //                                 <div className="banner-blank1"></div>
        //                                 <div className="banner-blank2"></div>
        //                             </div>
        //                             <div className="banner-track">
        //                                 <h5>track the tour</h5>
        //                                 <div className="banner-track-image">
        //                                     <img src="assets/images/banner/banner-track-image.png" alt="img" />
        //                                     <div className="banner-track-shape">
        //                                         <img src="assets/images/shape/banner-track-shape.png" alt="tracker" />
        //                                         <div className="location">
        //                                             <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        //                                                 <g clip-path="url(#clip0_44_165)">
        //                                                     <path d="M13.4429 0.5C8.4505 0.5 4.38888 4.56162 4.38888 9.554C4.38888 15.7497 12.4914 24.8454 12.8363 25.2295C13.1604 25.5904 13.7261 25.5898 14.0495 25.2295C14.3945 24.8454 22.497 15.7497 22.497 9.554C22.4969 4.56162 18.4353 0.5 13.4429 0.5ZM13.4429 23.436C10.716 20.1968 6.01935 13.8062 6.01935 9.5541C6.01935 5.46064 9.34952 2.13047 13.4429 2.13047C17.5363 2.13047 20.8665 5.46064 20.8665 9.55405C20.8665 13.8064 16.1705 20.1958 13.4429 23.436Z" fill="#FE7524" />
        //                                                     <path d="M13.4429 4.99878C10.9311 4.99878 8.88766 7.04228 8.88766 9.5541C8.88766 12.0659 10.9312 14.1094 13.4429 14.1094C15.9547 14.1094 17.9982 12.0659 17.9982 9.5541C17.9982 7.04228 15.9547 4.99878 13.4429 4.99878ZM13.4429 12.479C11.8301 12.479 10.5181 11.1669 10.5181 9.5541C10.5181 7.94131 11.8302 6.62925 13.4429 6.62925C15.0557 6.62925 16.3677 7.94131 16.3677 9.5541C16.3677 11.1669 15.0557 12.479 13.4429 12.479Z" fill="#FE7524" />
        //                                                 </g>
        //                                                 <defs>
        //                                                     <clipPath id="clip0_44_165">
        //                                                         <rect width="25" height="25" fill="white" transform="translate(0.942932 0.5)" />
        //                                                     </clipPath>
        //                                                 </defs>
        //                                             </svg>
        //                                         </div>
        //                                     </div>

        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //         <div className="slide-item">
        //             <div className="container">
        //                 <div className="row">
        //                     <div className="col-lg-6">
        //                         <div className="banner-slide">
        //                             <div className="banner-content">
        //                                 <div className="banner-content-wrapper">
        //                                     <div className="banner-content-wrapper-inner">
        //                                         <h4>Explore the World</h4>
        //                                         <h2>Find your perfect <br />
        //                                             Tour at <span>travil!
        //                                                 <svg className="banner-text-shape" width="247" height="38" viewBox="0 0 247 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        //                                                     <path id="signature3" d="M3.18577 22.2125C3.18577 22.2125 155.675 -3.21963 241.039 14.2277" stroke="#FE7524" stroke-width="5" stroke-linecap="round" />
        //                                                     <path id="signature4" d="M3.55141 17.792C3.55141 17.792 158.876 1.54075 243.929 23.8236" stroke="#FE7524" stroke-width="5" stroke-linecap="round" />
        //                                                 </svg>
        //                                             </span>
        //                                         </h2>
        //                                         <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantiumtheresr doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto.</p>
        //                                         <div className="banner-btn-media">
        //                                             <div className="btn-group">
        //                                                 <div className="header-link-btn"><a href="tour-package.html" className="btn-1"> Book Now<span></span></a></div>
        //                                             </div>
        //                                             <div className="banner-media">
        //                                                 <ul>
        //                                                     <li><a href="#">
        //                                                         <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        //                                                             <g clip-path="url(#clip0_47_244)">
        //                                                                 <path className="bannar-inastagram" d="M18.2327 0H6.76726C3.03573 0 0 3.03573 0 6.76726V18.2329C0 21.9642 3.03573 25 6.76726 25H18.2329C21.9642 25 25 21.9642 25 18.2329V6.76726C25 3.03573 21.9642 0 18.2327 0V0ZM12.5 19.3357C8.73068 19.3357 5.66424 16.2693 5.66424 12.5C5.66424 8.73068 8.73068 5.66424 12.5 5.66424C16.2693 5.66424 19.3357 8.73068 19.3357 12.5C19.3357 16.2693 16.2693 19.3357 12.5 19.3357ZM19.4992 7.27633C18.3853 7.27633 17.4793 6.37034 17.4793 5.25645C17.4793 4.14256 18.3853 3.23638 19.4992 3.23638C20.6131 3.23638 21.5192 4.14256 21.5192 5.25645C21.5192 6.37034 20.6131 7.27633 19.4992 7.27633Z" fill="#FE7524" />
        //                                                                 <path className="bannar-inastagram" d="M12.5 7.12988C9.53899 7.12988 7.12982 9.53886 7.12982 12.5C7.12982 15.461 9.53899 17.8701 12.5 17.8701C15.4611 17.8701 17.8701 15.461 17.8701 12.5C17.8701 9.53886 15.4611 7.12988 12.5 7.12988Z" fill="#FE7524" />
        //                                                                 <path className="bannar-inastagram" d="M19.4992 4.70215C19.1936 4.70215 18.9449 4.95087 18.9449 5.25642C18.9449 5.56198 19.1936 5.8107 19.4992 5.8107C19.8049 5.8107 20.0536 5.56217 20.0536 5.25642C20.0536 4.95068 19.8049 4.70215 19.4992 4.70215Z" fill="#FE7524" />
        //                                                             </g>
        //                                                             <defs>
        //                                                                 <clipPath id="clip0_47_244">
        //                                                                     <rect width="25" height="25" fill="white" />
        //                                                                 </clipPath>
        //                                                             </defs>
        //                                                         </svg>
        //                                                     </a>
        //                                                     </li>
        //                                                     <li><a href="#"><i className="fa-brands fa-twitter"></i></a></li>
        //                                                     <li><a href="#"><i className="fa-brands fa-linkedin"></i></a></li>
        //                                                     <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
        //                                                 </ul>
        //                                             </div>
        //                                         </div>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>

        //                     <div className="col-lg-6">
        //                         <div className="banner-right-content">
        //                             <div className="banner-right-image">
        //                                 <img src="assets/images/banner/banner-right-image.png" alt="banner-two-image" />
        //                             </div>
        //                             <div className="border-image">
        //                                 <img src="assets/images/shape/border-image.png" alt="border" />
        //                             </div>
        //                             <div className="banner-plane">
        //                                 <img src="assets/images/shape/banner-plan.png" alt="plan" />
        //                             </div>
        //                             <div className="banner-car">
        //                                 <img src="assets/images/shape/banner-car.png" alt="car" />
        //                             </div>
        //                             <div className="banner-vedio">
        //                                 <div className="banner-vedio-image">
        //                                     <img src="assets/images/banner/banner-vedio-image.png" alt="" />
        //                                     <div className="missiom-video-btn">
        //                                         <a href="https://www.youtube.com/watch?v=kS0X-yIsB64" target="_blank" className="hv-popup-link"><i className="fas fa-play"></i></a>
        //                                     </div>
        //                                 </div>
        //                                 <div className="banner-blank1"></div>
        //                                 <div className="banner-blank2"></div>
        //                             </div>
        //                             <div className="banner-track">
        //                                 <h5>track the tour</h5>
        //                                 <div className="banner-track-image">
        //                                     <img src="assets/images/banner/banner-track-image.png" alt="img" />
        //                                     <div className="banner-track-shape">
        //                                         <img src="assets/images/shape/banner-track-shape.png" alt="tracker" />
        //                                         <div className="location">
        //                                             <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        //                                                 <g clip-path="url(#clip0_44_165)">
        //                                                     <path d="M13.4429 0.5C8.4505 0.5 4.38888 4.56162 4.38888 9.554C4.38888 15.7497 12.4914 24.8454 12.8363 25.2295C13.1604 25.5904 13.7261 25.5898 14.0495 25.2295C14.3945 24.8454 22.497 15.7497 22.497 9.554C22.4969 4.56162 18.4353 0.5 13.4429 0.5ZM13.4429 23.436C10.716 20.1968 6.01935 13.8062 6.01935 9.5541C6.01935 5.46064 9.34952 2.13047 13.4429 2.13047C17.5363 2.13047 20.8665 5.46064 20.8665 9.55405C20.8665 13.8064 16.1705 20.1958 13.4429 23.436Z" fill="#FE7524" />
        //                                                     <path d="M13.4429 4.99878C10.9311 4.99878 8.88766 7.04228 8.88766 9.5541C8.88766 12.0659 10.9312 14.1094 13.4429 14.1094C15.9547 14.1094 17.9982 12.0659 17.9982 9.5541C17.9982 7.04228 15.9547 4.99878 13.4429 4.99878ZM13.4429 12.479C11.8301 12.479 10.5181 11.1669 10.5181 9.5541C10.5181 7.94131 11.8302 6.62925 13.4429 6.62925C15.0557 6.62925 16.3677 7.94131 16.3677 9.5541C16.3677 11.1669 15.0557 12.479 13.4429 12.479Z" fill="#FE7524" />
        //                                                 </g>
        //                                                 <defs>
        //                                                     <clipPath id="clip0_44_165">
        //                                                         <rect width="25" height="25" fill="white" transform="translate(0.942932 0.5)" />
        //                                                     </clipPath>
        //                                                 </defs>
        //                                             </svg>
        //                                         </div>
        //                                     </div>

        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //         <div className="slide-item">
        //             <div className="container">
        //                 <div className="row">
        //                     <div className="col-lg-6">
        //                         <div className="banner-slide">
        //                             <div className="banner-content">
        //                                 <div className="banner-content-wrapper">
        //                                     <div className="banner-content-wrapper-inner">
        //                                         <h4>Explore the World</h4>
        //                                         <h2>Find your perfect <br />
        //                                             Tour at <span>travil!
        //                                                 <svg className="banner-text-shape" width="247" height="38" viewBox="0 0 247 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        //                                                     <path id="signature5" d="M3.18577 22.2125C3.18577 22.2125 155.675 -3.21963 241.039 14.2277" stroke="#FE7524" stroke-width="5" stroke-linecap="round" />
        //                                                     <path id="signature6" d="M3.55141 17.792C3.55141 17.792 158.876 1.54075 243.929 23.8236" stroke="#FE7524" stroke-width="5" stroke-linecap="round" />
        //                                                 </svg>
        //                                             </span>
        //                                         </h2>
        //                                         <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantiumtheresr doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto.</p>
        //                                         <div className="banner-btn-media">
        //                                             <div className="btn-group">
        //                                                 <div className="header-link-btn"><a href="tour-package.html" className="btn-1"> Book Now<span></span></a></div>
        //                                             </div>
        //                                             <div className="banner-media">
        //                                                 <ul>
        //                                                     <li><a href="#">
        //                                                         <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        //                                                             <g clip-path="url(#clip0_47_244)">
        //                                                                 <path className="bannar-inastagram" d="M18.2327 0H6.76726C3.03573 0 0 3.03573 0 6.76726V18.2329C0 21.9642 3.03573 25 6.76726 25H18.2329C21.9642 25 25 21.9642 25 18.2329V6.76726C25 3.03573 21.9642 0 18.2327 0V0ZM12.5 19.3357C8.73068 19.3357 5.66424 16.2693 5.66424 12.5C5.66424 8.73068 8.73068 5.66424 12.5 5.66424C16.2693 5.66424 19.3357 8.73068 19.3357 12.5C19.3357 16.2693 16.2693 19.3357 12.5 19.3357ZM19.4992 7.27633C18.3853 7.27633 17.4793 6.37034 17.4793 5.25645C17.4793 4.14256 18.3853 3.23638 19.4992 3.23638C20.6131 3.23638 21.5192 4.14256 21.5192 5.25645C21.5192 6.37034 20.6131 7.27633 19.4992 7.27633Z" fill="#FE7524" />
        //                                                                 <path className="bannar-inastagram" d="M12.5 7.12988C9.53899 7.12988 7.12982 9.53886 7.12982 12.5C7.12982 15.461 9.53899 17.8701 12.5 17.8701C15.4611 17.8701 17.8701 15.461 17.8701 12.5C17.8701 9.53886 15.4611 7.12988 12.5 7.12988Z" fill="#FE7524" />
        //                                                                 <path className="bannar-inastagram" d="M19.4992 4.70215C19.1936 4.70215 18.9449 4.95087 18.9449 5.25642C18.9449 5.56198 19.1936 5.8107 19.4992 5.8107C19.8049 5.8107 20.0536 5.56217 20.0536 5.25642C20.0536 4.95068 19.8049 4.70215 19.4992 4.70215Z" fill="#FE7524" />
        //                                                             </g>
        //                                                             <defs>
        //                                                                 <clipPath id="clip0_47_244">
        //                                                                     <rect width="25" height="25" fill="white" />
        //                                                                 </clipPath>
        //                                                             </defs>
        //                                                         </svg>
        //                                                     </a>
        //                                                     </li>
        //                                                     <li><a href="#"><i className="fa-brands fa-twitter"></i></a></li>
        //                                                     <li><a href="#"><i className="fa-brands fa-linkedin"></i></a></li>
        //                                                     <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
        //                                                 </ul>
        //                                             </div>
        //                                         </div>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>

        //                     <div className="col-lg-6">
        //                         <div className="banner-right-content">
        //                             <div className="banner-right-image">
        //                                 <img src="assets/images/banner/banner-right-image.png" alt="banner-two-image" />
        //                             </div>
        //                             <div className="border-image">
        //                                 <img src="assets/images/shape/border-image.png" alt="border" />
        //                             </div>
        //                             <div className="banner-plane">
        //                                 <img src="assets/images/shape/banner-plan.png" alt="plan" />
        //                             </div>
        //                             <div className="banner-car">
        //                                 <img src="assets/images/shape/banner-car.png" alt="car" />
        //                             </div>
        //                             <div className="banner-vedio">
        //                                 <div className="banner-vedio-image">
        //                                     <img src="assets/images/banner/banner-vedio-image.png" alt="" />
        //                                     <div className="missiom-video-btn">
        //                                         <a href="https://www.youtube.com/watch?v=kS0X-yIsB64" target="_blank" className="hv-popup-link"><i className="fas fa-play"></i></a>
        //                                     </div>
        //                                 </div>
        //                                 <div className="banner-blank1"></div>
        //                                 <div className="banner-blank2"></div>
        //                             </div>
        //                             <div className="banner-track">
        //                                 <h5>track the tour</h5>
        //                                 <div className="banner-track-image">
        //                                     <img src="assets/images/banner/banner-track-image.png" alt="img" />
        //                                     <div className="banner-track-shape">
        //                                         <img src="assets/images/shape/banner-track-shape.png" alt="tracker" />
        //                                         <div className="location">
        //                                             <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        //                                                 <g clip-path="url(#clip0_44_165)">
        //                                                     <path d="M13.4429 0.5C8.4505 0.5 4.38888 4.56162 4.38888 9.554C4.38888 15.7497 12.4914 24.8454 12.8363 25.2295C13.1604 25.5904 13.7261 25.5898 14.0495 25.2295C14.3945 24.8454 22.497 15.7497 22.497 9.554C22.4969 4.56162 18.4353 0.5 13.4429 0.5ZM13.4429 23.436C10.716 20.1968 6.01935 13.8062 6.01935 9.5541C6.01935 5.46064 9.34952 2.13047 13.4429 2.13047C17.5363 2.13047 20.8665 5.46064 20.8665 9.55405C20.8665 13.8064 16.1705 20.1958 13.4429 23.436Z" fill="#FE7524" />
        //                                                     <path d="M13.4429 4.99878C10.9311 4.99878 8.88766 7.04228 8.88766 9.5541C8.88766 12.0659 10.9312 14.1094 13.4429 14.1094C15.9547 14.1094 17.9982 12.0659 17.9982 9.5541C17.9982 7.04228 15.9547 4.99878 13.4429 4.99878ZM13.4429 12.479C11.8301 12.479 10.5181 11.1669 10.5181 9.5541C10.5181 7.94131 11.8302 6.62925 13.4429 6.62925C15.0557 6.62925 16.3677 7.94131 16.3677 9.5541C16.3677 11.1669 15.0557 12.479 13.4429 12.479Z" fill="#FE7524" />
        //                                                 </g>
        //                                                 <defs>
        //                                                     <clipPath id="clip0_44_165">
        //                                                         <rect width="25" height="25" fill="white" transform="translate(0.942932 0.5)" />
        //                                                     </clipPath>
        //                                                 </defs>
        //                                             </svg>
        //                                         </div>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </section>
        <section className="banner home-two-banner">
            <div className="banner-carouse">
                <div className="slide-item">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="banner-slide">
                                    <div className="banner-content">
                                        <div className="banner-content-wrapper home-two-banner-wrapper">
                                            <div className="banner-shape">
                                                <img src="assets/images/shape/banner-shape.png" alt="img" />
                                            </div>

                                            <div className="home-two-pattern-layer" style={{ backgroundImage: "url(assets/images/shape/home2-banner-map.png)" }}></div>

                                            <div className="banner-content-wrapper-inner home-two-banner-inner">
                                                <h4>Explore the World</h4>
                                                <h2>Chào mừng đến với  <span>Đắk Nông</span>
                                                </h2>
                                                <p>Tận hưởng mọi khoảnh khắc của chuyến đi của bạn.<br />
                                                    Một chuyến đi không chỉ là sự di chuyển, đó là một hành trình trải nghiệm</p>
                                                <div className="banner-btn-media">
                                                    <div className="btn-group">
                                                        <div className="header-link-btn"><a href="tour-package.html" className="btn-1 btn-2"> Khám phá ngay<span></span></a></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <div className="home-two-right-content">
                                    <div className="home-two-banner-right-image">
                                        <img src={slide} alt="image" />
                                    </div>
                                    <div className="plane-shape">
                                        <img src="assets/images/shape/plan-shape.png" alt="plan" />
                                    </div>
                                    <div className="banner-arrow">
                                        <img src="assets/images/shape/banner-arrow.png" alt="arrow" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SlideBanner