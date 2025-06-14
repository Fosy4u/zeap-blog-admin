import { useSelector } from "react-redux";
import zeapApiSlice from "../../redux/services/zeapApi.slice";
import { globalSelectors } from "../../redux/services/global.slice";

import Loading from "../../lib/Loading";
import { useEffect, useState } from "react";
import { BlogPostInterface } from "../../interface/interface";

import PostHeader from "./components/PostHeader";
import { Alert } from "flowbite-react";
import PostsNav from "./components/PostsNav";
import { useParams } from "react-router-dom";

import PostCard from "./components/PostCard";

const Posts = () => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const status = useParams().status || "published";

  const [filteredPosts, setFilteredPosts] = useState([]);

  const [input, setInput] = useState("");
  const postsQuery = zeapApiSlice.useGetBlogPostsQuery(
    {
      status: status !== "all" ? status : undefined,
    },
    { skip: !token || !status }
  );
  const posts = postsQuery?.data?.data;

  const escapeRegExp = (value: string) => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };

  const searchRegex = new RegExp(escapeRegExp(input), "i");
  // recursive search function
  const search = (item: any) => {
    let found = false;

    if (typeof item === "string") {
      if (searchRegex.test(item?.toString())) {
        found = true;
        return found;
      }
    }

    if (typeof item === "object" && item !== null) {
      Object.keys(item).forEach((key) => {
        const value = item[key];
        const match = search(value);
        if (match) {
          found = true;
          return found;
        }
      });
    }
    return found;
  };

  useEffect(() => {
    if (posts?.length > 0) {
      const result = posts?.filter((row: BlogPostInterface) => {
        const keys = Object.keys(row);
        return keys.some((field) => {
          return search(row[field as keyof BlogPostInterface]);
        });
      });

      return setFilteredPosts(result);
    }
    return setFilteredPosts([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, posts]);

  return (
    <div>
      <PostHeader setInput={setInput} title={"Posts"} />
      <PostsNav status={status} />
      {posts?.length === 0 && postsQuery.status === "fulfilled" && (
        <div className="w-full flex items-center justify-center my-16">
          <Alert className="w-100 " color="info">
            You have no &quot;<strong>{status}</strong>&quot; posts yet.
          </Alert>
        </div>
      )}
      {postsQuery.isLoading && <Loading />}

      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 mt-8">
        {filteredPosts.map((post: BlogPostInterface) => (
          <PostCard post={post} key={post._id} />
        ))}
      </div>
    </div>
  );
};

export default Posts;
