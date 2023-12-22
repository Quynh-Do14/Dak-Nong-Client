import React from 'react'
import HeaderPage from './header'
import FooterPage from './footer'

const MainLayout = (props) => {
    const { className = "" } = props;
    return (
        <div>
            <HeaderPage />
            <div className={className}>{props.children} </div>
            <FooterPage />
        </div>
    )
}

export default MainLayout