import Dashboard from "./pages/dashboard"
import { Signin } from "./pages/signin"
import { Signup } from "./pages/signup"
import ShareDashboard from "./pages/shareDashBoard"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {

  // const LazyElement = lazy(()=> import("./components/ui/YTEmbed"))
  return <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Signin/>} ></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
          <Route path="/brain/:hashValue" element={<ShareDashboard/>}></Route>
        </Routes>
      </BrowserRouter>
      
  </div>
}

export default App
