import axios from "axios";
import { useState } from "react";

const PostCreate = () => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await axios.post("http://posts.com/posts/create", {
      title,
    });

    setTitle("");
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center container gap-y-2"
      >
        <h1 className="text-xl">Create Post</h1>
        <div className="gap-x-2 flex flex-col">
          <label htmlFor="title">Title</label>
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
          />
        </div>
        <button
          className="border border-white px-4 py-2 rounded-lg"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostCreate;
