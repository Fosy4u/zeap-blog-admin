import { useSelector } from "react-redux";
import zeapApiSlice from "../../redux/services/zeapApi.slice";
import { globalSelectors } from "../../redux/services/global.slice";
import Loading from "../../lib/Loading";
import { useEffect, useState } from "react";
import { UserInterface } from "../../interface/interface";
import { Alert } from "flowbite-react";
import { useParams } from "react-router-dom";
import AuthorHeader from "./components/AuthorHeader";
import Author from "./components/Author";
import RemoveAuthor from "./components/RemoveAuthor";

const Authors = () => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const status = useParams().status || "published";

  const [fiteredAuthors, setFiteredAuthors] = useState([]);

  const [input, setInput] = useState("");
  const authorsQuery = zeapApiSlice.useGetUsersQuery(
    { isBlogAuthor: true },
    { skip: !token }
  );
  const isLoading = authorsQuery.isLoading;
  const authors = authorsQuery?.data?.data;

  const escapeRegExp = (value: string) => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };

  const searchRegex = new RegExp(escapeRegExp(input), "i");
  // recursive search function
  const search = (item: any) => {
    let found = false;

    if (typeof item === "string") {
      if (searchRegex.test(item?.toString())) {
        found = true;
        return found;
      }
    }

    if (typeof item === "object" && item !== null) {
      Object.keys(item).forEach((key) => {
        const value = item[key];
        const match = search(value);
        if (match) {
          found = true;
          return found;
        }
      });
    }
    return found;
  };

  useEffect(() => {
    if (authors?.length > 0) {
      const result = authors?.filter((row: UserInterface) => {
        const keys = Object.keys(row);
        return keys.some((field) => {
          return search(row[field as keyof UserInterface]);
        });
      });

      return setFiteredAuthors(result);
    }
    return setFiteredAuthors([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, authors]);

  return (
    <div>
      <AuthorHeader setInput={setInput} title={"Authors"} />

      {authors?.length === 0 && authorsQuery.status === "fulfilled" && (
        <div className="w-full flex items-center justify-center my-16">
          <Alert className="w-100 " color="info">
            You have no &quot;<strong>{status}</strong>&quot; authors yet.
          </Alert>
        </div>
      )}
      {isLoading && <Loading />}

      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 mt-8">
        {fiteredAuthors.map((author: UserInterface) => (
          <div className="my-4" key={author._id}>
            
              <Author user={author} key={author._id} />
           
            <RemoveAuthor userId={author?.userId} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Authors;
