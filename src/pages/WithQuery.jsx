import { useQuery } from "@tanstack/react-query";

export const WithQuery = () => {
  const { isPending, error, data } = useQuery({
    // queryKey - unique identifier for each query
    queryKey: ["posts"],
    // queryFn: function to handle fetching
    queryFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      return res.json();
    },
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
      <h1 className="text-3xl text-center my-8 font-bold text-gray-400">
        Posts Data
      </h1>
      {data &&
        data.map((post) => {
          return (
            <div
              key={post.id}
              className="p-4 rounded-lg border border-gray-200 my-6 cursor-pointer hover:bg-gray-900"
            >
              <h2 className="font-bold text-lg mb-2 text-gray-400">
                {post.title}
              </h2>
              <p className="text-gray-400">{post.body}</p>
            </div>
          );
        })}
    </div>
  );
};
