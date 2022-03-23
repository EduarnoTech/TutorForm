import React,{useState,useEffect} from "react";
import {Link} from "react-router-dom"
import "./Card1.scss";
import moment from "moment" ;

const Card1 = (props) => {
  const[isBuy,setIsBuy]=useState(false)
  const[changeComment,setChangeComment]=useState()
  const buyHandler =()=>{
    // if(isBuy===true){
    //   setIsBuy(false)
    // }
    // else{
      setIsBuy(true)
    // }
  }
  const commentHandler=(event)=>{
    let val=event.target.value
    setChangeComment(val)
  }
  const submitComment=()=>{
    alert("comment for this session has been saved")
    setChangeComment("")
  }
  
  // const submitComment=(event)=>{
  //   const submitComm= await axios
  //   .post(
  //     "https://annular-arena-331607.el.r.appspot.com/api/sessions/getSessions/submitTutorComment",
  //    {
  //      comments:changeComment
  //    }
  //   )

  //   if(submitComm.data.success){
  //     alert ("success")
  //     setChangeComment("")
      
  //   }
  //   else{
  //     alert("something went wrong!please try again")
  //   }
  // }

  var dateProper=new Date(props.deadline)
 var dateProper1=moment.utc(dateProper).format("LLLL");
  // useEffect(()=> {
  //   setIsBuy(false);
  //   },[])
  // debugger
  return (
    <div>
      {/* <div class="recipe-card">
        <aside>
          <img
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/203277/oatmeal.jpg"
            alt="Chai Oatmeal"
          />

          <a href="#" class="button">
            <span class="icon icon-play"></span>
          </a>
        </aside>

        <article style={{border:"groove", width:"200%"}}>
          <h2>Chai Oatmeal</h2>
          <h3>Breakfast</h3>

          <ul>
            <li>
              <span class="icon icon-users"></span>
              <span>1</span>
            </li>
            <li>
              <span class="icon icon-clock"></span>
              <span>15 min</span>
            </li>
            <li>
              <span class="icon icon-level"></span>
              <span>Beginner level</span>
            </li>
            <li>
              <span class="icon icon-calories"></span>
              <span>248</span>
            </li>
          </ul>

          <p>
            For an extra thick and creamy bowl, add oat bran. It'll make for a
            hearty helping and also add more fiber to your meal. If you love the
            taste of chai, you'll enjoy this spiced version with coriander,
            cinnamon, and turmeric.
          </p>

          <p class="ingredients">
            <span>Ingredients:&nbsp;</span>Milk, salt, coriander, cardamom,
            cinnamon, turmeric, honey, vanilla extract, regular oats, oat bran.
          </p>
        </article>
      </div> */}
      

      {isBuy && <div class="route" id="buy"></div>}
      <section
        class="giftcard"
        style={{
          width: "96%",
          height: "170px",
          margin: "2%",
          marginBottom: "5%",
        }}
      >
        <section class="giftcard-cover">
          <b style={{ fontSize: "large", fontFamily: "inherit", color: "white" }}
          >
           {props.isClick ? "Start_On : " :" Deadline : "} {dateProper1} 
          </b>
        </section>


        <div class="giftcard-content">
          <div style={{display:"flex" }}>
          <div style={{ display: "flex",flex: "100%" }}>
            <h2 style={{ flex: "40%" }}>Session_Id - {props.session_id}</h2>
            {props.isClick &&<div style={{ flex: "30%" }} class="subtext">Duration : {props.duration}</div>}
            <div style={{ flex: "30%" }} class="subtext">Status : {props.status}</div>
          </div>
          <a href="#" style={{ flex: "0%" }} class="fa fa-times" onClick={()=>setIsBuy(false)}></a>
          </div>
          {/* <address>
      <h3>{props.i.subject}</h3>    
      <a href="" target="_blank">Date: {props.i.date} {props.i.time}</a>    
      <a href="" target="_blank">Duration : {props.i.duration}</a>    
    </address> */}
          <div class="subtext">Description : {props.comments}</div>
        </div>


        <footer class="giftcard-footer" style={{ display: "flex" }}>
          <div class="giftcard-text" style={{ flex: "20%" }}>
            <h1>Amount</h1>
            <h2>${(props.amount)/100}</h2>
          </div>
          <div class="giftcard-text" style={{ flex: "60%" }}>
            <h1>Subject</h1>
            <h2>{props.subject}</h2>
          </div>
          {/* <div style={{flex:"60%",alignSelf:"center", fontSize:"large"}} >
      <h1>Subject</h1>
      <h2 style={{color:"#939393"}} >{props.i.subject}</h2>
      {/* <div class="subtext" style={{flex:"60%"}}>{props.i.subject}</div> */}
          {/* </div> */}
          <div class="ribbon">
            <div class="giftwrap">
              <a href="#buy" class="button" onClick={buyHandler}>
                Check
              </a>
            </div>
            <div class="bow">
              <i class="fa fa-bookmark"></i>
              <i class="fa fa-bookmark"></i>
            </div>
          </div>



          <div class="giftcard-info">
            <div>
              <input
                type="text"
                name=""
                id=""
                onChange={(e)=>commentHandler(e)}
                value={changeComment}
                placeholder="Enter text here..."
              />
            </div>
            <div>
            <button onClick={submitComment} style={{border:"aliceblue"}}class="button secondary">
                Comment
                
              </button>
    
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
};

export default Card1;
