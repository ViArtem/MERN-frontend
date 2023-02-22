import React, { useState, useEffect } from "react";
import jwt from 'jwt-decode'
import "../styles/App.css";
const HistoryBlock = ({styleClass, historyList}) => {

let className = 'history '



if (styleClass) {
   className += styleClass.styleClass;
}

  return (

  <div className={className}>
     <h1 style={{ fontSize: "20px", color: 'black' }}>History</h1>
    {historyList?
    historyList.map((li)=>{
      return <p key={Math.random()} style={{ color: 'black' }}>{li}</p> 
    }): ''
  }
     
    </div>
  );
};

export default HistoryBlock;