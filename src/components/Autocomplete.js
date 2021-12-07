import React,{useState,useEffect} from "react";
import classes from './autoComplete.module.css'
import './registrationForm.css'

const Autocomplete = ({isBig ,dataBase,setData,data,variableData,staticName,placeholder,setStateDriver,stateDriver}) => {
    
//  var elementName=variableData;
    // temp branch is storing temporarily branch
    const [tempDataVariable, setTempDataVariable] = useState();
    const [display, setDisplay] = useState(false);
    const [dataVariableChange, setDataVariableChange] = useState("");

   

    const handleDataVariableChange = (e) => {
        let newSkill2 = e.target.value;
        if(newSkill2===null){
          setDisplay(false);
        }
        else{
         
        let newSkill1 = newSkill2.toLowerCase();
        setDataVariableChange(newSkill1);
        setDisplay(true);
        
      }
      };



    
        const handleEnterInINput = (e) => {
        if (e.key === "Enter") {
          setTempDataVariable(dataVariableChange);
          {isBig && setStateDriver([...stateDriver,dataVariableChange])}
          setData({
            ...data,
            [staticName] :[...variableData,dataVariableChange],
          })
          {isBig && setDataVariableChange("") }
          setDisplay(false);
        }
      };
    


      const handleSetBranch = (i) => {
        const new1=i;
        console.log({new1})
       
        setTempDataVariable(new1);
        setDataVariableChange(new1);
        {isBig && setStateDriver([...stateDriver,new1])}
        console.log()
        setData({
          ...data,
          [staticName] :[...variableData,new1],
        })
        {isBig && setDataVariableChange("") }

        setDisplay(false);
      };

     
      
    
    
     
  return (
    <div 
      // id="bodyWrapper"
      className="select-list-skill"
      className={classes.flexContainer}
      className={classes.flexColumn}
      className={classes.posRel}
    >
      <input
      style={{marginBottom:"0px",marginTop:"30px"}}
      Id="skillWrapper"
        name={variableData}
        id="varibleData"
        className="skill-select arrow"
        // onClick={()=>setDisplay(true)}
        // value={skills[skills.length - 1]}
        value={dataVariableChange}
        onChange={(e)=>handleDataVariableChange(e)}
        onKeyDown={handleEnterInINput}
        onClick={()=>setDisplay(false)}
        placeholder={placeholder}
        required
        autoComplete="off"
      />
      <div>
        {display && (
          <div className={classes.autoContainer} >
            {dataBase?.filter((name) => name.toLowerCase().includes(dataVariableChange))
              .map((i) => {
                return (
                  <div
                  key="i"
                  onClick={() => handleSetBranch(i)}
                    className={classes.option}
                   
                    tabIndex="0"
                  >
                    <span
                     
                      style={{
                        color: "black",
                        fontSize: "13px",
                        textTransform: "capitalize",
                      }}
                    >
                      {i}
                    </span>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Autocomplete;
