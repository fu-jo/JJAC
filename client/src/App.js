import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect, matchPath } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import firebase, { firestore } from "./firebase"
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
import UnauthorizedUser from "./pages/UnauthorizedUser"
// admin pages
import AdminWrapper from "./components/AdminWrapper";
import AdminDashboard from './pages/admin/AdminDashboard';
import MailingList from './pages/admin/MailingList';
import ManageAnnouncements from "./pages/admin/ManageAnnouncements";
import ManageArticles from "./pages/admin/ManageArticles";
import ManageUsers from "./pages/admin/ManageUsers";
import CreateAnnouncement from "./pages/admin/CreateAnnouncement";
import CreateArticle from "./pages/admin/CreateArticle";
import ModifyArticle from "./pages/admin/ModifyArticle";
import ModifyAnnouncement from "./pages/admin/ModifyAnnouncement";
import ModifyUser from "./pages/admin/UserList/ModifyUser";

function useUserData() {
  const [userData, setUserData] = useState()

  var user = firebase.auth().currentUser

  if (user) {
    firestore.collection("users").doc(user.uid).get()
      .then((doc) => {
        setUserData(doc.data())
      })
  }
  else {
    console.log("no user logged in")
  }

  return userData
}


const AdminRoutes = ({ user }) => {
  if (!user) {
    return <UnauthorizedUser />
  }
  else if (user && user.role === "admin") {
    return (
      <>
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
        <Route path="/admin/create-announcement"
                render={() => (
                  <AdminWrapper>
                    <CreateAnnouncement/>
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
        <Route path="/admin/create-announcement"
                render={() => (
                  <AdminWrapper>
                    <CreateAnnouncement/>
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
        <Route path="/admin/modify-announcement/:id"
                render={() => (
                  <AdminWrapper>
                    <ModifyAnnouncement/>
                  </AdminWrapper>
                )}
        />
        <Route path="/admin/modify-user/:id"
                render={() => (
                  <AdminWrapper>
                    <ModifyUser/>
                  </AdminWrapper>
                )}
        />
        {/* Generalized routes */}
        <Route exact path="/admin">
          <Redirect to="/admin/dashboard" />
        </Route>
      </>
    )
  }
  else {
    return <Redirect to="/401"/>
  }
}

const App = () => {
  const user = useUserData();

  return (
    <AuthProvider>
    <Router>
      <Switch>
        {/* General page routes */}
        <Route path="/home" render={() => (<Home user={user} />)} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/settings" component={Settings} />
        <Route path="/announcements" render={() => (<Announcements user={user} />)} />
        <Route path="/events-calendar" render={() => (<EventsCalendar user={user} />)} />
        <Route path="/articles-list" render={() => (<ArticlesList user={user} />)} />
        <Route path="/article/:id" render={() => (<SingleArticle user={user} />)} />
        {/* What to do when article id isn't found? */}
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/401" render={() => (<UnauthorizedUser user={user} />)} />
        <Route path="/404" render={() => (<NotFound404 user={user} />)} />
        <Route path="/admin" render={() => (<AdminRoutes user={user} />)} />
        <Redirect to="/404" />
      </Switch>
    </Router>
    </AuthProvider>
  );
}

export default App