@E2E

Feature: Validate in Test automation website
@ecommerce
Scenario: Ecommerce site
  Given I Launch Browser
  When  I Navigate to the url
  Then  Assert Title and URL and took Screenshot
  Then  Click on the Register Button