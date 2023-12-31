import { atom } from "recoil";

export const DistrictState = atom({
    key: 'DICTRICT_STATE', // unique ID (with respect to other atoms/selectors)
    default: {
        // isLoading: false,
        // uri: '',
        data: []
    }, // default value (aka initial value)
});