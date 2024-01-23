import { test, expect } from '@playwright/test';


const rValue = Math.floor(Math.random() * (50 - 20) + 20);
const url = 'https://demo-bank.vercel.app/';
const login = '111111111';
const password = 'qwertyui';
const expectedUsrName = 'Jan Demobankowy';
const receirverId = '2';
const transferTitle = 'Test_Przelew_1';
const expectedTransferReceiver = 'Chuck Demobankowy';
const blankMessage = 'Brak wiadomości';
const numberOption = '503 xxx xxx';


test.describe('Pulpit account test', () => {

    test('Przelew z konta', async ({ page }) => {


        await page.goto(url);
        await page.getByTestId('login-input').fill(login);
        await page.getByTestId('password-input').fill(password);
        await page.getByTestId('login-button').click();


        await page.locator('#widget_1_transfer_receiver').selectOption(receirverId); // # pozwala wyszukać po id elementu
        await page.locator('#widget_1_transfer_amount').fill(rValue.toString());
        await page.locator('#widget_1_transfer_title').fill(transferTitle);
        // await page.getByRole('button', { name: 'wykonaj' }).click(); //getbyrole pozwala wyszukać po roli elementu 


        await page.locator('#execute_btn').click();

        await page.getByTestId('close-button').click();

        await expect(page.locator('#show_messages')).toHaveText(`Przelew wykonany! ${expectedTransferReceiver} - ${rValue},00PLN - ${transferTitle}`);

        await page.getByRole('link', { name:  `Przelew wykonany! ${expectedTransferReceiver} - ${rValue},00PLN - ${transferTitle}` }).click();

        await expect(page.locator('#show_messages')).toHaveText(blankMessage);
    });


    test('successfull mobile top-up', async ({ page }) => {

        await page.goto(url);
        await page.getByTestId('login-input').fill(login);
        await page.getByTestId('password-input').fill(password);
        await page.getByTestId('login-button').click();

        await page.locator('#widget_1_topup_receiver').selectOption(numberOption);
        await page.locator('#widget_1_topup_amount').fill(rValue.toString());
        // await page.locator('#widget_1_topup_agreement').check(); // działa check box zbugowany z boku
        await page.locator('#uniform-widget_1_topup_agreement').click(); // checkbox idealnie w srodek przycisku
        await page.getByRole('button', { name: 'doładuj telefon' }).click();
        await page.getByTestId('close-button').click();

        await expect(page.locator('#show_messages')).toHaveText(`Doładowanie wykonane! ${rValue},00PLN na numer ${numberOption}`);
        await page.locator('#show_messages').click();

        await expect(page.locator('#show_messages')).toHaveText(blankMessage);
    });



});