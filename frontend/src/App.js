import { NotFound, PrivateRoute } from 'components/Common';
import DefaultLayout from 'components/Layout/DefaultLayout';
import LoginPage from 'features/auth/page/LoginPage';
import RegisterPage from 'features/auth/page/RegisterPage';
import HomePage from 'features/home/HomePage';
import { Route, Switch } from 'react-router-dom';
import { privateRoutes, publicRoutes } from 'routes';
import './App.css';
import config from './config';

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

                    <PrivateRoute exact path={config.routes.home}>
                        <HomePage />
                    </PrivateRoute>

                    {privateRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;
                        return (
                            <PrivateRoute
                                exact
                                key={index}
                                path={route.path}
                                render={() => (
                                    <Layout>
                                        <Page />
                                    </Layout>
                                )}
                            ></PrivateRoute>
                        );
                    })}

                    {publicRoutes.map((route, index) => (
                        <Route
                            exact
                            key={index}
                            path={route.path}
                            component={route.component}
                        ></Route>
                    ))}

                    <Route>
                        <NotFound />
                    </Route>
                </Switch>
            </>
            <footer className="footer-default">
                {/* @Front end made by Thu Uyen */}
            </footer>
        </div>
    );
}

export default App;
