import { useState, useRef, FC } from "react";
import { TaskAction } from "./TasksList";

interface IProps {
  name: string;
  index: number;
  completed: boolean;
  handleTaskAction: (
    action: TaskAction,
    index: number | null,
    value?: string | null
  ) => void;
}

const Task: FC<IProps> = ({ name, index, completed, handleTaskAction }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const textRef = useRef<HTMLTextAreaElement>(null); // аналог document.getElementById()

  return (
    <div
      className={`card mb-3 ${completed ? "bg-light" : "bg-info"}`}
      style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
    >
      <div className="card-body">
        {isEdit ? (
          <>
            <textarea
              className="form-control mb-2"
              ref={textRef}
              defaultValue={name}
            ></textarea>
            <button
              className="btn btn-success btn-sm me-2"
              onClick={() =>{
                handleTaskAction("edit", index, textRef.current!.value)
                setIsEdit(false);
              }}
            >
              Save
            </button>
          </>
        ) : (
          <div className="d-flex align-items-center">
            <p
              className={`mb-0 ${
                completed ? "text-decoration-line-through" : ""
              }`}
            >
              {name}
            </p>
            <input
              type="checkbox"
              checked={completed}
              className="form-check-input mx-2"
              onChange={() => handleTaskAction("toggle", index)}
            />
            <button
              className="btn btn-warning btn-sm me-2"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleTaskAction("delete", index)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Task;
