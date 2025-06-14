import { Avatar } from "flowbite-react";
import {
  BlogPostCommentInterface,
  BlogPostInterface,
} from "../../../interface/interface";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en";
import ReactTimeAgo from "react-time-ago";
import ReplyComment from "./ReplyComment";

TimeAgo.addDefaultLocale(en);

const PostComment = ({
  comment,
  post,
  isChild = false,
}: {
  comment: BlogPostCommentInterface;
  post: BlogPostInterface;
  isChild?: boolean;
}) => {
  if (!comment) return null;
  const childrenComments = comment?.childrenComments || [];
  const parentComment = comment?.parentComment || null;
  const parentFullName = parentComment?.fullName;
  const fullName = comment?.fullName || "Anonymous";
  const commentText = comment?.comment || "No comment provided";
  // first letter of each word in fullName
  const initials = fullName
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
  const date = comment?.createdAt;

  return (
    <div className="flex flex-col bg-white  rounded-lg  mb-6">
      <div>
        <div className="flex items-start gap-4 mb-6">
          <Avatar
            alt={fullName}
            rounded={true}
            size="md"
            placeholderInitials={initials}
          />
          <div className="w-full">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold">{fullName}</span>
              {date && (
                <span className="text-xs text-gray-500">
                  <ReactTimeAgo date={date} />
                </span>
              )}
            </div>
            <p className="text-sm text-gray-700">
              <span className="text-info">{parentFullName}</span> {commentText}
            </p>
            {comment && <ReplyComment post={post} parentComment={comment} />}
          </div>
        </div>
      </div>
      {!isChild ? (
        <>
          {childrenComments.length > 0 && (
            <div className="ml-2 pl-2  border-l border-gray-200">
              {childrenComments.map((childComment) => (
                <PostComment
                  key={childComment._id}
                  comment={childComment}
                  post={post}
                  isChild={true}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          {childrenComments.length > 0 && (
            <div className="">
              {childrenComments.map((childComment) => (
                <PostComment
                  key={childComment._id}
                  comment={childComment}
                  post={post}
                  isChild={true}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PostComment;
