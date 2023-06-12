import { toast } from 'react-toastify';

const message = (mess) => {
    toast.error(mess, {
        className: 'toast-message',
    });
};

export default message;
