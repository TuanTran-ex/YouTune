import { Header, Header_MB, Posts, SideBar } from 'components/Common';
import React from 'react';
import { isXM, isXS } from 'utils/mediaResponse';
import './HomePage.scss';
import Suggest from './components/Suggest';
import AddFriend from './components/AddFriend';

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
    const x = window.location.pathname;

    return (
        <div className="root">
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
                <div className="home-body">
                    <div className="posts-children">
                        <Posts />
                    </div>
                    <div className="suggesst-children">
                        <Suggest />
                        <AddFriend />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
