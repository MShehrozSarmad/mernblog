import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { formatISO9075 } from 'date-fns';
import {UserContext} from '../UserContext';

const Post = () => {
  const { id } = useParams();
  const [postDoc, setPostDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const {userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch(`http://localhost:3000/post/${id}`)
      .then(res => res.json())
      .then(post => {
        setPostDoc(post);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching post:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!postDoc) return <div>Post not found!</div>;

  return (
    <div className='post_page'>
      <div className='post_info'>
      <h1>{postDoc.title}</h1>
        {postDoc.createdAt && (
          <time>{formatISO9075(new Date(postDoc.createdAt))}</time>
        )}
        {postDoc.author && postDoc.author.username && (
          <>
          <span>@{postDoc.author.username}</span>
          { userInfo.id == postDoc.author._id &&
            <Link to={`/edit/${postDoc._id}`}>Edit Post</Link>
          }
          </>
        )}
      </div>
      <img src={`http://localhost:3000/${postDoc.cover}`} alt="cover_image" />
      <div dangerouslySetInnerHTML={{ __html: postDoc.content }}></div>
    </div>
  );
};

export default Post;