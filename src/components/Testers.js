import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import styled from 'styled-components'

export function sortFunc (a, b) {
  if(a[this.key] < b[this.key]) { return -1 }
  if(a[this.key] > b[this.key]) { return 1 }
  return 0;
}

export const columns = [{
  title: 'First Name',
  dataIndex: 'firstName',
  key: 'firstName',
  defaultSortOrder: 'ascend',
}, {
  title: 'Last Name',
  dataIndex: 'lastName',
  key: 'lastName',
  sorter: sortFunc.bind({key: 'lastName'})
}, {
  title: 'Country',
  dataIndex: 'country',
  key: 'country',
  sorter: sortFunc.bind({key: 'country'})
}, {
  title: 'Bugs',
  dataIndex: 'bugs',
  key: 'bugs',
}];

export default function Testers({ testers, fetching, notFound, error }) {

  return (
    <div>
      {notFound && <NotFound>User not found </NotFound>}
      {error && <Error>Temporary error occurred, please try again later</Error>}
      <Table
        pagination={false}
        dataSource={testers}
        loading={fetching}
        columns={columns} />
    </div>
  );
}

Testers.propTypes = {
  notFound: PropTypes.bool,
  fetching: PropTypes.bool,
  error: PropTypes.bool,
  testers: PropTypes.arrayOf(PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    country: PropTypes.string,
    bugs: PropTypes.string
  })).isRequired
};

Testers.defaultProps = {
  fetching: false,
  notFound: false,
  error: false,
}


export const NotFound = styled.h2`
  text-align: center;
`

export const Error = styled.div`
  color: #fc4e4e;
  font-size: 22px;
  text-align: center;
  padding: 10px 0;
`
