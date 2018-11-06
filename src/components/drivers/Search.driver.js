import React from 'react'
import { mount } from 'enzyme'
import { Search } from 'components'
import { Button, Input, Form } from 'antd'

export default class SearchDriver {
  constructor(props = {}) {
    this.wrapper = mount(
      <Search {...this.mockData.props()} {...props} />
    )
  }

  mockData = {
    props: () => ({

    })
  }

  get = {
    Button: () => this.wrapper.find(Button),
    Form: () => this.wrapper.find(Form),
    Input: () => this.wrapper.find(Input),
    instance: () => this.wrapper.instance()
  }

  when = {
    FromSubmited: () => this.get.Form().simulate('submit'),
    ButtonClicked: () => this.get.Button().simulate('click'),
    InputValueEntered: (value = '') => this.get.Input().prop('onChange')({ target: { value } })
  }
}
