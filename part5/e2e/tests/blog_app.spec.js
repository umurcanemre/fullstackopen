const { test, describe, expect, beforeEach } = require('@playwright/test')
const { initBlogTest, loginWith, createBlogs, exitingBlogs, logout } = require('./helper')

describe('Blog app', () => {

  beforeEach(async ({ page, request }) => {
    await initBlogTest(request)
    await page.goto('/')
  })

  test('front page can be opened', async ({ page }) => {
    const locator = page.getByText('blogs')
    await expect(locator).toBeVisible()
  })

  test('user can log in', async ({ page }) => {
    await loginWith(page, 'testuser', 'testpwd')

    await expect(page.getByText('logged in')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible()
  })

  test('login fails with wrong password', async ({ page }) => {
    await loginWith(page, 'someusername', 'wrongpwd', false)

    const errorDiv = page.locator('.error')
    await expect(errorDiv).toContainText('login failed')
    await expect(errorDiv).toHaveCSS('border-style', 'solid')
    await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
  })


  test('blog list is visible logged out', async ({ page }) => {
    await loginWith(page, 'testuser', 'testpwd')
    await createBlogs(page, exitingBlogs())
    await logout(page)

    for (let b of exitingBlogs()) {
      await expect(page.getByText(b.title)).toBeVisible()
      await expect(page.getByText(b.author)).toBeVisible()
      await expect(page.getByText(b.url)).not.toBeVisible()
      for (const el of await page.getByText('likes 0').all()) {
        await expect(el).toBeHidden()
      }
    }
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'testuser', 'testpwd')
    })

    test('User can be logged back out', async ({ page }) => {
      await logout(page)

      const notificationDiv = page.locator('.ok')
      await expect(notificationDiv).toContainText('logged out')
      await expect(notificationDiv).toHaveCSS('border-style', 'solid')
      await expect(notificationDiv).toHaveCSS('color', 'rgb(0, 128, 0)')
    })

    describe('when exists blogs', () => {
      beforeEach(async ({ page }) => {
        await createBlogs(page, exitingBlogs())
        await page.goto('/')
      })

      test('are visible collapsed', async ({ page }) => {
        for (let b of exitingBlogs()) {
          const blogDiv = page.getByText(b.title)

          await expect(blogDiv.locator('button', { hasText: 'view' })).toBeVisible()
          await expect(blogDiv.locator('.blogDetails')).not.toBeVisible()
        }
      })

      test('can opened in detail', async ({ page }) => {
        const blog = exitingBlogs()[0]
        const blogDiv = page.getByText(blog.title)

        await blogDiv.locator('button', { hasText: 'view' }).click()

        const detailPageDiv = page.locator('.blogDetails')
        await expect(detailPageDiv).toBeVisible()

        await expect(detailPageDiv.getByText(blog.url)).toBeVisible()
        const likesDiv = detailPageDiv.locator('div').nth(1)
        await expect(likesDiv).toBeVisible()
        await expect(detailPageDiv.getByText('testuser')).toBeVisible()
        await expect(detailPageDiv.getByRole('button', { name: 'like' })).not.toBeVisible()
        await expect(detailPageDiv.getByRole('button', { name: 'remove' })).toBeVisible()
      })

      test('can be liked', async ({ page }) => {
        await logout(page)
        await loginWith(page, 'testuser2', 'testpwd2')
        await page.goto('/')

        const blog = exitingBlogs()[2]
        const blogDiv = page.getByText(blog.title)

        await blogDiv.locator('button', { hasText: 'view' }).click()

        await blogDiv.getByRole('button', { name: 'like' }).click()
        const likesDiv = blogDiv.locator('.blogDetails').locator('div').nth(1)
        await expect(likesDiv).toContainText('likes 1')

        await blogDiv.getByRole('button', { name: 'like' }).click()
        await expect(likesDiv).toContainText('likes 2')
      })

      test('can be deleted by owner', async ({ page }) => {
        const blog = exitingBlogs()[0]
        const blogDiv = page.getByText(blog.title)
        page.once('dialog', dialog => dialog.accept());

        await blogDiv.locator('button', { hasText: 'view' }).click()

        const detailPageDiv = page.locator('.blogDetails')
        await expect(detailPageDiv.getByRole('button', { name: 'remove' })).toBeVisible()
        await detailPageDiv.getByRole('button', { name: 'remove' }).click()


        const blogDivAfter = page.getByText(blog.title)
        await expect(blogDivAfter).not.toBeVisible()
      })

      test('cant be deleted by non-owner', async ({ page }) => {
        await logout(page)
        await loginWith(page, 'testuser2', 'testpwd2')
        await page.goto('/')
        page.once('dialog', dialog => dialog.accept());

        const blog = exitingBlogs()[0]
        const blogDiv = page.getByText(blog.title)

        await blogDiv.locator('button', { hasText: 'view' }).click()

        const detailPageDiv = page.locator('.blogDetails')
        await expect(detailPageDiv).toBeVisible()
        await expect(detailPageDiv.getByRole('button', { name: 'remove' })).not.toBeVisible()
      })


      test.skip('sorted by likes', async ({ page }) => {
        const blogDiv1 = page.getByText(exitingBlogs()[2].title)
        await blogDiv1.locator('button', { hasText: 'view' }).click()
        await blogDiv1.getByRole('button', { name: 'like' }).click()
        await blogDiv1.getByRole('button', { name: 'like' }).click()
        await blogDiv1.getByRole('button', { name: 'like' }).click()

        const blogDiv2 = page.getByText(exitingBlogs()[1].title)
        await blogDiv2.locator('button', { hasText: 'view' }).click()
        await blogDiv2.getByRole('button', { name: 'like' }).click()
        await blogDiv2.getByRole('button', { name: 'like' }).click()

        const blogDiv3 = page.getByText(exitingBlogs()[0].title)

        const box1 = await blogDiv1.boundingBox()
        const box2 = await blogDiv2.boundingBox()
        const box3 = await blogDiv3.boundingBox()

        expect(box1.y).toBeLessThan(box2.y)
        expect(box2.y).toBeLessThan(box3.y)
      })
    })
  })

})