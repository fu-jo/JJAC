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
import SignUp from "./pages/SignUp";
import Login from "./pages/Login"
import {AuthProvider} from "./Contexts/AuthContext"
// admin pages
import AdminWrapper from "./components/AdminWrapper";
import AdminDashboard from './pages/admin/AdminDashboard';
import MailingList from './pages/admin/MailingList';
import ManageAnnouncements from "./pages/admin/ManageAnnouncements";
import ManageArticles from "./pages/admin/ManageArticles";
import ManageUsers from "./pages/admin/ManageUsers";
import CreateArticle from "./pages/admin/CreateArticle";
import ModifyArticle from "./pages/admin/ModifyArticle";

export default class App extends Component {
  render() {
    return (
      <AuthProvider>
      <Router>
        <Switch>
          {/* General page routes */}
          <Route
            path="/home"
            render={(props) => (
                      <Home {...props} status="NonMember" />
                    )}
          />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/settings" component={Settings} />
          <Route path="/announcements" component={Announcements} />
          <Route path="/articles-list" component={ArticlesList} />
          <Route path="/events-calendar" component={EventsCalendar} />
          {/* What to do when article id isn't found? */}
          <Route path="/article/:id" component={SingleArticle} />
          {/* Admin page routes */}
          <Route path="/admin/dashboard"
                  render={() => (
                    <AdminWrapper>
                      <AdminDashboard/>
                    </AdminWrapper>
                  )}
          />
          <Route path="/admin/mailing-list"
                  render={() => (
                    <AdminWrapper>
                      <MailingList/>
                    </AdminWrapper>
                  )}
          />
          <Route path="/admin/manage-announcements"
                  render={() => (
                    <AdminWrapper>
                      <ManageAnnouncements/>
                    </AdminWrapper>
                  )}
          />
          <Route path="/admin/manage-articles"
                  render={() => (
                    <AdminWrapper>
                      <ManageArticles/>
                    </AdminWrapper>
                  )}
          />
          <Route path="/admin/manage-users"
                  render={() => (
                    <AdminWrapper>
                      <ManageUsers/>
                    </AdminWrapper>
                  )}
          />
          <Route path="/admin/create-article"
                  render={() => (
                    <AdminWrapper>
                      <CreateArticle/>
                    </AdminWrapper>
                  )}
          />
          {/* What to do when article id isn't found? */}
          <Route path="/admin/modify-article/:id"
                  render={() => (
                    <AdminWrapper>
                      <ModifyArticle/>
                    </AdminWrapper>
                  )}
          />
          {/* Generalized routes */}
          <Route exact path="/admin">
            <Redirect to="/admin/dashboard" />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="/404" component={NotFound404} />
          <Redirect to="/404" />
        </Switch>
      </Router>
      </AuthProvider>
    );
  }
}
