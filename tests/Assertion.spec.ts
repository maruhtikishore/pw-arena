import test, { expect } from "playwright/test";


test.only("Hard Assertion", async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    await expect(page).toHaveTitle("Automation Testing Practice");
    await expect(page).toHaveURL("https://testautomationpractice.blogspot.com/");
    await expect(page.getByText("Data Entry Form")).toBeVisible();
    await page.getByPlaceholder("Enter Name").fill("Kishore M");
    await expect(page.locator("button.start")).toBeEnabled();
    await page.locator("button.start").click();
    await expect(page.locator("button.stop")).toHaveAttribute("name","stop");
   // await expect(page.locator("button.stop")).toHaveAttribute("class","start");
    let checkbox= await page.locator("label.form-check-label").all();
    let value = await checkbox.length; //9
    // console.log("Total Chekcbox count: ", value);
    await expect(page.locator("label.form-check-label")).toHaveCount(9);
    await expect(page.getByText("Days:")).toHaveText("Days:");
    await expect(page.locator("//span[contains(text(),'For Selenium')]")).toContainText("For");
})

test("Soft Assertion", async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    await expect.soft(page).toHaveTitle("Automation Testing Practice");
    await expect.soft(page).toHaveURL("https://testautomationpractice.blogspot.com/");
    await expect.soft(page.getByText("Data Entry Form")).toBeVisible();
    await page.getByPlaceholder("Enter Name").fill("Kishore M");
    await expect.soft(page.locator("button.start")).toBeEnabled();
    await page.locator("button.start").click();
    await expect.soft(page.locator("button.stop")).toHaveAttribute("name","stop");
    await expect(page.locator("button.stop")).toHaveAttribute("class","start");
    let checkbox= await page.locator("label.form-check-label").all();
    let value = await checkbox.length; //9
    // console.log("Total Chekcbox count: ", value);
    await expect.soft(page.locator("label.form-check-label")).toHaveCount(9);
    await expect.soft(page.getByText("Days:")).toHaveText("Days:");
    await expect.soft(page.locator("//span[contains(text(),'For Selenium')]")).toContainText("For");
})