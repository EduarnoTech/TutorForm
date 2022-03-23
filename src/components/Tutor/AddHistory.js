import React from "react";
import "./AddHistory.scss";
import moment from "moment" ;

const AddHistory = (props) => {
  //    const date1=props.date.toDateString();
  console.log(props.isClick);
  // console.log(props.date)
  var dateProper=new Date(props.deadline)
 var dateProper1=moment.utc(dateProper).format("LLLL");
  // console.log(dateProper)
  // var duration1=props.duration
  // console.log({duration:duration1})
  // let hr=duration1.slice(0,2);
  // let min=duration1.slice(4)

  // var duration2=hr+'hr '+min+'min';

  return (
    <section >
      <a href="#" class="data-card">
        <h3>{dateProper1}</h3>
        <h4>{props.subject}</h4>
        <p>
          {/* Time : <b>{dateProper1}</b> */}
          Description: {props.comments}
          <br/>
          Amount : {props.charges}
          <br />
          Paid : {props.payment}
          {/* <br/> */}
         
          
        </p>
        <span class="link-text">
          Status: {props.status}
          {props.isClick && (
            <div>
              <i>Duration</i>: <b style={{fontWeight:"bold"}}>{props.duration}</b>
            </div>
          )}
         
        </span>
      </a>



{/* <div class="route" id="buy"></div>
<section class="giftcard">
  <section class="giftcard-cover">
    <i class="fa fa-apple"></i>
  </section>
  <div class="giftcard-content">
    <h2>Your order will be shipped to:</h2>
    <address>
      <h3>David Khourshid</h3>    
      <a href="https://www.github.com/davidkpiano" target="_blank">www.github.com/davidkpiano</a>    
      <a href="https://www.twitter.com/davidkpiano" target="_blank">www.twitter.com/davidkpiano</a>    
    </address>
    <div class="subtext">Available to ship: 1 business day</div>    
  </div>
  <footer class="giftcard-footer">
    <div class="giftcard-text">
      <h1>Gift Card</h1>
      <h2>$25.00</h2>
    </div>
    <div class="ribbon">
      <div class="giftwrap">
        <a href="#buy" class="button">Buy</a>
      </div>
      <div class="bow">
        <i class="fa fa-bookmark"></i>
        <i class="fa fa-bookmark"></i>
      </div>
    </div>
    <div class="giftcard-info">
      <div>
        <input type="text" name="" id="" placeholder="Enter a gift message" />
      </div>
      <div>
        <a href="#" class="button secondary">Checkout</a>
      </div>
    </div>
  </footer>
</section> */}


    </section>
  );
};
export default AddHistory;
