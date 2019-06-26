import React from "react";
import { Link } from "react-router-dom";
import requiresAuth from '../../components/Auth/requiresAuth'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to={`/add-group`}>
        <button className="add-group-btn hvr-glow">New Group</button>
      </Link>
    </div>
  );
};

export default requiresAuth(Sidebar);
