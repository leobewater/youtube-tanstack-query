import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { WithoutQuery } from "./pages/WithoutQuery.jsx";
import { WithQuery } from "./pages/WithQuery.jsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Post from "./pages/Post.jsx";

const router = createBrowserRouter([
  { path: "", element: <App /> },
  { path: "/withoutquery", element: <WithoutQuery /> },
  { path: "withquery", element: <WithQuery /> },
  {
    path: "/withquery/:id",
    element: <Post />,
  },
]);

const client = new QueryClient({
  // We can define the retryDetail at the client level for all queries
  /*
  defaultOptions: {
    queries: {
      retryDelay: 2000
    }
  }
  */
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
