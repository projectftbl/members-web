import React from 'react';
import Radium from 'radium';
import { YouTube, Rss, Facebook, Twitter, Instagram, Warning } from '@ftbl/icons';

const Icons = {
  facebook: Facebook
, twitter: Twitter
, google: YouTube
, instagram: Instagram
, rss: Rss
, page: Facebook
};

const Message = ({ text, colour = '#666' }) => {
  return (
    <div style={{margin: '5px 30px', fontSize: '0.95em'}}>
      <Warning style={{marginTop: -4}} colour={colour} size={20} />
      <span style={{paddingLeft: 10, color: colour }}>{text}</span>
    </div>
  );
};

export const Account = ({ account }) => {
  const Icon = Icons[account.network];

  return (
    <div style={{margin: '5px 30px'}}>
      <Icon size={20} style={{marginRight: 10, marginTop:-2}} shape='square' />
      
      <a href={account.link} style={{paddingLeft: 0, textDecoration: 'none', color: '#333'}} target='_blank'>
        {account.name || account.link}
      </a>
    </div>
  );
};


export default Radium(({ accounts }) => {
  const styles = {
    base: {
      cursor: 'pointer'
    , clear: 'both'
    , overflow: 'hidden'
    , maxHeight: 0
    , transition: 'all 0.4s ease-in-out'
    }
  , active: {
      maxHeight: 1000
    }
  };

  return (
    <div style={[ styles.base, accounts.active && styles.active ]}>
      {accounts.data.map(account => <Account key={account.id} account={account} />)}

      {accounts.data.length === 0 && <Message text='No connected accounts' />}
    </div>
  );
});
