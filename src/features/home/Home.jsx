import dogImage from "../../assets/dog.png";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { NavLink } from "react-router";
import BreedDetails from "../breed/BreedDetails";
import ProductDetail from "../product/ProductDetail";
import BlogDetails from "../blog/BlogDetails";
import Subscribe from "../subscribe/Subscribe";
import { useContext, useRef } from "react";
import { ScrollContext } from "../../context/ScrollContext";
import { BsArrowDown } from "react-icons/bs";

export default function Home() {
  const { breedRef, productRef, blogRef, scrollToDown } =
    useContext(ScrollContext);

  const carouselRef = useRef(null);

  const handlePrev = () => {
    carouselRef.current?.previous();
  };

  const handleNext = () => {
    carouselRef.current?.next();
  };

  const images = [dogImage];

  return (
    <>
      <div className="py-10 px-30 bg-[#fff0d9] relative mb-10">
        <div className="grid grid-cols-2">
          <div ref={carouselRef} className="flex flex-col gap-15">
            {images.map((img, i) => (
              <div key={i} className="relative">
                <div className="bg-[#fcd9a4] h-[36px] w-[36px] rounded-full absolute top-[60px] left-[-60px]" />
                <div className="bg-[#fcd9a4] h-[36px] w-[36px] rounded-full absolute top-[0px] left-[360px]" />
                <div className="bg-[#fcd9a4] h-[36px] w-[36px] rounded-full absolute top-[260px] left-[410px]" />

                <div className="bg-[#fcd9a4] rounded-full h-[380px] w-[380px] relative">
                  <img
                    src={img}
                    alt="dog"
                    className="w-[382px] h-[521px] absolute bottom-4 right-2"
                  />
                </div>
              </div>
            ))}
            <div className="flex items-center gap-20">
              <ArrowLeftIcon
                className="h-5 w-5 cursor-pointer hover:text-gray-700"
                onClick={handlePrev}
              />
              <h5 className="text-[18px] font-medium">Corgi (2 months)</h5>
              <ArrowRightIcon
                className="h-5 w-5 cursor-pointer hover:text-gray-700"
                onClick={handleNext}
              />
            </div>
          </div>

          <div>
            <div className="py-10 px-25 flex flex-col gap-10">
              <h3 className="text-[36px] font-bold">
                Everybody needs a friend in Life.
              </h3>
              <p className="text-[18px]">
                The Corgi is intelligent, quick and curious. It is a kind,
                adventurous breed which shows a large measure of independence.
                They are good with children and normally kind with strangers.
              </p>
              <div>
                <NavLink
                  to={"/buy-breed"}
                  className="bg-[#E58608] rounded-[20px] h-[40px] w-[125px] capitalize text-[16px] font-light flex justify-center items-center text-white"
                >
                  Buy Me
                </NavLink>
              </div>
            </div>

            <div className="flex gap-5 justify-end">
              <NavLink to={"/"}>
                <FaFacebookF />
              </NavLink>
              <NavLink to={"/"}>
                <FaYoutube />
              </NavLink>
              <NavLink to={"/"}>
                <FaInstagram />
              </NavLink>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div
            className="bg-[#FFFFFF] h-[70px] w-[70px] absolute bottom-[-35px] rounded-full shadow-xl flex justify-center items-center cursor-pointer"
            onClick={scrollToDown}
          >
            <BsArrowDown className="text-[35px]" />
          </div>
        </div>
      </div>

      <div ref={breedRef}>
        <BreedDetails />
      </div>

      <div ref={productRef}>
        <ProductDetail />
      </div>

      <div ref={blogRef}>
        <BlogDetails />
      </div>

      <div>
        <Subscribe />
      </div>
    </>
  );
}
