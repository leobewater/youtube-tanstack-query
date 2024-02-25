import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

// get comments depends on the first query for post id
const getComments = async (id) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}/comments`
  );
  if (!res.ok) {
    throw new Error("There was an error!");
  }
  return res.json();
};

const Post = () => {
  const { id } = useParams();
  const { isPending, error, data } = useQuery({
    queryKey: ["posts", id, { hello: "world" }], // set custom id for each post
    queryFn: async ({ queryKey }) => {
      console.log(queryKey);
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      if (!res.ok) {
        throw new Error("There was an error!");
      }
      return await res.json();
    },
    staleTime: 10000, // stay fresh for 10s before refetching
  });

  // fetch comments depends on the first query Post's id
  const {
    isPending: isCommentsPending,
    error: commentsError,
    data: comments,
  } = useQuery({
    queryKey: ["comments"],
    queryFn: () => getComments(data.id),
    enabled: !isPending, // depends on posts query and avoid running two queries in parallel
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
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="p-4 border-gray-400 border-4 rounded-lg w-4/5 max-w-[500px]">
        <h2 className="font-bold text-lg mb-2 text-gray-400">{data.title}</h2>
        <p className="text-gray-400">{data.body}</p>
        <h3 className="text-gray-400 mt-5 text-left text-2xl">Comments:</h3>
        {isCommentsPending && <div className="text-gray-400 text-left">Loading Comments...</div>}
        {!isCommentsPending && comments.map(comment => (
          <div key={comment.id} className="text-gray-400 space-y-2 border p-4 text-left">
            <p>name: {comment.name}</p>
            <p>email: {comment.email}</p>
            <p>comment: {comment.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;
