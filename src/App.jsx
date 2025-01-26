import { Route, Routes } from "react-router-dom"
import Admin from "./component/blog/Admin"
import Blog from "./component/blog/Blog"

function App() {

  return (
    <>
    <Routes>
      <Route path="/blog" element={<Blog />} />
      <Route path="/" element={<Admin />} />
    </Routes>
    </>
  )
}

export default App
