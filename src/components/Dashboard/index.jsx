import { useAuthState } from "../../store/index";
import "./Dashboard.css";
import Map from "../Map";
import React from "react";
import Users from "../Users";
import Articles from "../Articles";
import DreamList from "../DreamList/DreamList";

function Dashboard({ history }) {
    const { currentUser } = useAuthState();

    // const liStyle = { color: "red", fontSize: "23px" };

    return (
        <div className="dashboard">
            <Users avatar={currentUser.avatar} user={currentUser.user} />
            <Map />
            <DreamList />
            <Articles />
        </div>
    );
}

export default Dashboard;
