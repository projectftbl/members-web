import { combineReducers } from 'redux'; 
import members from './ducks/members';  
import accounts from './ducks/accounts';  

export default combineReducers({
  members
, accounts
});