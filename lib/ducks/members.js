import assign from 'lodash/object/assign';
import moment from 'moment';
import { RESOURCE } from '@ftbl/resource';
import { entitiesSelector, entitiesReducer, LIMIT } from '@ftbl/entities';
import { Schema, normalize, arrayOf } from 'normalizr';

const FORMAT = 'YYYY-MM-DD';

export const schema = new Schema('members');

export const SEARCH = 'ftbl/members/members/FETCH';
export const SUCCESS = 'ftbl/members/members/SUCCESS';
export const FAILED = 'ftbl/members/members/FAILED';

export default entitiesReducer([ SEARCH, SUCCESS, FAILED ]);

export const membersSelector = entitiesSelector(state => state.members.members, 'members');

export function search(data) {
  const query = assign({}, { q: '', page: 1, limit: LIMIT }, data);
  
  if (query.period === 'today') query.from = moment().format(FORMAT);
  if (query.period === 'week') query.from = moment().subtract(7, 'day').format(FORMAT);
  if (query.period === 'month') query.from = moment().subtract(1, 'month').format(FORMAT);

  if (query.page < 1) query.page = 1;

  return {
    [RESOURCE]: {
      types: [ SEARCH, SUCCESS, FAILED ]
    , payload: {
        url: '/members/search'
      , method: 'get'
      , query: assign({}, query, { period: undefined, sort: 'joinedAt', dir: 'desc' })
      , normalize: r => normalize(r.members, arrayOf(schema))
      }
    , meta: { query }
    }
  };
};

export function reset() {
  return dispatch => dispatch(search());
};