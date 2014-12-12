/** @jsx React.DOM */

'use strict';

var React = require('react');
var ReactPropTypes = React.PropTypes;
var NavLink = require('flux-router-component').NavLink;
var Tags = require('./Tags');
var Gravatar = require('./Gravatar');

var PostListElement = React.createClass({
  propTypes: {
   post: ReactPropTypes.object.isRequired,
   context:React.PropTypes.object.isRequired
  },
  render: function() {
    var post = this.props.post || {};
    var to = '/'+post.slug;
    var tags = this.props.post.tags && <Tags tags={this.props.post.tags} context={this.props.context}/>;
    return (
    <article className="post">
        <header className="post-header">
            <h2 className="post-title"><NavLink href={to} context={this.props.context} >{post.title}</NavLink></h2>
        </header>
        <section className="post-excerpt">
            <p dangerouslySetInnerHTML={{__html: post.excerpt}}></p><NavLink href={to} context={this.props.context} >&raquo;</NavLink>
        </section>

        <footer className="post-meta">
        <Gravatar email={post.email}/>
        {post.author}
        {tags}
        <time className="post-date" dateTime={post.date}>{post.date}</time>
        </footer>
      </article>
    );
  }
});

module.exports = PostListElement;
