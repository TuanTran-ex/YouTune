import { Navigation, SideBar } from 'components/Common';
import React from 'react';
import { isM, isXM } from 'utils/mediaResponse';
import Suggest from '../components/Suggest';
import './HomePage.scss';

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
                    <div className="children-hzt">
                        <div className="nav-hzt">
                            <div className="horizontal">
                                <Navigation />
                            </div>
                        </div>
                        <div className="suggest-block-hzt">
                            <Suggest />
                        </div>
                    </div>
                ) : (
                    <div className="children-vtc">
                        <div className="nav-vtc">
                            <div className="vertical">
                                <Navigation />
                            </div>
                        </div>
                        <div className="suggest-block-vtc">
                            <Suggest />
                        </div>
                    </div>
                )
            ) : (
                <div className="children-sb">
                    <div className="sidebar-wapper">
                        <SideBar />
                    </div>
                    <div className="suggest-block-sb">
                        <Suggest />
                    </div>
                </div>
            )}
        </div>
    );
}

export default HomePage;
