import React from 'react'
import MainLayout from '../../infratructure/common/layout/main-layout'
import { useLocation } from 'react-router-dom';

const ExtraComponent = () => {
    const location = useLocation();
    const receivedProps = location.state;
    console.log('receivedProps',receivedProps.it);
    //// receivedProps.it là cái {id, quanHuyen}
    return (
        <MainLayout className="bg-white">

        </MainLayout>
    )
}

export default ExtraComponent