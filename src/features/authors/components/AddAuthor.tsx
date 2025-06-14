import { useState } from "react";
import zeapApiSlice from "../../../redux/services/zeapApi.slice";
import { Alert, Button, Modal } from "flowbite-react";
import Input from "../../../lib/Input/Input";

const AddAuthor = ({ open, close }: { open: boolean; close: () => void }) => {
  const [makeUserBlogAuthor, makeUserBlogAuthorStatus] =
    zeapApiSlice.useMakeUserBlogAuthorMutation();
  const [userId, setUserId] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const isLoading = makeUserBlogAuthorStatus.isLoading;
  const handleAddAuthor = () => {
    if (!userId) {
      setErrorMsg("User ID is required");
      return;
    }
    const payload = {
      userId,
    };
    makeUserBlogAuthor({ payload })
      .unwrap()
      .then(() => {
        setErrorMsg("");
        setUserId("");
        close();
      })
      .catch((err) => {
        setErrorMsg(err?.data?.error || "Failed to add author");
      });
  };

  return (
    <div>
      <Modal show={open} onClose={close} className="z-99999">
        <Modal.Header className="text-lg font-semibold">
          Add Author
        </Modal.Header>
        <Modal.Body>
          {errorMsg && (
            <Alert color="failure" className="mb-4">
              {errorMsg}
            </Alert>
          )}
          <Input
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter User ID"
            required
          />
          <Alert color="info" className="mt-4">
            The userId should be the ID of a user who is already registered on
            the platform. This will grant them author permissions to create and
            manage blog posts.
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={close} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            color="success"
            onClick={handleAddAuthor}
            disabled={isLoading || !userId}
          >
            {isLoading ? "Adding..." : "Add Author"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddAuthor;
