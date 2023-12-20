import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Public from "./components/Public";
import DashboardLayout from "./components/DashboardLayout";
import PersistLogin from "./features/auth/PersistLogin";
import Path from "./Path";
import Profile from "./features/profile/Profile";
import Prefetch from "./components/Prefetch";
import PreventSigns from "./PreventSigns";
import SinglePost from "./features/profile/SinglePost";
import ScrollToTop from "./ScrollToTop";
import Direct from "./features/direct/Direct";
import Main from "./features/main/Main";
import Chat from "./features/direct/Chat";

function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<PersistLogin />}>
            <Route element={<Prefetch />}>
              <Route element={<PreventSigns />}>
                <Route index element={<Public />} />
              </Route>

              <Route path="/:username" element={<Path />}>
                <Route path="/:username" element={<DashboardLayout />}>
                  <Route index element={<Main />} />
                  <Route path="/:username/message" element={<Direct />} />
                    <Route path="/:username/message/:user" reloadDocument element={<Chat />} />
                  <Route path="/:username/:person" element={<Profile />} />
                  <Route path="/:username/:profile" element={<Profile />} />
                  <Route
                    path="/:username/:profile/:id"
                    element={<SinglePost />}
                  />
                  <Route
                    path="/:username/:profile/*"
                    element={
                      <h2 className="fourOfour">404 page does not exists!</h2>
                    }
                  />
                  <Route
                    path="/:username/message/*"
                    element={
                      <h2 className="fourOfour">404 page does not exists!</h2>
                    }
                  />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
