import { Formik } from "formik";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export default function SearchInput() {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div>
      <Formik
        initialValues={{
          search: "",
        }}
        onSubmit={(val, { resetForm }) => {
          if (pathname === "/") {
            nav(`/search-page?search=${val.search}`);
          } else {
            setSearchParams({ search: val.search });
          }
        }}
      >
        {({ handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit} className="">
            <div className="relative w-[250px]">
              <input
                name="search"
                onChange={handleChange}
                placeholder="Search for pets..."
                className="w-full h-[40px] rounded-full bg-white pl-5 pr-10 text-[14px] border border-transparent hover:border-gray-300 outline-none focus:border-gray-400 transition-all"
              />

              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <i className="fas fa-search" />
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
