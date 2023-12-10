import Image from "next/image";

function Header() {
  return (
    <header>
      <div className="flex space-x-2 items-center">
        <Image src="/favicon.ico" width={30} height={30} alt="logo" />
        <div>
          <h1 className="font-bold">
            Dalle <span className="text-violet-500">AI</span> Image generator
          </h1>
          <h2 className="text-xs">Power by DALL-E and Microsoft Azure!</h2>
        </div>
      </div>
      <div></div>
    </header>
  );
}
export default Header;
