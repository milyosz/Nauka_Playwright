import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/url.data';

test.describe('Login account test', () => {
  // Arrange
  const login = loginData.login; //wywołanie danych z pliku test-data/login.data.ts
  const password = loginData.password;
  const URL= 'https://www.saucedemo.com/'

  test.beforeEach(async ({ page }) => {
    await page.goto(URL); // strona startowa z configu baseURL

  });
    test('error bad password ', async ({ page }) => {
      const shortPassword = 'aaa';
      const errorLoginMessage =
      'Epic sadface: Username and password do not match any user in this service';
      await page.locator('[data-test="username"]').fill(login);
      await page.locator('[data-test="password"]').fill(shortPassword);
      await page.locator('[data-test="login-button"]').click();

      await expect(page.locator('[data-test="error"]')).toHaveText(
        errorLoginMessage,
      );
    });



    test('error no password', async ({ page }) => {
      const errorNoPasswordMessage = 'Epic sadface: Password is required'

      await page.locator('[data-test="username"]').fill(login);
      await page.locator('[data-test="login-button"]').click();
  
      await expect(page.locator('[data-test="error"]')).toHaveText(
        errorNoPasswordMessage,
      );
    });



      

    test('correct login', async ({ page }) => {

      await page.locator('[data-test="username"]').fill(login);
      await page.locator('[data-test="password"]').fill(password);
      await page.locator('[data-test="login-button"]').click();
  
      
      await expect(page.locator('[primary_header="app_logo"]')).toHaveText('Swag Labs');
      
    });

  
  
});

