import { test, expect } from '@playwright/test';

test.describe("Dialog and Alerts", () => {
  test("Simple Alert", async ({ page }) => {
    await page.goto("https://letcode.in/alert");
    page.once('dialog', async (dialog) => {
      await dialog.accept();
    })
    await page.locator("button#accept").click();
  })
  test("Dismiss and Print", async({page}) =>{
    await page.goto("https://letcode.in/alert");
    page.once('dialog', async(dialog) =>
    {
      await dialog.dismiss();
      let response = await page.locator("//div[@class='mt-3 text-xs text-slate-500']");
      await expect(response).toHaveText("User selected: Cancel (False)");
    })
    await page.click("button#confirm");
  })

   test("Accept and Print", async({page}) =>{
    await page.goto("https://letcode.in/alert");
    page.once('dialog', async(dialog) =>
    {
      await dialog.accept();
      let response = await page.locator("//div[@class='mt-3 text-xs text-slate-500']");
      await expect(response).toHaveText("User selected: OK (True)");
    })
    await page.click("button#confirm")
  })

  test("Prompt Dialog", async({page})=>
  {
    await page.goto("https://letcode.in/alert");
    page.once('dialog', async(dialog) =>
    {
      await dialog.accept("Kishore M");
      let response = await page.locator("p#myName");
      await expect(response).toHaveText("Your name is: Kishore M")
    })
    await page.click("button#prompt")
  })
})