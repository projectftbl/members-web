import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Form, Input } from '@recipher/form';
import { Search, Spinner } from '@recipher/icons';
import { search } from '../ducks/members';

export class Members extends Component {
  render() {
    const { fields, members: { fetching }, handleSubmit, search, styles = {}, allowFloat = true } = this.props;
    
    const colour = fields.q.active ? '#999' : '#ccc';

    const icon = fetching 
                 ? <Spinner size={18} rotate={true} colour={colour} /> 
                 : <Search size={18} colour={colour} />;

    return (
      <Form onSubmit={handleSubmit(data => search(data))} style={styles.form}>
        <Input label='Search Members' field={fields.q} icon={icon} style={styles.field} allowFloat={allowFloat} />
      </Form>
    );
  }
};

export default reduxForm({ 
  form: 'members', fields: [ 'q' ] 
}
, state => ({ members: state.members.members })
, { search }
)(Members);
