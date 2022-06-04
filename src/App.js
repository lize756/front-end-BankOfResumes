import "./App.css";
import React from "react";
import MainCompany from "./config/routes/MainCompany";
import MainGraduated from "./config/routes/MainGraduated";

//import router to control the router of all aplication
import { BrowserRouter as Router } from "react-router-dom";

//Redu
import { Provider } from "react-redux";
import store from "../src/components/store/indexStore";
import MainRegister from "./config/routes/MainRegister";

function App() {
  return (
    <Provider store={store}>
      {" "}
      {/**" All app store"*/}
      <Router>
        {" "}
        {/**This tag allow keep the global state of all aplication */}
        <div>
          <MainRegister />
          <MainCompany />
          <MainGraduated />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
