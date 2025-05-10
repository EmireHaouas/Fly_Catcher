import React, { useState } from "react";
import './NewFTracker.css';
import planeIconButton from '../../assets/imgs/planeIconButton.webp';


const FTracker = ({onChangeFlightNumber,valueFlightNumber, onChangeDate,valueDate,onClick}) => {
    
    return (
        <>
        <form>
            <div className="input_Container">

              <input onChange={onChangeFlightNumber} 
                value={valueFlightNumber} 
                className="fNumberInput" 
                type="text" 
                placeholder="Enter Your Flight Number" />
              
              <input 
               className="dateInput"
                value={valueDate}
               onChange={onChangeDate}
               type="date"/>

               <img onClick={onClick} className="planeIconButton" src={planeIconButton} alt="plane icon button" />

           
            
            </div>
           


        </form>
        </>
    );
    };

export default FTracker;