import config from '../config';
import { db } from '../config/firebase'
import { getDocs, collection, doc } from 'firebase/firestore';


const userCollectionRef = collection(db, config.fireStorePath.users)

class UserApi {
    getUsers = async (params) => {
        try {
            const response = await getDocs(userCollectionRef);
            const data = response.docs.map(doc => ({...doc.data(), id: doc.id}));
            console.log('data::', data);
            return data;
        } catch (error) {
            console.error(error);
        }
    };
}

const userApi = new UserApi();
export default userApi;
