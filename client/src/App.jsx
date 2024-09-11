import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import SignUp from './signup'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Login'
import ToDoPage from './Todo'
import Information from './completed'
import Information2 from './notcompleted'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register"element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path='/todo' element={<ToDoPage />} />
        <Route path="/completed"element={<Information />} />
        <Route path="/notcompleted"element={<Information2 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
