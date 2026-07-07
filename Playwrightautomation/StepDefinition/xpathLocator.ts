import { Given, Then, When } from "@cucumber/cucumber";
import { Browser, BrowserContext, chromium, Page } from "playwright";
import { expect } from "playwright/test";

let browser: Browser, context: BrowserContext, page: Page
Given('Launch the Browser', async function () {
  browser = await chromium.launch({ headless: false,
    args:["--start-maximized"]
   })
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

// DropDown 
Then('Select Country Static DropDown', async () => {
  let country = await page.locator("//select[@id='country']")
  await country.scrollIntoViewIfNeeded()
  await country.selectOption('China')
})

Then('Select Color Dynamic Dropdown', async () => {
  let color = await page.locator("//select[@id='colors']")
  await color.selectOption(['Red', 'Blue', 'Yellow'])
})

// Drag and Drop
Then('Drag and Drop', async () => {
  let drag = await page.locator("//div[@id='draggable']")
  let drop = await page.locator("//div[@id='droppable']")
  await drag.dragTo(drop)

})


// Screenshot
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


// Alert, Confirm and Prompt Dialog
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

When('I Launch demo alerts', async function () {
  await page.goto("https://demoqa.com/alerts");
});

// Simple Alert
Then('Simple Alert', async function () {
  page.once('dialog', dialog => dialog.accept());
  await page.locator('#alertButton').click();
});

// Prompt Alert
Then('Prompt Alert', async function () {
  page.once('dialog', dialog => dialog.accept("Kishore"));
  await page.locator('#promtButton').click();
});

// Confirm Alert
Then('Confirm Alert', async function () {
  page.once('dialog', dialog => dialog.dismiss());
  await page.locator('#confirmButton').click();
});

// Alert Timeout
Then('Alert Timeout', async function () {
  page.once('dialog', async(dialog) => {
   //await page.waitForTimeout(6000)
   console.log(await dialog.type());
   console.log(await dialog.message());
    await dialog.accept();
  });
 
  await page.locator('#timerAlertButton').click();
});


When('I Launch Frame Page', async function () {
  await page.goto("https://ui.vision/demo/webtest/frames/");
});


Then('Enter the field value', async function () {
  //await page.waitForSelector("//input[@name='mytext1']");

  //await page.waitForTimeout(2000);

  // Frame 1
  let frameCount = await page.frames();
  console.log("No of Frames: ", frameCount.length);
  await page.frameLocator("//frame[@src='frame_1.html']").locator("//input[@name='mytext1']").fill("Kishore M");

  //Frame 2
  await page.frame({url: "https://ui.vision/demo/webtest/frames/frame_2"})?.locator("//input[@name='mytext2']").fill("frame 2");


//  const parentFrame =  await page.frame({url: "https://ui.vision/demo/webtest/frames/frame_3"});
//  const childFrame =  await parentFrame?.childFrames();
//  console.log("ChildFrame Count : ", childFrame?.length);
//  await page.locator("//input[@name='mytext1']").fill("Kishore M")

  //Nested Frame 3 

  //const parentFrame3 = await page.frameLocator("//frame[@src='frame_3.html']"); --Frame locator we can't able to use childframe.
  const parentFrame3 = await page.frame({url:"https://ui.vision/demo/webtest/frames/frame_3"});
  await parentFrame3?.locator("//input[@name='mytext3']").fill('Frame 3');
  const childFrame = await parentFrame3?.childFrames() ?? [];  // -- why ?? []
  console.log("ChildFrame inside Frame3 : ", childFrame.length);

  //Handle of Child Frame

  await childFrame[0].locator("//span[contains(text(),'I am a human')]").click();
  await childFrame[0].locator("//span[contains(text(),'Web Testing')]").click();
  await childFrame[0].locator("//span[contains(text(),'Next')]").click();
  await page.waitForTimeout(2000);

  await childFrame[0].locator("//input[@jsname='YPqjbf']").fill("kishore M");
  await childFrame[0].locator("//textarea[@jsname='YPqjbf']").type("Filled Child Frame");
  await childFrame[0].locator("//span[contains(text(),'Submit')]").click();

 const resultPage =  await childFrame[0].locator("//div[contains(text(),'Form Filling Demo Page')]");
 await expect(resultPage).toHaveText("Form Filling Demo Page");

 // Frame 4

 const ParentFrame4 = await page.frame({url : " https://ui.vision/demo/webtest/frames/frame_4"});
 await ParentFrame4?.locator("//input[@name='mytext4']").fill("Frame4");

 //Frame 5
 const ParentFrame5 = await page.frame({url : " https://ui.vision/demo/webtest/frames/frame_5"});
 await ParentFrame5?.locator("//input[@name='mytext5']").fill("Frame5");

});


Then('I upload single file', async function () {
  //await page.goto("https://testautomationpractice.blogspot.com/");
  await page.getByText("Upload Files").scrollIntoViewIfNeeded();
  let singleFile = await page.locator("input#singleFileInput");
  //upload single File
  await singleFile.setInputFiles(["./screenshot/Before.png"]);
  await page.getByText("Upload Single File").click();

  // Clearing the selected files
  await singleFile.setInputFiles([]);
  
});

Then('I upload multiple files', async function () {
  //await page.goto("https://testautomationpractice.blogspot.com/");
  await page.getByText("Upload Files").scrollIntoViewIfNeeded();
  let multipleFile = await page.locator("input#multipleFilesInput");
  //upload multiple File
  await multipleFile.setInputFiles(["./screenshot/Before.png", "./screenshot/after.png"]);
  await page.getByText("Upload Multiple Files").click();
});

