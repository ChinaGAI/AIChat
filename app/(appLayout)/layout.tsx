import Header from "../layout/header";
import { ModalContextProvider } from "@/context/modal-context";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ModalContextProvider>
        <Header />
        <div className="pt-[calc(3.5rem-1px)] min-h-screen">{children}</div>
      </ModalContextProvider>
    </>
  );
}
