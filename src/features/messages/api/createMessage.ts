import {SentMessageProps} from "../types";
import axios, {HttpStatusCode} from "axios";

export const sendMessage = (
    data: SentMessageProps
): Promise<HttpStatusCode> => {
    return axios.post('http://10.154.222.61:8080/Message', data);
};