import React,{useEffect, useState} from 'react';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import AddNotify from '../Notification'
import axios from 'axios';
import {Link} from 'react-router-dom'
// import Notification from'../Notification'

const Header = (props) => {
  const[notify,setNotify]=useState() 


  const clickHandlerLog=()=>{
    localStorage.removeItem('email')
    localStorage.removeItem('token')
    window.location.reload()
  }



  
  const DUMMY_Notification = [
    {
      id: "m1",
      status:'Earlier',
     Name:"Bhavesh",
     para:"how to find new phase",
     time:'40m'
    },
    {
      id: "m2",
      status:'old',
      Name:"Kallu kaliya",
      para:"how to find new phase",
      time:'50m'
    },
    {
      id: "m3",
     status:'New',
     Name:"shvanshu",
     para:"how to find new phase",
     time:'1h 30m'
    }]

  
 const notificationHandler=async()=>{
  
  
    let noti=DUMMY_Notification.map((item)=><AddNotify key={item._id} status={item.status}  name={item.Name} para={item.para} time={item.time} />)
    setNotify(noti);
  
}
useEffect(()=>{
  console.log("useeffect is working")
  notificationHandler()
},[])

    return (
        <div>
          
            <header class="navbar pcoded-header navbar-expand-lg navbar-light">
          <div class="m-header">
            <a class="mobile-menu" id="mobile-collapse1" href="#">
              <span></span>
            </a>
            <a href="index.html" class="b-brand">
              <div class="b-bg">
                <i class="feather icon-trending-up"></i>
              </div>
              <span class="b-title">Datta Able</span>
            </a>
          </div>
          <a class="mobile-menu" id="mobile-header" href="">
            <i class="feather icon-more-horizontal"></i>
          </a>
          <div class="collapse navbar-collapse">
            <ul class="navbar-nav mr-auto">
              <li>
                <a
                  href="#"
                  class="full-screen"
                  onclick="#:toggleFullScreen()"
                >
                  <i class="feather icon-maximize"></i>
                </a>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="dropdown-toggle"
                  href="#"
                  data-toggle="dropdown"
                >
                  Dropdown
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#:">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#:">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
              <li class="nav-item">
                <div class="main-search">
                  <div class="input-group">
                    <input
                      type="text"
                      id="m-search"
                      class="form-control"
                      placeholder="Search . . ."
                    />
                    <a
                      href="#:"
                      class="input-group-append search-close"
                    >
                      <i class="feather icon-x input-group-text"></i>
                    </a>
                    <span class="input-group-append search-btn btn btn-primary">
                      <i class="feather icon-search input-group-text"></i>
                    </span>
                  </div>
                </div>
              </li>
            </ul>
            <ul class="navbar-nav ml-auto">
              <li>
                <div class="dropdown" onClick={notificationHandler}>
                  <a
                    class="dropdown-toggle"
                    href="#:"
                    data-toggle="dropdown"
                  >
                    <i class="icon feather icon-bell"></i>
                  </a>
                  <div class="dropdown-menu dropdown-menu-right notification">
                    <div class="noti-head">
                      <h6 class="d-inline-block m-b-0">Notifications</h6>
                      <div class="float-right">
                        <a href="#:" class="m-r-10">
                          mark as read
                        </a>
                        <a href="#:">clear all</a>
                      </div>
                    </div>
                    <ul class="noti-body">


                    {notify}




                     
                    </ul>
                    <div class="noti-footer">
                      <a href="#:">show all</a>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="dropdown drp-user">
                  <a
                    href="#:"
                    class="dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    <i class="icon feather icon-settings"></i>
                  </a>
                  <div class="dropdown-menu dropdown-menu-right profile-notification">
                    <div class="pro-head">
                     
                      <span>{props.enteredName}</span>
                      <a
                        href="auth-signin.html"
                        class="dud-logout"
                        title="Logout"
                      >
                        <i class="feather icon-log-out"></i>
                      </a>
                    </div>
                    <ul class="pro-body">
                     
                      <li>
                        <a href="#:" class="dropdown-item">
                          <i class="feather icon-user"></i> Profile
                        </a>
                      </li>
                      <li>
                        <a href="message.html" class="dropdown-item">
                          <i class="feather icon-mail"></i> My Messages
                        </a>
                      </li>
                      <li>
                      
                      <div onClick={clickHandlerLog}>
                        <Link to="/SignIn" class="dropdown-item">
                          <i class="feather icon-lock"></i> Log Out
                        </Link>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </header>
        </div>
    );
};

export default Header;