import React, { useState, useEffect } from "react";
import Navi from "./Navi";
import Header from "./Header";
import AddHistory from "./AddHistory";
import axios from "axios";
import ChangeButtons from "./ChangeButtons";


const History = (props) => {
  const [isClick, setIsClick] = useState(false);
  const [hist, setHist] = useState([]);
  const [liveHist, setLiveHist] = useState([]);

  const [itsClicked, setItsClicked] = useState("history");
 
  // const DUMMY_History = [
  //   {
  //     id: "m1",
  //     date: "09-09-2022",
  //     session: "live",
  //     subject: "mathematics",
  //     charges: "$22.99",
  //     payment: "$21",
  //   },
  //   {
  //     id: "m2",
  //     date: "10-09-2022",
  //     session: "live",
  //     subject: "mathematics",
  //     charges: "$22.99",
  //     payment: "$21",
  //   },
  //   {
  //     id: "m3",
  //     date: "11-09-2022",
  //     session: "assignment",
  //     subject: "mathematics",
  //     charges: "$22.99",
  //     payment: "$21",
  //   },
  //   {
  //     id: "m4",
  //     date: "19-09-2022",
  //     session: "live",
  //     subject: "mathematics",
  //     charges: "$22.99",
  //     payment: "$21",
  //   },
  // ];

  const historyHandler = async () => {
    // const date1=item.date.toDateString();
    let hist1=[]
    let liveHist1=[]
    await axios
      .get(
        "https://annular-arena-331607.el.r.appspot.com/api/sessions/getSessions/past?page=1&limit=20",
       
      )
      .then((res1) => {
        console.log({response194:res1});
        console.log({tutrId_ofTutor:props.tutrId})
      res1.data.result.forEach(element  => {
        console.log({tutrId_current:element?.assigned_tutors[0]?.tutor_id})
        console.log({tutrId_ofTutor:props.tutrId})
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
          
          // setHist(hist);
        } else {
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
        
          // liveHist = res1.data.map((item) => (
            // <AddHistory
            //   isClick={true}
            //   key={item._id}
            //   date={item.date}
            //   deadline={item.deadline}
            //   sessionDate={item.dates}
            //   subject={item.subject}
            // />
            liveHist1.push(element)
        // });
          // setIsClick(true)
          // setLiveHist(liveHist);
        }
      }
      else{
        console.log("no history elements found")
      }
        // ));
      })
      setHist(hist1);
      setLiveHist(liveHist1)
    })
      .catch((err) => {console.log("not able to get sessions")
      console.log(err)
    });
  };



  useEffect(() => {
    console.log("useeffect is working");
    // setIsClick(false)
    historyHandler();
  }, []);

  // const liveHistoryHandler = async () => {
  //   await axios
  //     .post("http://localhost:8800/client/liveHistory", {
  //       email: localStorage.getItem("email"),
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       liveHist = res.data;
  //       liveHist = res.data.map((item) => (
          // <AddHistory
          //   isClick={true}
          //   key={item._id}
          //   date={item.date}
          //   deadline={item.deadline}
          //   sessionDate={item.dates}
          //   subject={item.subject}
          // />
  //       ));
  //       // setIsClick(true)
  //       setLiveHist(liveHist);
  //     })
  //     .catch((err) => console.log("not able to get sessions"));
  // };
  // useEffect(() => {
  //   console.log("useeffect is working");
  //   // setIsClick(true)
  //   liveHistoryHandler();
  // }, []);

  return (
    <div>
      <Navi itsClicked={itsClicked} />
      <Header />

      <div class="h_price_inner" style={{maxWidth:"1030px"}}>
        <div>
          <ChangeButtons isClick={isClick} setIsClick={setIsClick} />
          {!isClick && (
            <div class="row" style={{ overflow: "scroll", height: "800px",marginRight:"0px" }}>
              {hist.map((item)=>

                <AddHistory
                isClick={false}
                key={item._id}
                date={item.date}
                deadline={item.deadline}
                subject={item.subject}
                status={item.work_status}
                comments={item.client_comments}
                />  
              )}
            </div>
          )}

          {isClick && (
            <div class="row" style={{ overflow: "scroll", height: "800px" ,marginRight:"0px"}}>
             
              {liveHist.map((item)=>
              
              <AddHistory
              isClick={true}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
