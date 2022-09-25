import React from "react";
import Header from "./Header";
import Bonus from "./Bonus";
import Balance from "./Balance";
import Transfer from "./Transfer";

function App() {

  return (
    <div id="screen">
      <Header />
      <Bonus />
      <Balance />
      <Transfer />
    </div>
  );
}

export default App;
