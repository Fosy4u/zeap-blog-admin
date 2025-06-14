import { useNavigate } from "react-router-dom";
import SearchBar from "../../../lib/SearchBar";
import { smallScreen } from "../../../utils/screenSizes";

const PostHeader = ({
  setInput,
  title,
  showSearchBar = true,
  showAddButton = true,
}: {
  setInput?: (input: string) => void;
  title: string;
  showSearchBar?: boolean;
  showAddButton?: boolean;
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row justify-between md:items-center md:justify-between mb-8 p-4 bg-white dark:bg-boxdark  rounded-lg shadow  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <div>
        {" "}
        <h1 className="text-xl md:text-2xltext-dark">{title}</h1>
      </div>

      <div className="flex justify-between items-center gap-2">
        {showSearchBar && setInput && (
          <SearchBar setInput={setInput} placeHolder="Search Post" />
        )}
        {showAddButton && (
          <button
            onClick={() => navigate("/posts/add")}
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-darkGold rounded-md hover:bg-opacity-90"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>

            {smallScreen ? "Add" : "Add Post"}
          </button>
        )}
      </div>
    </div>
  );
};

export default PostHeader;
