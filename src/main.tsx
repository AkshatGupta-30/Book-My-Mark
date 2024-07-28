import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App.tsx";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
