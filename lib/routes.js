import React from 'react';
import { Route } from 'react-router';
import { Members } from './handlers';

export default function(Authorize) {
  return (
    <Route path='members' component={Authorize('read member')(Members)}>
    </Route>
  );
};