import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signin } from './pages/signin'
import { Signup } from './pages/signup'
import { ViewBlog } from "./pages/ViewBlog"
import { Blogs } from './pages/blogs'
import { CreateBlog } from './pages/createBlog'
function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup />} ></Route>
        <Route path='/signin' element={<Signin />}  ></Route>
        <Route path='/viewblog/:id' element={<ViewBlog />}  ></Route>
        <Route path='/blogs' element={<Blogs />}  ></Route>
        <Route path = "/createBlog" element = {<CreateBlog />}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
