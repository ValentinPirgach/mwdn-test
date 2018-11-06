import React from 'react'
import PropTypes from 'prop-types'
import { Search, Testers } from 'components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector, createSelector } from 'reselect'
import * as testersActions from 'actions/testers'

export class TestersContainer extends React.Component {
  static propTypes = {
    fetchTesters: PropTypes.func.isRequired,
    testers: PropTypes.shape({
      isFetching: PropTypes.bool,
      notFound: PropTypes.bool,
      list: PropTypes.array
    }).isRequired
  }

  state = {}

  handleSubmit = ({testerName}) => {
    this.props.fetchTesters(testerName)
  }

  render() {
    const { testers: { list, isFetching, notFound, error } } = this.props

    return (
      <div>
        <Search onSubmit={this.handleSubmit}/>
        <Testers
          testers={list}
          fetching={isFetching}
          notFound={notFound}
          error={error} />
      </div>
    )
  }
}

export const mapStateToProps = createStructuredSelector({
  // TODO: That's might be moved into separate selectors file
  testers: createSelector(
    state => state.testers,
    testers => ({
      ...testers,
      list: testers.list.map(tester => ({
        ...tester,
        key: tester.firstName + tester.lastName,
        bugs: tester.bugs.map(bug => bug.title).join(', ')
      }))
    })
  ),
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchTesters: testersActions.fetchTesters
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TestersContainer)
