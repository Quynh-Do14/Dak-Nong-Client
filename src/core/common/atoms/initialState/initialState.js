import { atom } from "recoil";

export const InitialState = atom({
    key: 'INITIAL_STATE', // unique ID (with respect to other atoms/selectors)
    default: true, // default value (aka initial value)
});