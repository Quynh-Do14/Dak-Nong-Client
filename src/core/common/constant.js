import { ROUTE_PATH } from "./appRouter";
import homePageImg1 from "../../asset/img/home1.jpg";
import homePageImg2 from "../../asset/img/home2.jpg";
import homePageImg3 from "../../asset/img/home3.jpg";
import homePageImg4 from "../../asset/img/home4.jpg";

export default class Constants {
    static Menu = class {
        static List = [
            {
                label: "Trang chủ",
                link: ROUTE_PATH.HOME_PAGE,
            },
            {
                label: "Bài viết",
                link: ROUTE_PATH.ARTICLE,
            },
            // {
            //     label: "Điểm du lịch",
            //     link: ROUTE_PATH.DESTINATION,
            // },
            {
                label: "Tour",
                link: ROUTE_PATH.TOUR,
            },
            {
                label: "Lễ hội",
                link: ROUTE_PATH.FESTIVAL,
            },
            {
                label: "Đặc sản",
                link: ROUTE_PATH.SPECIALTY,
            },
            // {
            //     label: "Bản đồ",
            //     link: ROUTE_PATH.LAYOUT_MAP,
            // },

        ]
    };
    static TOKEN = "token";
    static DEBOUNCE_SEARCH = 800;

    static Params = class {
        static limit = "limit";
        static page = "page";
        static searchName = "searchName";
        static idQuanHuyen = "idQuanHuyen";
        static idDanhMuc = "idDanhMuc";
        static parentId = "parentId"
    }

    static PaginationConfigs = class {
        static Size = 9;
        static SizeSearchPage = 8;
        static LimitSize = 60;
        static AllSize = 9000;
        static PageSizeList = [
            { label: "10", value: 10 },
            { label: "20", value: 20 },
            { label: "50", value: 50 },
        ]
    };

    static UseParams = class {
        static Id = ":id"
    }

    static StatusUser = class {
        static ADMIN = class {
            static value = "ADMIN";
            static label = "Quản trị viên";
        }
        static COMMITTEE = class {
            static value = "COMMITTEE";
            static label = "Ủy ban nhân dân Tỉnh";
        }
        static DEPARTMENT = class {
            static value = "DEPARTMENT";
            static label = "Sở VHTT&DL";
        }
        static USER = class {
            static value = "USER";
            static label = "Người dân";
        }
        static List = [
            { label: "Quản trị viên", value: "ADMIN" },
            { label: "Ủy ban nhân dân Tỉnh", value: "COMMITTEE" },
            { label: "Sở VHTT&DL", value: "DEPARTMENT" },
            { label: "Người dân", value: "USER" },
        ]
    }
    static DefaultImage = "1"
    static CategoryConfig = class {
        static Location = class {
            static label = "Địa điểm du lịch";
            static value = 1;
        }
        static Stay = class {
            static value = 2;
            static label = "Lưu Trú";
        }
        static Cuisine = class {
            static value = 3;
            static label = "Ẩm Thức";
        }
        static Vehicle = class {
            static value = 4;
            static label = "Phương Tiện";
        }
        static Specialty = class {
            static value = 5;
            static label = "Đặc Sản";
        }
        static Tour = class {
            static value = 6;
            static label = "Tour";
        }
        static Festival = class {
            static value = 7;
            static label = "Lễ hội";
        }
        static News = class {
            static value = 8;
            static label = "Bài viết";
        }
        static list = [
            { label: "Địa Điểm Du Lịch", value: 1 },
            { label: "Lưu Trú", value: 2 },
            { label: "Ẩm Thức", value: 3 },
            { label: "Phương Tiện", value: 4 },
            { label: "Đặc Sản", value: 5 },
            { label: "Tour", value: 6 },
            { label: "Lễ hội", value: 7 },
            { label: "Bài viết", value: 8 },
        ]
    }
    static Slogan = " Du lịch đã giúp chúng ta hiểu được ý nghĩa của cuộc sống và nó đã giúp chúng ta trở thành những người tốt hơn. Mỗi lần đi du lịch, chúng ta nhìn thế giới bằng con mắt mới."
    static FreePrice = "Miễn phí";
    static Undefined = "undefined";
    static ToastMessage = class {
        static Notification = class {
            static Position = "top-right";
            static Duration = 6000;
        };
        static Confirmation = class { };
    };
    static DataTemplate = class {
        static list = [
            {
                name: 'Meet Skeleton Svelte Taile Was Sind For Reactive UIs',
                address: "North Province, Maldives",
                date: "NOVEMBER 15, 2022",
                img: "https://ik.imagekit.io/tvlk/blog/2022/03/dia-diem-du-lich-dak-nong-2-1024x495.jpg?tr=dpr-2,w-675",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Neque, labore ad ex maiores repellat a veniam illo.Eligendi cum dolor totam reiciendis commodi magni ad error aliquid ipsa repudiandae! Nemo."
            },
            {
                name: 'Meet Skeleton Svelte Taile Was Sind For Reactive UIs',
                address: "North Province, Maldives",
                date: "NOVEMBER 15, 2022",
                img: "https://ik.imagekit.io/tvlk/blog/2022/03/dia-diem-du-lich-dak-nong-2-1024x495.jpg?tr=dpr-2,w-675",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Neque, labore ad ex maiores repellat a veniam illo.Eligendi cum dolor totam reiciendis commodi magni ad error aliquid ipsa repudiandae! Nemo."
            },
            {
                name: 'Meet Skeleton Svelte Taile Was Sind For Reactive UIs',
                address: "North Province, Maldives",
                date: "NOVEMBER 15, 2022",
                img: "https://ik.imagekit.io/tvlk/blog/2022/03/dia-diem-du-lich-dak-nong-2-1024x495.jpg?tr=dpr-2,w-675",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Neque, labore ad ex maiores repellat a veniam illo.Eligendi cum dolor totam reiciendis commodi magni ad error aliquid ipsa repudiandae! Nemo."
            },

            {
                name: 'Meet Skeleton Svelte Taile Was Sind For Reactive UIs',
                address: "North Province, Maldives",
                date: "NOVEMBER 15, 2022",
                img: "https://ik.imagekit.io/tvlk/blog/2022/03/dia-diem-du-lich-dak-nong-2-1024x495.jpg?tr=dpr-2,w-675",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Neque, labore ad ex maiores repellat a veniam illo.Eligendi cum dolor totam reiciendis commodi magni ad error aliquid ipsa repudiandae! Nemo."
            },
            {
                name: 'Meet Skeleton Svelte Taile Was Sind For Reactive UIs',
                address: "North Province, Maldives",
                date: "NOVEMBER 15, 2022",
                img: "https://ik.imagekit.io/tvlk/blog/2022/03/dia-diem-du-lich-dak-nong-2-1024x495.jpg?tr=dpr-2,w-675",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Neque, labore ad ex maiores repellat a veniam illo.Eligendi cum dolor totam reiciendis commodi magni ad error aliquid ipsa repudiandae! Nemo."
            },
            {
                name: 'Meet Skeleton Svelte Taile Was Sind For Reactive UIs',
                address: "North Province, Maldives",
                date: "NOVEMBER 15, 2022",
                img: "https://ik.imagekit.io/tvlk/blog/2022/03/dia-diem-du-lich-dak-nong-2-1024x495.jpg?tr=dpr-2,w-675",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Neque, labore ad ex maiores repellat a veniam illo.Eligendi cum dolor totam reiciendis commodi magni ad error aliquid ipsa repudiandae! Nemo."
            }
        ]
    }

    static DataHomePage = class {
        static list = [
            {
                name: "Địa điểm du lịch",
                img: homePageImg1,
                link: ROUTE_PATH.TOUR,
                description: "Khám phá những địa điểm du lịch mới",
            },
            {
                name: "Bài viết hôm nay",
                img: homePageImg2,
                link: ROUTE_PATH.ARTICLE,
                description: "Đọc những bài viết, tin tức mới nhất",
            },
            {
                name: "Khám phá ẩm thực",
                img: homePageImg3,
                link: ROUTE_PATH.SPECIALTY,
                description: "Khám phá ẩm thực phong phú tại vùng đất này",
            },
            {
                name: "Lễ hội truyền thống",
                img: homePageImg4,
                link: ROUTE_PATH.FESTIVAL,
                description: "Tìm hiểu các lễ hội truyền thống",
            },

        ]
    }

    static TabDetailTour = class {
        static list = [
            {
                name: "Thông tin",
                icon: "fa fa-circle-info"
            },
            {
                name: "Ảnh",
                icon: "fa fa-file-image"
            },
            {
                name: "Điều khoản",
                icon: "fa fa-file-lines"
            },
        ]
    }
};