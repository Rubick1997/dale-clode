"use client";

import { fetchImages } from "@/lib";
import Image from "next/image";
import useSWR from "swr";

type ImageType = {
  name: string;
  url: string;
};

function Images() {
  const {
    data: images,
    isLoading,
    mutate: refreshImages,
    isValidating,
  } = useSWR<{ imageUrls: ImageType[] }>("images", fetchImages, {
    revalidateOnFocus: false,
  });

  return (
    <div>
      <button
        disabled={!isLoading && isValidating}
        onClick={() => refreshImages(images)}
        className="fixed bottom-10 right bg-violet-400/90 text-white px-5 py-3 rounded-md hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400 font-bold z-20 disabled:text-gray-300 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {!isLoading && isValidating ? "Refreshing..." : "Refresh Images"}
      </button>
      {isLoading && (
        <p className="animate-pulse text-center pb-7 font-extralight">
          Loading <span className="text-violet-400">AI</span>Generated Images...
        </p>
      )}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 ld:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 px-0 md:px-10">
        {images?.imageUrls?.map(({ url, name }, i) => (
          <div
            key={name}
            className={`relative cursor-help hover:scale-[103%] transition-transform duration-200 ease-in-out ${
              (i === 0 || i % 11 === 0) && "md:col-span-2 md:row-span-2"
            }`}
          >
            <div className="absolute flex justify-center items-center w-full h-full bg-white opacity-0 hover:opacity-80 transition-opacity duration-200 z-10">
              <p className="text-center font-light text-lg p-5">
                {name.split("_").shift()?.toString().split(".").shift()}
              </p>
            </div>
            <Image
              src={url}
              alt={name}
              height={800}
              width={800}
              className="w-full rounded-sm shadow-2xl drop-shadow-lg-z-10"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
export default Images;
