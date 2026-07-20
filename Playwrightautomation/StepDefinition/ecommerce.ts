import { Given, Then, When } from "@cucumber/cucumber";
import { Browser, BrowserContext, chromium, Page } from "playwright";
import { expect } from "playwright/test";

let browser: Browser, context: BrowserContext, page: Page
Given('I Launch Browser', async function () {
  browser = await chromium.launch({ headless: false,
    args:["--start-maximized"]
   })
  context = await browser.newContext({ viewport: null })
  page = await context.newPage()
});

When('I Navigate to the url', async function () {
  await page.goto("https://ecommerce-playground.lambdatest.io/index.php?route=account/login");
});

Then('Assert Title and URL and took Screenshot', async function () {
  await expect(page).toHaveTitle("Account Login");
  await expect(page).toHaveURL("https://ecommerce-playground.lambdatest.io/index.php?route=account/login");
  await page.screenshot({path:"./screenshot/LoginPage.png"});
});

Then('Click on the Register Button', async () => {
    await page.locator("//div[@class='list-group mb-3']//child::a[text()=' Register']").click();
    await page.screenshot({path:"./screenshot/Register.png"});
    await page.getByPlaceholder("First Name").fill("Kishore");
    await page.getByPlaceholder("Last Name").fill("M");
    await page.getByPlaceholder("E-Mail").fill("maruthikishore751@gamil.com");
    await page.getByPlaceholder("Telephone").pressSequentially("+919876543291");
    await page.locator("//input[@name='password']").fill("kishore");
    await page.locator("//input[@name='confirm']").fill("kishore");
    await page.locator("//label[@for='input-newsletter-yes']").click();
    await page.locator("//label[@for='input-agree']").click();
    await page.locator("//input[@value='Continue']").click();
    await page.screenshot({path:"./screenshot/result.png"})
    
    await page.getByText(" Warning: E-Mail Address is already registered!");
})