import axios from "axios";
import { IComment } from "../components/CommentsList";
import { RootState } from "./store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  comments: IComment[];
  status: "loading" | "success" | "error";
}

const initialState: InitialState = {
  comments: [],
  status: "loading",
};

export const fetchComments = createAsyncThunk<
  IComment[],
  void,
  { state: RootState }
>("comments/fetchComments", async () => {
  const data: IComment[] = (
    await axios.get("https://jsonplaceholder.typicode.com/comments")
  ).data;
  return data.map((e) => ({
    name: e.name,
    email: e.email,
    body: e.body,
  }));
});

const commentSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addComment(state, action: PayloadAction<IComment>) {
      state.comments.unshift(action.payload);
    },
    editComment(
      state,
      action: PayloadAction<{ index: number | undefined; comment: IComment }>
    ) {
      state.comments[action.payload.index!] = action.payload.comment;
    },
    deleteComment: (state, action: PayloadAction<number>) => {
      state.comments.splice(action.payload!, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchComments.fulfilled,
        (state, action: PayloadAction<IComment[]>) => {
          state.comments = action.payload;
          state.status = "success";
        }
      )
      .addCase(fetchComments.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const { addComment, deleteComment, editComment } = commentSlice.actions;

export default commentSlice.reducer;
