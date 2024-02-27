import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";

const getPosts = async (page) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}`
  );
  if (!res.ok) {
    throw new Error("There was an error!");
  }
  return await res.json();
};

export const WithQueryPagination = () => {
  const [page, setPage] = useState(1);

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => getPosts(page),
    staleTime: 10000,
    placeholderData: keepPreviousData,
  });

  if (isPending) {
    return (
      <h1 className="text-3xl text-center my-8 font-bold text-gray-400">
        Loading...
      </h1>
    );
  }

  if (error) {
    return (
      <h1 className="text-3xl text-center my-8 font-bold text-gray-400">
        Error: {error.message}
      </h1>
    );
  }

  return (
    <div className="m-4 max-w-[600px] w-4/5 mx-auto">
      <Link to="/withoutquery" className="text-white underline">
        Go to Without Query Page
      </Link>
      <h1 className="text-3xl text-center my-8 font-bold text-gray-400">
        Posts Data
      </h1>
      <div className={`${isFetching ? "bg-gray-300 opacity-50" : ""}`}>
        {data &&
          data.map((post) => {
            return (
              <Link
                to={`/withquery/${post.id}`}
                key={post.id}
                className="block p-4 rounded-lg border border-gray-200 my-6 cursor-pointer hover:bg-gray-900"
              >
                <h2 className="font-bold text-lg mb-2 text-gray-400">
                  {post.title}
                </h2>
                <p className="text-gray-400">{post.body}</p>
              </Link>
            );
          })}
      </div>
      <div className="flex items-center justify-center gap-2">
        <button
          className="px-3 py-1 bg-blue-500 rounded-md text-white font-bold"
          onClick={() => setPage((prev) => (prev > 1 ? prev - 1 : 1))}
        >
          Prev
        </button>
        <p className="text-gray-100">Current page: {page}</p>
        <button
          className="px-3 py-1 bg-blue-500 rounded-md text-white font-bold"
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};
