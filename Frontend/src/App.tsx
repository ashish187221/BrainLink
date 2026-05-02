import Dashboard from "./pages/dashboard"
import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"
import { SharePage } from "./pages/SharePage";
import { LandingPage } from "./pages/LandingPage";
import { LearnMore } from "./pages/LearnMore";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SoonerToastProvider } from "./components/SoonerToastProvider";

function App() {                                     
  return (
    <BrowserRouter>
      <SoonerToastProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/share/:hash" element={<SharePage />} />
          <Route path="/learn-more" element={<LearnMore />} />
        </Routes>
      </SoonerToastProvider>
    </BrowserRouter>
  );
}

export default App
