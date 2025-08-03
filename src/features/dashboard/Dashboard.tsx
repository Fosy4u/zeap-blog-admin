import { globalSelectors } from "../../redux/services/global.slice";
import { useSelector } from "react-redux";

import zeapApiSlice from "../../redux/services/zeapApi.slice";
import Skeleton from "../../lib/Skeleton";
import StatCard3 from "../../lib/StatCard3";
import { HiUser } from "react-icons/hi";
import { HiBookmark, HiDocumentText, HiEye } from "react-icons/hi2";
import PostStatusChart from "./components/PostStatusChart";

import { Badge } from "flowbite-react";

import { NavLink } from "react-router-dom";
import { truncateText } from "../../utils/helpers";
import { capitalize } from "lodash";
import { useEffect } from "react";

const Dashboard = () => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const getBlogAnalyticsQuery = zeapApiSlice.useGetBlogAnalyticsQuery(
    {},
    { skip: !token }
  );
  const isLoading = getBlogAnalyticsQuery.isLoading;
  const analytics = getBlogAnalyticsQuery?.data?.data;
  const totalAuthors = analytics?.totalAuthors || 0;
  const totalBlogPosts = analytics?.totalBlogPosts || 0;
  const totalComments = analytics?.totalComments || 0;
  const totalViews = analytics?.totalImpressions || 0;
  const blogPostsByStatus = analytics?.blogPostsByStatus;
  const topBlogPosts = analytics?.topBlogPosts;
  const topAuthors = analytics?.topAuthors;
  const commentsByBlogPost = analytics?.commentsByBlogPost;

  const getPostStatusData = () => {
    const data = [
      {
        label: "Published",
        count: blogPostsByStatus?.published?.count || 0,
        color: "#4CAF50", // green
      },
      {
        label: "Draft",
        count: blogPostsByStatus?.draft?.count || 0,
        color: "#FFC107", // yellow
      },
      {
        label: "Archived",
        count: blogPostsByStatus?.archived?.count || 0,
        color: "#F44336", // red
      },
    ];
    return data;
  };

  useEffect(() => {
    console.log("useEffect called", window);
    const handleScroll = () => {
      // You can add any scroll-related logic here if needed
      console.log("Scroll event detected");
    };
    window.addEventListener("scroll", handleScroll);
    // Cleanup function to remove the event listener
    // return () => {
    //   window.removeEventListener("scroll", handleScroll);
    // };
  }, []);
  return (
    <div>
      {isLoading && (
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, index) => (
            <Skeleton key={index} />
          ))}
        </div>
      )}

      {analytics && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StatCard3
              title="Total Authors"
              value={totalAuthors}
              icon={<HiUser className="text-2xl text-darkGold" />}
            />
            <StatCard3
              title="Total Blog Posts"
              value={totalBlogPosts}
              icon={<HiDocumentText className="text-2xl text-darkGold" />}
            />
            <StatCard3
              title="Total Comments"
              value={totalComments}
              icon={<HiBookmark className="text-2xl text-darkGold" />}
            />
            <StatCard3
              title="Total Views"
              value={totalViews}
              icon={<HiEye className="text-2xl text-darkGold" />}
            />
          </div>

          <PostStatusChart data={getPostStatusData()} isLoading={isLoading} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Top Authors</h2>
              <div className="flex flex-col gap-4">
                {topAuthors?.length === 0 && (
                  <div className="text-center text-gray-500">
                    No authors available or have written any post.
                  </div>
                )}
                {topAuthors?.length > 0 &&
                  topAuthors.map(
                    (author: {
                      autoId: string;
                      count: number;
                      authorName: string;
                    }) => (
                      <div
                        key={author.autoId}
                        className="flex gap-2 justify-between px-4 shadow-md py-2 rounded-full dark:bg-boxdark dark:text-white border dark:border-slate-400 cursor-pointer"
                      >
                        <div className="text-md ">
                          {capitalize(author?.authorName)} <strong></strong>
                        </div>

                        {author?.count > 0 && (
                          <Badge color="success" className="text-md font-bold">
                            {author?.count} Posts
                          </Badge>
                        )}
                        {author?.count === 0 && (
                          <Badge color="warning" className="text-md font-bold">
                            No Posts
                          </Badge>
                        )}
                      </div>
                    )
                  )}
              </div>
            </div>
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Top Blog Posts</h2>
              <div className="flex flex-col gap-4">
                {topBlogPosts?.length === 0 && (
                  <div className="text-center text-gray-500">
                    No blog posts available.
                  </div>
                )}
                {topBlogPosts?.length > 0 &&
                  topBlogPosts.map(
                    (post: {
                      title: string;
                      impressions: number;
                      blogPostId: string;
                    }) => (
                      <NavLink
                        key={post.blogPostId}
                        to={`/post/${post.blogPostId}`}
                        className="flex gap-2 justify-between px-4 shadow-md py-2 rounded-full dark:bg-boxdark dark:text-white border dark:border-slate-400 cursor-pointer"
                      >
                        <div className="text-xs md:text-sm lg:hidden">
                          {truncateText(post?.title, 50)} <strong></strong>
                        </div>
                        <div className="text-xs md:text-sm hidden lg:block">
                          {truncateText(post?.title, 80)} <strong></strong>
                        </div>
                        {post?.impressions > 0 && (
                          <Badge color="success" className="text-md font-bold">
                            {post?.impressions} Views
                          </Badge>
                        )}
                        {post?.impressions === 0 && (
                          <Badge color="warning" className="text-md font-bold">
                            No Views
                          </Badge>
                        )}
                      </NavLink>
                    )
                  )}
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">
              Comments by Blog Post
            </h2>
            <div className="flex flex-col gap-4">
              {commentsByBlogPost?.length === 0 && (
                <div className="text-center text-gray-500">
                  No comments available for any blog posts.
                </div>
              )}
              {commentsByBlogPost?.length > 0 &&
                commentsByBlogPost.map(
                  (post: {
                    title: string;
                    count: number;
                    blogPostId: string;
                  }) => (
                    <NavLink
                      key={post.blogPostId}
                      to={`/post/${post.blogPostId}`}
                      className="flex gap-2 justify-between px-4 shadow-md py-2 rounded-full dark:bg-boxdark dark:text-white border dark:border-slate-400 cursor-pointer"
                    >
                      <div className="text-xs md:text-sm lg:hidden">
                        {truncateText(post?.title, 50)} <strong></strong>
                      </div>
                      <div className="text-xs md:text-sm hidden lg:block">
                        {truncateText(post?.title, 100)} <strong></strong>
                      </div>
                      {post?.count > 0 && (
                        <Badge color="success" className="text-md font-bold">
                          {post?.count} Comments
                        </Badge>
                      )}
                      {post?.count === 0 && (
                        <Badge color="warning" className="text-md font-bold">
                          No Comments
                        </Badge>
                      )}
                    </NavLink>
                  )
                )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
