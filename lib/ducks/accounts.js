import assign from 'lodash/object/assign';
import map from 'lodash/collection/map';
import compact from 'lodash/array/compact';
import { createSelector } from 'reselect';
import { RESOURCE } from '@ftbl/resource';
import { Schema, normalize, arrayOf } from 'normalizr';
import { SIGN_OUT_SUCCESS } from '@ftbl/session-web';

export const schema = new Schema('accounts');

export const FETCH = 'ftbl/members/accounts/FETCH';
export const SUCCESS = 'ftbl/members/accounts/SUCCESS';
export const FAILED = 'ftbl/members/accounts/FAILED';
export const TOGGLE = 'ftbl/members/accounts/TOGGLE';

const byMember = (state, props) => state.members.accounts[props.member.id];

const initialState = { fetching: false, fetched: false, error: null, data: [], active: false };

export const accountsSelector = createSelector(
  [ byMember, state => state.entities ], (data, entities) => {
  if (data == null) return initialState;

  return assign({}, data, { data: compact(map(data.data, id => entities.accounts && entities.accounts[id])) });
});

export default (state = {}, action) => {
  switch (action.type) {
  case FETCH:
    return assign({}, state, { [action.meta.member]: { fetching: true, fetched: false, error: null }});
  case SUCCESS:
    return assign({}, state, { [action.meta.member]: { fetching: false, fetched: true, error: null, active: true, data: action.payload.result }});
  case FAILED:
    return assign({}, state, { [action.meta.member]: { fetching: false, fetched: false, error: action.payload.statusText }});
  
  case TOGGLE:
    const m = action.payload.member;
    return assign({}, state, { [m]: assign({}, state[m], { active: !state[m].active }) });
  
  case SIGN_OUT_SUCCESS:
    return initialState;
  
  default:
    return state;
  }
};

export function toggle(member) {
  return { type: TOGGLE, payload: { member: member.id }};
};

export function fetch(member) {
  return {
    [RESOURCE]: {
      types: [ FETCH, SUCCESS, FAILED ]
    , payload: {
        url: `/members/${member.id}/accounts`
      , method: 'get'
      , query: { limit: 100, sort: 'network' }
      , normalize: r => normalize(r.accounts, arrayOf(schema))
      }
    , meta: { member: member.id }
    }
  };
};

export function list(member) {
  return (dispatch, getState) => {
    const { accounts } = getState().members;

    if (accounts[member.id] && accounts[member.id].data) return dispatch(toggle(member));

    return dispatch(fetch(member));
  }
};

