import { Button } from "@material-tailwind/react";
import product1 from "../../assets/product1.jpg";
import product2 from "../../assets/product2.jpg";
import product3 from "../../assets/product3.jpg";
import product4 from "../../assets/product4.jpg";
import product5 from "../../assets/product5.jpg";
import product6 from "../../assets/product6.jpg";
import { useNavigate } from "react-router-dom";

export default function ProductDetail() {
  const nav = useNavigate();

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 mb-20 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="flex flex-col gap-6 sm:gap-8">
        <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-bold">
          Pet Products
        </h2>

        <p className="text-sm sm:text-base lg:text-[18px] text-black leading-relaxed">
          All products are designed for ease of use and durability, as well as
          looking good. You can choose your own colours to make your item
          unique.
        </p>

        <Button
          className="bg-[#E58608] rounded-[20px] h-[40px] w-[125px] text-[16px] font-light flex justify-center items-center cursor-pointer"
          onClick={() => nav("/product-page")}
        >
          See More
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5">
        {[product1, product2, product3, product4, product5, product6].map(
          (img, idx) => (
            <div
              key={idx}
              className="w-full h-36 sm:h-44 md:h-48 overflow-hidden rounded-lg shadow-sm"
            >
              <img
                src={img}
                alt={`product-${idx}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          )
        )}
      </div>
    </div>
  );
}
