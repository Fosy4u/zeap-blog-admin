import {
  BlogPostCommentInterface,
  BlogPostInterface,
} from "../../../interface/interface";
import NoPic from "../../../images/icon/noPhoto.png";
import { checkIfHtml, correctULTagFromQuill } from "../../../utils/helpers";
import { useEffect, useRef } from "react";

import SectionBlogHero from "./SectionBlogHero";
import CommentForm from "./CommentForm";
import Author from "../../authors/components/Author";
import PostComment from "./PostComment";
import zeapApiSlice from "../../../redux/services/zeapApi.slice";
import { globalSelectors } from "../../../redux/services/global.slice";
import { useSelector } from "react-redux";

const PostDetail = ({ post }: { post: BlogPostInterface }) => {
  const blogPostId = post.blogPostId;
  const postdate = post.createdAt;
  const token = useSelector(globalSelectors.selectAuthToken);
  const descriptionHtmlRef = useRef<HTMLDivElement>(null);
  const getBlogPostCommentsQuery = zeapApiSlice.useGetBlogPostCommentsQuery(
    { blogPostId: blogPostId as string },
    { skip: !token || !blogPostId }
  );
  const comments = getBlogPostCommentsQuery?.data?.data || [];
  useEffect(() => {
    if (descriptionHtmlRef.current) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(correctULTagFromQuill(post.content), "text/html");
      descriptionHtmlRef.current.innerHTML = doc.body.innerHTML;
    }
  }, [post.content]);
  return (
    <div className=" pt-4">
      <div className="flex flex-col w-full container mx-auto  md:gap-4 md:px-16 lg:px-20">
        <div className=" ">
          <div className="pt-2 ">
            <SectionBlogHero
              coverImage={post?.image?.link || NoPic}
              title={post?.title || "Untitled Post"}
              tags={post.tags || []}
              postdate={postdate}
              // brief={pathOr('', ['brief'], selectedBlog)}
            />
          </div>

          <div className="">
            {checkIfHtml(post.content) ? (
              <div ref={descriptionHtmlRef} className="px-5 py-2"></div>
            ) : (
              <div className="px-5 py-2">
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  {post.content}
                </p>
              </div>
            )}
          </div>
          {comments?.length > 0 && (
            <div className="px-5 py-2 mb-4">
              <p className="mb-3 text-xl font-bold">Comments</p>
              {comments.map((comment: BlogPostCommentInterface) => (
                <PostComment key={comment._id} comment={comment} post={post} />
              ))}
            </div>
          )}

          <div className="pb-20">
            <CommentForm post={post} />
          </div>
        </div>

        <div className="  w-full">
          <div className="sticky top-4 flex justify-end w-full  h-full">
            <Author post={post} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
