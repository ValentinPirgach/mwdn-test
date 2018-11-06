import TestersDriver from './drivers/Testers.driver'

describe('Testers container', () => {
  let driver = null

  beforeEach(() => {
    driver = new TestersDriver()
  })

  test('should render <Table /> component', () => {
    expect(driver.get.Table().length).toEqual(1)
  })

  test('should render <Table /> component with correct props', () => {
    const component = driver.get.Table()

    expect(component.prop('pagination')).toBeFalsy()
    expect(component.prop('dataSource')).toEqual(driver.mockData.props().testers)
    expect(component.prop('loading')).toEqual(driver.mockData.props().fetching)
    expect(component.prop('columns')).toEqual(driver.get.columns)
  })

  test('should not render <NotFound />', () => {
    expect(driver.get.NotFound().length).toEqual(0)
  })

  test('should render <NotFound />', () => {
    driver.when.notFound()
    expect(driver.get.NotFound().length).toEqual(1)
  })

  test('should not render <Error />', () => {
    expect(driver.get.Error().length).toEqual(0)
  })

  test('should render <Error />', () => {
    driver.when.error()
    expect(driver.get.Error().length).toEqual(1)
  })

  test('should sort by alphabet with bind context', () => {
    const sortFunc = driver.get.sortFunc.bind({key: 'firstName'})
    expect(driver.get.rawTesters.sort(sortFunc)).toEqual(driver.get.sortedTesters)
  });
});
