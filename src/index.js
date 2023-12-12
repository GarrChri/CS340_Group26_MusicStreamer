/* index.js

Citation Information
This file was provided with the create-react-app starter code.
Original code was obtained from: https://react.dev
Date: 10/28/2023

Citation for the following function: <QueryClientProvider>
Date: 10/28/2023
Adapted from: https://tanstack.com/query/v3/docs/react/overview
Source URL: https://www.npmjs.com/package/react-query
*/

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </React.StrictMode>
);
