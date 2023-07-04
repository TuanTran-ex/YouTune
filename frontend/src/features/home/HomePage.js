import { Navigation, SideBar } from 'components/Common';
import './HomePage.scss';
import React from 'react';
import { isM, isXM } from 'utils/mediaResponse';

function HomePage() {
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
    const viewPort = useViewport();

    return (
        <div className="root">
            {viewPort.width <= isM ? (
                viewPort.width <= isXM ? (
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
        </div>
    );
}

export default HomePage;
