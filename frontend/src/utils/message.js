import { toast } from 'react-toastify';

export const messageError = (mess) => {
    toast.error(mess);
};

export const messageSuccess = (mess) => {
    toast.success(mess);
};

export const messageWarning = (mess) => {
    toast.warning(mess);
};
