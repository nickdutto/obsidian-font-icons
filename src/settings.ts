import { App, PluginSettingTab, Setting } from "obsidian";
import FontIconsPlugin from "src/main";

export interface FontIconsPluginSettings {
  addSpace: boolean;
}

export const DEFAULT_SETTINGS: FontIconsPluginSettings = {
  addSpace: true,
};

export class FontIconsSettingTab extends PluginSettingTab {
  plugin: FontIconsPlugin;

  constructor(app: App, plugin: FontIconsPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    new Setting(containerEl)
      .setName("Add space after icon")
      .setDesc("Automatically add a space after inserting the icon")
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.addSpace)
          .onChange(async (value) => {
            this.plugin.settings.addSpace = value;
            await this.plugin.saveData(this.plugin.settings);
          })
      );
  }
}
