import { Locator, Page } from '@playwright/test';

export enum VisibilityOptions {
  VISIBLE = 'visible',
  HIDDEN = 'hidden'
}
export class BasePage {
  constructor(public page: Page) {
    this.page = page;
  }

  async clickElement(element: Locator) {
    try {
      const isElementVisible = await this.getElementVisibility(element);
      if (!isElementVisible) {
      }
      await this.waitForElementVisibility(element, VisibilityOptions.VISIBLE);
      await element.click();
    } catch (error) {
      throw new Error(`Element ${element} not found`);
    }
  }

  async fillText(element: Locator, text: string) {
    await this.clickElement(element);
    const elementHtmlTag = await element.evaluate(el => el.tagName.toLowerCase());
    if (elementHtmlTag === 'input' || elementHtmlTag === 'textarea') {
      await element.fill(text);
    } else {
      await element.pressSequentially(text);
    }
  }

  async hoverElement(element: Locator) {
    await this.waitForElementVisibility(element, VisibilityOptions.VISIBLE);
    await element.hover();
  }

  async countElements(element: Locator) {
    return await element.count();
  }

  async waitForElementVisibility(element: Locator, visibility: VisibilityOptions) {
    await element.waitFor({ state: visibility });
  }

  async getElementVisibility(element: Locator) {
    const isElementAList = await this.countElements(element);

    if (isElementAList > 1) {
      const elementList = await element.all();
      const visibilityChecks = await Promise.all(elementList.map(el => el.isVisible()));
      const visibilityResults = visibilityChecks.every(el => el === true);
      return visibilityResults
    }

    const isElementVisible = await element.isVisible();
    return isElementVisible;
  }

  async getElementInnerText(element: Locator) {
    const elementHtmlTag = await element.evaluate(el => el.tagName.toLowerCase());
    if (elementHtmlTag === 'input') {
      return (await element.inputValue()).trim();
    } else {
      return (await element.innerText()).trim();
    }
  }

  async clickAndChooseFromDropdownByText(dropdownLocator: Locator, dropdownList: Locator, dropdownItemText: string) {
    await this.clickElement(dropdownLocator);
    const dropdownListItems = await dropdownList.all();
    for (const item of dropdownListItems) {
      const itemText = (await item.innerText()).trim();
      if (itemText === dropdownItemText) {
        await this.clickElement(item);
        return;
      }
    }
    throw new Error(`Item ${dropdownItemText} not found in dropdown list`);
  }
}