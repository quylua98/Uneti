import * as types from "./types";

export const socketsConnecting = () => {
    return {type: types.SOCKETS_CONNECTING};
};
export const socketsConnect = (token) => {
    return {
        type: types.SOCKETS_CONNECT,
        payload: {
            token: token
        }
    };
};
export const socketsConnected = () => {
    return {type: types.SOCKETS_CONNECTED};
};
export const socketsDisconnecting = () => {
    return {type: types.SOCKETS_DISCONNECTING};
};
export const socketsDisconnect = () => {
    return {type: types.SOCKETS_DISCONNECT};
};
export const socketsDisconnected = () => {
    return {type: types.SOCKETS_DISCONNECTED};
};
export const socketsMessageSending = sendMessage => {
    return {type: types.SOCKETS_MESSAGE_SENDING, messageSend: sendMessage};
};

export const socketsMessageReceiving = receiveMessage => {
    return {
        type: types.SOCKETS_MESSAGE_RECEIVING,
        messageReceive: receiveMessage
    };
};

export const socketsMessageSend = (data, api) => {
    return {
        type: types.SOCKETS_MESSAGE_SEND,
        payload: {
            data,
            api,
        }
    };
};

export const socketsSubscribe = subscribe => {
    return {
        type: types.SOCKETS_MESSAGE_SUBSCRIBE,
        payload: {
            subscribe
        }
    };
};
