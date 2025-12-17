import { Plugin } from "obsidian";

import {
  DEFAULT_SETTINGS,
  FontIconsPluginSettings,
  FontIconsSettingTab,
} from "./settings";

export default class FontIconsPlugin extends Plugin {
  settings: FontIconsPluginSettings;

  async onload() {
    await this.loadSettings();

    this.addSettingTab(new FontIconsSettingTab(this.app, this));
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
