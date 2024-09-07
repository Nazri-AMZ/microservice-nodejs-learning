import axios from "axios";
import { useState } from "react";

const CommentCreate = ({ postId }: { postId: string }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await axios.post(`http://posts.com/posts/${postId}/comments`, {
      content,
    });

    setContent("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
        <div className="flex flex-col">
          <label htmlFor="comment">New Comment</label>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            type="text"
          />
        </div>
        <button
          className="border border-blue-500 px-4 py-2 rounded-xl"
          type="submit"
        >
          Submit Comment
        </button>
      </form>
    </div>
  );
};

export default CommentCreate;
