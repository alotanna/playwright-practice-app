import {test} from '@playwright/test';

test.beforeEach(async ({page}) => {
  await page.goto('http://localhost:4200/');
  await page.getByText('Forms').click()
  await page.getByText('Form Layouts').click()
})

test('locator syntax rules', async({page}) =>{
    //by tag name
    await page.locator('input').first().click()

    //by ID
    page.locator('#inputEmail1')

    //by class value
    page.locator('.input-full-width')
    page.locator('.shape-rectangle')

    //by attribute name
    page.locator('[placeholder="Email"]') 

    //by entire class value
    page.locator('[class=input-full-width size-medium status-basic shape-rectangle nb-transition]')

    //combination of tag name and class value
    page.locator('input.input-full-width')

    //by XPath
    page.locator('//*[@placeholder="Email"]')

    //by partial text
    page.locator('input', {hasText: 'Email'})
    page.locator(":text('Using')")

    //by exact text
    page.locator('text-is=Using the Grid')
})
