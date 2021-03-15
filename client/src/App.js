import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// general pages
import Home from './pages/Home';
import Settings from './pages/Settings';
import Announcements from "./pages/Announcements";
import ArticlesList from "./pages/ArticlesList";
import EventsCalendar from "./pages/EventsCalendar";
import SingleArticle from "./pages/SingleArticle";
import NotFound404 from "./pages/NotFound404";
// admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import MailingList from './pages/admin/MailingList';
import ManageAnnouncements from "./pages/admin/ManageAnnouncements";
import ManageArticles from "./pages/admin/ManageArticles";
import ManageUsers from "./pages/admin/ManageUsers";
import ModifyArticle from "./pages/admin/ModifyArticle";

import Posts from './components/Posts/Posts'
import PostEntry from './components/Posts/PostEntry'

// import firebase from './firebase'

// firebase.firestore().collection('posts').add({
// 	title: 'example title',
//   description: 'example description',
//   articleText: 'dakljzxjckl lorem ipsum',
//   date: 'March',
//   tags: ['tag 1'],
//   links: ['www.sase.com']
// })

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          {/* General page routes */}
          <Route
            path="/home"
            render={(props) => (
                      <Home {...props} status="NonMember" />
                    )}
          />
          <Route path="/settings" component={Settings} />
          <Route path="/announcements" component={Announcements} />
          <Route path="/articles-list" component={ArticlesList} />
          <Route path="/events-calendar" component={EventsCalendar} />
          <Route path="/article/:id" component={SingleArticle} />
          {/* Admin page routes */}
          <Route path="/admin/dashboard" component={AdminDashboard} />
          <Route path="/admin/mailing-list" component={MailingList} />
          <Route path="/admin/manage-announcements" component={ManageAnnouncements} />
          <Route path="/admin/manage-articles" component={ManageArticles} />
          <Route path="/admin/manage-users" component={ManageUsers} />
          <Route path="/admin/modify-article/:id" component={ModifyArticle} />
          {/* Other routes */}
          <Route exact path="/admin">
            <Redirect to="/admin/dashboard" />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="/404" component={NotFound404} />
          <Redirect to="/404" />
        </Switch>
        <Posts />
        <PostEntry />
      </Router>

    );
  }
}
