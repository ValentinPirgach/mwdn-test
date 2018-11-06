import UserInfoDriver from './drivers/Search.driver'

describe('UserInfo container', () => {
  let driver = null
  const onSubmit = jest.fn()

  beforeEach(() => {
    driver = new UserInfoDriver({ onSubmit })
  })

  test('should render <Button /> component', () => {
    expect(driver.get.Button().length).toEqual(1)
  })

  test('should not call onSubmit callback when input value is empty', () => {
    driver.when.ButtonClicked()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  test('should render <Input /> component', () => {
    expect(driver.get.Input().length).toEqual(1)
  })

  test('should render <Form /> component', () => {
    expect(driver.get.Form().length).toEqual(1)
  })

  test('should call onSubmit callback with input value typed', () => {
    const testerName = 'Octocat'
    driver.when.InputValueEntered(testerName)
    driver.when.FromSubmited()

    expect(onSubmit).toHaveBeenCalledWith({ testerName })
  })
});
