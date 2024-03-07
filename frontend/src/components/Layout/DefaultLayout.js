import { Header, Header_MB, SideBar } from 'components/Common';
import React from 'react';
import { isXM, isXS } from 'utils/mediaResponse';
import './DefaultLayout.scss';

function DefaultLayout({ children }) {
    const useViewport = () => {
        const [width, setWidth] = React.useState(window.innerWidth);

        React.useEffect(() => {
            const handleWindowResize = () => setWidth(window.innerWidth);
            window.addEventListener('resize', handleWindowResize);
            return () =>
                window.removeEventListener('resize', handleWindowResize);
        }, []);

        return { width };
    };
    // Media responsive
    const viewPort = useViewport();

    const x = window.location.pathname;

    return (
        <div className="wrapper-layout">
            <div className="sidebar-wapper">
                <SideBar />
            </div>
            <div className="children-wrapper">
                {viewPort.width <= isXM && x.includes('profile') === false ? (
                    viewPort.width > isXS ? (
                        <div className="children-wrapper__header">
                            <Header />
                        </div>
                    ) : x.includes('search') === false ? (
                        <div className="chilren-wrapper__header-mb">
                            <Header_MB />
                        </div>
                    ) : (
                        ''
                    )
                ) : (
                    ''
                )}
                {children}
            </div>
        </div>
    );
}

export default DefaultLayout;
