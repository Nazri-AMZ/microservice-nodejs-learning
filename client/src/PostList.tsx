import axios from "axios";
import { useEffect, useState } from "react";
import CommentCreate from "./CommentCreate";
import CommentList, { IComment } from "./CommentList";

interface IPost {
  title: string;
  id: string;
  comments: IComment[];
}

interface IPosts {
  [id: string]: IPost;
}

const PostList = () => {
  const [posts, setPosts] = useState<IPosts>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<IPosts>("http://posts.com/posts");

        console.log(response.data);

        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const renderedPosts = Object.values(posts).map((post) => (
    <div key={post.id} className="border border-purple-400 p-4 flex flex-col">
      <h2>
        {post.title} (ID: {post.id})
      </h2>
      <CommentList comments={post.comments} />
      <CommentCreate postId={post.id} />
    </div>
  ));

  return <div className="flex gap-x-4">{renderedPosts}</div>;
};

export default PostList;
