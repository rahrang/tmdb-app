import React from 'react';
import { Link } from '@reach/router';

class NotFound extends React.Component {
  render() {
    return (
      <div>
        <h1>Sorry, that page does not exist.</h1>
        <Link to="/">Go Back Home!</Link>
      </div>
    );
  }
}

export default NotFound;
