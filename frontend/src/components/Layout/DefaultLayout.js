import { Navigation, SideBar } from 'components/Common';
import React from 'react';
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
    const isXM = viewPort.width <= 768;

    return (
        <div className="wrapper-layout">
            {viewPort.width <= 1300 ? (
                isXM ? (
                    <div className="nav-hzt">
                        <div className="horizontal">
                            <Navigation />
                        </div>
                    </div>
                ) : (
                    <div className="nav-vtc">
                        <div className="vertical">
                            <Navigation />
                        </div>
                    </div>
                )
            ) : (
                <div className="sidebar-wapper">
                    <SideBar />
                </div>
            )}
            <div className="children-wrapper">{children}</div>
        </div>
    );
}

export default DefaultLayout;
