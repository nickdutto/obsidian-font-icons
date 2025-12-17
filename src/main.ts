import { Editor, MarkdownView, Plugin } from "obsidian";

import {
  DEFAULT_SETTINGS,
  FontIconsPluginSettings,
  FontIconsSettingTab,
} from "./settings";
import { NerdFontModal } from "~/modal";
import { selectIcon } from "~/utils/insert-icon";

export default class FontIconsPlugin extends Plugin {
  settings: FontIconsPluginSettings;

  async onload() {
    await this.loadSettings();

    this.addSettingTab(new FontIconsSettingTab(this.app, this));

    await this.addInsertNerdFontIconCommand();
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  async addInsertNerdFontIconCommand() {
    this.addCommand({
      id: "font-icon-insert-nerd-font",
      name: "Insert Nerd Font Icon",
      editorCallback: (editor: Editor, view: MarkdownView) => {
        try {
          if (!(view instanceof MarkdownView)) return;
          new NerdFontModal(this.app, (selectedIcon) => {
            selectIcon(editor, this.app, this.settings, selectedIcon);
          }).open();
        } catch (error) {
          this.app.workspace.trigger(
            "show-notice",
            `Failed to open icon modal: ${
              error instanceof Error ? error.message : String(error)
            }`
          );
        }
      },
    });
  }
}
