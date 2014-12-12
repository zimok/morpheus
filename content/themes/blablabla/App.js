/** @jsx React.DOM */

'use strict';

var React = require('react');
var PostList = require('./PostList');
var Single = require('./Single');
var TagPage = require('./TagPage');
var ErrorPage = require('./Error');
var ApplicationStore = require('../../../stores/ApplicationStore');
var RouterMixin = require('flux-router-component').RouterMixin;
var StoreMixin = require('fluxible-app').StoreMixin;
var canUseDOM = require('react/lib/ExecutionEnvironment').canUseDOM;


var App = React.createClass({
  mixins: [RouterMixin, StoreMixin],
  statics: {
    storeListeners: [ApplicationStore]
  },
  propTypes:{
    context:React.PropTypes.object.isRequired
  },
  getInitialState: function () {
    return this.getStore(ApplicationStore).getState();
  },
  onChange: function () {
    this.setState(this.getStore(ApplicationStore).getState());
  },
  handleDomChanges: function(){
    if (canUseDOM) {
      window.scrollTo(0,0);
      document.title = this.state.pageTitle;
    }
  },
  render: function(){
    this.handleDomChanges();
    if (this.state.error) {
      return <ErrorPage context={this.props.context} error={this.state.error}/>;
    }
    if (this.state.currentPageName === 'home' || this.state.currentPageName === 'page') {
      return <PostList context={this.props.context} siteUrl={this.state.siteUrl} page={this.state.page} pageCount={this.state.pageCount} totalCount={this.state.totalCount}/>;
    }
    if (this.state.currentPageName === 'single') {
      return <Single context={this.props.context} slug={this.state.route.params.slug} siteUrl={this.state.siteUrl}/>;
    }
    if (this.state.currentPageName === 'tag') {
      return <TagPage context={this.props.context} slug={this.state.route.params.tag} siteUrl={this.state.siteUrl}/>;
    }
    return '';
  }
});

module.exports = App;
