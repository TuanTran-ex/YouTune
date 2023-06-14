import { NotFound, PrivateRoute } from 'components/Common';
import { HomePage } from 'components/Layout/HomePage';
import config from 'config';
import LoginPage from 'features/auth/page/LoginPage';
import RegisterPage from 'features/auth/page/RegisterPage';
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

                    <Route path={config.routes.register}>
                        <RegisterPage />
                    </Route>

                    <PrivateRoute path={config.routes.home}>
                        <HomePage />
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
