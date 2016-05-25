import React from 'react';
import { Message } from '@ftbl/component';
import { Paging, Empty } from '@ftbl/table';
import Member, { Header } from './member';
import Title from './title';

export default ({ members, ...rest }) => {
  return (
    <div>
      <Title meta={members.meta} {...rest} />
      <Header />

      {members.data.length === 0 && !members.fetching && <Message message='No members found' />}

      {members.data.map((member, i) => <Member key={member.id} member={member} {...rest} last={i === members.data.length-1} />)}

      <Empty limit={members.meta.query.limit} length={members.data.length} />

      {members.data.length > 0 && <Paging meta={members.meta} fetching={members.fetching} {...rest} entity='member' />}
    </div>
  );
};
