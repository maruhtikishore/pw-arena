import { Given, Then, When } from "@cucumber/cucumber";
import { Browser, BrowserContext, chromium, Page } from "playwright";
import { expect } from "playwright/test";

let browser: Browser, context: BrowserContext, page: Page
Given('Launch the Browser', async function () {
  browser = await chromium.launch({ headless: false, })
  context = await browser.newContext({ viewport: null })
  page = await context.newPage()
});

When('I Navigate to the Automation WebSite', async function () {
  await page.goto("https://testautomationpractice.blogspot.com/")
});

Then('I enter the Name using Xpath', async function () {
  const name = page.locator("//input[@id='name']")
  await name.fill("KISHORE M")  
  await expect.soft(name).toHaveValue("KISHORE M")
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

Then('I Locate the Element using Parent,preceding,following,following-sibling', async () => {
  let Blog = await page.locator("//a[text()='Online Trainings']//preceding::a[text()='Udemy Courses']//preceding::a[text()='Home']//following::a[text()='Blog']")
  //await Blog.click()
})

Then('Select Country Static DropDown', async () => {
  let country = await page.locator("//select[@id='country']")
  await country.scrollIntoViewIfNeeded()
  await country.selectOption('China')
})

Then('Select Color Dynamic Dropdown', async () => {
  let color = await page.locator("//select[@id='colors']")
  await color.selectOption(['Red', 'Blue', 'Yellow'])
})

Then('Drag and Drop', async () => {
  let drag = await page.locator("//div[@id='draggable']")
  let drop = await page.locator("//div[@id='droppable']")
  await drag.dragTo(drop)

})

Then('Take screenshot', async () => {
  // Screenshot on Specific Field
  let field= await page.locator("//input[@id='name']");
  await field.screenshot({path:"./screenshot/Before.png"})
  await field.fill('Edited')
  await field.screenshot({path:"./screenshot/after.png"})

  //screenshot on Visible page

  await page.screenshot({path:"./screenshot/visiblepage.png"});

  //Full page Screenshot

  await page.screenshot({path:"./screenshot/fullpage.png",fullPage:true});
  
})

Then("I handle simple alert", async () => {
  // Write code
  //await page.goto("https://testautomationpractice.blogspot.com/");
  // await page.waitForSelector("//button[@id='alertBtn']");
  await page.locator("//button[@id='alertBtn']").scrollIntoViewIfNeeded();
    //Register the dialog event
  page.on("dialog", async (dialog) => {
    //await page.waitForTimeout(2000);
    console.log("Alert_Type: ", await dialog.type());
    console.log("Alert_Msg: ", await dialog.message());
    await dialog.accept();
  });
  await page.locator("//button[@id='alertBtn']").click();

});

Then("I handle confirm alert", async () => {
  // Write code
  await page.goto("https://testautomationpractice.blogspot.com/");
  // await page.waitForSelector("//button[@id='confirmBtn']");
  await page.locator("//button[@id='confirmBtn']").scrollIntoViewIfNeeded();
  //Register the dialog event
  page.on("dialog", async (dialog) => {
    //await page.waitForTimeout(2000);
    console.log("Alert_Type: ", await dialog.type());
    console.log("Alert_Msg: ", await dialog.message());
    await dialog.accept();
    // await dialog.dismiss();
  });
  // await page.locator("//button[@id='confirmBtn']").click();
  await page.click("//button[@id='confirmBtn']");
});

Then("I handle prompt alert", async  () =>{
  // Write code
  await page.goto("https://testautomationpractice.blogspot.com/");
  // await page.waitForSelector("//button[@id='confirmBtn']");
  await page.locator("//button[@id='promptBtn']").scrollIntoViewIfNeeded();
  //Register the dialog event
  page.on("dialog", async (dialog) => {
    //await page.waitForTimeout(2000);
    console.log("Alert_Type: ", await dialog.type());
    console.log("Alert_Msg: ", await dialog.message());
    await dialog.accept("Kishore M");
    // await dialog.dismiss();
  });
  // await page.locator("//button[@id='confirmBtn']").click();
  await page.click("//button[@id='promptBtn']");
});

