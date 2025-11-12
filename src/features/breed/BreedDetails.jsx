import BreedCard from "./BreedCard";

export default function BreedDetails() {
  return (
    <div className="flex flex-col gap-10 mb-20 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 pt-5">
      <div className="flex flex-col items-center gap-3 md:gap-5 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          Dog breed
        </h2>
        <p className="text-base sm:text-lg md:text-[18px]">
          Find yourself a perfect friend from a wide variety of choices.
        </p>
      </div>
      <BreedCard />
    </div>
  );
}
