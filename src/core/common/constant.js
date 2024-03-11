import { ROUTE_PATH } from "./appRouter";
import homePageImg1 from "../../asset/img/extra/home1.jpg";
import homePageImg2 from "../../asset/img/extra/home2.jpg";
import homePageImg3 from "../../asset/img/extra/home3.jpg";
import homePageImg4 from "../../asset/img/extra/home4.jpg";
import useTranslate from "./hook/useTranslate";

import slide1 from "../../asset/img/extra/slide-banner.jpg";
import slide2 from "../../asset/img/extra/slide-banner2.jpg";
import amThuc from "../../asset/img/extra/am-thuc.jpg";
import kienTruc from "../../asset/img/extra/kien-truc.jpg";
import giaiTri from "../../asset/img/extra/giai-tri.jpg";
import tp from "../../asset/img/extra/tpGiaNghia.jpg";
import tamLinh from "../../asset/img/extra/du-lich-tam-linh.jpg";



export default class Constants {
  static Menu = class {
    static List = [
      {
        label: "homePage",
        link: ROUTE_PATH.HOME_PAGE,
      },
      {
        label: "news",
        link: ROUTE_PATH.ARTICLE,
      },
      {
        label: "location",
        children: [
          {
            label: "schedule",
            link: ROUTE_PATH.TOUR,
          },
          {
            label: "restaurant",
            link: ROUTE_PATH.RESTAURANT,
          },
          {
            label: "hotel",
            link: ROUTE_PATH.HOTEL,
          },
        ]
      },
      {
        label: "festival",
        link: ROUTE_PATH.FESTIVAL,
      },
      {
        label: "specialty",
        link: ROUTE_PATH.SPECIALTY,
      },
      {
        label: "map",
        link: ROUTE_PATH.LAYOUT_MAP,
        children: [
          {
            id: 1,
            label: "satelliteImageMapOfDakNong",
            link: ROUTE_PATH.LAYOUT_MAP,
          },
          {
            id: 2,
            label: "dakNongOverlayMap",
            link: ROUTE_PATH.LAYOUT_MAP,
          },
          {
            id: 3,
            label: "mapOfTouristAttractionsInDakNongProvince",
            link: ROUTE_PATH.LAYOUT_MAP,
          },
          {
            id: 4,
            label: "dakNongProvinceTouristRouteMap",
            link: ROUTE_PATH.LAYOUT_MAP,
          },
          {
            id: 5,
            label: "naturalTourismResourcesMapOfDakNongProvince",
            link: ROUTE_PATH.LAYOUT_MAP,
          },
          {
            id: 6,
            label: "culturalTourismResourcesMapOfDakNongProvince",
            link: ROUTE_PATH.LAYOUT_MAP,
          },
          {
            id: 7,
            label: "mapOfNaturalTourismResourcesOfTheProvinceDakNong",
            link: ROUTE_PATH.LAYOUT_MAP,
          },
        ],
      },
    ];
  };
  static TOKEN = "token";
  static DEBOUNCE_SEARCH = 800;

  static Params = class {
    static limit = "limit";
    static page = "page";
    static searchName = "searchName";
    static idQuanHuyen = "idQuanHuyen";
    static idDanhMuc = "idDanhMuc";
    static parentId = "parentId";
  };

  static PaginationConfigs = class {
    static Size = 8;
    static SizeSearchPage = 8;
    static LimitSize = 60;
    static AllSize = 9000;
    static PageSizeList = [
      { label: "10", value: 10 },
      { label: "20", value: 20 },
      { label: "50", value: 50 },
    ];
  };

  static UseParams = class {
    static Id = ":id";
  };

  static StatusUser = class {
    static ADMIN = class {
      static value = "ADMIN";
      static label = "Quản trị viên";
    };
    static COMMITTEE = class {
      static value = "COMMITTEE";
      static label = "Ủy ban nhân dân Tỉnh";
    };
    static DEPARTMENT = class {
      static value = "DEPARTMENT";
      static label = "Sở VHTT&DL";
    };
    static USER = class {
      static value = "USER";
      static label = "Người dân";
    };
    static List = [
      { label: "Quản trị viên", value: "ADMIN" },
      { label: "Ủy ban nhân dân Tỉnh", value: "COMMITTEE" },
      { label: "Sở VHTT&DL", value: "DEPARTMENT" },
      { label: "Người dân", value: "USER" },
    ];
  };
  static DefaultImage = "1";
  static CategoryConfig = class {
    static Location = class {
      static label = "Địa điểm du lịch";
      static value = 1;
    };
    static Stay = class {
      static value = 2;
      static label = "Lưu Trú";
    };
    static Cuisine = class {
      static value = 3;
      static label = "Ẩm Thức";
    };
    static Vehicle = class {
      static value = 4;
      static label = "Phương Tiện";
    };
    static Specialty = class {
      static value = 5;
      static label = "Đặc Sản";
    };
    static Tour = class {
      static value = 6;
      static label = "Tour";
    };

    static Festival = class {
      static value = 23;
      static label = "Lễ hội";
    };
    static Restaurant = class {
      static value = 24;
      static label = "Nhà hàng";
    };
    static Hotel = class {
      static value = 26;
      static label = "Khách sạn";
    };
    static News = class {
      static value = 8;
      static label = "Bài viết";
    };
    static list = [
      { label: "Địa Điểm Du Lịch", value: 1 },
      { label: "Lưu Trú", value: 2 },
      { label: "Ẩm Thức", value: 3 },
      { label: "Phương Tiện", value: 4 },
      { label: "Đặc Sản", value: 5 },
      { label: "Tour", value: 6 },
      { label: "Lễ hội", value: 7 },
      { label: "Bài viết", value: 8 },
    ];
  };
  static Slogan =
    " Du lịch đã giúp chúng ta hiểu được ý nghĩa của cuộc sống và nó đã giúp chúng ta trở thành những người tốt hơn. Mỗi lần đi du lịch, chúng ta nhìn thế giới bằng con mắt mới.";
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
        name: "Meet Skeleton Svelte Taile Was Sind For Reactive UIs",
        address: "North Province, Maldives",
        date: "NOVEMBER 15, 2022",
        img: "https://ik.imagekit.io/tvlk/blog/2022/03/dia-diem-du-lich-dak-nong-2-1024x495.jpg?tr=dpr-2,w-675",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit.Neque, labore ad ex maiores repellat a veniam illo.Eligendi cum dolor totam reiciendis commodi magni ad error aliquid ipsa repudiandae! Nemo.",
      },
      {
        name: "Meet Skeleton Svelte Taile Was Sind For Reactive UIs",
        address: "North Province, Maldives",
        date: "NOVEMBER 15, 2022",
        img: "https://ik.imagekit.io/tvlk/blog/2022/03/dia-diem-du-lich-dak-nong-2-1024x495.jpg?tr=dpr-2,w-675",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit.Neque, labore ad ex maiores repellat a veniam illo.Eligendi cum dolor totam reiciendis commodi magni ad error aliquid ipsa repudiandae! Nemo.",
      },
      {
        name: "Meet Skeleton Svelte Taile Was Sind For Reactive UIs",
        address: "North Province, Maldives",
        date: "NOVEMBER 15, 2022",
        img: "https://ik.imagekit.io/tvlk/blog/2022/03/dia-diem-du-lich-dak-nong-2-1024x495.jpg?tr=dpr-2,w-675",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit.Neque, labore ad ex maiores repellat a veniam illo.Eligendi cum dolor totam reiciendis commodi magni ad error aliquid ipsa repudiandae! Nemo.",
      },

      {
        name: "Meet Skeleton Svelte Taile Was Sind For Reactive UIs",
        address: "North Province, Maldives",
        date: "NOVEMBER 15, 2022",
        img: "https://ik.imagekit.io/tvlk/blog/2022/03/dia-diem-du-lich-dak-nong-2-1024x495.jpg?tr=dpr-2,w-675",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit.Neque, labore ad ex maiores repellat a veniam illo.Eligendi cum dolor totam reiciendis commodi magni ad error aliquid ipsa repudiandae! Nemo.",
      },
      {
        name: "Meet Skeleton Svelte Taile Was Sind For Reactive UIs",
        address: "North Province, Maldives",
        date: "NOVEMBER 15, 2022",
        img: "https://ik.imagekit.io/tvlk/blog/2022/03/dia-diem-du-lich-dak-nong-2-1024x495.jpg?tr=dpr-2,w-675",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit.Neque, labore ad ex maiores repellat a veniam illo.Eligendi cum dolor totam reiciendis commodi magni ad error aliquid ipsa repudiandae! Nemo.",
      },
      {
        name: "Meet Skeleton Svelte Taile Was Sind For Reactive UIs",
        address: "North Province, Maldives",
        date: "NOVEMBER 15, 2022",
        img: "https://ik.imagekit.io/tvlk/blog/2022/03/dia-diem-du-lich-dak-nong-2-1024x495.jpg?tr=dpr-2,w-675",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit.Neque, labore ad ex maiores repellat a veniam illo.Eligendi cum dolor totam reiciendis commodi magni ad error aliquid ipsa repudiandae! Nemo.",
      },
    ];
  };

  static DataHomePage = class {
    static list = [
      {
        name: "destination",
        img: homePageImg1,
        link: ROUTE_PATH.TOUR,
        description: "destinationDes",
        iconBot: "assets/images/icons/choose-bottom-01.png",
      },
      {
        name: "todayArticle",
        img: homePageImg2,
        link: ROUTE_PATH.ARTICLE,
        description: "todayNewsDes",
        iconBot: "assets/images/icons/choose-bottom-02.png",
      },
      {
        name: "exploreCuisine",
        img: homePageImg3,
        link: ROUTE_PATH.SPECIALTY,
        description: "exploreCuisineDes",
        iconBot: "assets/images/icons/choose-bottom-03.png",
      },
      {
        name: "traditionalFestival",
        img: homePageImg4,
        link: ROUTE_PATH.FESTIVAL,
        description: "traditionalFestivalDes",
        iconBot: "assets/images/icons/choose-bottom-04.png",
      },
    ];
  };

  static TabDetailTour = class {
    static list = [
      {
        name: "info",
        icon: "fa fa-circle-info",
      },
      {
        name: "Video",
        icon: "fa fa-video",
      },
      {
        name: "gallery",
        icon: "fa fa-file-image",
      },

    ];
  };
  static TypeTourism = class {
    static list = [
      {
        name: "travelDiscover",
        icon: "assets/images/icons/c-1.png",
        link: "https://www.youtube.com/embed/AITILCLleGA?si=srWvnIBNZCYiAcfG&amp;start=1",
        img: slide2
      },
      {
        name: "ecoTourism",
        icon: "assets/images/icons/c-2.png",
        link: "https://www.youtube.com/embed/IFQWmS5Cl2w?si=R78pi-K8i9AmhStJ",
        img: slide1
      },
      {
        name: "commerceCuisine",
        icon: "assets/images/icons/c-3.png",
        link: "https://www.youtube.com/embed/rrFAN_cIZ4g?si=xB9nef5JpYC4ctmD",
        img: amThuc
      },
      {
        name: "leisureTravel",
        icon: "assets/images/icons/c-4.png",
        link: "https://www.youtube.com/embed/rrFAN_cIZ4g?si=MNFRnOHdyY_QyeAX",
        img: giaiTri
      },
      {
        name: "structures",
        icon: "assets/images/icons/c-5.png",
        link: "https://www.youtube.com/embed/RcYERGLymdY?si=vYHeffN12fiWVT9s",
        img: kienTruc
      },
      {
        name: "spiritualTourism",
        icon: "assets/images/icons/c-6.png",
        link: "https://www.youtube.com/embed/Ji4SJHSyXU4?si=HEDTlfp3mxD3xAky",
        img: tamLinh
      },
    ]
  }
}
