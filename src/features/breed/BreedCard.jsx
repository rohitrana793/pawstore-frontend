import { Avatar } from "@material-tailwind/react";
import { useGetBreedQuery } from "./breedApi";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router";

export default function BreedCard() {
  const { data, isLoading, error } = useGetBreedQuery();
  const nav = useNavigate();

  if (isLoading)
    return (
      <div className="p-4 sm:p-6">
        <Skeleton height={20} count={6} />
      </div>
    );

  if (error) {
    return (
      <h1 className="text-red-500 text-lg font-semibold text-center">
        {error?.data?.message ||
          error?.error ||
          "Something went wrong. Please check your backend URL."}
      </h1>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-5">
      {data?.data.map((breed) => {
        return (
          <div
            key={breed._id}
            className="flex flex-col items-center gap-3 cursor-pointer"
            onClick={() => nav(`/breed-page/${breed._id}`)}
          >
            <Avatar
              src={breed.image}
              alt="avatar"
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36"
            />
            <h5 className="text-sm sm:text-base md:text-lg">{breed.name}</h5>
          </div>
        );
      })}
    </div>
  );
}
