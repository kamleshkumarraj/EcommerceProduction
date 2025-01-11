import { createContext, useContext, useMemo } from 'react'
import {io} from 'socket.io-client'
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getSelf } from '../store/slices/selfHandler.slice';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext)?.socket

export const SocketProvider = ({children}) => {
    const user = useSelector(getSelf)
    const socket = useMemo(() => {
        const socket = io('http://localhost:2000', {withCredentials : true});
        return socket;
    },[user]);

    socket.on('welcome message', (message) => {
        console.log(message);
    });

    socket.on('error', (message) => {
        console.log(message);
    });

    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    )
}

SocketProvider.propTypes = {
    children: PropTypes.node.isRequired
}