import { useSelector } from "react-redux";
import { globalSelectors } from "../../../redux/services/global.slice";
import { useParams } from "react-router-dom";
import zeapApiSlice from "../../../redux/services/zeapApi.slice";
import Loading from "../../../lib/Loading";
import PostDetail from "../components/PostDetail";
import BlogPostActions from "../components/BlogPostActions";
import { capitalizeFirstLetter } from "../../../utils/helpers";
import { Badge } from "flowbite-react";

const Post = () => {
  const isAdmin = true;
  const token = useSelector(globalSelectors.selectAuthToken);
  const { blogPostId } = useParams();
  const getPostQuery = zeapApiSlice.useGetBlogPostQuery(
    { blogPostId: blogPostId as string, isAdmin },
    { skip: !token || !blogPostId }
  );
  const post = getPostQuery?.data?.data;

  const isFulfilled = getPostQuery?.status === "fulfilled";

  const isLoading = getPostQuery.isLoading;
  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "success";
      case "draft":
        return "warning";
      case "archived":
        return "danger";
      default:
        return "info";
    }
  };
  return (
    <div>
      {isLoading && <Loading />}
      {isFulfilled && !post && (
        <div className="flex justify-center items-center h-screen">
          <Badge color="info" size="xl" className="w-fit p-2 px-4">
            Post not found
          </Badge>
        </div>
      )}

      {post && (
        <Badge
          color={getStatusColor(post.status)}
          size="xl"
          className="w-fit p-2 px-4"
        >
          {capitalizeFirstLetter(post?.status)}
        </Badge>
      )}
      {post && <PostDetail post={post} />}

      {post && <BlogPostActions post={post} />}
    </div>
  );
};

export default Post;
