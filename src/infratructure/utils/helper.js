import moment from "moment";
import { API, PUBLIC } from "../../core/common/apiLinks";
export const DebounceInput = (func, delay) => {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
};

export const ConfigStatusTour = (status) => {
    switch (status) {
        case 1:
            return <div style={{ color: "rgb(46, 125, 50)" }}>Hoạt động </div>
        case 2:
            return <div style={{ color: "rgb(211, 47, 47)" }}>Đã xóa </div>
    }
}

export const validateFields = (isImplicitChange = false, key, isCheck, setError, error, message) => {
    if (isImplicitChange) {
        error[key] = {
            isError: isCheck,
            message: message,
        };
    }
    else {
        setError({
            ...error,
            [key]: {
                isError: isCheck,
                message: message,
            }
        });
    }
};

export const convertDate = (date) => {
    if (date) {
        let dateFormat = new Date(date);
        return moment(dateFormat).format("DD/MM/YYYY hh:mm:ss");
    } return null;

};
export const convertDateOnly = (date) => {
    if (date) {
        let dateFormat = new Date(date);
        return moment(dateFormat).format("DD/MM/YYYY");
    } return null;
};

export const convertTimeOnly = (date) => {
    if (date) {
        let dateFormat = new Date(date);
        return moment(dateFormat).format("hh:mm");
    } return null;
};

export const showImageCommon = (img) => {
    return `${API}${PUBLIC}/${img}`
}
export const convertNumber = (number) => {
    let checkStar = Number.isInteger(parseFloat(number));
    if (checkStar) {
        return parseInt(number);
    }
    else {
        return parseFloat(number)?.toFixed(1);

    }
}