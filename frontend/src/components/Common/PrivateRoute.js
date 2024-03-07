import { Route, Redirect } from 'react-router-dom';
import config from '../../config';

export function PrivateRoute(props) {
    const isLoggedIn = localStorage.getItem('access_token');
    if (!isLoggedIn) return <Redirect to={config.routes.login} />;

    return <Route {...props} />;
}
