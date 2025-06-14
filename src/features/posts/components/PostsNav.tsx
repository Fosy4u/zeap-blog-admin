import { Link } from "react-router-dom";
import { capitalizeFirstLetter } from "../../../utils/helpers";

const PostsNav = ({ status }: { status: string }) => {
  const listOfStatus = ["all","draft", "published", "archived"];
  return (
    <div className="inline-flex overflow-scroll rounded w-full">
      
      {listOfStatus.map((item) => (
        <Link
          key={item}
          to={`/posts/${item}`}
          className={`inline-flex w-full h-7 md:h-10 ${
            status.toLowerCase() === item?.toLowerCase() && "bg-baseGreen text-white"
          } items-center justify-center gap-2 whitespace-nowrap border border-2 border-baseGreen px-2 md:px-5 text-sm sm:text-xs font-medium tracking-wide dark:text-white transition duration-300 hover:bg-baseGreen hover:text-white focus-visible:outline-none`}
        >
          <span className="text-xs md:text-sm">
            {capitalizeFirstLetter(item)}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default PostsNav;
