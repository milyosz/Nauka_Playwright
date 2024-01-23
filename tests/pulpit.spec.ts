import { test, expect } from '@playwright/test';


const rValue = Math.floor(Math.random() * (50 - 20) + 20);


test.describe('Pulpit account test', () => {

    test('Przelew z konta', async ({ page }) => {


        await page.goto('https://demo-bank.vercel.app/');
        await page.getByTestId('login-input').fill('111111111');
        await page.getByTestId('password-input').fill('qwertyui');
        await page.getByTestId('login-button').click();


        await page.locator('#widget_1_transfer_receiver').selectOption('2'); // # pozwala wyszukać po id elementu
        await page.locator('#widget_1_transfer_amount').fill('120');
        await page.locator('#widget_1_transfer_title').fill('Test_Przelew_1');
        // await page.getByRole('button', { name: 'wykonaj' }).click(); //getbyrole pozwala wyszukać po roli elementu 


        await page.locator('#execute_btn').click();

        await page.getByTestId('close-button').click();

        await expect(page.locator('#show_messages')).toHaveText('Przelew wykonany! Chuck Demobankowy - 120,00PLN - Test_Przelew_1');

        await page.getByRole('link', { name: 'Przelew wykonany! Chuck Demobankowy - 120,00PLN - Test_Przelew_1' }).click();

        await expect(page.locator('#show_messages')).toHaveText('Brak wiadomości');
    });


    test.only('successfull mobile top-up', async ({ page }) => {

        await page.goto('https://demo-bank.vercel.app/');
        await page.getByTestId('login-input').fill('12345678');
        await page.getByTestId('password-input').fill('09876543');
        await page.getByTestId('login-button').click();
         
        await page.locator('#widget_1_topup_receiver').selectOption('503 xxx xxx');
        await page.locator('#widget_1_topup_amount').fill(rValue.toString());
        // await page.locator('#widget_1_topup_agreement').check(); // działa check box zbugowany z boku
        await page.locator('#uniform-widget_1_topup_agreement').check(); // checkbox idealnie w srodek przycisku
        await page.getByRole('button', { name: 'doładuj telefon' }).click();
        await page.getByTestId('close-button').click();

        await expect(page.locator('#show_messages')).toHaveText(`Doładowanie wykonane! ${rValue},00PLN na numer 503 xxx xxx`);
        await page.locator('#show_messages').click();
        
        await expect(page.locator('#show_messages')).toHaveText('Brak wiadomości');
    });



});