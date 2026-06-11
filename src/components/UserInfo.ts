import type { UserInfoData } from "../types/types";

export class UserInfo {
  private nameElement: HTMLElement;
  private descriptionElement: HTMLElement;
  constructor({ nameSelector, descriptionSelector }: UserInfoData) {
    this.nameElement = document.querySelector(nameSelector) as HTMLElement;
    this.descriptionElement = document.querySelector(
      descriptionSelector,
    ) as HTMLElement;
  }
  public getUserInfo(): { name: string; description: string } {
    return {
      name: this.nameElement.textContent || "",
      description: this.descriptionElement.textContent || "",
    };
  }
  public setUserInfo({
    name,
    description,
  }: {
    name: string;
    description: string;
  }): void {
    this.nameElement.textContent = name;
    this.descriptionElement.textContent = description;
  }
}
