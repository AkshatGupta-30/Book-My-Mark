import React from "react";
import ReactDOM from "react-dom/client";
import App from "../pages/App";

const rootDiv = document.createElement("div");
document.body.appendChild(rootDiv);

const modalPortal = document.createElement("div");
modalPortal.setAttribute("id", "modal-portal");
document.body.appendChild(modalPortal);

const root = ReactDOM.createRoot(rootDiv);
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
