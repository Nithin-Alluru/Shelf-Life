import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AppHeader from "./components/AppHeader"
import AppFooter from "./components/AppFooter"
import Home from "./components/Home"
import Login from "./components/Login"
import Register from "./components/Register"
import BookDetailPage from "./components/BookDetailPage"
import ReaderProfilePage from "./components/ReaderProfilePage"
import ReviewForm from "./components/ReviewForm"
import PageNotFound from "./components/PageNotFound"
import BookListPage from "./components/BookListPage"
import CategoryPage from "./components/CategoryPage"
import CompetitionsPage from "./components/CompetitionsPage"
import CompetitionForm from "./components/CompetitionForm"
import CompetitionDetailPage from "./components/CompetitionDetailPage"
import { useEffect } from "react"
import ShelfFormAdd from "./components/ShelfFormAdd"
import ShelfBookPage from "./components/ShelfBookPage"
import { ToastContainer } from "react-toastify"

function App() {

  // trigger react page reload every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload();
      
    }, 300000); 

    return () => clearInterval(interval);
  }, []);

  
  return (
    <Router basename="">
      <AppHeader/>
      <ToastContainer role="alert"/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path=':user/profile' element={<ReaderProfilePage/>}/>
          <Route path=':user/library/:shelfname' element={<ShelfBookPage/>}/>
          <Route path='/books' element={<BookListPage/>}/>
          <Route path='/books/:work_id' element={<BookDetailPage/>}/>
          <Route path='/categories' element={<CategoryPage/>}>
            <Route path=':category' element={<CategoryPage/>}/>
          </Route> 
          <Route path="/review" element={<ReviewForm />} />
          <Route path="/competitions" element={<CompetitionsPage />} />
          <Route path="/competitions/create" element={<CompetitionForm/>}/> 
          <Route path="/competitions/:name" element={<CompetitionDetailPage />} />
          <Route path="/shelf/create" element={<ShelfFormAdd/>}/>
          <Route path="*" element={<PageNotFound/>}/>     
        </Routes>
      <AppFooter/>
    </Router>
  )
}

export default App
