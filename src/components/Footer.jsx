import { forwardRef, useContext } from "react";
import { NavLink } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { PiInstagramLogoFill } from "react-icons/pi";
import { BsArrowDown } from "react-icons/bs";
import { ScrollContext } from "../context/ScrollContext";

const Footer = forwardRef((props, ref) => {
  const { scrollToUp } = useContext(ScrollContext);
  return (
    <div className="relative bg-[#f6faff] w-screen">
      <div ref={ref} className="py-10 px-30  flex flex-col gap-15">
        <div className="grid grid-cols-3">
          <div className="flex flex-col gap-4">
            <NavLink to={"/"}>Home</NavLink>
            <NavLink>About</NavLink>
            <NavLink>Services</NavLink>
            <NavLink>Team</NavLink>
            <NavLink>FAQs</NavLink>
            <NavLink>Careers</NavLink>
            <NavLink>Contact Us</NavLink>
          </div>
          <div>
            <h2 className="font-semibold text-[18px] mb-2">Contact</h2>
            <p className="text-[15px]">
              Mahendrapool <br />
              Pokhara, Nepal <br />
              +977-[0]61-328463
            </p>
          </div>
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d28249.75242185909!2d85.36702193862303!3d27.741388800000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2snp!4v1761063882014!5m2!1sen!2snp"
              width="400"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-[10px]"
            ></iframe>
          </div>
        </div>
        <div className="flex justify-between text-[15px]">
          <p>Copyright @ 2025 Pawstore</p>
          <div className="flex items-center gap-4">
            <NavLink>
              <FaFacebookF className="text-[25px] text-blue-700" />
            </NavLink>
            <NavLink>
              <FaYoutube className="text-[25px] text-red-700" />
            </NavLink>
            <NavLink>
              <PiInstagramLogoFill className="text-[25px] text-purple-700" />
            </NavLink>
          </div>
          <p className="text-[15px]">Created by Brandbuilder</p>
        </div>
      </div>
      <div
        className="absolute right-5 top-50 bg-[#FFFFFF] h-[70px] w-[70px] rounded-full shadow-xl flex items-center justify-center"
        onClick={scrollToUp}
      >
        <BsArrowDown className="text-[35px] rotate-180" />
      </div>
    </div>
  );
});

export default Footer;
