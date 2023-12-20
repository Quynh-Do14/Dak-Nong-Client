
export function validateEmail(email) {
    let reg = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    // return url != null && reg.test(url);
    return email && reg.test(email);
}

export function validateInputPassword(val, oldVal = "") {
    if (oldVal && val === oldVal) {
        return false
    }
    let reg = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
    // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return val && reg.test(val);
}


export function validateName(val) {
    let reg = /[a-zA-Z0-9]{3,}$/;
    return val && reg.test(val);
}


export function validateOnlyNameOrNumber(val) {
    let reg = /[a-zA-Z0-9]$/;
    return val && reg.test(val);
}

// export function validateCompanyName(val) {
//     let reg = /^[a-zA-Z]+$/;
//     return val && reg.test(val);
// }

export function validateTax(val) {
    let reg = /^([0-9-]{10,13})$/;
    return val && reg.test(val)
}

export function validateId(val) {
    let reg = /^([0-9])/;
    return val && reg.test(val)
}

export function validatePhoneNumber(val) {
    // let reg = /^(84|0[3|5|7|8|9])+([0-9]{7,8})\b/;
    let reg = /^(1900|1800)[0-9]{4}$|(05|03|04|07|08|09|024|028)[0-9]{8}$|(\+84)[0-9]{9}$|(84)[0-9]{9}$|(\+84)[0-9]{8}$|(\+84)[0-9]{10}$|(021[012345689]|023[23456789]|020[3456789]|022[0123456789]|029[01234679]|025[123456789]|026[01239]|027[01234567]|037[01234567])[0-9]{7}$/
    return val && reg.test(val);
}

export function validateLandingPhoneNumber(val) {
    let reg = /^(1900|1800)[0-9]{4}$|(05|03|04|07|08|09|024|028)[0-9]{8}$|(\+84)[0-9]{9}$|(84)[0-9]{9}$|(\+84)[0-9]{8}$|(\+84)[0-9]{10}$|(021[012345689]|023[23456789]|020[3456789]|022[0123456789]|029[01234679]|025[123456789]|026[01239]|027[01234567]|037[01234567])[0-9]{7}$/;
    return val && reg.test(val);
}

export function validateImg(img) {
    let reg = /\/(jpe?g|png)$/i;
    // return url != null && reg.test(url);
    return img && reg.test(img);
}

export function validateVideo(video) {
    let reg = /\/(mpe?g|mp4)$/i;
    // return url != null && reg.test(url);
    return video && reg.test(video);
}

export function validateFileExcel(file) {
    const reg = /.*\.(xlsx|xls)/g;
    // return url != null && reg.test(url);
    return file && reg.test(file);
}

export function validateFormProduct(val) {
    let reg = /[a-zA-Z0-9]/;
    return val && reg.test(val);
}

export function validateFormInputNumber(val) {
    let reg = /^[0-9]\d*(\.\d+)?$/;
    return val && reg.test(val);
}

export function validateFormInputCoefficient(val) {
    let reg = /^[0-9]\d*(\.\d+)?$/;
    return val && reg.test(val);
}

export function validateFormInputDiscount(val) {
    let reg = /^[0-9]\d*(\.\d+)?$/;
    return val && reg.test(val);
}

export function validateForm(val) {
    let reg = /[a-zA-Z0-9]/;
    return val && reg.test(val);
}

export function validateCMND(val) {
    const pattern = /^[0-9]{12}$/;
    return val && pattern.test(val);
}



