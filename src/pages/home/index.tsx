import React, { useCallback, useEffect, useMemo, useState } from "react";
import FeedItem from "../../components/feed-item";
import useComments from "../../hooks/useComments";
import usePosts from "../../hooks/usePosts";
import useUsers from "../../hooks/useUsers";
import { shuffle } from "../../utils";
import CommentsModal from "../../components/comments-modal";
import { Post } from "../../types";

const HomePage: React.FC = () => {
  const { getCommentsByPostId, getComments } = useComments();
  const { posts, getPosts } = usePosts();
  const { getUserById, getUsers } = useUsers();
  const [post, selectPost] = useState<Post | undefined>(undefined);

  useEffect(() => {
    getComments();
    getPosts();
    getUsers();
  }, [getComments, getPosts, getUsers]);

  const postsRandom = useMemo(() => {
    return shuffle(posts);
  }, [posts]);

  const selectedComments = useMemo(() => {
    if (!post) return [];
    return getCommentsByPostId(post?.id);
  }, [getCommentsByPostId, post]);

  const isOpen = useMemo(() => {
    return selectedComments?.length > 0;
  }, [selectedComments]);

  const onClose = useCallback(() => {
    selectPost(undefined);
  }, []);

  return (
    <>
      <CommentsModal
        isOpen={isOpen}
        onClose={onClose}
        comments={selectedComments}
      />
      <div className="flex flex-wrap bg-gray-50 dark:bg-black justify-center">
        {postsRandom?.map((post) => (
          <div key={post.id} className="md:w-1/2">
            <FeedItem
              selectPost={selectPost}
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
