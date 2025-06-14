// import { PiShareBold } from 'react-icons/pi';

import { Modal, Textarea } from "flowbite-react";
import Input from "../../../lib/Input/Input";
import ButtonPrimary from "../../../lib/Button/ButtonPrimary";
import zeapApiSlice from "../../../redux/services/zeapApi.slice";
import { useContext, useState } from "react";
import {
  BlogPostCommentInterface,
  BlogPostInterface,
} from "../../../interface/interface";
import LoadingDots from "../../../lib/LoadingDots";
import { AuthContext } from "../../../contexts/authContext";
import { capitalizeFirstLetter } from "../../../utils/helpers";

const modalTheme = {
  root: {
    base: "fixed inset-x-0 top-0 z-999999 w-screen h-screen overflow-y-auto overflow-x-hidden ",
  },
};

const ReplyComment = ({
  post,
  parentComment,
}: {
  post: BlogPostInterface;
  parentComment: BlogPostCommentInterface;
}) => {
  const { user } = useContext(AuthContext);
  const blogPostId = post?.blogPostId;
  const parentFullName =
    parentComment?.fullName || post?.author?.displayName || "Anonymous";
  const [replyBlogPostComment, replyBlogPostCommentStatus] =
    zeapApiSlice.useReplyBlogPostCommentMutation();
  const isLoading = replyBlogPostCommentStatus.isLoading;
  const [error, setError] = useState<string | null>(null);
  const [comment, setComment] = useState<string>("");
  const [fullName, setFullName] = useState<string>(user?.displayName || "");
  // If user is logged in, use their display name, otherwise leave it empty
  const [email, setEmail] = useState<string>(user?.email || "");
  const [open, setOpen] = useState<boolean>(false);
  const handleSubmit = () => {
    setError(null); // Clear any previous error messages
    // Handle form submission logic here
    // For example, you can call the createBlogPostComment mutation with the form data
    const payload = {
      parentComment: parentComment?._id || "",
      fullName,
      email,
      comment: comment.trim(),
      blogPostId,
    };

    replyBlogPostComment({ payload })
      .unwrap()
      .then(() => {
        setComment("");
        setFullName(user?.displayName || "");
        setEmail(user?.email || "");
        setError(null); // Clear any previous error messages
        setOpen(false); // Close the modal after successful submission
        // Optionally, you can show a success message or update the UI
      })
      .catch((err) => {
        console.error("Error creating comment:", err);
        setError(
          err.data?.error || "An error occurred while posting the comment."
        );
      });
  };
  return (
    <div>
      <p
        className="text-xs text-gray-500 cursor-pointer hover:text-success underline underline-offset-2"
        onClick={() => setOpen(true)}
      >
        Reply
      </p>

      <Modal
        className="bg-black bg-opacity-50 "
        theme={modalTheme}
        title="Delete Image"
        onClose={() => setOpen(false)}
        show={open}
        position="center"
      >
        <Modal.Header>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Reply to {capitalizeFirstLetter(parentFullName)}
            </h2>
          </div>
        </Modal.Header>
        <Modal.Body className="px-5 py-2 mb-4">
          <div className="space-y-5">
            {/* <p className="flex items-center gap-1 font-medium">
        <PiShareBold className="text-lg" /> Share
      </p> */}
            {error && (
              <div className="text-red-500">
                <p className="text-sm">{error}</p>
              </div>
            )}

            <div>
              <h3 className="mb-3 text-2xl font-medium">Leave a comment</h3>
              <div className="grid gap-5 md:grid-cols-2">
                <div className="grid gap-5">
                  <Input
                    placeholder="Full name"
                    sizeClass="h-14 px-4 py-5"
                    type="text"
                    rounded="rounded-lg"
                    className="border-neutral-300 bg-white placeholder:text-neutral-500 focus:border-primary"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    readOnly={user?.displayName ? true : false} // Make it read-only if user is logged in
                    // disabled={user?.displayName ? true : false} // Disable input if user is logged in
                  />
                  <span className="flex flex-col items-start gap-1">
                    <Input
                      placeholder="Email"
                      sizeClass="h-14 px-4 py-5"
                      type="email"
                      rounded="rounded-lg"
                      className="border-neutral-300 bg-white placeholder:text-neutral-500 focus:border-primary"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      readOnly={user?.email ? true : false} // Make it read-only if user is logged in
                      // disabled={user?.email ? true : false}
                    />
                    <p className="text-xs text-info">
                      Your email address will not be published.
                    </p>
                  </span>
                </div>
                <div>
                  <Textarea
                    placeholder="Message"
                    className="border border-neutral-300 bg-white p-4 placeholder:text-neutral-500 focus:border-primary"
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
              </div>
              {isLoading ? (
                <div className="flex  mt-5 py-4 px-6">
                  <LoadingDots />
                </div>
              ) : (
                <ButtonPrimary
                  onClick={handleSubmit}
                  className="mt-5 self-center"
                  sizeClass="py-4 px-6"
                >
                  Post comment
                </ButtonPrimary>
              )}
              {/* Add a submit button */}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ReplyComment;
