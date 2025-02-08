// @ts-check
import { test, expect } from '@playwright/test';

test.describe('ログインフォームバリデーション', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/login');
  });

  test('メールアドレスとパスワードが空欄', async ({ page }) => {
    await page.click("#login-button");
    const emailError = await page.locator('#email-error');
    await expect(emailError).toHaveText('メールアドレスを入力してください。');
    const passwordError = await page.locator('#password-error');
    await expect(passwordError).toHaveText('パスワードを入力してください。');
  });

  test('メールアドレスの型不一致', async ({ page }) => {
    await page.fill('input[type="email"]', 'testest');
    await page.fill('input[type="password"]', 'Pass1234');
    await page.click("#login-button");
  
    const emailError = await page.locator('#email-error');
    await expect(emailError).toHaveText('有効なメールアドレスを入力してください。');
  });

  test('パスワードの型不一致', async ({ page }) => {
    await page.fill('input[type="password"]', 'abcdefgh');
    await page.click("#login-button");
    let passwordError = await page.locator('#password-error');
    await expect(passwordError).toHaveText('パスワードは8文字以上で、大文字小文字の英数記号を全て含んでください。');

    await page.fill('input[type="password"]', 'Abcd1234');
    await page.click("#login-button");
    passwordError = await page.locator('#password-error');
    await expect(passwordError).toHaveText('パスワードは8文字以上で、大文字小文字の英数記号を全て含んでください。');

    await page.fill('input[type="password"]', '12345678');
    await page.click("#login-button");
    passwordError = await page.locator('#password-error');
    await expect(passwordError).toHaveText('パスワードは8文字以上で、大文字小文字の英数記号を全て含んでください。');

    await page.fill('input[type="password"]', 'A#ua78');
    await page.click("#login-button");
    passwordError = await page.locator('#password-error');
    await expect(passwordError).toHaveText('パスワードは8文字以上で、大文字小文字の英数記号を全て含んでください。');
  });

  test('エラーなし', async ({ page }) => {
    await page.fill('input[type="email"]', 'testest@test.com');
    await page.fill('input[type="password"]', '#Pass741');
    await page.click("#login-button");
  
    const emailError = await page.locator('#email-error');
    const passwordError = await page.locator('#password-error');
    await expect(emailError).toHaveText('');
    await expect(passwordError).toHaveText('');
  });
});
