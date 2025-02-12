import { FC, useRef } from "react";
import Post from "./Post";
import { v4 as createId } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { addPosts, deletePosts, editPosts } from "../redux/postSlice";

export interface IPost {
  title: string;
  body: string;
}

export type PostAction = "add" | "edit" | "delete";

const PostList: FC = () => {
  const { posts, status } = useSelector((state: RootState) => state.post);
  const dispatch: AppDispatch = useDispatch();

  const newPostTitleRef = useRef<HTMLInputElement>(null);
  const newPostBodyRef = useRef<HTMLInputElement>(null);

  const handlePostAction = (
    action: PostAction,
    index?: number,
    value: IPost | null = null
  ) => {
    switch (action) {
      case "add":
        dispatch(
          addPosts({
            title: newPostTitleRef.current!.value,
            body: newPostBodyRef.current!.value,
          })
        );
        newPostTitleRef.current!.value = newPostBodyRef.current!.value = "";
        break;
      case "edit":
        dispatch(
          editPosts({
            index,
            post: {
              title: value!.title,
              body: value!.body,
            },
          })
        );
        break;
      case "delete":
        dispatch(deletePosts(index!));
        break;
      default:
        return;
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Post List</h1>
      <div className="card p-4 mb-4 shadow-sm border-0">
        <div className="row g-3">
          <div className="col-md-6">
            <input
              ref={newPostTitleRef}
              type="text"
              className="form-control border-0 shadow-sm"
              placeholder="Enter title..."
            />
          </div>
          <div className="col-md-6">
            <input
              ref={newPostBodyRef}
              type="text"
              className="form-control border-0 shadow-sm"
              placeholder="Enter post content..."
            />
          </div>
        </div>
        <div className="d-flex justify-content-center mt-3">
          <button
            className="btn btn-success px-4 shadow-sm"
            onClick={() => handlePostAction("add")}
          >
            Add Post
          </button>
        </div>
        <div>
          {status === "loading" && (
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
          {status === "success" &&
            posts.map(({ title, body }, i) => (
              <Post
                key={createId()}
                title={title}
                body={body}
                index={i}
                handlePostAction={handlePostAction}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default PostList;
