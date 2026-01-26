import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "../src/styles/index.css"
import {MessageProvider} from "./app/components/UseMessage";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <MessageProvider>
            <App />
        </MessageProvider>
    </React.StrictMode>
);
