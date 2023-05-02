import {getToken, removeToken} from "./localStorage";
import axios from "axios";

const handleResponse = (response: any) => {
    if (response.status === 401) {
        removeToken();
        // TODO: Redirect on login.
        window.location.reload();
    }
    if (response.data.status !== 'OK') {
        return response.data;
    }
    return response;
}

export const getHeaderInfo = async function () {
    let token = getToken();
    return {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
};

export const apiPost = async function (body: any, url: string) {
    const backendUrl = import.meta.env.BASE_URL;
    let header = await getHeaderInfo();
    try {
        let response = await axios.post(backendUrl + url, body, header);
        return handleResponse(response);
    } catch (err: any) {
        return handleResponse(err.response);
    }
};

export const apiGet = async function (params: any = {}, url: any) {
    const backendUrl = import.meta.env.BASE_URL;
    let header = await getHeaderInfo();
    try {
        let response = await axios.get(backendUrl + url, {...header, params});
        return handleResponse(response);
    } catch (err: any) {
        throw handleResponse(err.response);
    }
};

export const apiPut = async function (body: any, url: any) {
    const backendUrl = import.meta.env.BASE_URL;
    let header = await getHeaderInfo();
    try {
        let response = await axios.put(backendUrl + url, body, header);
        return handleResponse(response);
    } catch (err: any) {
        throw handleResponse(err.response);
    }
};

export const apiDelete = async function (url: any) {
    const backendUrl = import.meta.env.BASE_URL;
    let header = await getHeaderInfo();
    try {
        let response = await axios.delete(backendUrl + url, header);
        return handleResponse(response);
    } catch (err: any) {
        throw handleResponse(err.response);
    }
};