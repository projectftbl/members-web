import { takeLatest } from 'redux-saga';
import { take, put, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { reset } from 'redux-form';

import { fetch } from '../ducks/user';
  
import { SEARCH_SUCCESS, membersSelector } from '../ducks/members';

export function* search() {
  while(true) {
    yield take(SEARCH_SUCCESS);

    const members = yield select(membersSelector);
    yield put(fetch(members.data))

    const url = { pathname: location.pathname };
    url.search = members.meta.query.page === 1 ? null : `?page=${members.meta.query.page}`;
    yield put(push(url)); 

    if (members.meta.query.q === '') yield put(reset('members'));
  }
};
