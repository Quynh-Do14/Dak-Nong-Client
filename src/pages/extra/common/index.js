export function removeDiacriticsAndSpaces(inputString) {
    // Loại bỏ dấu và chuyển thành chữ thường
    const strippedString = inputString.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  
    // Loại bỏ khoảng trắng và thay thế bằng dấu gạch ngang
    const result = strippedString.replace(/\s+/g, "");
  
    return result;
  }
  
  export const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };