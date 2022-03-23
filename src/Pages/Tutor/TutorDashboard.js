import React, { useEffect, useState } from "react";
import Profile from "../../components/Tutor/Profile";
// import Dashboard from "../../components/Tutor/Dashboard";
import Header from "../../components/Tutor/Header";
import Navi from "../../components/Tutor/Navi";
import axios from "axios";

const TutorDashboard = (props) => {
  // console.log({tutorformData:tutorformData})
  return (
    <div>
      <Navi />
      <Header />
      <div class="page-wrapper">
        <div class="row">
          <div class="col-sm-12">
            <div class="card">
              <div class="card-header" style={{marginLeft: "20%", marginRight: "5%"}}>
                <div class="pcoded-main-container" style={{minHeight:"87vh",marginLeft:"0px"}}>
                  <div class="pcoded-wrapper">
                    <div class="pcoded-content">
                      <div class="pcoded-inner-content">
                        <Profile  tutrId={props.tutrId} tutorformData={props.tutorformData} />
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDashboard;
