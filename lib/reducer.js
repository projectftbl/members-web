import { combineReducers } from 'redux'; 
import members from './ducks/members';  
import accounts from './ducks/accounts';  
import user from './ducks/user';  

export default combineReducers({
  members
, accounts
, user
});