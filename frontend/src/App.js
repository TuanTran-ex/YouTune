import { NotFound, PrivateRoute } from 'components/Common';
import Home from 'components/Layout/Home';
import config from 'config';
import LoginPage from 'features/auth/page/LoginPage';
import { Route, Switch } from 'react-router-dom';
import { publicRoutes } from 'routes';

function App() {
    return (
        <div className="App">
            <>
                <Switch>
                    <Route path={config.routes.login}>
                        <LoginPage />
                    </Route>

                    <PrivateRoute path={config.routes.home}>
                        <Home />
                    </PrivateRoute>

                    {publicRoutes.map((route, index) => (
                        <Route key={index} path={route.path}>
                            {route.component}
                        </Route>
                    ))}

                    <Route>
                        <NotFound />
                    </Route>
                </Switch>
            </>
        </div>
    );
}

export default App;
