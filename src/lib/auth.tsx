import {configureAuth} from 'react-query-auth';

import storage from "../utils/storage";
import {getUser} from "../features/auth/api/getUser";
import {loginWithEmailAndPassword} from "../features/auth/api/login";
import {registerWithEmailAndPassword} from "../features/auth/api/register";
import {
    CreateUserPropsRequest,
    LoginPropsRequest,
    UserPropsResponse
} from "../features/auth/types";




async function handleUserResponse(data: UserPropsResponse) {
    const { token, user } = data;
    storage.setToken(token);
    return user;
}

async function userFn() {
    if (storage.getToken()) {
        const {user} = await getUser();
        return user;
    }
    return null;
}

async function loginFn(data: LoginPropsRequest) {
    const response = await loginWithEmailAndPassword(data);
    return await handleUserResponse(response);
}

async function registerFn(data: CreateUserPropsRequest) {
    const response = await registerWithEmailAndPassword(data);
    return await handleUserResponse(response);
}

async function logoutFn() {
    storage.clearToken();
    window.location.assign(window.location.origin as unknown as string);
}

export const { useUser, useLogin, useRegister, useLogout, AuthLoader } =
    configureAuth({
        userFn,
        loginFn,
        registerFn,
        logoutFn,
    });
