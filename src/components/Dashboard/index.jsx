import { useAuthState } from "../../store/index";
import "./Dashboard.css";
import Map from "../Map";
import React from "react";
import Users from "../Users";
import Articles from "../Articles";

function Dashboard({ history }) {
    const { currentUser } = useAuthState();

    // const liStyle = { color: "red", fontSize: "23px" };

    return (
        <div className="dashboard">
            <Users avatar={currentUser.avatar} user={currentUser.user} list={currentUser.list} />
            <Map />
            <Articles />
            <div class="placeholder">
                <div class="placeholder-icon"><span class="icon"><i class="fa fa-wrapper fa-map-marked-alt x-large"></i></span></div>
                <h6 class="placeholder-title">Keep Exploring</h6>
                <div class="placeholder-commands u-center">
                    <div class="form-group">
                        <a href="/">
                            <button class="btn-warning">Explore More</button>
                        </a>
                    </div>
                </div>
                <div class="placeholder-subtitle">Find a new Destination</div>

            </div>
        </div>
    );
}

export default Dashboard;
