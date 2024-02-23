import { expect, test } from '@playwright/test'

test('자유게시판 페이지로 이동한다.', async ({ page }) => {
  await page.goto('http://localhost:3000/')

  await page.click('text=자유게시판')
  await expect(page).toHaveURL('http://localhost:3000/board/free')
  await expect(page.getByText('전체 글')).toBeVisible()
})
