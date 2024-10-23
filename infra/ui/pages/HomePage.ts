import { AddGameFieldNames } from "../helpers/enums/HomePageConsts";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  private homePageTabsContainer = this.page.locator('kb-soft-tabs');
  private gameCollectionContainer = this.page.locator('kb-game-collection');
  private gameCollectionCards = this.page.locator('.kb-card');
  private deleteGameTrashButtonLocator = this.page.locator('.delete-game');
  private editCollectionPencilLocator = this.gameCollectionContainer.locator('.edit-collection');
  private addGameLocator = this.page.locator('.add-game');
  private addNewGameContainer = this.page.locator('kb-add-game');


  async chooseGameLabelTab(label: string) {
    const tabLabel = this.homePageTabsContainer.getByLabel(label);
    await this.clickElement(tabLabel);
  }

  async addNewGameToCollection() {
    await this.clickElement(this.editCollectionPencilLocator);
    const addGameButton = this.gameCollectionContainer.locator(this.addGameLocator);
    await this.clickElement(addGameButton);
  }

  private async getAddNewGameFieldName(fieldNames: AddGameFieldNames) {
    const addGameContainer = this.addNewGameContainer
    const addGameInputFields = addGameContainer.locator(`[id="${fieldNames.valueOf()}"]`);
    return addGameInputFields;
  }

  /**
   *@description  this function is relevant for clicking on the edit pencil icon and on the check-mark done button
   */
  async editGameCollection() {
    await this.clickElement(this.editCollectionPencilLocator);
  }
  async deleteGameFromCollection(gameCardName: string) {
    await this.clickElement(this.editCollectionPencilLocator);
    const gameCard = this.gameCollectionContainer.locator(this.gameCollectionCards, { hasText: gameCardName });
    const deleteGameButton = gameCard.locator(this.deleteGameTrashButtonLocator);
    await this.clickElement(deleteGameButton);
  }

  async getGameCollectionCardCount() {
    await this.countElements(this.gameCollectionCards);
  }

  async getDeleteGameTrashButtonCount() {
    await this.countElements(this.deleteGameTrashButtonLocator);
  }

  async getDeleteGameTrashButtonVisibility() {
    await this.getElementVisibility(this.deleteGameTrashButtonLocator);
  }

  private async addGameTitle() {

  }

  private async rateCommunityStarRating() {

  }

  private async clearCommunityStarRating() {

  }
}

