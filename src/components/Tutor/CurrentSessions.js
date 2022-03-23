import React, { useState, useEffect, Fragment } from "react";
// import Navi from "./Navi";
// import Header from "./Header";
// import AddHistory from "./AddHistory";
// import axios from "axios";
// import ChangeButtons from "./ChangeButtons";
// import Card from "@mui/material/Card";

// // import "./Profile.css";

// const CurrentSessions = () => {
//   const [hist1, setHist] = useState();
//   const [liveHist1, setLiveHist] = useState();
//   const [isClick, setIsClick] = useState(false);
//   var hist;
//   var liveHist;
//   const DUMMY_History = [
//     {
//       id: "m1",
//       date: "09-09-2022",
//       session: "live",
//       subject: "mathematics",
//       charges: "22.99",
//       payment: "$21",
//     },
//     {
//       id: "m2",
//       date: "10-09-2022",
//       session: "live",
//       subject: "mathematics",
//       charges: "$22.99",
//       payment: "$21",
//     },
//     {
//       id: "m3",
//       date: "11-09-2022",
//       session: "assignment",
//       subject: "mathematics",
//       charges: "$22.99",
//       payment: "$21",
//     },
//     {
//       id: "m4",
//       date: "19-09-2022",
//       session: "live",
//       subject: "mathematics",
//       charges: "$22.99",
//       payment: "$21",
//     },
//   ];

//   const historyHandler = async () => {
//     // const date1=item.date.toDateString();
//     await axios
//       .post("http://localhost:8800/client/history", {
//         email: localStorage.getItem("email"),
//       })
//       .then((res1) => {
//         console.log(res1.data);
//         hist = res1.data.map((item) => (
//           <AddHistory
//             isClick={isClick}
//             key={item._id}
//             date={item.date}
//             subject={item.subject}
//           />
//         ));
//         setHist(hist);
//       })
//       .catch((err) => console.log("not able to get sessions"));
//   };
//   useEffect(() => {
//     console.log("useeffect is working");
//     historyHandler();
//   }, []);

//   const liveHistoryHandler = async () => {
//     await axios
//       .post("http://localhost:8800/client/liveHistory", {
//         email: localStorage.getItem("email"),
//       })
//       .then((res) => {
//         console.log(res.data);
//         liveHist = res.data.map((item) => (
//           <AddHistory
//             isClick={isClick}
//             key={item._id}
//             date={item.date}
//             sessionDate={item.dates}
//             subject={item.subject}
//           />
//         ));
//         setLiveHist(liveHist);
//       })
//       .catch((err) => console.log("not able to get sessions"));
//   };
//   useEffect(() => {
//     console.log("useeffect is working");
//     liveHistoryHandler();
//   }, []);

//   return (
    // <div>
    //   <Navi />
    //   <Header />

    //   <div class="h_price_inner">
    //     <div>
    //       <ChangeButtons isClick={isClick} setIsClick={setIsClick} />
    //       {!isClick && (
    //         <div class="tab-content h_price_tab" id="myTabContent">
    //           <div
    //             class="tab-pane fade show active"
    //             id="home"
    //             role="tabpanel"
    //             aria-labelledby="home-tab"
    //           >
    //             {/* <p>

    //           </p> */}
    //             <div class="h_price_body">
    //               <div class="price_head">
    //                 {/* <div class="p_head">
    //                   <h5>Date</h5>
    //                 </div>

    //                 <div class="p_head">
    //                   <h5>Session Type</h5>
    //                 </div>

    //                 <div class="p_head">
    //                   <h5>Subject</h5>
    //                 </div>
    //                 <div class="p_head">
    //                   <h5>Status</h5>
    //                 </div>
    //                 <div class="p_head">
    //                   <h5>Charges </h5>
    //                 </div>
    //                 <div class="p_head">
    //                   <h5>Payment</h5>
    //                 </div>
    //                 <div class="p_head c_width">
    //                   <div className="h_price_item c_width"></div>
    //                 </div> */}
    //               </div>

    //               <main class="MuiContainer-root MuiContainer-maxWidthMd css-1ogza8y">
    //                 <div class="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-5 css-r6ceg9">
    //                   <div class=" row MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-6 MuiGrid-grid-md-4 css-1057s6h">
    //                     <div class="row">{hist1}</div>
    //                   </div>
    //                 </div>
    //               </main>
    //             </div>
    //           </div>
    //         </div>
    //       )}

    //       {isClick && (
    //         <div class="tab-content h_price_tab" id="myTabContent">
    //           <div
    //             class="tab-pane fade show active"
    //             id="home"
    //             role="tabpanel"
    //             aria-labelledby="home-tab"
    //           >
    //             {/* <p>
            
    //         </p> */}
    //             <div class="h_price_body">
    //               <div class="price_head">
    //                 <div class="p_head">
    //                   <h5>Date</h5>
    //                 </div>
    //                 <div class="p_head">
    //                   <h5>Session Type</h5>
    //                 </div>
    //                 <div class="p_head">
    //                   <h5>Subject</h5>
    //                 </div>
    //                 <div class="p_head">
    //                   <h5>Session Date</h5>
    //                 </div>
    //                 <div class="p_head">
    //                   <h5>Status</h5>
    //                 </div>
    //                 <div class="p_head">
    //                   <h5>Charges </h5>
    //                 </div>
    //                 <div class="p_head">
    //                   <h5>Payment</h5>
    //                 </div>
    //                 <div className="p_head c_width">
    //                   <div className="h_price_item c_width"></div>
    //                 </div>
    //               </div>
    //               {liveHist1}
    //             </div>
    //           </div>
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </div>
//   );
// };

// export default History;
import Card1 from "./Cards/Card1"

import Navi from "./Navi";
import Header from "./Header";
import AddHistory from "./AddHistory";
import axios from "axios";
import ChangeButtons from "./ChangeButtons";
import Card from "@mui/material/Card";

// import "./Profile.css";

const CurrentSessions = (props) => {
  const [currentSessions_assignment, setCurrentSessions_assignment] = useState([]);
  const [currentSessions_live, setCurrentSessions_live] = useState([]);
  const [isClick, setIsClick] = useState(false);
  var hist;
  var liveHist;
  // const CurrentSessions_live = [
  //   {
  //     key:123,
  //     session_id: "11000101",
  //     date: "JAN 2,2022",
  //     status: "incomplete",
  //     subject: "mathematics",
  //     amount: "22.99",
  //     time: "09:30 Am",
  //     duration:"01 hr",
  //     description:"Answer should be upto the point"
  //   },
  //   {
  //     key:124,  
  //     session_id: "11000102",
  //       date: "DEC 9,2021",
  //       status: "incomplete",
  //       subject: "mathematics",
  //       amount: "22.99",
  //       time: "09:30 Am",
  //       duration:"01 hr",
  //       description:"Answer should be upto the point"
  //     },
  //     {
  //       key:125,
  //       session_id: "11000103",
  //       date: "JAN 7,2022",
  //       status: "incomplete",
  //       subject: "mathematics",
  //       amount: "22.99",
  //       time: "09:30 Am",
  //       duration:"01 hr",
  //       description:"Answer should be upto the point"
  //     },
  //     {
  //       key:126,
  //       session_id: "11000104",
  //       date: "FEB 7,2022",
  //       status: "incomplete",
  //       subject: "mathematics",
  //       amount: "22.99",
  //       time: "09:30 Am",
  //       duration:"01 hr",
  //       description:"Answer should be upto the point"
  //     },
  // ];
  // const CurrentSessions_assignment = [
  //   {
  //     key:127,
  //     session_id: "11000107",
  //     date: "FEB 7,2022",
  //     status: "incomplete",
  //     subject: "mathematics",
  //     amount: "22.99",
  //     time: "09:30 Am",
  //     description:"Palgarism check will be there"
  //   },
  //   {
  //     key:128,  
  //     session_id: "11000108",
  //       date: "FEB 7,2022",
  //       status: "incomplete",
  //       subject: "mathematics",
  //       amount: "22.99",
  //       time: "09:30 Am",
  //       description:"Palgarism check will be there"
  //     },
  //     {
  //       key:129,
  //       session_id: "11000109",
  //       date: "DEC 9,2021",
  //       status: "incomplete",
  //       subject: "mathematics",
  //       amount: "22.99",
  //       time: "09:30 Am",
  //       // duration:"01 hr",
  //       description:"Palgarism check will be there"
  //     },
  //     {
  //       key:130,
  //       session_id: "11000110",
  //       date: "DEC 9,2021",
  //       status: "incomplete",
  //       subject: "mathematics",
  //       amount: "22.99",
  //       time: "09:30 Am",
  //       // duration:"01 hr",
  //       description:"Palgarism check will be there"
  //     },
  //     {
  //       key:131,
  //       session_id: "11000110",
  //       date: "DEC 9,2021",
  //       status: "incomplete",
  //       subject: "mathematics",
  //       amount: "22.99",
  //       time: "09:30 Am",
  //       // duration:"01 hr",
  //       description:"Palgarism check will be there"
  //     },
  // ];

//   const assignmentHandler = async () => {
//     // const date1=item.date.toDateString();
//     await axios
//       .post("http://localhost:8800/client/history", {
//         email: localStorage.getItem("email"),
//       })
//       .then((res1) => {
//         console.log(res1.data);
//         hist = res1.data.map((item) => (
//           <AddHistory
//             isClick={isClick}
//             key={item._id}
//             date={item.date}
//             subject={item.subject}
//           />
//         ));
//         setHist(hist);
//       })
//       .catch((err) => console.log("not able to get sessions"));
//   };
//   useEffect(() => {
//     console.log("assignmentHandler useeffect is working");
//     assignmentHandler();
//   }, []);

//   const liveHistoryHandler = async () => {
//     await axios
//       .post("http://localhost:8800/client/liveHistory", {
//         email: localStorage.getItem("email"),
//       })
//       .then((res) => {
//         console.log(res.data);
//         liveHist = res.data.map((item) => (
//           <AddHistory
//             isClick={isClick}
//             key={item._id}
//             date={item.date}
//             sessionDate={item.dates}
//             subject={item.subject}
//           />
//         ));
//         setLiveHist(liveHist);
//       })
//       .catch((err) => console.log("not able to get sessions"));
//   };
//   useEffect(() => {
//     console.log("useeffect is working");
//     liveHistoryHandler();
//   }, []);
// debugger


const currentSessions = async () => {
  // const date1=item.date.toDateString();
  let hist1=[]
  let liveHist1=[]
  await axios
    .get(
      "https://annular-arena-331607.el.r.appspot.com/api/sessions/getSessions/upcoming?page=1&limit=20",
     
    )
    .then((res1) => {
      console.log({response194:res1.data});
    res1.data.result.forEach(element  => {
      if(element?.assigned_tutors?.find((el2)=>el2?.tutor_id===props.tutrId)){
      if (element.type === "Assignment") {
       
          // <AddHistory
          //   isClick={false}
          //   key={item._id}
          //   date={item.date}
          //   deadline={item.deadline}
          //   subject={item.subject}
          // />
          hist1.push(element);
          console.log("hist1 in current session")
        
        // setHist(hist);
      } else {
        // liveHist = res1.data.map((item) => (
          // <AddHistory
          //   isClick={true}
          //   key={item._id}
          //   date={item.date}
          //   deadline={item.deadline}
          //   sessionDate={item.dates}
          //   subject={item.subject}
          // />

          let duration2="";
          let duration1=element.duration
          console.log({duration:duration1})
          let hr=duration1.slice(0,2);
          
          let min=duration1.slice(4)
          console.log({min})
        if(hr==="00"){
         duration2=min+'min';
        }
          else if(min===" 00"){
           duration2=hr+'hr ';
          }
          else
          { duration2=hr+'hr '+min+'min';}

          element.duration=duration2


          liveHist1.push(element)
          console.log("livehist1 in current session")
      // });
        // setIsClick(true)
        // setLiveHist(liveHist);
      }
    }
    else{
      console.log("no currentsessions elements found")
    }
      // ));
    })
    
    setCurrentSessions_assignment(hist1);
    setCurrentSessions_live(liveHist1)
    console.log("hist useState in current session")
  })
    .catch((err) => console.log("not able to get sessions"));
};


useEffect(() => {
  console.log("useeffect is working");
  // setIsClick(false)
  currentSessions();
}, []);



    return (
       <Fragment>
            <div>
      <Navi />
      <Header />

      <div class="h_price_inner" >
        <div>
          <ChangeButtons isClick={isClick} setIsClick={setIsClick} />
          {!isClick && (
          <div class="tab-content h_price_tab" id="myTabContent">
          <div
            class="tab-pane fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <div class="h_price_body" style={{overflow:"scroll",height:"800px"}}>
              <div class="price_head">
              </div>
              {currentSessions_assignment.map((item)=>
              <Card1  
              isClick={false} 
              key={item._id}
              duration={item.duration}
              deadline={item.deadline}
              sessionDate={item.dates}
              subject={item.subject}
              status={item.work_status}
              comments={item.client_comments}
              />
              )}
            </div>
          </div>
        </div>
          )}

          {isClick && (
            <div class="tab-content h_price_tab" id="myTabContent">
              <div
                class="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <div class="h_price_body" style={{overflow:"scroll",height:"800px"}}>
                  <div class="price_head">
                  </div>
                  <div  >
                  {currentSessions_live.map((item)=>
                  <Card1  
                   isClick={true}
                   key={item._id}
                   amount={item.tutor_dealt_amount}
                   session_id={item.session_id}
                   duration={item.duration}
                   deadline={item.deadline}
                   sessionDate={item.dates}
                   subject={item.subject}
                   status={item.work_status}
                   comments={item.client_comments}
                   />)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
       </Fragment>
    );
};

export default CurrentSessions;
