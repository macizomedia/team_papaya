import { useAuthDispatch, logout, useAuthState } from "../../store/index";
import './Dashboard.css';
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/micah";
import Map from '../Map';
import React, { useEffect, useState } from 'react';
import { VectorMap } from "react-jvectormap";
import Users from '../Users'
import Articles from '../Articles'




function Dashboard({ history }) {
  const { currentUser } = useAuthState();

  // const liStyle = { color: "red", fontSize: "23px" };

  return (
    <div className="dashboard">
     < Users avatar={currentUser.avatar} user={currentUser.user}/>
     <Map />
     <Articles />

     
    </div >
  );
}

export default Dashboard;