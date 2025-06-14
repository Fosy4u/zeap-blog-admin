import { BlogPostInterface, UserInterface } from "../../../interface/interface";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";
import NoPic from "../../../images/icon/noPhoto.png";

const Author = ({
  post,
  user,
}: {
  post?: BlogPostInterface;
  user?: UserInterface;
}) => {
  const instagram =
    post?.author?.social?.instagram || user?.social?.instagram || "";
  const linkedin =
    post?.author?.social?.linkedin || user?.social?.linkedin || "";
  const facebook =
    post?.author?.social?.facebook || user?.social?.facebook || "";
  const twitter = post?.author?.social?.twitter || user?.social?.twitter || "";
  const tiktok = post?.author?.social?.tiktok || user?.social?.tiktok || "";
  const firstLastName = `${
    post?.author?.firstName || user?.firstName
  } ${post?.author?.lastName || user?.lastName}`;
  const authorName =
    post?.author?.displayName ||
    user?.displayName ||
    firstLastName ||
    "Unknown Author";
  return (
    <div className="flex flex-col w-full md:h-[25rem]">
      <h5 className="text-lg font-medium bg-gray-50 dark:bg-slate-800 shadow dark:shadow-gray-800 rounded-md p-2 text-center">
        Author
      </h5>
      <div className="text-center mt-8">
        <img
          src={post?.author?.imageUrl?.link || user?.imageUrl?.link || NoPic}
          className="h-24 w-24 mx-auto rounded-full shadow mb-4"
          alt=""
        />

        <Link
          to=""
          className="text-lg font-medium hover:text-orange-600 transition-all duration-500 ease-in-out h5"
        >
          {authorName}
        </Link>
        <p className="text-slate-400">Content Writer</p>
      </div>

      <h5 className="text-lg font-medium bg-gray-50 dark:bg-slate-800 shadow dark:shadow-gray-800 rounded-md p-2 text-center mt-8">
        Social sites
      </h5>
      <ul className="list-none text-center mt-8 space-x-1">
        {instagram && (
          <li className="inline">
            <Link
              to={instagram}
              target="_blank"
              className="h-8 w-8 inline-flex items-center text-center justify-center text-base font-normal tracking-wide align-middle transition duration-500 ease-in-out border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-orange-600 hover:text-white hover:bg-orange-600"
            >
              <FaInstagram className="size-5 text-red-500" />
            </Link>
          </li>
        )}
        {linkedin && (
          <li className="inline">
            <Link
              to={linkedin}
              target="_blank"
              className="h-8 w-8 inline-flex items-center text-center justify-center text-base font-normal tracking-wide align-middle transition duration-500 ease-in-out border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-orange-600 hover:text-white hover:bg-orange-600"
            >
              <FaLinkedin className="size-5 text-blue-500" />
            </Link>
          </li>
        )}
        {facebook && (
          <li className="inline">
            <Link
              to={facebook}
              target="_blank"
              className="h-8 w-8 inline-flex items-center text-center justify-center text-base font-normal tracking-wide align-middle transition duration-500 ease-in-out border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-orange-600 hover:text-white hover:bg-orange-600"
            >
              <FaFacebook className="size-5 text-bluee-500" />
            </Link>
          </li>
        )}
        {twitter && (
          <li className="inline">
            <Link
              to={twitter}
              target="_blank"
              className="h-8 w-8 inline-flex items-center text-center justify-center text-base font-normal tracking-wide align-middle transition duration-500 ease-in-out border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-orange-600 hover:text-white hover:bg-orange-600"
            >
              <FaTwitter className="size-5 text-bluee-500" />
            </Link>
          </li>
        )}
        {tiktok && (
          <li className="inline">
            <Link
              to={tiktok}
              target="_blank"
              className="h-8 w-8 inline-flex items-center text-center justify-center text-base font-normal tracking-wide align-middle transition duration-500 ease-in-out border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-orange-600 hover:text-white hover:bg-orange-600"
            >
              <FaTiktok className="size-5 text-black" />
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Author;
