import { FC, useRef } from "react";
import Comment from "./Comment";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  addComment,
  deleteComment,
  editComment,
} from "../redux/commentSlice";
import { v4 as uuidv4 } from "uuid";

export interface IComment {
  name: string;
  email: string;
  body: string;
}

export type CommentAction = "add" | "edit" | "delete";

const CommentsList: FC = () => {
  const { comments, status } = useSelector((state: RootState) => state.comment);
  const dispatch: AppDispatch = useDispatch();

  const newCommentNameRef = useRef<HTMLInputElement>(null);
  const newCommentEmailRef = useRef<HTMLInputElement>(null);
  const newCommentBodyRef = useRef<HTMLInputElement>(null);

  const handleCommentAction = (
    action: CommentAction,
    index?: number,
    value: IComment | null = null
  ) => {
    switch (action) {
      case "add":
        dispatch(
          addComment({
            name: newCommentNameRef.current!.value,
            email: newCommentEmailRef.current!.value,
            body: newCommentBodyRef.current!.value,
          })
        );
        newCommentNameRef.current!.value =
          newCommentEmailRef.current!.value =
          newCommentBodyRef.current!.value =
            "";
        break;
      case "edit":
        dispatch(
          editComment({
            index,
            comment: {
              name: value!.name,
              email: value!.email,
              body: value!.body,
            },
          })
        );
        break;
      case "delete":
        dispatch(deleteComment(index!));
        break;
      default:
        return;
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Comments List</h1>

      <div className="card p-3 mb-3">
        <div className="row g-2">
          <div className="col-md-4">
            <input
              ref={newCommentNameRef}
              type="text"
              className="form-control"
              placeholder="Name"
            />
          </div>
          <div className="col-md-4">
            <input
              ref={newCommentEmailRef}
              type="email"
              className="form-control"
              placeholder="Email"
            />
          </div>
          <div className="col-md-4">
            <input
              ref={newCommentBodyRef}
              type="text"
              className="form-control"
              placeholder="Comment"
            />
          </div>
        </div>
        <button
          className="btn btn-primary mt-3"
          onClick={() => handleCommentAction("add")}
        >
          Add Comment
        </button>
      </div>
      <div>
        {status === "loading" && (
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
        {status === "success" &&
          comments.map(({ name, email, body }, i) => (
            <Comment
              key={uuidv4()}
              name={name}
              email={email}
              body={body}
              index={i}
              handleCommentAction={handleCommentAction}
            />
          ))}
      </div>
    </div>
  );
};

export default CommentsList;
