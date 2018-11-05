import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import styled from 'styled-components'

function sortFunc (a, b) {
  if(a[this.key] < b[this.key]) { return -1 }
  if(a[this.key] > b[this.key]) { return 1 }
  return 0;
}

const columns = [{
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
      <Table
        locale={null}
        pagination={false}
        dataSource={testers}
        loading={fetching}
        columns={columns} />
      {error && <Error>Temporary error occurred, please try again later</Error>}
    </div>
  );
}

Testers.propTypes = {
  notFound: PropTypes.bool,
  fetching: PropTypes.bool,
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
}


const NotFound = styled.h2`
  text-align: center;
`

const Error = styled.div`
  color: #fc4e4e;
  font-size: 22px;
  text-align: left;
  padding: 10px 0;
`
