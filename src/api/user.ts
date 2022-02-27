/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import Cookies from 'js-cookie';

import { User } from '../types/user';
import client from './client';

export const getDetailUser = (id: number) => {
  return client.get(`/users/${id}`, {
    headers: <any>{
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid'),
    },
  });
};

export const updateUser = (
  id: number,
  params: Pick<User, 'name' | 'emotion'>
) => {
  return client.patch(`/users/${id}`, params, {
    headers: <any>{
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid'),
    },
  });
};
