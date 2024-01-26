import React from "react";
import Home from "./components/home";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import Forgetpass from "./components/forgetpass";
import QueryForm from "./components/dashboard/queryform";
import ChatPage from "./components/dashboard/chatpage";
import Dashbaord from "./components/dashboard/dashboard";
import Query from "./components/dashboard/query";
import Account from "./components/dashboard/account";
import CreatePass from "./components/newpass";
import Assign from "./components/dashboard/assign";
import Mentors from "./components/dashboard/mentor";
import MentorForm from "./components/dashboard/mentorform";
import Assigned from "./components/dashboard/assignedQrys";
const App = () => {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Forgetpass />} />
        <Route path="/dashboard" element={<Dashbaord />} />
        <Route path="/query" element={<Query />} />
        <Route path="/createquery" element={<QueryForm />} />
        <Route path="/query/:id" element={<ChatPage />} />
        <Route path="/account" element={<Account />} />
        <Route path="/request/:token" element={<CreatePass />} />
        <Route path="/assign" element={<Assign />} />
        <Route path="/mentors" element={<Mentors />} />
        <Route path="/mentors/:mentortoken" element={<MentorForm />} />
        <Route path="/assigned" element={<Assigned />} />
      </Routes>
    </div>
  );
};

export default App;
