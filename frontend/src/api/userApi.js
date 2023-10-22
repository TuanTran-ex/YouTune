import config from '../config';
import { db } from '../config/firebase';
import {
    getDocs,
    collection,
    doc,
    updateDoc,
    getDoc,
} from 'firebase/firestore';

const userCollectionRef = collection(db, config.fireStorePath.users); //users: bang tao

class UserApi {
    getUsers = async () => {
        try {
            const response = await getDocs(userCollectionRef);
            const data = response.docs.map((doc) => {
                return {
                    ...doc.data(),
                    id: doc.id,
                };
            });
            return data;
        } catch (error) {
            console.error(error);
        }
    };

    // when click btn follow / add friend
    updateStatus = async (params) => {
        try {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();

            today =
                mm +
                '/' +
                dd +
                '/' +
                yyyy +
                ' ' +
                today.getHours() +
                ':' +
                today.getMinutes() +
                ':' +
                today.getSeconds();

            const cloneRequestFollow = [...params.requestFollowFriends];
            const cloneItem = { ...cloneRequestFollow[0] };
            cloneItem.status = params.status;
            cloneItem.day_send = today;
            cloneItem.sender_id = params.senderId;
            cloneRequestFollow[0] = cloneItem;

            const getReceiver = doc(db, 'users', params.receiverId);
            await updateDoc(getReceiver, {
                requestFollowFriends:
                    //waitting
                    cloneRequestFollow,
            });

            const docRef = doc(db, 'users', params.receiverId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const obj = {
                    id: params.receiverId,
                    status: docSnap.data().requestFollowFriends[0].status,
                };
                return obj;
            } else return null;
        } catch (error) {
            console.log(error);
        }
    };
}

const userApi = new UserApi();
export default userApi;
