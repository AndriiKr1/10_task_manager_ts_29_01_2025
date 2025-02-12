import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import taskReducer from "./taskSlice";
import commentReducer from "./commentSlice";
import postReducer from "./postSlice";

const store = configureStore({
    reducer: {
        person: userReducer,
        todos: taskReducer,
        comment: commentReducer,
        post: postReducer  
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;