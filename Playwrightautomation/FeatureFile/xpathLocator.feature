
Feature: Validate Xpath in Test automation website

@Xpathlocators
Scenario: Verify Xpath in Test automation website
    Given Launch the Browser
    When I Navigate to the Automation WebSite
    Then I enter the Name using Xpath
    Then I enter the Email using Xpath
    Then I Click the Start Button using Xpath
    Then I Click the Male Radio Button using Xpath
    Then I Select the Sunday, Tuesday and Thrusday using Xpath
    Then I Print the description of the page
    Then I Locate the Element using Parent,preceding,following,following-sibling
    Then Select Country Static DropDown
    Then Select Color Dynamic Dropdown
    Then Drag and Drop
    Then Take screenshot 
