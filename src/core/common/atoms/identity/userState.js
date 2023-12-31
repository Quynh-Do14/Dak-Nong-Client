import { atom } from "recoil";

export const UserState = atom({
    key: 'USER_STATE', // unique ID (with respect to other atoms/selectors)
    default: {
        isLoading: false,
        uri: ''
    }, // default value (aka initial value)
});