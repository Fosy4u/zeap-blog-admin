import { useContext, useState } from "react";
import { BlogPostInterface } from "../../../interface/interface";
import { NavLink } from "react-router-dom";
// import ProductStatus from './ProductStatus';
// import ProductDeleteRestore from './ProductDeleteRestore';
import { ThemeContext } from "../../../contexts/themeContext";
import PostStatus from "./PostStatus";
import PostDelete from "./PostDelete";
// import zeapApiSlice from '../../../redux/services/zeapApi.slice';
// import { useSelector } from 'react-redux';
// import { globalSelectors } from '../../../redux/services/global.slice';
// import Loading from '../../../lib/Loading';

const buttonClass =
  "w-[56px] h-[56px] text-gray-500 rounded-full border border-gray-200 dark:border-gray-600 hover:text-white shadow-sm dark:hover:text-white bg-emerald-100 dark:text-gray-400 hover:bg-emerald-500  dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400";
const BlogPostActions = ({ post }: { post: BlogPostInterface }) => {
  const { setDimBackground } = useContext(ThemeContext);
  // const token = useSelector(globalSelectors.selectAuthToken);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [openStatus, setOpenStatus] = useState(false);



  return (
    <>
      {/* {isLoading && <Loading />} */}

      <div
        data-dial-init
        className="fixed bottom-6 end-5 group"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <div
          id="speed-dial-menu-text-outside-button-square"
          className={`flex flex-col items-center mb-4 space-y-2  ${!open && "hidden"}`}
        >
          <NavLink to={`/posts/add/${post.blogPostId}`}>
            <button type="button" className={buttonClass}>
              <svg
                className="w-4 h-4 mx-auto mb-1 text-darkGold"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="square"
                  strokeLinejoin="round"
                  strokeWidth="1.9"
                  d="M7 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h1m4-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm7.441 1.559a1.907 1.907 0 0 1 0 2.698l-6.069 6.069L10 19l.674-3.372 6.07-6.07a1.907 1.907 0 0 1 2.697 0Z"
                />
              </svg>

              <span className="block mb-px text-xs font-medium ">Edit</span>
            </button>
          </NavLink>

          {post && (
            <button
              onClick={() => {
                setDimBackground(true);
                setOpenDelete(true);
              }}
              type="button"
              className={buttonClass}
            >
              <svg
                className="w-4 h-4 mx-auto mb-1 text-darkGold"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.9"
                  d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                />
              </svg>

              <span className="block mb-px text-xs font-medium">Delete</span>
            </button>
          )}
          <button
            onClick={() => setOpenStatus(true)}
            type="button"
            className={buttonClass}
          >
            <svg
              className="w-4 h-4 mx-auto mb-1 text-darkGold"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 21a9 9 0 1 1 0-18c1.052 0 2.062.18 3 .512M7 9.577l3.923 3.923 8.5-8.5M17 14v6m-3-3h6"
              />
            </svg>

            <span className="block mb-px text-xs font-medium">Status</span>
          </button>
        </div>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          data-dial-toggle="speed-dial-menu-text-outside-button-square"
          aria-expanded="false"
          className="flex items-center justify-center text-white  rounded-full w-14 h-14 hover:bg-emerald-800 dark:hover:bg-emerald-300 bg-emerald-400 dark:bg-emerald-700  focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
        >
          <svg
            className="w-5 h-5 transition-transform group-hover:rotate-45 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
          <span className="sr-only">Open actions menu</span>
        </button>
      </div>

      {openDelete && (
        <PostDelete
          close={() => {
            setDimBackground(false);
            setOpenDelete(false);
          }}
          post={post}
          open={openDelete}
        />
      )}

      {openStatus && (
        <PostStatus
          open={openStatus}
          close={() => setOpenStatus(false)}
          post={post}
        />
      )}
    </>
  );
};

export default BlogPostActions;
