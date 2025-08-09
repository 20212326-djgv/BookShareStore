describe('Pruebas CRUD de Libros', () => {
    let driver;

    beforeAll(async () => {
        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(new chrome.Options().headless())
            .build();
        await driver.get('http://localhost:5500/frontend/admin.html');
    });

    test('Crear un libro (camino feliz)', async () => {
        await driver.findElement(By.id('title')).sendKeys('Cien años de soledad');
        await driver.findElement(By.id('author')).sendKeys('Gabriel García Márquez');
        await driver.findElement(By.css('button[type="submit"]')).click();
        const books = await driver.findElements(By.css('#bookTable tbody tr'));
        expect(books.length).toBeGreaterThan(0);
    });
});