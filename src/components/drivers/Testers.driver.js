import React from 'react'
import { mount } from 'enzyme'
import Testers, { NotFound, Error, sortFunc, columns } from 'components/Testers'
import { Table } from 'antd'
import testers from 'containers/drivers/testers'

export default class SearchDriver {
  constructor(props = {}) {
    this.wrapper = mount(
      <Testers {...this.mockData.props()} {...props} />
    )
  }

  mockData = {
    props: () => ({
      testers: testers.map(tester => ({
        ...tester,
        key: tester.firstName + tester.lastName,
        bugs: tester.bugs.map(bug => bug.title).join(', ')
      })),
      fetching: false,
      notFound: false,
      error: false
    })
  }

  get = {
    Table: () => this.wrapper.find(Table),
    NotFound: () => this.wrapper.find(NotFound),
    Error: () => this.wrapper.find(Error),

    sortFunc,
    columns,
    rawTesters: testers,
    sortedTesters: testers.sort((a, b) => {
      if(a.firstName < b.firstName) { return -1 }
      if(a.firstName > b.firstName) { return 1 }
      return 0;
    })
  }

  when = {
    notFound: () => {
      const props = this.mockData.props()

      props.notFound = true

      this.wrapper = mount(
        <Testers {...props} />
      )
    },
    error: () => {
      const props = this.mockData.props()

      props.error = true

      this.wrapper = mount(
        <Testers {...props} />
      )
    }
  }
}
