import { test, expect } from '@playwright/test';

test.describe('User login to Account', () => {
  
  test.beforeEach(async ({ page }) => {
    // const url = 'https://demo-bank.vercel.app/';
    // await page.goto(url); // można uzyc skrotu z configu uzywajac baseURL
    await page.goto('/');
  });

  test('login with correct credidentials', async ({ page }) => {
    // test.only - wywołanie tylko wybranych testów
    // Arrange
    const password = 'qwertyui';
    const expectedUsrName = 'Jan Demobankowy';
    const login = '111111111';
    // Act

    await page.getByTestId('login-input').fill(login); // await page.getByTestId('login-input').click(); // sam fill poniżej wywołuje clicka mozna tak powiezdiec
    await page.getByTestId('password-input').click();

    await page.getByTestId('password-input').fill(password);
    await page.getByTestId('login-button').click();
    await page.getByTestId('user-name').click();
    await page.getByRole('button', { name: 'wykonaj' }).click();

    // Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUsrName);
  });

  test('unsuccessful login with too short username', async ({ page }) => {
    // Arrange
    const tooShort = '123';
    const expectedError = 'identyfikator ma min. 8 znaków';
    
    // Act
    await page.getByTestId('login-input').fill(tooShort); // await page.getByTestId('login-input').click();
    await page.getByTestId('password-input').click();

    // Assert
    await expect(page.getByTestId('error-login-id')).toHaveText(expectedError);
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    // Arrange
    const tooShort = '123';
    const login = '111111111';
    const expectedError = 'identyfikator ma min. 8 znaków';

    // Act
    // await page.getByTestId('login-input').click();
    await page.getByTestId('login-input').fill(login);
    await page.getByTestId('password-input').click();
    await page.getByTestId('password-input').fill(tooShort);
    await page.getByTestId('password-input').blur(); // metoda wyjścia z okna inputu, przez co wywołuje się error hasła

    // Assert
    await expect(page.getByTestId('error-login-password')).toHaveText(
      expectedError,
    ); //hasło ma min. 8 znaków
  });
});
