export interface IComment {
  id: string;
  content: string;
  status: "pending" | "approved" | "rejected";
}

const CommentList = ({ comments }: { comments: IComment[] }) => {
  return (
    <>
      <p>Comments: </p>
      <div className="flex flex-col">
        {comments.map((comment) => {
          let content = comment.content;

          if (comment.status === "rejected") {
            content = "This comment is rejected";
          } else if (comment.status === "pending") {
            content = "This comment is pending review";
          }

          return (
            <li
              key={comment.id}
              className={`${comment.status === "rejected" && "italic"}`}
            >
              {content} {comment.status}
            </li>
          );
        })}
      </div>
    </>
  );
};

export default CommentList;
