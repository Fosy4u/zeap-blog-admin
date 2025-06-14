// import { PiShareBold } from 'react-icons/pi';

import { Textarea } from "flowbite-react";
import Input from "../../../lib/Input/Input";
import ButtonPrimary from "../../../lib/Button/ButtonPrimary";
import zeapApiSlice from "../../../redux/services/zeapApi.slice";
import { useContext, useState } from "react";
import { BlogPostInterface } from "../../../interface/interface";
import LoadingDots from "../../../lib/LoadingDots";
import { AuthContext } from "../../../contexts/authContext";

const CommentForm = ({ post }: { post: BlogPostInterface }) => {
  const { user } = useContext(AuthContext);
  const blogPostId = post?.blogPostId;
  const [createBlogPostComment, createBlogPostCommentStatus] =
    zeapApiSlice.useCreateBlogPostCommentMutation();
  const isLoading = createBlogPostCommentStatus.isLoading;
  const [error, setError] = useState<string | null>(null);
  const [comment, setComment] = useState<string>("");
  const [fullName, setFullName] = useState<string>(user?.displayName || "");
  // If user is logged in, use their display name, otherwise leave it empty
  const [email, setEmail] = useState<string>(user?.email || "");
  const handleSubmit = () => {
    // Handle form submission logic here
    // For example, you can call the createBlogPostComment mutation with the form data
    const payload = {
      blogPostId,
      comment,
      fullName,
      email,
    };

    createBlogPostComment({ payload })
      .unwrap()
      .then(() => {
        setComment("");
        setFullName(user?.displayName || "");
        setEmail(user?.email || "");
        setError(null); // Clear any previous error messages
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
    <div className="space-y-5 px-5 py-2 mb-4">
      {/* <p className="flex items-center gap-1 font-medium">
        <PiShareBold className="text-lg" /> Share
      </p> */}
      {error && (
        <div className="text-red-500">
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div>
        <p className="mb-3 text-xl font-bold">Leave a comment</p>
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
  );
};

export default CommentForm;
