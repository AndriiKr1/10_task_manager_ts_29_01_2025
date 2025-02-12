import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPost } from "../components/PostList";
import { RootState } from "./store";
import axios from "axios";


interface InitialState {
    posts: IPost[];
    status: "loading" | "success" | "error";
  }
  
  const initialState: InitialState = {
    posts: [],
    status: "loading",
  };

  export const fetchPosts = createAsyncThunk<IPost[], void, { state: RootState }>("posts/fetchPosts", async () => {

    const data: IPost[] = (
      await axios.get("https://jsonplaceholder.typicode.com/posts")
    ).data;
    return data
      .map((e) => ({
        title: e.title,
        body: e.body,
      }))
      .slice(0, 5)
}); 

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
            addPosts(state, action: PayloadAction<IPost>) {
                state.posts.unshift(action.payload);
            },
            editPosts(state, action: PayloadAction<{ index: number | undefined; post: IPost }>) {
                state.posts[action.payload.index!] = action.payload.post;
            },
            deletePosts(state, action: PayloadAction<number>) {
                state.posts.splice(action.payload, 1);
            },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = "success";
            state.posts = action.payload;
        });
        builder.addCase(fetchPosts.rejected, (state) => {
            state.status = "error";
        });
    },
});

export const { addPosts, editPosts, deletePosts } = postSlice.actions;
export default postSlice.reducer;