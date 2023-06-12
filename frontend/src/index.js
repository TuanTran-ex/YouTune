// import { createRoot } from 'react-dom/client;
import { ConnectedRouter } from 'connected-react-router';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { history } from 'utils';
import App from './App';
import { store } from './app/store';
import GlobalStyles from './components/GlobalStyle';
import './index.css';
import reportWebVitals from './reportWebVitals';

// const container = document.getElementById('root');
// const root = createRoot(container);

ReactDOM.render(
    // <React.StrictMode>
    <GlobalStyles>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter>

            <ToastContainer
                className="toast-message"
                position="top-right"
                autoClose={5000}
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
