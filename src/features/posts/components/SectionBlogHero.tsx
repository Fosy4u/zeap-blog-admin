import type { FC } from "react";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en";
import ReactTimeAgo from "react-time-ago";
TimeAgo.addDefaultLocale(en);
interface SectionBlogHeroProps {
  coverImage: string;
  title: string;
  tags?: string[];
  postdate: Date;
}

const SectionBlogHero: FC<SectionBlogHeroProps> = ({
  coverImage,
  title,
  tags,
  postdate,
}) => {
  return (
    <div className="">
      {title && <p className="text-2xl font-medium uppercase ">{title}</p>}
      <span>
        <ReactTimeAgo
          date={postdate}
          className="text-gray-500 dark:text-gray-400 text-sm"
        />
      </span>
      <div className="flex flex-wrap gap-2 my-4">
        {tags?.map((tag, index) => (
          <span
            key={index}
            className="inline-block bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex justify-center items-center">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-auto    mb-4 lg:w-1/2 rounded-md shadow-md"
        />
      </div>
    </div>
  );
};

export default SectionBlogHero;
