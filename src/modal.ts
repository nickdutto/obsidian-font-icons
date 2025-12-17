// modal.ts
import { App, FuzzySuggestModal, FuzzyMatch, renderMatches } from "obsidian";
import { NERD_FONT_ICONS } from "./icons/nerd-font";
import { IconData } from "./types";

export class NerdFontModal extends FuzzySuggestModal<IconData> {
  onChoose: (result: IconData) => void;

  constructor(app: App, onChoose: (result: IconData) => void) {
    super(app);
    this.onChoose = onChoose;

    this.setPlaceholder("Search for a Nerd Font icon...");
  }

  getItems(): IconData[] {
    return NERD_FONT_ICONS;
  }

  getItemText(item: IconData): string {
    return item.name;
  }

  renderSuggestion(match: FuzzyMatch<IconData>, el: HTMLElement): void {
    const item = match.item;

    el.addClass("nerd-font-suggestion-item");

    const iconSpan = el.createSpan({ cls: "nerd-font-glyph" });
    iconSpan.setText(item.char);
    iconSpan.style.marginRight = "10px";
    iconSpan.style.fontFamily = "inherit";

    const nameSpan = el.createSpan();
    renderMatches(nameSpan, item.name, match.match.matches);
  }

  onChooseItem(item: IconData): void {
    this.onChoose(item);
  }
}
