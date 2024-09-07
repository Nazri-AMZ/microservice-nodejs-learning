import PostCreate from "./PostCreate";
import PostList from "./PostList";

function App() {
  return (
    <div>
      <PostCreate />
      <hr className="my-2" />
      <PostList />
    </div>
  );
}

export default App;
