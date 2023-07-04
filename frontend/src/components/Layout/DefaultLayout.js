import { SideBar } from 'components/Common';
import React from 'react';
import './DefaultLayout.scss';

function DefaultLayout({ children }) {
    return (
        <div className="wrapper-layout">
            <div className="sidebar-wapper">
                <SideBar />
            </div>
            <div className="children-wrapper">{children}</div>
        </div>
    );
}

export default DefaultLayout;
