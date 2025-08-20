import {test} from '@playwright/test';

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