import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { membersSelector, search, reset } from '../ducks/members';
import { list } from '../ducks/accounts';
import Results from '../components/results';

@Radium
export class Members extends Component {
  componentWillMount() {
    const { members, search } = this.props;
    if (members.meta.query.q == null) search(members.query);
  }

  render() {
    const styles={
      base: {
        margin: '0 auto'
      , width: '80%'
      , minWidth: 400
      , paddingBottom: 20
      , '@media (max-width: 639px)': {
          margin: 0
        , width: '100%'
        , minWidth: 0
        }
      }
    };

    return (
      <div style={styles.base}>
        <Results {...this.props} />
      </div>
    );
  }
};

const mapStateToProps = state => ({ members: membersSelector(state) });

export default connect(mapStateToProps, { search, reset, list })(Members);
