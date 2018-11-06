import React from 'react'
import { mount } from 'enzyme'
import { TestersContainer, mapStateToProps } from 'containers/Testers'
import { Search, Testers as TestersComponent } from 'components'
import faker from 'faker'
import testersData from './testers'

export default class TestersDriver {
  constructor(props = {}) {
    this.wrapper = mount(
      <TestersContainer {...this.mockData.props()} {...props} />
    )
  }

  fakeList = Array(10).fill().map(() => ({
    key: faker.random.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName()
  }))

  mockData = {
    testerName: 'Melisa',
    props: () => ({
      testers: {
        list: this.fakeList,
        isFetching: false,
        notFound: false,
        error: false
      }
    }),

    rawTesters: testersData
  }

  get = {
    Search: () => this.wrapper.find(Search),
    Testers: () => this.wrapper.find(TestersComponent),
    instance: () => this.wrapper.instance(),
    mapStateToProps
  }

  when = {
    SearchSubmited: () =>
      this.get.Search().prop('onSubmit')({ testerName: this.mockData.testerName })
  }
}
