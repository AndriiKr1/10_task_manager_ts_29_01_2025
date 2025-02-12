import { Route, Routes } from 'react-router-dom'
import './App.css'

import Layout from './components/Layout'
import TasksList from './components/TasksList'
import UserList from './components/UserList'
import CommentsList from './components/CommentsList'
import PostList from './components/PostList'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchTodos } from './redux/taskSlice'
import { AppDispatch } from './redux/store'
import { fetchUsers } from './redux/userSlice'
import { fetchComments } from './redux/commentSlice'
import { fetchPosts } from './redux/postSlice'


function App() {
 const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTodos())
    dispatch(fetchUsers())
    dispatch(fetchComments())
    dispatch(fetchPosts())

  }, [dispatch])
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<TasksList />} />
        <Route path='/users' element={<UserList />} />
        <Route path='/comments' element={<CommentsList />} />
        <Route path='/posts' element={<PostList />} />

      </Route>
    </Routes>
  )
}

export default App
