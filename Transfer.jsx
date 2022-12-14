import React, { useCallback, useState, useSyncExternalStore } from "react";
import { token } from "../../../declarations/token";
import { Principal } from '@dfinity/principal';

function Transfer() {

  const [recipientid, setId]= useState("");
  const [amount, setAmount]= useState("");
  const [isDisabled, setDisabled]= useState(false);
  const [feedback, setfeedback]= useState("");
  
  async function handleClick() {
    setDisabled(true);
    const recipient=Principal.fromText(recipientid);
    const amountToTransfer = Number(amount);
    const result = await token.transfer(recipient, amountToTransfer);
    setfeedback(result);
    setDisabled(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={recipientid}
                onChange={(e) => setId(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" 
           onClick={handleClick}
           disabled={isDisabled}
           >
            Transfer
          </button>
        </p>
        <p>{feedback}</p>
      </div>
    </div>
  );
}

export default Transfer;
