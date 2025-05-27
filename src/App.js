import React from "react";
import { HashRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Posts from "./pages/Posts";
import Comments from "./pages/Comments";
import Albums from "./pages/Albums";
import Photos from "./pages/Photos";
import Todos from "./pages/Todos";
import Users from "./pages/Users";
// other imports

function App() {
  return (
    <Router>
      <div className="container">
        <aside className="sidebar">
          <NavLink to="/posts" className={({ isActive }) => isActive ? "active" : ""}>Posts</NavLink>
          <NavLink to="/comments" className={({ isActive }) => isActive ? "active" : ""}>Comments</NavLink>
          <NavLink to="/albums" className={({ isActive }) => isActive ? "active" : ""}>Albums</NavLink>
          <NavLink to="/photos" className={({ isActive }) => isActive ? "active" : ""}>Photos</NavLink>
          <NavLink to="/todos" className={({ isActive }) => isActive ? "active" : ""}>Todos</NavLink>
          <NavLink to="/users" className={({ isActive }) => isActive ? "active" : ""}>Users</NavLink>
          {/* add others */}
        </aside>

        <main className="main-content">
          <Routes>
            <Route path="/posts" element={<Posts />} />
            <Route path="/comments" element={<Comments />} />
            <Route path="/albums" element={<Albums />} />
            <Route path="/photos" element={<Photos />} />
            <Route path="/todos" element={<Todos />} />
            <Route path="/users" element={<Users />} />
            {/* add other routes */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}
export default App;