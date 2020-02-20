import React from 'react';
import { Redirect } from 'react-router-dom';

const NotFound = () => {
  // If the user is on an unknown page, redirect them to the intro
  return <Redirect to="/" />;
};

export default NotFound;
