import React, { Component } from "react";
import Button from "react-bootstrap/Button";

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
        <h2>Manage Articles</h2>
        <Articleslist status='Admin'/>
        <Button href="/admin/create-article" variant="primary">Create article</Button>
      </div>
    );
  }
}
