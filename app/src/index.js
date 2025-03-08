import React, { cache } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Navigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Main } from "./pages/Main";
import { FindJobs } from "./pages/FindJobs";
import { JobDetails } from "./pages/Jobdetails";
import { CreateJobs } from "./pages/CreateJobs";
import { WagmiProviderWrapper } from "./wagmiConfig";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WagmiProviderWrapper>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="/" element={<Main />} />
            </Route>
            <Route path="/find-jobs" element={<Navigate to="/find-jobs/1" />} />
            <Route path="/find-jobs/:page" element={<FindJobs />}>
              <Route path="job/:id" element={<JobDetails />} />
            </Route>
            <Route path="/create-jobs" element={<CreateJobs />} />
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </WagmiProviderWrapper>
  </React.StrictMode>
);
