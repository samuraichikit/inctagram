import { expect, test } from '@playwright/test'

test('should sign in', async ({ page }) => {
    await page.goto('http://localhost:3000/auth/signIn')
    await page.getByTestId('email').fill('sejad87048@evluence.com')
    await page.getByTestId('password').fill('Test!1234')
    await page.getByTestId('signIn').click()
    expect(await page.title()).toBe('Home')

})

