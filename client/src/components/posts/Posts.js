import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPosts } from '../../actions/post';
import PostLists from './PostLists';

const Posts = ({ getPosts, post: { posts } }) => {
    useEffect(() => {
      getPosts()
    },[getPosts])

    console.log(posts)
    return (
      <Fragment>
        {posts.map((post) => (
          <PostLists key={post._id} post={post} />
        ))}
      </Fragment>
    ); 
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    post: state.post
})

export default connect(mapStateToProps, { getPosts })(Posts);