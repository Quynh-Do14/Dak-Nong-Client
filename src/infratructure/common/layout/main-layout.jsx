import React, { useEffect, useState } from 'react'
import HeaderPage from './header'
import FooterPage from './footer'
import { useRecoilState } from 'recoil';
import { InitialState } from '../../../core/common/atoms/initialState/initialState';
import LoadingFullPage from '../controls/loading';

const MainLayout = (props) => {
    const [loading, setLoading] = useState(false);
    const [initialState, setInitialState] = useRecoilState(InitialState);
    console.log("initialState", initialState);
    useEffect(() => {
        if (initialState) {
            setLoading(true);
            setTimeout(() => setLoading(false), 1000);
            setInitialState(false);
        }
        sessionStorage.removeItem('isFirstVisitStored');
    }, [])
    const { className = "" } = props;
    return (
        <div>
            <HeaderPage />
            <div className={`${className} main-layout`}>{props.children} </div>
            <FooterPage />
            <LoadingFullPage loading={loading} />
        </div>
    )
}

export default MainLayout