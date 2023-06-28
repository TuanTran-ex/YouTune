import { yupResolver } from '@hookform/resolvers/yup';
import config from 'config';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoIosArrowBack } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { profileActions } from '../profileSlice';
import './ChangePassword.scss';

const schema = yup
    .object({
        oldPassword: yup
            .string()
            .required('Old password is required!')
            .min(6, 'Min is 6')
            .max(55, 'Max is 55'),

        newPassword: yup
            .string()
            .required('New password is required!')
            .min(6, 'Min is 6')
            .max(255),
        confirmPassword: yup
            .string()
            .required('Please confirm your new password!')
            .min(6, 'Min is 6')
            .max(255),
    })
    .required();

function ChangePassword() {
    const dispatch = useDispatch();

    const [editMode, setEditMode] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        dispatch(profileActions.fetchProfileData());
    }, []);

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

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
        resolver: yupResolver(schema),
    });
    const handleFormSubmit = () => {};

    const handleClickBtnChangePassword = () => {
        if (
            oldPassword === '' ||
            newPassword === '' ||
            confirmPassword === ''
        ) {
            toast.warning('Please enter all fields', {
                className: 'toast_message',
            });
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.warning('Password is not matched!', {
                className: 'toast_message',
            });
            return;
        }

        dispatch(
            profileActions.updatePassword({
                old_password: oldPassword,
                new_password: newPassword,
            }),
        );
    };

    const handleClickBtnReset = () => {};

    return (
        <div className="prof__change-password">
            <div className="change-password">
                <div className="options">
                    {viewPort.width <= 1300 ? (
                        <Link to={config.routes.profile} className="back-icon">
                            <IoIosArrowBack className="icon" />
                        </Link>
                    ) : (
                        ''
                    )}

                    <ul className="list-options">
                        <li className="item">
                            <Link
                                className={editMode ? 'active' : 'no-active'}
                                to={config.routes.uploadProfile}
                                onClick={() => setEditMode(true)}
                            >
                                Edit profile
                            </Link>
                        </li>
                        <li className="item">
                            <Link
                                className={!editMode ? 'active' : 'no-active'}
                                to="#"
                                onClick={() => setEditMode(false)}
                            >
                                Change password
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="edit-prof">
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <div className="edit-prof__row usename-row">
                            <div className="left-column">
                                <p className="title">Old Password</p>
                            </div>
                            <div className="right-column">
                                <input
                                    {...register('oldPassword')}
                                    value={oldPassword ? oldPassword : ''}
                                    type="password"
                                    className="prof-input"
                                    placeholder="Old Password"
                                    onChange={(e) =>
                                        setOldPassword(e.target.value)
                                    }
                                />
                                <p className="error-active">
                                    {errors.oldPassword?.message}
                                </p>
                            </div>
                        </div>
                        <div className="edit-prof__row usename-row">
                            <div className="left-column">
                                <p className="title">New Password</p>
                            </div>
                            <div className="right-column">
                                <input
                                    {...register('newPassword')}
                                    value={newPassword ? newPassword : ''}
                                    type="password"
                                    className="prof-input"
                                    placeholder="New Password"
                                    onChange={(e) =>
                                        setNewPassword(e.target.value)
                                    }
                                />
                                <p className="error-active">
                                    {errors.newPassword?.message}
                                </p>
                            </div>
                        </div>
                        <div className="edit-prof__row usename-row">
                            <div className="left-column">
                                <p className="title">Confirm Password</p>
                            </div>
                            <div className="right-column">
                                <input
                                    {...register('comfirmPassword')}
                                    value={
                                        confirmPassword ? confirmPassword : ''
                                    }
                                    type="password"
                                    className="prof-input"
                                    placeholder="Confirm Password"
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                />
                                <p className="error-active">
                                    {errors.oldPassword?.message}
                                </p>
                            </div>
                        </div>

                        <div className="edit-prof__row btn">
                            <div className="left-column"></div>
                            <div className="right-column edit__btn-wrap">
                                <div className="btn-save">
                                    <button
                                        type="submit"
                                        className="button"
                                        onClick={handleClickBtnChangePassword}
                                    >
                                        Save
                                    </button>
                                </div>

                                <div className="btn-reset">
                                    <Link to="#" onClick={handleClickBtnReset}>
                                        Reset Password
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;
