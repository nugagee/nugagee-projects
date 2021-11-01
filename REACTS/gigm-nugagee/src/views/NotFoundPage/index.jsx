import React, { Component } from "react";
import {Link} from "react-router-dom";

export class NotFound extends Component {
  render() {
    return (
      <div>
        <h1>How did you get here???? Please go back <Link to="/">home</Link> </h1>;
      </div>
    );
  }
}
export default NotFound;
