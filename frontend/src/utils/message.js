import { toast } from 'react-toastify';

export const messageError = (mess) => {
    toast.error(mess, {
        className: 'toast_message',
    });
};

export const messageSuccess = (mess) => {
    toast.success(mess, {
        className: 'toast_message',
    });
};

export const messageWarning = (mess) => {
    toast.warning(mess, {
        className: 'toast_message',
    });
};
