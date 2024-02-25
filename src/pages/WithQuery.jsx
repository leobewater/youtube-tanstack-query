import { useQuery, useQueries } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const getPosts = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  return await res.json();
};

const getUsers = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) {
    throw new Error("There was an error!");
  }
  return await res.json();
};

export const WithQuery = () => {
  /*
  // fetching posts and users side by side
  const { isPending, error, data } = useQuery({
    // queryKey - unique identifier for each query
    queryKey: ["posts"],
    // queryFn: function to handle fetching
    // queryFn: async () => {
    //   const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    //   return res.json();
    // },
    queryFn: getPosts,
    staleTime: 10000, // stay fresh for 10s then goes stale
    refetchOnWindowFocus: true, // default is true
  });

    const { isPending: isUsersPending, error: usersError, data: users } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers
      });
  */

  // fetch two queries in parallel
  const [
    { isPending, error, data },
    { isPending: isUsersPending, error: usersError, data: users },
  ] = useQueries({
    queries: [
      { queryKey: ["posts"], queryFn: getPosts },
      {
        queryKey: ["users"],
        queryFn: getUsers,
        // retry: 4,
        // retryDelay: 2000,
      }, // default retry is 3, by default retry doulbe the delay between each retry. You can specify the retryDelay without doubling each retry.
    ],
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
      {data &&
        data.map((post) => {
          return (
            <Link
              key={post.id}
              className="block p-4 rounded-lg border border-gray-200 my-6 cursor-pointer hover:bg-gray-900"
              to={`/withquery/${post.id}`}
            >
              <h2 className="font-bold text-lg mb-2 text-gray-400">
                {post.title}
              </h2>
              <p className="text-gray-400">{post.body}</p>
            </Link>
          );
        })}
    </div>
  );
};
