import React, { Component } from 'react';
import DiffView from './DiffView';

class CodeDiff extends Component {
  render() {
    return (
      <div className='code-diff'>
        <DiffView baseText={ this.props.baseText } newText={ this.props.newText } />
      </div>
    );
  }
}

export default CodeDiff;
