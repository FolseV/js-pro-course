import React from "react";
import { useParams } from "react-router";
import { Comments, Posts } from "../../types";
import styles from "./postDetails.module.css";

interface Props {
  posts: Posts[];
  comments: Comments[];
}

const PostDetails: React.FC<Props> = (props) => {
  let params = useParams<{ postId: string }>();
  const post = props.posts.find((post) => {
    return post.id === parseInt(params.postId);
  });
  const comment = props.comments.find((comment) => {
    return comment.id === parseInt(params.postId);
  });
  if (post && comment) {
    return (
      <>
        <div className={styles.post}>
          <h2 className={styles.post_title}>{post?.title}</h2>
          <p>{post?.body}</p>
          <div>
            <h2>Comment</h2>
            <p>Name: {comment?.name}</p>
            <p>Email: {comment?.email}</p>
            <p>{comment?.body}</p>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <h1>404 Page not found</h1>
    </>
  );
};
export default PostDetails;