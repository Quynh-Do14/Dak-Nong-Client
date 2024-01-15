const PREFIX = "";

export const ROUTE_PATH = {
    LOGIN: `/${PREFIX}login`,
    REGISTER: `/${PREFIX}register`,

    TOUR: `/${PREFIX}tour`,
    VIEW_TOUR: `/${PREFIX}tour-view`,

    DESTINATION: `/${PREFIX}destination`,
    VIEW_DESTINATION: `/${PREFIX}destination-view`,

    ARTICLE: `/${PREFIX}article`,
    VIEW_ARTICLE: `/${PREFIX}article-view`,

    SPECIALTY: `/${PREFIX}specialty`,
    VIEW_SPECIALTY: `/${PREFIX}specialty-view`,

    FESTIVAL: `/${PREFIX}festival`,
    VIEW_FESTIVAL: `/${PREFIX}festival-view`,

    RESTAURANT: `/${PREFIX}restaurant`,
    VIEW_RESTAURANT: `/${PREFIX}restaurant-view`,

    HOTEL: `/${PREFIX}hotel`,
    VIEW_HOTEL: `/${PREFIX}hotel-view`,

    LAYOUT_MAP: `/${PREFIX}map`,

    HOME_PAGE: `/`,

};
export class Endpoint {
    static Auth = class {
        static Login = "/auth/login";
        static Register = "/auth/register";
    }

    static Module = class {
        static Evaluate = "/danhgia";
        static District = "/quanhuyen";
        static Upload = "/files/upload";
        static MultiUpload = "/files/upload-multi";
        static DiaDiem = "/diadiem";
        static TinTuc = "/tintuc";
        static Evaluate = "/danhgia"
        static Files = "/files/hinh-anh"
    }
};