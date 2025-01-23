import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [modalType, setModalType] = useState(null);
    const [loginMessage, setLoginMessage] = useState('');

    const openModal = (type) => setModalType(type);
    const closeModal = () => {
        setModalType(null);
    };

    return (
        <ModalContext.Provider
            value={{
                modalType,
                openModal,
                closeModal,
                loginMessage,
                setLoginMessage,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => useContext(ModalContext);
