import BlogCard from "./BlogCard";

export default function BlogDetails() {
  return (
    <div className="flex flex-col items-center gap-10 mb-25 pt-6 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">
      <div className="flex flex-col items-center text-center gap-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">
          Blog Section
        </h2>
        <p className="text-base sm:text-lg text-black max-w-2xl">
          Description of blog — explore articles, guides, and stories that
          inspire.
        </p>
      </div>

      <div className="w-full">
        <BlogCard />
      </div>
    </div>
  );
}
