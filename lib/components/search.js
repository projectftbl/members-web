import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Form, Input } from '@ftbl/form';
import { Search, Spinner } from '@ftbl/icons';
import { search } from '../ducks/members';

export class Members extends Component {
  render() {
    const { fields, members: { fetching }, handleSubmit, search } = this.props;
    
    const styles = {
      form: {
        display: 'inline-block'
      , marginTop: -8
      , marginBottom: -21
      }
    , field: {
        paddingTop: '0.4em'
      , paddingBottom: '0.4em'
      , paddingLeft: '2em'
      , paddingRight: '1em'
      , marginTop: 4
      , boxShadow: 'none'
      , border: 0
      , fontSize: '0.9em'
      , letterSpacing: 0.5
      , opacity: 0.7
      , ':focus': {
          boxShadow: 'none'
        , border: 0
        , opacity: 1
        }
      , icon: {
          top: '0.25em'
        , left: 0
        }
      }
    };

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
