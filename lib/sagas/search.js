import { takeLatest } from 'redux-saga';
import { take, put, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { reset } from 'redux-form';

import { fetch } from '../ducks/user';
  
import { SUCCESS, membersSelector } from '../ducks/members';

export function* search() {
  while(true) {
    yield take(SUCCESS);
    
    const members = yield select(membersSelector);
    yield put(fetch(members.data))
    
    yield put(push('/members')); 

    if (members.meta.query.q === '') yield put(reset('members'));
  }
};
