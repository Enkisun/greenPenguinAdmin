import React from 'react';
import { useHttp } from '../hooks/http.hook';

const PostCreate = props => {

  const { request } = useHttp();

  const createHandler = async ({ form }) => {
    try {
      await request('/api/products', 'POST', {...form});
    } catch (e) {}
  }

  return (
    <>
    </>
  )
}

export default PostCreate;