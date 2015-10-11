/* global ReactMeteorData */
import React, {Component} from 'react';
import reactMixin from 'react-mixin';
import BlazeTemplate from './BlazeTemplate';
import {Users, Posts} from 'collections';
import LoginButton from './LoginButtons.jsx';
import './LoginButtons.less';

Meteor.call('sayHello', function(err, res) {
  console.log(res);
});


@reactMixin.decorate(ReactMeteorData)
export default class App extends Component {
  getMeteorData() {
    return {
      users: Users.find().fetch()
    };
  }

  render() {
    // Template does not support server side
    let _Template = typeof(Template) === 'function' ? Template : {
      loginButtons: 'any'
    };
    let userCount = Users.find().fetch().length;
    let postsCount = Posts.find().fetch().length;
    return (
      <div className="App">
        <BlazeTemplate template={_Template.loginButtons} />
        <LoginButton/>
        <h1>Hello Webpack!</h1>
        <p>There are {userCount} users in the Minimongo  (login to change)</p>
        <p>There are {postsCount} posts in the Minimongo  (autopublish removed)</p>
      </div>
    );
  }
}
