import { DashBoard } from "./pages/DashBoard";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { RecoilRoot } from "recoil";

import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return <RecoilRoot>
      <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup/>} />
        <Route path='/signin' element={<Signin/>} />
        <Route path='/dashboard' element={<DashBoard/>} />
      </Routes>
    </BrowserRouter>
  </RecoilRoot>
}

export default App;