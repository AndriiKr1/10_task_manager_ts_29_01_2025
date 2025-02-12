import { FC, useRef, useState } from "react";
import { CommentAction, IComment } from "./CommentsList"


interface IProps {
    name: string,
    index: number,
    email: string,
    body: string
    handleCommentAction: (action: CommentAction, index?: number, value?: IComment| null) => void;
}


const Comment: FC<IProps> = ({ name, index, email, body, handleCommentAction }) => {
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const nameRef = useRef<HTMLTextAreaElement>(null); 
    const emailRef = useRef<HTMLTextAreaElement>(null);
    const bodyRef = useRef<HTMLTextAreaElement>(null);
    
   return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        {isEdit ? (
          <>
            <div className="mb-2">
              <label className="form-label">Name</label>
              <textarea className="form-control" ref={nameRef} defaultValue={name}></textarea>
            </div>
            <div className="mb-2">
              <label className="form-label">Email</label>
              <textarea className="form-control" ref={emailRef} defaultValue={email}></textarea>
            </div>
            <div className="mb-2">
              <label className="form-label">Body</label>
              <textarea className="form-control" ref={bodyRef} defaultValue={body}></textarea>
            </div>
            <button className="btn btn-success btn-sm me-2" onClick={() => {
              handleCommentAction("edit", index, {
                name: nameRef.current!.value,
                email: emailRef.current!.value,
                body: bodyRef.current!.value,
              });
              setIsEdit(false);
            }}>
              Save
            </button>
            <button className="btn btn-secondary btn-sm" onClick={() => setIsEdit(false)}>Cancel</button>
          </>
        ) : (
          <div>
            <h5 className="card-title">{name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{email}</h6>
            <p className="card-text">{body}</p>
            <div className="d-flex">
              <button className="btn btn-warning btn-sm me-2" onClick={() => setIsEdit(true)}>Edit</button>
              <button className="btn btn-danger btn-sm" onClick={() => handleCommentAction("delete", index)}>Delete</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Comment