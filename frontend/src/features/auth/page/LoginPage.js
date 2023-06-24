import { yupResolver } from '@hookform/resolvers/yup';
import FacebookIcon from '@mui/icons-material/Facebook';
import config from 'config';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';
import { authActions, selectIsLogging } from '../authSlice';
import './LoginPage.scss';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

// Schema
const schema = yup
    .object({
        email: yup
            .string()
            .email('Email must be a valid email')
            .required('Please enter your email!')
            .typeError('Please enter a valid email!'),

        password: yup
            .string()
            .required('Please enter password!')
            .min(6, 'Min is 6')
            .max(55, 'Max is 55'),
    })
    .required();

function LoginPage() {
    const dispatch = useDispatch();
    const loading = useSelector(selectIsLogging);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Handle form
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: yupResolver(schema),
    });

    const handleFormLoginSubmit = () => {};

    const handleLoginClick = () => {
        dispatch(
            authActions.login({
                email: email,
                password: password,
            }),
        );
    };

    useEffect(() => {
        reset({
            email: email,
            password: password,
        });
    }, [loading, reset]);

    return (
        <div className="wrapper">
            <div className="main-block">
                <div className="log-in">
                    <div className="logo">
                        <span>YouTune</span>
                    </div>
                    <div className="form-field-login">
                        <form onSubmit={handleSubmit(handleFormLoginSubmit)}>
                            <input
                                {...register('email')}
                                value={email}
                                type="text"
                                className="input-field"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <p className="error-msg">{errors.email?.message}</p>

                            <input
                                {...register('password')}
                                value={password}
                                name="password"
                                type="password"
                                className="input-field"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <p className="error-msg">
                                {errors.password?.message}
                            </p>

                            <div className="btn-login">
                                {email === '' || password === '' ? (
                                    <button
                                        type="submit"
                                        variant="contained"
                                        className="disabled"
                                        disabled
                                    >
                                        Log in
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        variant="contained"
                                        onClick={handleLoginClick}
                                    >
                                        Log in
                                    </button>
                                )}
                            </div>
                        </form>

                        <div className="or">
                            <div className="line"></div>
                            <p>OR</p>
                            <div className="line"></div>
                        </div>

                        <div className="other-choice">
                            <i>
                                <FacebookIcon className="icon-fb" />
                            </i>
                            <Link to="#" className="link-login">
                                Log in with Facebook
                            </Link>
                        </div>
                        <Link to="#" className="forgot-password">
                            Forgot password?
                        </Link>
                    </div>
                </div>

                <div className="sign-up">
                    <div className="wrap">
                        Don't have an account?
                        <Link to={config.routes.register} className="high-line">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
            <footer className="footer">
                @2023 YouTune of University of Science student
            </footer>
        </div>
    );
}

export default LoginPage;
