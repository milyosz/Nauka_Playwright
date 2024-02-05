import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';

test.describe('Payment tests', () => {
  // Arrange
  const login = loginData.login; //wywołanie danych z pliku test-data/login.data.ts
  const password = loginData.password;

  test.beforeEach(async ({ page }) => {
    await page.goto('/'); // strona startowa z configu baseURL
    await page.getByTestId('login-input').fill(login);
    await page.getByTestId('password-input').fill(password);
    await page.getByTestId('login-button').click();
  });
  
  test('simple payment', async ({ page }) => {
    // Arrange
    // const expectedMessage = `Przelew wykonany! ${expectedTransferReceiver} - ${rValue},00PLN - ${transferTitle}`;
    const receiver = 'Jan Nowak';
    const receiverAccountNumber = '12 3456 7891 2345 6789 1234 5678';
    const transferAmount = '420';
    const transferName = 'Payment_Test_1';
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${receiver}`;

    // Act
    await page.getByRole('link', { name: 'płatności' }).click();
    await page.getByTestId('transfer_receiver').fill(receiver);
    await page.getByTestId('form_account_to').fill(receiverAccountNumber);
    await page.getByTestId('form_amount').fill(transferAmount);
    await page.getByTestId('form_title').fill(transferName);
    await page.getByRole('button', { name: 'wykonaj przelew' }).click();
    await page.getByTestId('close-button').click();

    // Assert
    await expect(page.locator('#show_messages')).toHaveText(expectedMessage);
  });
});
