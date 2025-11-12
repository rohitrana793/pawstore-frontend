import dog_logo from "../assets/dog_logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { IconButton } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutUserMutation } from "../features/auth/authApi";
import { toast } from "react-hot-toast";
import { logoutUser } from "../features/auth/authSlice";
import { useContext, useState } from "react";
import { ScrollContext } from "../context/ScrollContext";
import SearchInput from "../features/search/SearchInput";

export default function Header() {
  const { user } = useSelector((state) => state.authSlice);
  const { cart } = useSelector((state) => state.cartSlice);
  const length = cart.length;
  const [userLogout] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { scrollToBreed, scrollToProduct, scrollToBlog } =
    useContext(ScrollContext);

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await userLogout().unwrap();
      dispatch(logoutUser());
      toast.success("User logout successfully");
      nav("/");
    } catch (err) {
      toast.error(err?.data?.message || err.message || "Failed to logout");
    }
  };

  return (
    <div className="w-screen bg-[#fff0d9] py-6 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 flex justify-between items-center relative">
      {/* Logo */}
      <NavLink className="flex items-center gap-3" to={"/"}>
        <img src={dog_logo} alt="" className="h-[35px] w-[35px] object-cover" />
        <h1 className="text-[14px] font-semibold ">Pawstore</h1>
      </NavLink>

      {/* Burger Button for Mobile */}
      <button
        className="text-[#E58608] text-2xl lg:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <i className={`fas ${menuOpen ? "fa-times" : "fa-bars"}`} />
      </button>

      {/* Desktop Menu */}
      <div className="hidden lg:flex items-center gap-10">
        <nav className="flex gap-10 text-[16px]">
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/breed-details"}>Breeds</NavLink>
          <NavLink to={"/product-page"}>Accessories</NavLink>
          <NavLink to={"/blog-details"}>Blog</NavLink>
          <NavLink to={"/contact-details"}>Contact</NavLink>
          {/* <button onClick={scrollToBreed} className="cursor-pointer">Breeds</button>
          <button onClick={scrollToProduct} className="cursor-pointer">Accessories</button>
          <button onClick={scrollToBlog} className="cursor-pointer">Blog</button> */}
        </nav>

        <div>
          <SearchInput />
        </div>

        <div className="space-x-2">
          {user && user?.role === "User" ? (
            <IconButton className="bg-[#E58608]" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt fa-xl" />
            </IconButton>
          ) : (
            <IconButton className="bg-[#E58608]" onClick={() => nav("/login")}>
              <i className="fas fa-user fa-xl" />
            </IconButton>
          )}

          <IconButton
            className="bg-[#E58608]"
            onClick={() => nav("/add-to-cart")}
          >
            <i className="fas fa-shopping-cart fa-xl relative" />
            {user && user?.role === "User" && (
              <span className="h-[14px] w-[14px] bg-white rounded-full absolute bottom-2.5 left-3.5 flex items-center justify-center text-[10px] text-black">
                {length}
              </span>
            )}
          </IconButton>

          <IconButton
            className="bg-[#E58608]"
            onClick={() => nav("/user-order")}
          >
            <i className="fas fa-receipt fa-xl" />
          </IconButton>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#fff0d9] shadow-lg z-50 transform transition-transform duration-300 ease-in-out
        ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-end p-4">
          <button
            className="text-[#E58608] text-2xl"
            onClick={() => setMenuOpen(false)}
          >
            <i className="fas fa-times" />
          </button>
        </div>

        <nav className="flex flex-col gap-6 mt-6 px-6">
          <NavLink to={"/"} onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to={"/breed-details"} onClick={() => setMenuOpen(false)}>
            Breeds
          </NavLink>
          <NavLink to={"/product-page"} onClick={() => setMenuOpen(false)}>
            Accessories
          </NavLink>
          <NavLink to={"/blog-details"} onClick={() => setMenuOpen(false)}>
            Blog
          </NavLink>
          <NavLink to={"/contact-details"} onClick={() => setMenuOpen(false)}>
            Contact
          </NavLink>
        </nav>

        <div className="px-6 mt-6">
          <SearchInput />
        </div>

        <div className="flex items-center gap-4 px-6 mt-6">
          {user && user?.role === "User" ? (
            <IconButton
              className="bg-[#E58608]"
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
            >
              <i className="fas fa-sign-out-alt fa-lg" />
            </IconButton>
          ) : (
            <IconButton
              className="bg-[#E58608]"
              onClick={() => {
                nav("/login");
                setMenuOpen(false);
              }}
            >
              <i className="fas fa-user fa-lg" />
            </IconButton>
          )}

          <div className="relative">
            <IconButton
              className="bg-[#E58608]"
              onClick={() => {
                nav("/add-to-cart");
                setMenuOpen(false);
              }}
            >
              <i className="fas fa-shopping-cart fa-lg" />
            </IconButton>
            {user && user?.role === "User" && (
              <span className="h-[14px] w-[14px] bg-white rounded-full absolute top-1 right-1 flex items-center justify-center text-[10px] text-black">
                {length}
              </span>
            )}
          </div>

          <IconButton
            className="bg-[#E58608]"
            onClick={() => {
              nav("/user-order");
              setMenuOpen(false);
            }}
          >
            <i className="fas fa-receipt fa-lg" />
          </IconButton>
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </div>
  );
}
