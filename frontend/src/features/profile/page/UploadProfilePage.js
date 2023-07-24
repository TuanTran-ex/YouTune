import { yupResolver } from '@hookform/resolvers/yup';
import { Button, LinearProgress } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import Image from 'components/Image/Images';
import config from 'config';
import {
    cityActions,
    selectCityList,
    selectWardList,
} from 'features/city/citySlice';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoIosArrowBack } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import thumbnail from '../../../components/Image/thumbnail.png';
import {
    profileActions,
    selectAvatar,
    selectLoading,
    selectProfileData,
} from '../profileSlice';
import './UploadProfilePage.scss';
import { isXM } from 'utils/mediaResponse';

const schema = yup
    .object({
        username: yup
            .string()
            .required('Please enter your username!')
            .min(3)
            .typeError('Please enter a valid username!'),
        full_name: yup
            .string()
            .required('Please enter your full name!')
            .min(3)
            .max(255),
        address: yup
            .string()
            .required('Please enter your address!')
            .min(3)
            .max(255),
        gender: yup.string().required('Please choose your gender!').nullable(),
        city: yup
            .number()
            .required('Please choose your city!')
            .transform((value) => (isNaN(value) ? undefined : value))
            .nullable(),
        ward: yup
            .number()
            .required('Please choose your ward!')
            .transform((value) => (isNaN(value) ? undefined : value))
            .nullable(),
    })
    .required();

function UploadProfilePage() {
    const loading = useAppSelector(selectLoading);
    const userProfile = useAppSelector(selectProfileData);
    const cityList = useAppSelector(selectCityList);
    const wardList = useAppSelector(selectWardList);
    const avatar = useAppSelector(selectAvatar);
    const dispatch = useDispatch();

    const [editMode, setEditMode] = useState(true);
    const [gender, setGender] = useState();
    const [userName, setUserName] = useState();
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState();
    const [ward, setWard] = useState();
    const [address, setAddress] = useState('');
    const [avtImage, setAvtImage] = useState();

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

    // Media responsive
    const viewPort = useViewport();

    useEffect(() => {
        dispatch(profileActions.fetchProfileData());
        dispatch(cityActions.fetchCityList());
    }, []);

    useEffect(() => {
        if (city) {
            dispatch(cityActions.fetchWardListOfCity(city?.value));
        }
    }, [city]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            username: '',
            full_name: '',
            gender: null,
            phone: '',
            ward: null,
            city: null,
            address: '',
        },
        resolver: yupResolver(schema),
    });

    const handleFormLoginSubmit = () => {};

    const genderOptions = [
        { value: '0', label: 'Male' },
        { value: '1', label: 'Female' },
        { value: '2', label: 'Other' },
    ];

    const cityOptions = cityList.map((item) => ({
        value: item.id,
        label: item.name,
    }));

    let wardOptions;
    if (Array.isArray(wardList)) {
        wardOptions = wardList?.map((item) => ({
            value: item.id,
            label: item.name,
        }));
    }

    //Handle value
    const handleGenderValue = (genderId) => {
        const genderValue = genderOptions.find(
            (item) => item.value === genderId,
        );
        return genderValue;
    };

    const handleCityValue = (cityId) => {
        const cityValue = cityOptions.find((item) => item.value === cityId);
        return cityValue;
    };

    const handleWardValue = (wardId) => {
        let wardValue;
        if (Array.isArray(wardOptions)) {
            wardValue = wardOptions.find((item) => item.value === wardId);
        }
        return wardValue;
    };

    useEffect(() => {
        const genderValue = handleGenderValue(userProfile?.gender);
        const cityValue = handleCityValue(userProfile?.address?.ward?.city?.id);

        setAvtImage(userProfile?.upload?.url);
        setGender(genderValue);
        setCity(cityValue);
        setUserName(userProfile?.username);
        setFullName(userProfile?.full_name);
        setPhone(userProfile?.phone);
        setAddress(userProfile?.address?.address);
        reset({
            username: userName,
            full_name: fullName,
            gender: genderValue?.value,
            phone: phone,
            city: cityValue?.value,
            address: address,
        });
    }, [userProfile, cityList, reset]);

    useEffect(() => {
        const wardValue = handleWardValue(userProfile?.address?.ward?.id);
        setWard(wardValue);
        reset({
            ward: wardValue?.value,
        });
    }, [wardList, reset]);

    useEffect(() => {
        setAvtImage(avatar);
    }, [avatar]);

    const handleGenderChange = (e) => {
        const gender = handleGenderValue(e.value);
        setGender(gender);
    };

    const handleCityChange = (e) => {
        const city = handleCityValue(e.value);
        setCity(city);
        setWard(null);
    };

    const handleWardChange = (e) => {
        const ward = handleWardValue(e.value);
        setWard(ward);
    };

    const handleClickBtnEditProf = () => {
        if (
            userName === '' ||
            fullName === '' ||
            gender?.value === undefined ||
            city?.value === undefined ||
            ward?.value === undefined ||
            address === undefined ||
            address === ''
        ) {
            toast.warning('Please enter all fields', {
                className: 'toast_message',
            });
            return;
        }

        dispatch(
            profileActions.updateProfile({
                username: userName,
                full_name: fullName,
                gender: gender.value,
                phone: phone,
                m_ward_id: ward.value,
                address: address,
            }),
        );
    };

    const handleChangeAvt = (e) => {
        const formData = new FormData();
        formData.append('model', 'App\\Models\\User');
        formData.append('id', userProfile?.id);
        formData.append('type', 0);
        formData.append('file', e.target.files[0]);
        dispatch(profileActions.fetchProfileImage(formData));
    };

    return (
        <div className="prof__edit-wrapper">
            {loading && <LinearProgress className="loading" color="success" />}
            <div className="edit__main-block">
                <div className="options">
                    {viewPort.width <= isXM ? (
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
                                to="#"
                                onClick={() => setEditMode(true)}
                            >
                                Edit profile
                            </Link>
                        </li>
                        <li className="item">
                            <Link
                                className={!editMode ? 'active' : 'no-active'}
                                to={config.routes.changePassword}
                                onClick={() => setEditMode(false)}
                            >
                                Change password
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="edit-prof">
                    <div className="profile-photo">
                        <div className="left-column">
                            <Image
                                src={avtImage ?? thumbnail}
                                alt="avatar"
                                className="avatar"
                            />
                        </div>
                        <div className="right-column">
                            <p className="your-username">
                                {userProfile?.username ?? ''}
                            </p>
                            <Button className="btn-upload" component="label">
                                <p>C</p>hange your photo
                                <input
                                    type="file"
                                    hidden
                                    onChange={(e) => handleChangeAvt(e)}
                                />
                            </Button>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(handleFormLoginSubmit)}>
                        <div className="edit-prof__row usename-row">
                            <div className="left-column">
                                <p className="title">Username</p>
                            </div>
                            <div className="right-column">
                                <input
                                    {...register('username')}
                                    value={userName ? userName : ''}
                                    type="text"
                                    className="prof-input"
                                    placeholder="Username"
                                    onChange={(e) =>
                                        setUserName(e.target.value)
                                    }
                                />
                                <p className="error-active">
                                    {errors.username?.message}
                                </p>
                            </div>
                        </div>

                        <div className="edit-prof__row fullname-row">
                            <div className="left-column">
                                <p className="title">Full name</p>
                            </div>
                            <div className="right-column">
                                <input
                                    {...register('full_name')}
                                    value={fullName ? fullName : ''}
                                    type="text"
                                    className="prof-input"
                                    placeholder="Full name"
                                    onChange={(e) =>
                                        setFullName(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div className="edit-prof__row gender-row">
                            <div className="left-column">
                                <p className="title">Gender</p>
                            </div>
                            <div className="right-column select">
                                <Select
                                    {...register('gender')}
                                    name="gender"
                                    value={gender}
                                    options={genderOptions}
                                    onChange={(e) => handleGenderChange(e)}
                                    className="prof-select"
                                    placeholder="Gender"
                                />

                                {gender ? (
                                    ''
                                ) : (
                                    <p className="error-active">
                                        {errors.gender?.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="edit-prof__row email-row">
                            <div className="left-column">
                                <p className="title">Email</p>
                            </div>
                            <div className="right-column">
                                <input
                                    value={userProfile?.email ?? ''}
                                    type="text"
                                    className="prof-input"
                                    placeholder="Email"
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="edit-prof__row phone-row">
                            <div className="left-column">
                                <p className="title">Phone</p>
                            </div>
                            <div className="right-column">
                                <input
                                    value={phone ? phone : ''}
                                    type="text"
                                    className="prof-input"
                                    placeholder="Phone number"
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="edit-prof__row country-row">
                            <div className="left-column">
                                <p className="title">Country</p>
                            </div>
                            <div className="right-column">
                                <input
                                    value="Viet Nam"
                                    disabled
                                    type="text"
                                    className="prof-input"
                                    placeholder="Phone number"
                                />
                            </div>
                        </div>

                        <div className="edit-prof__row city-row">
                            <div className="left-column">
                                <p className="title">City</p>
                            </div>
                            <div className="right-column select">
                                <Select
                                    name="city"
                                    value={city}
                                    {...register('city')}
                                    options={cityOptions}
                                    onChange={(e) => handleCityChange(e)}
                                    className="prof-select"
                                    placeholder="City"
                                />

                                {city ? (
                                    ''
                                ) : (
                                    <p className="error-active">
                                        {errors.city?.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="edit-prof__row ward-row">
                            <div className="left-column">
                                <p className="title">Ward</p>
                            </div>
                            <div className="right-column select">
                                <Select
                                    {...register('ward')}
                                    name="ward"
                                    value={ward}
                                    options={wardOptions}
                                    onChange={(e) => handleWardChange(e)}
                                    className="prof-select"
                                    placeholder="Ward"
                                />

                                {ward ? (
                                    ''
                                ) : (
                                    <p className="error-active">
                                        {errors.ward?.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="edit-prof__row street-row">
                            <div className="left-column">
                                <p className="title">Address</p>
                            </div>
                            <div className="right-column">
                                <input
                                    {...register('address')}
                                    value={address ? address : ''}
                                    type="text"
                                    className="prof-input"
                                    placeholder="Address"
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                                <p className="error-active">
                                    {errors.address?.message}
                                </p>
                            </div>
                        </div>
                        <div className="edit-prof__row">
                            <div className="left-column"></div>
                            <div className="right-column">
                                <button
                                    type="submit"
                                    className="btn-submit"
                                    onClick={handleClickBtnEditProf}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UploadProfilePage;
