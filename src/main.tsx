import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "../src/styles/index.css"
import {MessageProvider} from "./app/components/UseMessage";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <MessageProvider>
                <App />
            </MessageProvider>
        </BrowserRouter>
    </React.StrictMode>
);
