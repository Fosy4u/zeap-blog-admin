import AddPostForm from "../components/AddPostForm";
import PostHeader from "../components/PostHeader";

const AddPost = () => {
  return (
    <div>
      <PostHeader title={" Add Post"} showAddButton={false} />
      <AddPostForm />
    </div>
  );
};

export default AddPost;
