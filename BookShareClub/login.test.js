const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('path');

describe('Pruebas de Login', () => {
    let driver;

    beforeAll(async () => {
        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(new chrome.Options().headless()) // Modo sin UI
            .build();
        await driver.get('http://localhost:5500/frontend/index.html');
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('Login exitoso (camino feliz)', async () => {
        await driver.findElement(By.id('username')).sendKeys('admin');
        await driver.findElement(By.id('password')).sendKeys('1234');
        await driver.findElement(By.css('button[onclick="login()"]')).click();
        await driver.wait(until.urlIs('http://localhost:5500/frontend/admin.html'), 5000);
    });

    test('Login fallido (prueba negativa)', async () => {
        await driver.get('http://localhost:5500/frontend/index.html');
        await driver.findElement(By.id('username')).sendKeys('invitado');
        await driver.findElement(By.id('password')).sendKeys('0000');
        await driver.findElement(By.css('button[onclick="login()"]')).click();
        const errorMsg = await driver.findElement(By.id('error-msg')).getText();
        expect(errorMsg).toContain('incorrectos');
    });
});