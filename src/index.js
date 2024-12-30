import React from "react";
import ReactDOM from "react-dom/client";
import Demos from "./common/Index.jsx";
import "wx-react-gantt/dist/gantt.css";

const root = ReactDOM.createRoot(document.querySelector("#wx_demo_area") || document.body);
root.render(
	
    <Demos />
  	
);
