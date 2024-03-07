import { ConnectedRouter } from 'connected-react-router';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { history } from 'utils';
import App from './App';
import { store } from './app/store';
import GlobalStyles from './components/GlobalStyle';
import './index.css';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <GlobalStyles>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter>

            <ToastContainer
                className="toast-message"
                position="top-right"
                autoClose={1300}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </Provider>
    </GlobalStyles>,
    document.getElementById('root'),
);

reportWebVitals();
