import React, { Component } from 'react';
import { Col, Row, Button, Icon } from 'react-materialize';
import ReactTable from 'react-table';
import { getScripts } from '../actions/ScriptsActions';
import 'react-table/react-table.css';
import '../assets/react-table.css';

class Scripts extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getScripts());
  }

  render() {
    const { scripts } = this.props.scriptsData;
 
    const columns = [{
      Header: 'File path',
      accessor: 'path'
    }, {
      Header: 'Latest version',
      accessor: 'version'
    }, {
      Header: 'Last modified by',
      accessor: 'user'
    }, {
      Header: 'Release date',
      accessor: 'created_at'
    }];

    return (
      <div className='app-body-card'>
        <Row className='page-header'>
          <Col s={ 6 }>
            <h1>Scripts</h1>
          </Col>
          <Col s={ 6 }>
            <Button
              className='right'
              waves='light'
              onClick={ () => window.location = './add-script' }
            >
              Add script<Icon left>add_box</Icon>
            </Button>
          </Col>
        </Row>
        <ReactTable
          filterable
          loading={ false }
          noDataText=''
          className='-highlight'
          data={ scripts }
          columns={ columns }
          defaultPageSize={10}
          getTdProps={(state, rowInfo, column, instance) => {
            return {
              onClick: () => {
                if (rowInfo) window.location = `script/${rowInfo.original.id}`;
              }
            };
          }}
        />
      </div>
    );
  }
}

export default Scripts;