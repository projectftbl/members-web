import React from 'react';
import Radium from 'radium';
import moment from 'moment';
import { connect } from 'react-redux';
import { Email, Spinner } from '@ftbl/icons';
import { Row, Cell, State, Events } from '@ftbl/table';
import { FromNow } from '@ftbl/component';
import { Up, Down } from '../../../components/icons';
import { accountsSelector } from '../ducks/accounts';
import { userSelector } from '../ducks/user';
import Accounts from './accounts';

export const Header = _ => {
  return (
    <Row kind='heading'>
      <Cell width='25%'>Member</Cell>
      <Cell width='25%'>Registered By</Cell>
      <Cell width='10%'>Type</Cell>
      <Cell width='15%'>Referrer</Cell>
      <Cell width='25%' align='right'><br/></Cell>
    </Row>
  );
};

export const Member = State('member')(({ member, user, accounts, list, last, dispatch, $, state }) => {
  const events = Events({ dispatch, $, id: member.id })
      , listAccounts = _ => list(member)
      , Icon = accounts && accounts.active ? Up : Down
      , highlight = state[member.id] ? '#666' : '#ccc';

  return (
    <Row onClick={listAccounts} onMouseOver={events.over} onMouseOut={events.out} 
        last={last} kind='underline'>
      <Cell width='25%'>
        <a href={`mailto:${user && user.email}`}>
          <Email size={20} style={{marginTop:-4, marginRight:10}}/>
        </a>
        <strong>{member.name}</strong>
      </Cell>
      <Cell width='25%'>
        <span style={{fontSize:'0.9em'}}>
          {user && user.name}
          {!user && <Spinner rotate={true} size={20} colour='#ccc' style={{marginTop:-4}} />}
        </span>
      </Cell>
      <Cell width='10%'>{member.type}</Cell>
      <Cell width='15%'>{member.referrerCode || <br/>}</Cell>
      <Cell width='25%' align='right'>
        <FromNow style={{fontSize:'0.9em'}} date={member.joinedAt} />
        <Icon size={16} colour={highlight} style={{marginTop:-2, marginLeft:10}}/>
      </Cell>

      <Accounts accounts={accounts} />
    </Row>
  );
});

const mapStateToProps = (state, props) => {
  return { 
    accounts: accountsSelector(state, props) 
  , user: userSelector(state, props)
  };
};

export default connect(mapStateToProps)(Member);