import { yupResolver } from '@hookform/resolvers/yup';
import FacebookIcon from '@mui/icons-material/Facebook';
import config from 'config';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { authActions, selectIsRegister } from '../authSlice';
import './RegisterPage.scss';

const schema = yup
    .object({
        email: yup
            .string()
            .email('Invalid email')
            .required('Please enter your email!')
            .typeError('Please enter a valid email!')
            .min(6, 'To short')
            .max(255, 'Too long!'),
        fullName: yup
            .string()
            .required('Please enter your fullName!')
            .typeError('Please enter a valid fullName!')
            .min(4, 'Too Short!')
            .max(255, 'Too Long!'),

        userName: yup
            .string()
            .required('Please enter your userName!')
            .typeError('Please enter a valid userName!')
            .min(3, 'Too short!')
            .max(255, 'Too long!'),

        password: yup
            .string()
            .required('Please enter password!')
            .min(6, 'Min is 6')
            .max(55, 'Max is 55'),
    })
    .required();

function RegisterPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const loading = useSelector(selectIsRegister);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [fullName, setFullName] = useState('');

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: '',
            full_name: '',
            username: '',
            password: '',
        },
        resolver: yupResolver(schema),
    });

    const handleFormRegisterSubmit = () => {};

    const handleLoginWFB = () => {
        history.push('#');
    };

    const handleRegisterClick = () => {
        dispatch(
            authActions.register({
                email: email,
                full_name: fullName,
                username: userName,
                password: password,
            }),
        );
    };

    useEffect(() => {
        reset({
            email: email,
            full_name: fullName,
            username: userName,
            password: password,
        });
    }, [loading, reset]);

    return (
        <div className="wrapper">
            <div className="block-register">
                <div className="bl-on">
                    <div className="logo">
                        <span>YouTune</span>
                    </div>

                    <p className="reminder">
                        Sign up to see photos and videos from your friends.
                    </p>
                    <button className="lg-w-fb" onClick={handleLoginWFB}>
                        <i>
                            <FacebookIcon className="icon-fb" />
                        </i>
                        <span className="text">Log in with Facebook</span>
                    </button>

                    <div className="or">
                        <div className="line"></div>
                        <p>OR</p>
                        <div className="line"></div>
                    </div>

                    <div className="form-field-register">
                        <form onSubmit={handleSubmit(handleFormRegisterSubmit)}>
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
                                {...register('fullName')}
                                value={fullName}
                                type="text"
                                className="input-field"
                                placeholder="Full Name"
                                onChange={(e) => setFullName(e.target.value)}
                            />
                            <p className="error-msg">
                                {errors.fullName?.message}
                            </p>

                            <input
                                {...register('userName')}
                                value={userName}
                                type="text"
                                className="input-field"
                                placeholder="UserName"
                                onChange={(e) => setUserName(e.target.value)}
                            />
                            <p className="error-msg">
                                {errors.userName?.message}
                            </p>

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

                            <div className="your-contact">
                                People who use our service may have uploaded
                                your contact information to Instagram.
                                <Link to="#">Learn More</Link>
                            </div>

                            <div className="agree-rules">
                                By signing up, you agree to our,
                                <Link to="#">Term</Link> ,
                                <Link to="#">Cookies</Link>
                            </div>

                            <div className="btn-Sign-up">
                                {email === '' ||
                                password === '' ||
                                userName === '' ||
                                fullName === '' ? (
                                    <button
                                        type="submit"
                                        className="disabled"
                                        disabled
                                    >
                                        Sign up
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        variant="contained"
                                        onClick={handleRegisterClick}
                                    >
                                        Sign up
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                <div className="bl-under">
                    <div className="wrap">
                        Have an account?
                        <Link to={config.routes.login} className="high-line">
                            Login
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

export default RegisterPage;
