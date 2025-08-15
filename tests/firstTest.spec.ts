import {test} from '@playwright/test';

test.beforeEach(async ({page}) => {
  await page.goto('http://localhost:4200/');
})

test('first test', async ({page}) => {
  await page.getByText('Forms').click()
  await page.getByText('Form Layout').click()
  const title = await page.title();
  console.log(`Page title is: ${title}`);
})

test('second test', async ({page}) => {
    await page.getByText('Modal & Overlays').click()
})


// test.describe('First Test Suite', () => {
//   test('first test in suite', async ({page}) => {
//     await page.goto('https://example.com');
//     const title = await page.title();
//     console.log(`Page title in suite is: ${title}`);
//   })

//     test('second test in suite', async ({page}) => {
//         await page.goto('https://example.com/about');
//         const title = await page.title();
//         console.log(`About page title is: ${title}`);
//     })
// })