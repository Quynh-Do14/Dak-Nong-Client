import React from 'react'
import HeaderPage from './header'
import FooterPage from './footer'
import { useRecoilState } from 'recoil';
import { LanguageState } from '../../../core/common/atoms/language/languageState';

const MainLayout = (props) => {
    const [dataLanguage, setDataLanguage] = useRecoilState(LanguageState);
    const { className = "" } = props;
    return (
        <div>
            <HeaderPage />
            <div className={`${className} main-layout`}>{props.children} </div>
            <FooterPage />
        </div>
    )
}

export default MainLayout