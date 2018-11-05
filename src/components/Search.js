import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Form, Icon, Input, Button } from 'antd'

const FormItem = Form.Item;


class Search extends Component {
  static propTypes = {
    form: PropTypes.shape({
      getFieldDecorator: PropTypes.func.isRequired,
      getFieldsError: PropTypes.func.isRequired,
      isFieldTouched: PropTypes.func.isRequired,
      getFieldError: PropTypes.func.isRequired,
      validateFields: PropTypes.func.isRequired,
      getFieldValue: PropTypes.func.isRequired,
    }).isRequired,
    onSubmit: PropTypes.func.isRequired
  }

  get testerNameError() {
    const { isFieldTouched, getFieldError } = this.props.form
    return isFieldTouched('testerName') && getFieldError('testerName')
  }

  get fieldDecorator() {
    return this.props.form.getFieldDecorator('testerName', {
      rules: [{ required: true, message: 'Please input the tester name' }],
    })
  }

  get hasErrors() {
    const fieldsError = this.props.form.getFieldsError()
    return Object.keys(fieldsError).some(field => fieldsError[field]) || !this.props.form.getFieldValue('testerName')
  }

  handleSubmit = (e) => {
    e.preventDefault();


    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values)
      }
    });
  }

  render() {
    return (
      <Wrapper>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <FormItem
            label="Tester Name"
            validateStatus={this.testerNameError ? 'error' : ''}
            help={this.testerNameError || ''}>
            {this.fieldDecorator(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Enter the tester name" />
            )}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              disabled={this.hasErrors}
            >
              Fetch
            </Button>
          </FormItem>
        </Form>
      </Wrapper>
    );
  }
}

export default Form.create()(Search);


const Wrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  margin: 40px 0;
`
