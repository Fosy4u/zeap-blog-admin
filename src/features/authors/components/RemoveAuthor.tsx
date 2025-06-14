import { Badge, Button, Modal } from "flowbite-react";
import zeapApiSlice from "../../../redux/services/zeapApi.slice";
import { useState } from "react";

const RemoveAuthor = ({ userId }: { userId: string }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [removeUserBlogAuthor, removeUserBlogAuthorStatus] =
    zeapApiSlice.useRemoveUserBlogAuthorMutation();

  const isLoading = removeUserBlogAuthorStatus.isLoading;
  const handleRemoveAuthor = () => {
    const payload = {
      userId,
    };
    removeUserBlogAuthor({ payload })
      .unwrap()
      .then(() => {
        setOpenModal(false);
        // Handle success, e.g., show a success message or update state
      })
      .catch((err) => {
        // Handle error, e.g., show an error message
        console.error("Failed to remove author:", err);
      });
  };
  return (
    <div className="flex justify-center">
      <Badge
        color="failure"
        onClick={() => setOpenModal(true)}
        className="cursor-pointer"
      >
        Remove Author
      </Badge>
      <Modal show={openModal} onClose={() => setOpenModal(false)} size="md">
        <Modal.Header className="text-lg font-semibold">
          Remove Author
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to remove this author?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            color="gray"
            onClick={() => setOpenModal(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            color="failure"
            onClick={handleRemoveAuthor}
            disabled={isLoading}
          >
            {isLoading ? "Removing..." : "Remove Author"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RemoveAuthor;
