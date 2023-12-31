import React from 'react'
import { LanguageState } from '../atoms/language/languageState';
import { useRecoilValue } from 'recoil';
import { translations } from '../../../infratructure/utils/data';
const useTranslate = () => {
    // const translation = useRecoilValue(LanguageState);
    const translation = sessionStorage.getItem("language")
    const translate = (key) => {
        const data = translations?.["vi"]
        const filteredKeys = Object.keys(data).filter(it => {
            return it
        }

        );
        const condition = filteredKeys.filter(it => it == key)
        if (condition.length == 0) {
            return key
        }
        if (typeof (translation) === "object") {
            return translations?.["vi"]?.[key];
        }
        if (translation) {
            return translations?.[translation]?.[key];
        }
        return key
    };

    return { translate };
}

export default useTranslate