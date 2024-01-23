import { test, expect } from '@playwright/test';

test.describe('User login to Account', () => {

  const url = 'https://demo-bank.vercel.app/';
  const login = '111111111';
  const password = 'qwertyui';
  const expectedUsrName = 'Jan Demobankowy';


  test('login with correct credidentials', async ({ page }) => { // test.only - wywołanie tylko wybranych testów

    await page.goto(url);
    await page.getByTestId('login-input').fill(login); // await page.getByTestId('login-input').click(); // sam fill poniżej wywołuje clicka mozna tak powiezdiec
    await page.getByTestId('password-input').click();

    await page.getByTestId('password-input').fill(password);
    await page.getByTestId('login-button').click();
    await page.getByTestId('user-name').click();
    await page.getByRole('button', { name: 'wykonaj' }).click();


    await expect(page.getByTestId('user-name')).toHaveText(expectedUsrName);
  });


  test('unsuccessful login with too short username', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('123'); // await page.getByTestId('login-input').click();
    await page.getByTestId('password-input').click();
    await page.getByTestId('error-login-id').click();


    await expect(page.getByTestId('error-login-id')).toHaveText('identyfikator ma min. 8 znaków');


  });

  test('unsuccessful login with too short password', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    // await page.getByTestId('login-input').click();
    await page.getByTestId('login-input').fill(login);
    await page.getByTestId('password-input').click();
    await page.getByTestId('password-input').fill('123');
    await page.getByTestId('password-input').blur(); // metoda wyjścia z okna inputu, przez co wywołuje się error hasła


    await expect(page.getByTestId('error-login-password')).toHaveText('identyfikator ma min. 8 znaków'); //hasło ma min. 8 znaków

  });

});