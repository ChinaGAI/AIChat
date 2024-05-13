import CountdownRedirect from "./components/base/countdown-redirect";

const NotFount = () => {
  return (
    <div className="max-w-2xl min-h-screen mx-auto flex flex-col items-center">
      <img src="/images/404.svg" alt="" />
      <CountdownRedirect />
    </div>
  );
};

export default NotFount;
