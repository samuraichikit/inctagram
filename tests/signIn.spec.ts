import { expect, test } from '@playwright/test'

test('should sign in', async ({ page }) => {
    await page.goto('http://localhost:3000/auth/signIn')
    // await page.goto('http://www.samuraichiki.ors/en/auth/signIn')
    // await page.getByTestId('email').fill('sejad87048@evluence.com')
    await page.getByTestId('email').fill('vl1vl@yahoo.com')
    await page.getByTestId('password').fill('Reverie!222')
    await page.getByTestId('signIn').click()
    expect(await page.locator('text=Evchen').isVisible())

})



