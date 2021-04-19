import React, { Component } from "react";

import AdminSidebar from './AdminSidebar';
import "../styles/components/AdminSidebar.css";

export default class AdminWrapper extends Component {
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
        <AdminSidebar/>
        <div className="main">
          {this.props.children}
        </div>
      </div>
    );
  }
}
