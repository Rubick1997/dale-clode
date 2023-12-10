import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <header className="flex justify-between p-5 sticky top-0 bg-white z-50 shadow-md items-center">
      <div className="flex space-x-2 items-center">
        <Image src="/favicon.ico" width={30} height={30} alt="logo" />
        <div>
          <h1 className="font-bold">
            Dalle <span className="text-violet-500">AI</span> Image generator
          </h1>
          <h2 className="text-xs">Power by DALL-E and Microsoft Azure!</h2>
        </div>
      </div>
      <div className="text-xs md:text-base">
        <Link
          href="https://github.com/Rubick1997/dale-clode"
          className="px-2 font-light text-right"
          target="_blank"
        >
          Github Repo
        </Link>
      </div>
    </header>
  );
}
export default Header;
