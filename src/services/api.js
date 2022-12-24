import axios from 'axios';
import CONFIG from "../../config/config";
import AsyncStorage from '@react-native-async-storage/async-storage'

axios.defaults.baseURL = CONFIG.backendUrl;

let userId = null;

const getUserId = async () => {
    userId = await AsyncStorage.getItem('todo-app:userId');
}
const setUserId = async (id) => {
    userId = id;
    await AsyncStorage.setItem('todo-app:userId', id);
}
async function request(settings) {
    try {
        const response = await axios[settings.type](settings.path, settings.data);

        return response.data;
    } catch (err) {
        let message = '';

        try {
            message = err?.response?.data;
        } catch (error) {
            console.log(error);
        }

        throw Error(message || err);
    }
}

const aunteficate = async () => {
    await getUserId();

    if (!userId) {
        const responseData = await request({
            type: 'get',
            path: 'user/auth',
        });
        await setUserId(responseData.userId);
    }

    return userId;
};

const getList = async () => {
    return request({
        type: 'get',
        path: `folders?userId=${userId}`,
    });
};

const addList = async (folderName, emoji) => {
    return request({
        type: 'post',
        path: `folders`,
        data: {
            folderName,
            emoji,
            userId,
        }
    });
};

const removeFolder = async (folderId) => {
    return request({
        type: 'delete',
        path: `folders?folderId=${folderId}&userId=${userId}`,
    });
};

const addToDo = async (folderId, title) => {
    return request({
        type: 'post',
        path: `todos`,
        data: {
            title,
            folderId,
            userId,
        }
    });
};

const removeToDo = async (todoId) => {
    return request({
        type: 'delete',
        path: `todos?todoId=${todoId}&userId=${userId}`,
    });
};

const changeComplete = async (todoId, complete) => {
    return request({
        type: 'get',
        path: `todos/changeComplete?todoId=${todoId}&complete=${complete}&userId=${userId}`,
    });
};


export {
    aunteficate, getList, addList, addToDo, removeFolder, removeToDo, changeComplete,

};
