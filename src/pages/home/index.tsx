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
      <div className="flex flex-wrap bg-gray-50 dark:bg-black justify-center">
        {postsRandom?.map((post) => (
          <div key={post.id} className="md:w-1/2">
            <FeedItem
              post={post}
              comments={getCommentsByPostId(post.id)}
              user={getUserById(post.userId)!}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default HomePage;
