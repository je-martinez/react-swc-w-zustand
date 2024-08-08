import React, { useEffect, useMemo } from "react";
import FeedItem from "../../components/feed-item";
import useComments from "../../hooks/useComments";
import usePosts from "../../hooks/usePosts";
import useUsers from "../../hooks/useUsers";
import { shuffle } from "../../utils";

const HomePage: React.FC = () => {
  const { getCommentsByPostId, getComments } = useComments();
  const { posts, getPosts } = usePosts();
  const { getUserById, getUsers } = useUsers();

  useEffect(() => {
    getComments();
    getPosts();
    getUsers();
  }, [getComments, getPosts, getUsers]);

  const postsRandom = useMemo(() => {
    return shuffle(posts);
  }, [posts]);

  return (
    <>
      {postsRandom?.map((post) => (
        <FeedItem
          key={post.id}
          post={post}
          comments={getCommentsByPostId(post.id)}
          user={getUserById(post.userId)!}
        />
      ))}
    </>
  );
};

export default HomePage;
