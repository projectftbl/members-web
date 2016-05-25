import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Form, Input } from '@ftbl/form';
import { Search, Spinner } from '@ftbl/icons';
import { search } from '../ducks/members';

export class Members extends Component {
  render() {
    const { fields, members: { fetching }, handleSubmit, search, styles = {}} = this.props;
    
    const colour = fields.q.active ? '#999' : '#ccc';

    const icon = fetching 
                 ? <Spinner size={18} rotate={true} colour={colour} /> 
                 : <Search size={18} colour={colour} />;

    return (
      <Form onSubmit={handleSubmit(data => search(data))} style={styles.form}>
        <Input label='Search Members' field={fields.q} icon={icon} style={styles.field} allowFloat={false} />
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
