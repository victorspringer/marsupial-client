import React, { Component } from 'react';
import NotFound from './NotFound';
import { getScript } from '../actions/ScriptsActions';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import '../assets/react-table.css';

class Script extends Component {
  componentDidMount() {
    const { id, dispatch } = this.props;
    dispatch(getScript(id));
  }

  render() {
    const { scripts } = this.props.scriptsData;
 
    const columns = [{
      Header: 'Version',
      accessor: 'version'
    }, {
      Header: 'Modified by',
      accessor: 'user'
    }, {
      Header: 'Release date',
      accessor: 'created_at'
    }];

    if (scripts && scripts.length < 1) return <NotFound />

    return (
      <div className='app-body-card'>
        <h1>{ scripts && scripts[0].path }</h1>
        <ReactTable
          filterable
          loading={ this.props.scriptsData.isFetching }
          className='-highlight'
          data={ scripts }
          columns={ columns }
          defaultPageSize={10}
          getTdProps={(state, rowInfo, column, instance) => {
            return {
              onClick: () => {
                if (rowInfo) {
                  const { id, version } = rowInfo.original;
                  window.location = `../script-version/${id}/${version}`;
                }
              }
            };
          }}
        />
      </div>
    );
  }
}

export default Script;