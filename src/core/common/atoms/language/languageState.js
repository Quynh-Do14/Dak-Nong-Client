import { atom } from "recoil";

export const LanguageState = atom({
    key: 'LANGUAGE_STATE', // unique ID (with respect to other atoms/selectors)
    default: {
        isLoading: false,
        uri: '',
        // data: []
    }, // default value (aka initial value)
});
