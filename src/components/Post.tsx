import { FC, useRef, useState } from "react";
import { IPost, PostAction } from "./PostList";

interface IPosts {
  title: string;
  body: string;
  index: number;
  handlePostAction: (
    action: PostAction,
    index?: number,
    value?: IPost | null
  ) => void;
}

const Post: FC<IPosts> = ({ title, body, index, handlePostAction }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const titleRef = useRef<HTMLTextAreaElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="card shadow-sm mb-3 border-0">
      <div className="card-body">
        {isEdit ? (
          <>
            <div className="mb-3">
              <label className="form-label fw-bold">Title</label>
              <textarea
                className="form-control border-0 shadow-sm"
                ref={titleRef}
                defaultValue={title}
                rows={2}
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Body</label>
              <textarea
                className="form-control border-0 shadow-sm"
                ref={bodyRef}
                defaultValue={body}
                rows={4}
              ></textarea>
            </div>
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-success btn-sm me-2 px-3"
                onClick={() => {
                  handlePostAction("edit", index, {
                    title: titleRef.current!.value,
                    body: bodyRef.current!.value,
                  });
                  setIsEdit(false);
                }}
              >
                Save
              </button>
              <button
                className="btn btn-secondary btn-sm px-3"
                onClick={() => setIsEdit(false)}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <div>
            <h5 className="card-title text-primary fw-bold">{title}</h5>
            <p className="card-text text-muted">{body}</p>
            <div className="d-flex justify-content-between mt-3">
              <button
                className="btn btn-warning btn-sm px-3"
                onClick={() => setIsEdit(true)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm px-3"
                onClick={() => handlePostAction("delete", index)}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
