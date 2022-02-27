import React, { memo, VFC } from 'react';

import { Post } from '../../../types/post';
import { PostWrapItem } from '../../molecules/post/PostWrapItem';

type Props = {
  emotion: string;
  onClickModalPost: (id: number) => void;
  LikeButton: string;
  handleDeleteLike: (id: number) => Promise<void>;
  handleCreateLike: (id: number) => Promise<void>;
  post: Post;
};

export const PostIndexWrap: VFC<Props> = memo((props) => {
  const {
    emotion,
    onClickModalPost,
    LikeButton,
    handleDeleteLike,
    handleCreateLike,
    post,
  } = props;

  return (
    <React.Fragment key={post.id}>
      {post.emotion === emotion && (
        <PostWrapItem
          post={post}
          onClickModalPost={onClickModalPost}
          LikeButton={LikeButton}
          handleDeleteLike={handleDeleteLike}
          handleCreateLike={handleCreateLike}
        />
      )}
      {emotion === '' && (
        <PostWrapItem
          post={post}
          onClickModalPost={onClickModalPost}
          LikeButton={LikeButton}
          handleDeleteLike={handleDeleteLike}
          handleCreateLike={handleCreateLike}
        />
      )}
    </React.Fragment>
  );
});
