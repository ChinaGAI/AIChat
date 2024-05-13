"use client";
import LoginModal from "@/app/components/modal/login-modal";
import { createContext, useContext, useState } from "react";

type ModalContextProps = {
  openLoginModal: () => void;
};

const ModalContext = createContext<ModalContextProps>({
  openLoginModal: () => {},
});

export const ModalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loginModalVisible, setLoginModalVisible] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        openLoginModal: () => setLoginModalVisible(true),
      }}
    >
      {children}
      <LoginModal
        visible={loginModalVisible}
        setVisible={setLoginModalVisible}
      />
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  return useContext(ModalContext);
};
