import React from 'react'
import HeaderPage from './header'
import FooterPage from './footer'

const MainLayout = (props) => {
    return (
        <div>
            <HeaderPage />
            <div>{props.children} </div>
            <FooterPage />
        </div>
    )
}

export default MainLayout