import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AppHeader from "./components/AppHeader"
import AppFooter from "./components/AppFooter"
import Home from "./components/Home"
import Login from "./components/Login"
import CategoryBookListPage from "./components/BookListPage"
import Register from "./components/Register"
import ReaderProfilePage from "./components/ReaderProfilePage"
import BookDetailPage from "./components/BookDetailPage"
import CreateReview from "./components/CreateReview"
import PageNotFound from "./components/PageNotFound"

function App() {
  return (
    <Router basename="">
      <AppHeader/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/books' element={<CategoryBookListPage/>}/>
          <Route path='/books/:work_id' element={<BookDetailPage/>}/>
          <Route path='/reader-profile' element={<ReaderProfilePage/>}/>
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      <AppFooter/>
    </Router>
  )
}

export default App
