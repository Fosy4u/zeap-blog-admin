import { useState } from "react";
import zeapApiSlice from "../../../redux/services/zeapApi.slice";
import Loading from "../../../lib/Loading";
import { Alert, Button, Modal } from "flowbite-react";
import {
  HiInformationCircle,
  HiOutlineExclamationCircle,
} from "react-icons/hi";
import { BlogPostInterface } from "../../../interface/interface";
import { useNavigate } from "react-router-dom";

const PostDelete = ({
  close,
  open,

  post,
}: {
  close: (open: boolean) => void;
  open: boolean;

  post: BlogPostInterface;
}) => {
  const navigate = useNavigate();
  const blogPostId = post?.blogPostId;
  const [deleteBlogPost, deleteBlogPostStatus] =
    zeapApiSlice.useDeleteBlogPostMutation();
  const isLoading = deleteBlogPostStatus.isLoading;
  const [error, setError] = useState<string | null>(null);

  const handleDelete = () => {
    const payload = {
      blogPostId,
    };

    deleteBlogPost({ payload })
      .unwrap()
      .then(() => {
        close(false);
        navigate("/posts/all");
      })
      .catch((err) => {
        console.log("err", err);
        setError(err.data.error);
      });
  };

  return (
    <>
      <Modal show={open} size="lg" onClose={() => close(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            {isLoading && <Loading />}
            {error && (
              <Alert
                color="failure"
                icon={HiInformationCircle}
                className="my-4"
              >
                {error}
              </Alert>
            )}
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />

            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this blog post?
              <Alert color="failure" className="my-4">
                <span className="text-center w-full">
                  This action cannot be undone.
                </span>
              </Alert>
              <Alert color="info" className="my-4">
                You might prefer to change the status to{" "}
                <strong>archived</strong> instead. That way, you can you can
                re-publish it later.
              </Alert>
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDelete}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => close(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PostDelete;
