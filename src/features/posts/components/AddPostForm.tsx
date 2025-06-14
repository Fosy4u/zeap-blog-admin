import { Alert, Label, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { HiInformationCircle } from "react-icons/hi2";
import Multiselect from "multiselect-react-dropdown";
import zeapApiSlice from "../../../redux/services/zeapApi.slice";
import Loading from "../../../lib/Loading";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "../../editor/EditorWithUseQuill";
import { useSelector } from "react-redux";
import { globalSelectors } from "../../../redux/services/global.slice";

const tagOptions = [
  { name: "Technology" },
  { name: "Health" },
  { name: "Lifestyle" },
  { name: "Education" },
  { name: "Finance" },
  { name: "Travel" },
  { name: "Food" },
  { name: "Entertainment" },
  { name: "Sports" },
  { name: "Science" },
  { name: "Fashion" },
  { name: "Business" },
  { name: "Politics" },
  { name: "Environment" },
  { name: "Art" },
  { name: "Culture" },
  { name: "History" },
  { name: "Gaming" },
  { name: "Music" },
  { name: "Photography" },
  { name: "Writing" },
  { name: "Mental Health" },
  { name: "Self-Improvement" },
  { name: "Parenting" },
  { name: "Relationships" },
  { name: "Pets" },
  { name: "DIY" },
];

const AddPostForm = () => {
  const topDivRef = useRef<HTMLDivElement>(null);
  const token = useSelector(globalSelectors.selectAuthToken);
  const navigate = useNavigate();
  const { blogPostId } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();
  const [tags, setTags] = useState<string[]>([]);
  const [error, setError] = useState({
    title: "",
    content: "",
    image: "",
    tags: "",
  });
  const [preview, setPreview] = useState<string>();
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [createBlogPost, createBlogPostStatus] =
    zeapApiSlice.useCreateBlogPostMutation();
  const [updateBlogPost, updateBlogPostStatus] =
    zeapApiSlice.useUpdateBlogPostMutation();
  const getPostQuery = zeapApiSlice.useGetBlogPostQuery(
    { blogPostId: blogPostId as string },
    { skip: !token || !blogPostId }
  );
  const post = getPostQuery?.data?.data;
  const isLoading =
    createBlogPostStatus.isLoading ||
    updateBlogPostStatus.isLoading ||
    getPostQuery.isLoading;
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setSelectedFile(undefined);
      setTags(post.tags);
      setPreview(post.image?.link);
      setRefresh(true);
    }
  }, [post]);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (selectedFile) {
      const MAX_FILE_SIZE = 1120; // 1MB

      const fileSizeKiloBytes = selectedFile?.size / 1024;

      if (fileSizeKiloBytes > MAX_FILE_SIZE) {
        setErrorMsg(
          "Selected file size is greater than 1MB. Please select a smaller file"
        );
        setTimeout(() => {
          setSelectedFile(undefined);
        }, 1000);
        return;
      }

      setErrorMsg("");
    }
  }, [selectedFile]);
  const scrollToTop = () => {
    if (topDivRef.current) {
      topDivRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const getColor = (value: string | undefined, isError: string) => {
    if (value) {
      return "success";
    }
    if (isError) {
      return "failure";
    }
  };

  const verifyForm = () => {
    let isValid = true;
    const newError = {
      title: "",
      content: "",
      image: "",
      tags: "",
    };
    if (!title) {
      newError.title = "Title is required";
      isValid = false;
    }
    if (!content) {
      newError.content = "Content is required";
      isValid = false;
    }
    if (!selectedFile && !preview && !post?.image?.link) {
      newError.image = "Image is required";
      isValid = false;
    }
    if (tags.length === 0) {
      newError.tags = "At least one tag is required";
      isValid = false;
    }
    setError(newError);
    return isValid;
  };
  const handleSubmit = async () => {
    if (!verifyForm()) {
      scrollToTop();
      return;
    }
    const form = new FormData();
    if (selectedFile) {
      form.append("file", selectedFile);
    }
    form.append("title", title);
    form.append("tags", JSON.stringify(tags));
    form.append("content", content);
    const payload = form;
    if (blogPostId) {
      payload.append("blogPostId", blogPostId);
      return updateBlogPost({ payload })
        .unwrap()
        .then(() => {
          setTitle("");
          setContent("");
          setSelectedFile(undefined);
          setTags([]);
          setPreview(undefined);
          setError({
            title: "",
            content: "",
            image: "",
            tags: "",
          });
          setErrorMsg("");
          navigate(`/post/${blogPostId}`);
        })
        .catch((error) => {
          console.error("Failed to update post:", error);
          scrollToTop();
          setErrorMsg("Failed to update post. Please try again later.");
        });
    }
    try {
      await createBlogPost({ payload }).unwrap();
      setTitle("");
      setContent("");
      setSelectedFile(undefined);
      setTags([]);
      setPreview(undefined);
      setError({
        title: "",
        content: "",
        image: "",
        tags: "",
      });
      setErrorMsg("");
      navigate("/posts/draft");
    } catch (error) {
      console.error("Failed to create post:", error);
      scrollToTop();
      setErrorMsg("Failed to create post. Please try again later.");
    }
  };
  return (
    <div
      ref={topDivRef}
      className="flex flex-col  p-4 bg-white dark:bg-boxdark gap-8"
    >
      {" "}
      {isLoading && <Loading />}
      {errorMsg && (
        <Alert color="failure" icon={HiInformationCircle} className="my-4">
          {errorMsg}
        </Alert>
      )}
      <div>
        <div className="mb-2 block">
          <Label value="Title" />
        </div>
        <TextInput
          type="text"
          placeholder="Enter post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          color={getColor(title, error.title)}
          helperText={error.title ? error.title : " "}
          className="mb-4"
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label value="Tags" />
        </div>
        {tagOptions?.length > 0 && (
          <div>
            <Multiselect
              options={tagOptions}
              showArrow={true}
              selectedValues={tags.map((tag) => ({ name: tag }))}
              onSelect={(selectedList) => {
                const selectedTags = selectedList.map(
                  (item: { name: string }) => item.name
                );
                setTags(selectedTags);
              }}
              onRemove={(selectedList) => {
                const selectedTags = selectedList.map(
                  (item: { name: string }) => item.name
                );
                setTags(selectedTags);
              }}
              displayValue="name"
              showCheckbox={true}
              closeOnSelect={true}
              placeholder="Select tags"
              style={{
                chips: {
                  background: "#219653",
                },

                searchBox: {
                  border: "none",
                  "border-bottom": "1px solid #a17f1a",
                  "border-radius": "0px",
                },
              }}
            />
          </div>
        )}
      </div>
      <div>
        <div className="mb-2 block">
          <Label value="Cover Image" />
        </div>
        <TextInput
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setSelectedFile(e.target.files[0]);
            }
          }}
          required
          color={getColor(preview, error.image)}
          helperText={error.image ? error.image : " "}
          className="mb-4"
        />
        {(preview || post?.image?.link)&& (
          <img
            src={preview ? preview : post?.image?.link}
            alt="Preview"
            className="w-80 h-auto rounded-lg mb-4"
          />
        )}
      </div>
      <div>
        <div className="mb-2 block">
          <Label value="Content" />
        </div>
        <Editor
          placeholder={"Write your post content here..."}
          value={content}
          onChange={(value: string) => setContent(value)}
          refresh={refresh}
        />
      </div>
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-darkGold text-white rounded-md hover:bg-opacity-90"
      >
        {isLoading ? "Saving Post..." : "Save Post"}
      </button>
    </div>
  );
};

export default AddPostForm;
