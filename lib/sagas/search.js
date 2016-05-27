import qs from 'querystring';
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

    const url = { pathname: location.pathname }
        , search = { q: members.meta.query.q, page: members.meta.query.page };

    if (search.page === 1) delete search.page;
    if (search.q == null || search.q === '') delete search.q;

    if (search.page || search.q) url.search = '?' + qs.stringify(search);

    yield put(push(url)); 

    if (members.meta.query.q === '') yield put(reset('members'));
  }
};
