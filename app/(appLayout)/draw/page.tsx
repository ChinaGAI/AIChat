import Image from "next/image";

const Draw = () => {
  return (
    <div className="flex flex-col w-full h-[calc(100vh-56px)] justify-center items-center text-text-3">
      <Image src="/images/developer.svg" alt="" width={512} height={512} />
      <div>开发中,即将开放</div>
    </div>
  );
};

export default Draw;
