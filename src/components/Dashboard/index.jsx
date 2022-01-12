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
        <div>
            <Users
                avatar={currentUser.avatar}
                user={currentUser.user}
                list={currentUser.list}
            />
            <Map />
            <Articles />
            <div class="placeholder">
                <div class="placeholder-icon">
                    <span class="icon">
                        <i
                            class="fa fa-wrapper fa-map-marked-alt x-large"
                            style={{ color: "#d13a1c" }}
                        ></i>
                    </span>
                </div>
                <h6 class="placeholder-title" style={{ color: "#d13a1c" }}>
                    Keep Exploring
                </h6>
                <div class="placeholder-commands u-center">
                    <div class="form-group">
                        <a href="/">
                            <button
                                class="btn-light "
                                style={{
                                    color: "#d13a1c",
                                    border: "solid #d13a1c 1px",
                                }}
                            >
                                Explore More
                            </button>
                        </a>
                    </div>
                </div>
                <div class="placeholder-subtitle" style={{ color: "#d13a1c" }}>
                    Find a new Destination
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
