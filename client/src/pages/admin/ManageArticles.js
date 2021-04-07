import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import "../../styles/pages/AdminPage.css"

import AdminSidebar from '../../components/AdminSidebar';
import Articleslist from '../ArticlesList';

export default class ManageArticles extends Component {
  constructor(props) {
    super(props);

    this.buttonClicked = this.buttonClicked.bind(this);

    this.state = {
      name: "Click"
    };
  }

  buttonClicked() {
    this.setState({name: "Button Pressed"})
  }

  render() {
    return (
      <div>
        <AdminSidebar />
        <Button className="logout" href="/home">Logout</Button>
        <h2 className="title">Articles</h2>
        <Articleslist status='Admin'/>
        <Button href="/admin/create-article" variant="primary">Create Article</Button>
      </div>
    );
  }
}
