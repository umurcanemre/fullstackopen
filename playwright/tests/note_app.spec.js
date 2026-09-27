const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createNote } = require('./helper')

describe('Note app', () => {

  beforeEach(async ({ page, request }) => {
    const testuser1 = {
      username: "testuser",
      name: "test user name",
      password: "testpwd"
    }
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: testuser1
    })

    await page.goto('/');
  })


  test('front page can be opened', async ({ page }) => {
    const locator = page.getByText('Notes')
    await expect(locator).toBeVisible()
    await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2025')).toBeVisible()
  })

  test('user can log in', async ({ page }) => {
    await loginWith(page, 'testuser', 'testpwd')

    // logged in user can create new note
    await expect(page.getByRole('button', { name: 'new note' })).toBeVisible()
  })

  test('login fails with wrong password', async ({ page }) => {
    await loginWith(page, 'someusername', 'wrongpwd')

    const errorDiv = page.locator('.error')
    await expect(errorDiv).toContainText('wrong credentials')
    await expect(errorDiv).toHaveCSS('border-style', 'solid')
    await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

    await expect(page.getByRole('button', { name: 'new note' })).not.toBeVisible()
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'testuser', 'testpwd')
    })

    test('a new note can be created', async ({ page }) => {
      await createNote(page, 'a note created by playwright')
      await expect(page.getByText('a note created by playwright')).toBeVisible()
    })

    describe('and several notes exists', () => {
      beforeEach(async ({ page }) => {
        await createNote(page, 'first note')
        await createNote(page, 'second note')
        await createNote(page, 'third note')
      })

      test('one of those can be made nonimportant', async ({ page }) => {
        const otherNoteText = page.getByText('second note')
        const otherNoteElement = otherNoteText.locator('..')

        await otherNoteElement.getByRole('button', { name: 'non-important' }).click()
        await expect(otherNoteElement.getByText('important')).toBeVisible()
      })

    })
  })
})