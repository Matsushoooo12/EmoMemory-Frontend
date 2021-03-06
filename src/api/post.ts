/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import Cookies from 'js-cookie';

import { Post } from '../types/post';
import client from './client';

export const getAllPosts = () => {
  return client.get('/posts');
};

export const getAPost = (id: number) => {
  return client.get(`/posts/${id}`);
};

export const createPost = (params: Pick<Post, 'content' | 'emotion'>) => {
  return client.post('/posts', params, {
    headers: <any>{
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid'),
    },
  });
};

export const updatePost = (
  id: number,
  params: Pick<Post, 'content' | 'emotion'>
) => {
  return client.patch(`/posts/${id}`, params, {
    headers: <any>{
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid'),
    },
  });
};

export const deletePost = (id: number) => {
  return client.delete(`/posts/${id}`, {
    headers: <any>{
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid'),
    },
  });
};
