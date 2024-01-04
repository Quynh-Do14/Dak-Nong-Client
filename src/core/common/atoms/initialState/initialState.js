import { atom } from "recoil";

let isFirstVisitStored = false
if (isFirstVisitStored == false) {
    sessionStorage.setItem("isFirstVisitStored", true)
    isFirstVisitStored = sessionStorage.getItem('isFirstVisitStored')
}
console.log('isFirstVisitStored', isFirstVisitStored);
export const InitialState = atom({
    key: 'INITIAL_STATE', // unique ID (with respect to other atoms/selectors)
    default: isFirstVisitStored, // default value (aka initial value)
});