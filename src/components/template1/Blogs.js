import React from "react";
import BlogItem from "./BlogItem";

function Blogs() {
  return (
    <section className="max-w-7xl m-auto px-8 sm:px-12 mt-28 text-center md:text-left flex flex-col items-center">
      <h2 className="text-4xl font-bold">Contents Strategies</h2>
      <p className="font-medium mt-2">
        We focus on ergonomics and meeting you where you work. It's only a
        keystroke away.
      </p>
      <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <BlogItem
          imgSrc="../img/template1/blog-1.jpg"
          author="Wahid Ari"
          date="03 Mar 2023"
          title="Increasing Prosperity With Positive Thinking"
        />
        <BlogItem
          imgSrc="../img/template1/blog-2.jpg"
          author="Niket Singh"
          date="03 Mar 2023"
          title="Motivation Is The First Step To Success"
        />
        <BlogItem
          imgSrc="../img/template1/blog-3.jpg"
          author="Divyanshi "
          date="03 Mar 2023"
          title="Success Steps For Your Personal Or Business"
        />
        <BlogItem
          imgSrc="../img/template1/blog-4.jpg"
          author="Manhar"
          date="03 Mar 2023"
          title="Business & Personal Growth With Mindfullness"
        />
      </div>

      <button className="px-8 py-2 whitespace-nowrap font-semibold text-lg bg-[#02897A] text-white rounded-md cursor-pointer border-[#02897A] hover:bg-white border-2 hover:text-[#02897A] transition-all duration-200 active:scale-90 mt-10">
        View More
      </button>
    </section>
  );
}

export default Blogs;
