import React, { useState } from "react";
import { token } from "../../../declarations/token";

function Bonus() {

  const [isDisabled, setDisabled]= useState(false);
  const [buttonText, setText]= useState("Give Me");

  async function handleClick(event) {
      setDisabled(true);
      const result = await token.payOut();
      setText(result);
      // setDisabled(false);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
        🪙
        </span>
        Bonus
      </h2>
      <label> Get 5,000 DC coins in your account by clicking here!</label>
      <p className="trade-buttons">
        <button 
          id="btn-payout" 
          onClick={handleClick}
          disabled={isDisabled}
          >
          {buttonText}
        </button>
      </p>
    </div>
  );
}


export default Bonus;
