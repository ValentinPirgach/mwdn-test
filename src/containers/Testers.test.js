import TestersDriver from './drivers/Testers.driver'

describe('Testers container', () => {
  let driver = null
  const fetchTesters = jest.fn()

  beforeEach(() => {
    driver = new TestersDriver({fetchTesters})
  })

  test('should render <Search /> component', () => {
    expect(driver.get.Search().length).toEqual(1)
  })

  test('should render <Search /> component with correct props', () => {
    const component = driver.get.Search()
    expect(component.prop('onSubmit')).toEqual(driver.get.instance().handleSubmit)
  })

  test('should render <Testers /> component', () => {
    expect(driver.get.Testers().length).toEqual(1)
  })

  test('should render <Testers /> component with correct props', () => {
    const component = driver.get.Testers()

    expect(component.prop('testers')).toEqual(driver.mockData.props().testers.list)
    expect(component.prop('fetching')).toEqual(driver.mockData.props().testers.isFetching)
    expect(component.prop('notFound')).toEqual(driver.mockData.props().testers.notFound)
    expect(component.prop('error')).toEqual(driver.mockData.props().testers.error)
  })

  test('should call fetch actions, when Search submited', () => {
    driver.when.SearchSubmited()
    expect(fetchTesters).toHaveBeenCalledWith(driver.mockData.testerName)
  })

  test('should transform data in mapStateToProps', () => {
    const data = driver.get.mapStateToProps({
      testers: {
        list: driver.mockData.rawTesters
      }
    })

    const result = {
      testers: {
        list: driver.mockData.rawTesters.map(tester => ({
          ...tester,
          key: tester.firstName + tester.lastName,
          bugs: tester.bugs.map(bug => bug.title).join(', ')
        }))
      }
    }

    expect(data).toEqual(result)
  });
})
