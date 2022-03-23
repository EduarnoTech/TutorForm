import React,{useState} from 'react';
import {Link} from 'react-router-dom'




const Navi1 = (props) => {

    
    const clickHandlerLog=()=>{
        localStorage.removeItem('email')
        localStorage.removeItem('token')
        window.location.reload()
      }
   
    return (
        <div>
            <div class="loader-bg">
        <div class="loader-track">
            <div class="loader-fill"></div>
        </div>
    </div>
            <nav class="pcoded-navbar">
        <div class="navbar-wrapper">
            <div class="navbar-brand header-logo">
               <Link to="/Home" class="b-brand">
                   <div class="b-bg">
                       <i class="feather icon-trending-up"></i>
                   </div>
                   <span style={{fontSize:"17px"}} class="b-title">tutorlancer</span>
               </Link>
               <a class="mobile-menu" id="mobile-collapse" href="javascript:"><span></span></a>
           </div>
            <div class="navbar-content scroll-div">
                <ul class="nav pcoded-inner-navbar">
                    {/* <li class="nav-item pcoded-menu-caption">
                        <label>Navigation</label>
                    </li> */}
                    <li data-username="dashboard Default Ecommerce CRM Analytics Crypto Project" class={(props.itsClicked==="history")?"nav-item active":"nav-item "}>
                    {/* <li data-username="dashboard Default Ecommerce CRM Analytics Crypto Project" > */}
                       <Link to="/TutorSignIn/History" class="nav-link " ><span class="pcoded-micon"><i class="feather icon-home"></i></span><span style={{fontSize:"17px"}} class="pcoded-mtext" >History</span></Link>
                    </li>
                    
                    {/* <li class="nav-item pcoded-menu-caption">
                        <label>Functionalities</label>
                    </li> */}
                    <li data-username="form elements advance componant validation masking wizard picker select" class={(props.itsClicked==="session")?"nav-item active":"nav-item "} >
                     <Link to="/TutorSignIn/CurrentSessions" class="nav-link " ><span class="pcoded-micon"><i class="feather icon-file-text"></i></span><span  style={{fontSize:"17px"}} class="pcoded-mtext" >Sessions</span></Link>
                    </li>
                    <li data-username="Table bootstrap datatable footable" class={(props.itsClicked==="profile")?"nav-item active":"nav-item "}>
                   <Link to="/TutorSignIn/Profile" class="nav-link " ><span class="pcoded-micon"  ><i class="feather icon-server"></i></span><span style={{fontSize:"17px"}} class="pcoded-mtext"  >Profile</span></Link>
                    </li>
                    
                    <li data-username="Table bootstrap datatable footable" class={(props.itsClicked==="profile")?"nav-item active":"nav-item "}>
                   <Link to="/TutorSignIn/Payments" class="nav-link " ><span class="pcoded-micon"  ><i class="feather icon-server"></i></span><span style={{fontSize:"17px"}} class="pcoded-mtext"  >Payments</span></Link>
                    </li>

                    <li data-username="Disabled Menu" class="nav-item disabled"><div onClick={clickHandlerLog}><Link to="/" class="nav-link"><span class="pcoded-micon"><i class="feather icon-power"></i></span><span style={{fontSize:"17px"}} class="pcoded-mtext"  >Log Out</span></Link></div></li>
                </ul>
            </div>
        </div>
    </nav>
        </div>
    );
};

export default Navi1;