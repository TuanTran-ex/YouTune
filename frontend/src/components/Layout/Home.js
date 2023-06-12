import { authActions } from 'features/auth/authSlice';
import { useDispatch } from 'react-redux';

function Home() {
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(authActions.logout());
    };
    return (
        <div className="wrapper">
            <div className="logout">
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}

export default Home;
