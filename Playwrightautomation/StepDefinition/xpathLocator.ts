import { Given, Then, When } from "@cucumber/cucumber";
import { Browser, BrowserContext, chromium, Page } from "playwright";

let browser:Browser,context:BrowserContext,page:Page
Given('Launch the Browser', async function () {
  browser = await chromium.launch( {headless: false,})
  context = await browser.newContext({viewport:null})
  page = await context.newPage()
});

When('I Navigate to the Automation WebSite', async function () {
  await page.goto("https://testautomationpractice.blogspot.com/")
});

Then('I enter the Name using Xpath', async function () {
  await page.locator("//input[@id='name']").fill("KISHORE M")
});

Then('I enter the Email using Xpath', async function () {
  await page.locator("//input[contains(@placeholder,'EMail')]").fill("abc@gmail.com")
});

Then('I Click the Start Button using Xpath', async function () {
  await page.locator("//button[text()='START']").click()
});

Then('I Click the Male Radio Button using Xpath', async function () {
  await page.locator("//input[@value='male']").click()
});

Then('I Select the Sunday, Tuesday and Thrusday using Xpath', async function () {
  await page.locator("//label[@for='sunday']").click()
  await page.locator("//input[@value='tuesday']").check()
  await page.locator("//label[text()='Thursday']").click()
});

Then('I Print the description of the page', async function () {
  const alertText = await page.locator("//h2[contains(text(),'Alerts')]").innerText();
  console.log("Alert heading text:", alertText);
});

Then('I Locate the Element using Parent,preceding,following,following-sibling', async() =>{
  await page.locator("//a[text()='Online Trainings']//preceding::a[text()='Udemy Courses']//preceding::a[text()='Home']//following::a[text()='Blog']").click()

})
