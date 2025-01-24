import { useEffect } from "react"
import { useSocket } from "../contexts/Socket"

export const useHandleSocket = (socketHandler) => {
    const socket = useSocket();

    useEffect(() => {
        Object.entries(socketHandler).forEach(([event , handler]) => {
            socket.on(event , handler)
        })
        return () => {
            Object.entries(socketHandler).forEach(([event , handler]) => {
                socket.off(event , handler)
            })
        }
    },[])
}