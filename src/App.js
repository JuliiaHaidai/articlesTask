import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import { getAllPosts, getPosts } from './slices/postsSlice';
import { openModal } from './slices/modalSlice';

import Modal from './Components/Modal/Modal';
import Pagination from './Components/Pagination/Pagination';

import classes from './App.module.scss';

function App() {
  const posts = useSelector((state) => state.posts.posts);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  const limitPosts = 6;

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      getPosts({
        currentPage: currentPage * limitPosts - limitPosts,
        limitPosts,
      })
    );
    setCurrentPostIndex(0);
  }, [dispatch, currentPage]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!posts) return null;
      if (currentPostIndex === posts.length - 1) {
        setCurrentPostIndex(0);
      } else {
        setCurrentPostIndex(currentPostIndex + 1);
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentPostIndex, posts]);

  if (!posts) return null;

  return (
    <div>
      <Modal />
      <div className={classes.app}>
        <div className={classes.previewPost}>
          <h3>{posts[currentPostIndex].title}</h3>
          <p>{posts[currentPostIndex].body}</p>
        </div>
        {posts.map((post, i) => (
          <div
            onClick={() => {
              dispatch(openModal(post.id));
            }}
            className={
              i === currentPostIndex
                ? classNames(classes.active, classes.post)
                : classes.post
            }
            key={post.id}
          >
            <h4>{post.title}</h4>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
      <Pagination
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        limitPosts={limitPosts}
      />
    </div>
  );
}

export default App;
