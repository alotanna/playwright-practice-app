import {test, expect} from '@playwright/test';

test.beforeEach(async ({page}) => {
  await page.goto('http://localhost:4200/');
  await page.getByText('Forms').click()
  await page.getByText('Form Layouts').click()
})

test('test child elements', async({page}) =>{
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()

    //chaining locators
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

    //combining locators and getbyrole
    await page.locator('nb-card').getByRole('button', {name: 'Sign in'}).first().click()

    //using index
    await page.locator('nb-card').nth(2).getByRole('button').click()

})

test('locating parent elements', async({page}) =>{
  await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('button', {name: 'Sign in'}).click()

  await page.locator('nb-card').filter({hasText: "Basic Form"}).getByRole('button', {name: 'Submit'}).click()

  //by chaining filter method
  await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"})
  .getByRole('textbox', {name: 'Email'}).click()

})

//reusing locators
test('reusing locators', async({page}) =>{
  const card = page.locator('nb-card');
  const emailfield = page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"})
  .getByRole('textbox', {name: 'Email'})

  await emailfield.fill('test@gmail.com')

  await card.getByRole('button', {name: 'Sign in'}).first().click()
  await card.getByRole('button', {name: 'Submit'}).first().click()

  //reusing locator with filter
  await card.filter({hasText: "Using the Grid"}).getByRole('button', {name: 'Sign in'}).click()

  //reusing locator with chaining
  await card.nth(2).getByRole('button').click()

  await expect(emailfield).toHaveValue('test@gmail.com')
})

//extracting values and checking the expected values
test('extracting values', async({page}) =>{
  const card = page.locator('nb-card');
  const emailfield = card.filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"})
  .getByRole('textbox', {name: 'Email'})

  await emailfield.fill('test@gmail.com')
  expect(await emailfield.inputValue()).toBe('test@gmail.com')

  //all text values
  const allTextValues = await page.locator('nb-radio').allTextContents();
  expect(allTextValues).toContain('Option 1');
})

//types of assertions
test('assertions', async({page}) =>{
  const card = page.locator('nb-card');
  const emailfield = card.filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"})
  .getByRole('textbox', {name: 'Email'})

  await emailfield.fill('')
  await expect(emailfield).toBeEmpty();
  await expect(emailfield).toHaveValue('');

  //soft assertion: this will not fail the test if the assertion fails
  await expect.soft(emailfield).toBeEmpty();
})