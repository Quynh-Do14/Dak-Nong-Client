// import { FailMessage, SuccessMessage } from "../common/components/toast/notificationToast";

import { FailMessage, SuccessMessage } from "../common/toast/toastMessage";


// import store from "../store";
const request = {
  get: async (url, setLoading) => {
    let token = sessionStorage.getItem('token');
    console.log(url);
    setLoading(true);
    let result = await fetch(`${url}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch((e) => {
    });
    if (result.ok) {
      setLoading(false)
      return result.json();
    } else {
      setLoading(false)
      return {
        status: false,
        data: {},
        message: "connect server failed",
      };
    }
  },

  uploadFile: (url, data, token) => {
    console.log(data);
    console.log(url, data);
    return new Promise(function (resolve, reject) {
      fetch(url, {
        method: "POST",
        body: data,
      })
        .then((response) => {
          try {
            return response.json();
          } catch (err) {
            reject({ err: 2, msg: "Phiên làm việc hết hạn" });
          }
        })
        .then((data) => {
          console.info(data);
          resolve(data);
        })
        .catch((err) => {
          console.log(err);
          reject({ err: 1, msg: "Vui lòng kiểm tra kết nối mạng" });
        });
    });
  },
  postUploadFile: async (url, data, callBack, setLoading) => {
    let token = sessionStorage.getItem('token');
    let result = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: data,
      redirect: "follow",
    }).catch((e) => {
      console.log(e);
    });
    console.log(result);
    setLoading(true)
    if (result.ok) {
      // SuccessMessage("Upload dữ liệu thành công", "Dữ liệu đã được upload thành công")
      setLoading(false)
      callBack()
      return result.json();
    } else {
      setLoading(false)
      // FailMessage("Upload dữ liệu thất bại", "Dữ liệu đã được Upload thất bại");
      return {
        status: false,
        data: {},
        message: "connect server failed",
      };
    }
  },


  putUploadFile: async (url, data, callBack, setLoading) => {
    let token = sessionStorage.getItem('token');
    let result = await fetch(url, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: data,
      redirect: "follow",
    }).catch((e) => {
      console.log(e);
    });
    console.log(result);
    setLoading(true)
    if (result.ok) {
      // SuccessMessage("Upload dữ liệu thành công", "Dữ liệu đã được upload thành công")
      setLoading(false)
      callBack()
      return result.json();
    } else {
      setLoading(false)
      // FailMessage("Upload dữ liệu thất bại", "Dữ liệu đã được Upload thất bại");
      return {
        status: false,
        data: {},
        message: "connect server failed",
      };
    }
  },

  post: async (url, data, callBack, setLoading) => {
    // console.log(url, data);
    let token = sessionStorage.getItem('token');
    let result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      // redirect: 'follow',
    }).catch((e) => {
      console.log(e);
    });
    setLoading(true);
    if (result.ok) {
      SuccessMessage(`Đánh giá thành công`, `Cảm ơn bạn đánh giá địa điểm này`)
      setLoading(false);
      callBack()
      return result.json();
    } else {
      FailMessage(`Đánh giá thất bại`, "Đánh giá địa điểm này không thành công");
      setLoading(false);
      return {
        status: false,
        data: {},
        message: "connect server failed",
      };
    }
  },

  put: async (url, data, callBack, setLoading) => {
    // console.log(url, data);
    let token = sessionStorage.getItem('token');
    let result = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      // redirect: 'follow',
    }).catch((e) => {
      console.log(e);
    });
    setLoading(true)
    if (result.ok) {
      // SuccessMessage("Cập nhật dữ liệu thành công", "Dữ liệu đã được cập nhật thành công")
      callBack();
      setLoading(false);
      return result.json();
    } else {
      // FailMessage("Cập nhật dữ liệu thất bại", "Dữ liệu đã được cập nhật thất bại");
      setLoading(false);
      return {
        status: false,
        data: {},
        message: "connect server failed",
      };
    }
  },

  delete: async (url, data, callBack, setLoading) => {
    // console.log(url, data);
    let token = sessionStorage.getItem('token');
    let result = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      // redirect: 'follow',
    }).catch((e) => {
      console.log(e);
    });
    setLoading(true);
    if (result.ok) {
      // SuccessMessage("Xóa dữ liệu thành công", "Dữ liệu đã được xóa thành công")
      setLoading(false);
      callBack()
      return result.json();
    } else {
      // FailMessage("Xóa dữ liệu thất bại", "Dữ liệu đã được xóa thất bại");
      setLoading(false);
      return {
        status: false,
        data: {},
        message: "connect server failed",
      };
    }
  },

  postThemMoiDuLieu: async (url, data) => {
    let result = await fetch(url, {
      method: "POST",
      // headers: myHeaders,
      body: data,
      redirect: "follow",
    }).catch((e) => {
      console.log(e);
    });
    console.log(result);
    if (result.ok) {
      return result.json();
    } else {
      return {
        status: false,
        data: {},
        message: "connect server failed",
      };
    }
  },

  login: async (url, data, callBack, setLoading, title) => {
    var myHeaders = new Headers();
    setLoading(true);
    let result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": sessionStorage.getItem("token")
      },
      body: JSON.stringify(data),
      // redirect: 'follow',
    }).catch((e) => {
      console.log(e);
    });
    if (result.ok) {
      setTimeout(() => setLoading(false), 2000)
      SuccessMessage(`${title} thành công`, "");
      callBack()
      setLoading(false);
      return result.json();
    } else {
      setTimeout(() => setLoading(false), 2000)
      FailMessage(`${title} thất bại`, "");
      setLoading(false);
      return {
        status: false,
        data: {},
        message: "connect server failed",
      };
    }
  },

};

export default request;

