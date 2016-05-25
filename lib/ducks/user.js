import assign from 'lodash/object/assign';
import map from 'lodash/collection/map';
import compact from 'lodash/array/compact';
import { createSelector } from 'reselect';
import { RESOURCE } from '@ftbl/resource';
import { Schema, normalize, arrayOf } from 'normalizr';

export const schema = new Schema('users');

export const FETCH = 'ftbl/members/users/FETCH';
export const SUCCESS = 'ftbl/members/users/SUCCESS';
export const FAILED = 'ftbl/members/users/FAILED';

export const userSelector = (state, props) => {
  return state.entities.users && state.entities.users[props.member.createdBy];
};

export function fetch(members) {
  return {
    [RESOURCE]: {
      types: [ FETCH, SUCCESS, FAILED ]
    , payload: {
        url: `/users`
      , method: 'get'
      , query: { ids: map(members, 'createdBy') }
      , normalize: r => normalize(r.users, arrayOf(schema))
      }
    }
  };
};

