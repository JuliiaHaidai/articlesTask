import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames';

import { closeModal } from '../../slices/modalSlice';
import { editPost } from '../../slices/postsSlice';

import classes from './Modal.module.scss';

const Modal = () => {
  const id = useSelector((state) => state.modal.id);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.allPosts);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  if (!posts) return null;
  const post = posts.filter((post) => post.id === id);

  const validationSchema = Yup.object().shape({
    title: Yup.string().max(80, 'Too Long!').required('Required'),
    body: Yup.string()
      .min(50, 'Too Short!')
      .max(300, 'Too Long!')
      .required('Required'),
  });

  const onSubmit = (values) => {
    dispatch(editPost({ id, values }));
    dispatch(closeModal());
    setTitle('');
    setBody('');
  };

  if (id) {
    return (
      <div
        className={classNames(classes.active, classes.modal)}
        onClick={() => {
          dispatch(closeModal());
          setTitle('');
          setBody('');
        }}
      >
        <div
          className={classes.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <Formik
            initialValues={{ title: post[0].title, body: post[0].body }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ errors }) => (
              <Form>
                <span>Title</span>
                <Field
                  className={classes.title}
                  as="textarea"
                  name="title"
                  placeholder="Title"
                  onKeyUp={(value) => setTitle(value.target.value)}
                />
                {errors.title ? (
                  <div className={classes.error}>{errors.title}</div>
                ) : null}
                <span>Body</span>
                <Field
                  className={classes.body}
                  placeholder="Body"
                  as="textarea"
                  name="body"
                  onKeyUp={(value) => setBody(value.target.value)}
                />
                {errors.body ? (
                  <div className={classes.error}>{errors.body}</div>
                ) : null}
                <div className={classes.buttons}>
                  <button
                    type="submit"
                    disabled={
                      errors.body ||
                      errors.title ||
                      ((body === post[0].body || body === '') &&
                        (title === post[0].title || title === ''))
                        ? true
                        : false
                    }
                  >
                    Сonfirm
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      dispatch(closeModal());
                      setTitle('');
                      setBody('');
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Modal;
