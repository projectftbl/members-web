import React from 'react';
import { Heading } from '@ftbl/component';
import { Menu } from '@ftbl/navigation';
import Icon from './icons/download';
import { Reset } from '@ftbl/icons';

export const Filter = ({ q, period, search }) => {
  const filter = [
    { title: 'Today', active: period === 'today', onClick: _ => search({ q, period: 'today' }) }
  , { title: 'Week',  active: period === 'week',  onClick: _ => search({ q, period: 'week' }) }
  , { title: 'Month', active: period === 'month', onClick: _ => search({ q, period: 'month' }) }
  , { title: 'All',   active: period === null,    onClick: _ => search({ q }) }
  ];

  return <Menu items={filter} style={{display:'inline'}} />;
};

export default ({ meta: { query: { q = '', period = null, page = 1 }}, search, reset }) => {
  return (
    <Heading>
      Members <strong style={{marginLeft: 5}}>{q}</strong>

      {q && <Reset onClick={reset} size={14} style={{marginLeft: 5, marginTop: -2, cursor:'pointer'}} colour='#666' />}

      <div style={{float:'right'}}>
        <Filter q={q} period={period} search={search} />

        <a href={`/api/members/csv?q=${q}`} style={{marginLeft: 20}}>
          <Icon />
        </a>
      </div>

    </Heading>
  );
};