import { Link } from "react-router-dom";
import { BlogPostInterface } from "../../../interface/interface";
import { HiArrowRight } from "react-icons/hi2";
import NoPic from "../../../images/icon/noPhoto.png";

const PostCard = ({post}:{post:BlogPostInterface}) => {

    const removeHtmlTags = (text: string) => {
        return text.replace(/<[^>]*>/g, "");
      };
      const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) {
          return text;
        }
        return text.slice(0, maxLength) + "...";
      };
      const formatPostContent = (content: string) => {
        const cleanedContent = removeHtmlTags(content);
        return truncateText(cleanedContent, 50);
      };
  return (
    <Link
      key={post.blogPostId}
      to={`/post/${post.blogPostId}`}
      className="blog relative rounded-md shadow shadow-slate-200 dark:shadow-slate-800 overflow-hidden"
    >
      <img src={post.image?.link || NoPic} alt="" />
      <div className="content p-6">
        <Link
          to={`/post/${post.blogPostId}`}
          className="text-lg hover:text-green-600 dark:text-white dark:hover:text-green-600 transition-all duration-500 ease-in-out font-medium"
        >
          {post.title}
        </Link>
        <p className="text-slate-400 mt-3">{formatPostContent(post.content)}</p>

        <div className="mt-5">
          <Link
            to={`/post/${post.blogPostId}`}
            className="btn btn-link hover:text-green-600 dark:hover:text-green-600 after:bg-green-600 dark:text-white transition duration-500"
          >
            Read More <HiArrowRight className="inline-block ml-1" />
          </Link>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
