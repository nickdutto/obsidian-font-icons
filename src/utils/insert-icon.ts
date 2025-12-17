import { Editor, App } from "obsidian";
import { IconData } from "../types";
import { FontIconsPluginSettings } from "../settings";

export interface IconPickerOptions {
  copyMode?: boolean;
}

export async function selectIcon(
  editor: Editor,
  app: App,
  settings: FontIconsPluginSettings,
  icon: IconData,
  options?: IconPickerOptions
) {
  try {
    if (options?.copyMode) {
      await navigator.clipboard.writeText(icon.char);
      app.workspace.trigger("show-notice", "Icon copied to clipboard");
    } else {
      const text = icon.char + (settings.addSpace ? " " : "");
      const cursor = editor.getCursor();
      const newCursor = {
        line: cursor.line,
        ch: cursor.ch + text.length,
      };

      editor.replaceRange(text, cursor);
      editor.setCursor(newCursor);
    }
  } catch (error) {
    app.workspace.trigger(
      "show-notice",
      `Failed to ${options?.copyMode ? "copy" : "insert"} icon: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}
