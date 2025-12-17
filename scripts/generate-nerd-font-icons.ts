// Downloads nerd font icons JSON and writes a TypeScript file exporting NERD_FONT_ICONS

import fs from "fs";
import path from "path";
import https from "https";
import { fileURLToPath } from "url";

interface NerdFontIcon {
  char: string;
}

const url =
  "https://raw.githubusercontent.com/ryanoasis/nerd-fonts/refs/heads/master/glyphnames.json";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputPath = path.join(__dirname, "../src/icons/nerd-font.ts");

https
  .get(url, (res) => {
    let data = "";
    res.on("data", (chunk) => {
      data += chunk;
    });
    res.on("end", () => {
      const icons = JSON.parse(data);
      const NERD_FONT_ICONS = Object.entries(icons)
        .filter(([name]) => name !== "METADATA")
        .map(([name, icon]) => ({
          name,
          char: (icon as NerdFontIcon).char,
        }));

      const fileContent = `import { IconData } from "~/types";

export const NERD_FONT_ICONS: IconData[] = ${JSON.stringify(
        NERD_FONT_ICONS,
        null,
        2
      )};
`;

      fs.writeFileSync(outputPath, fileContent, "utf-8");
      console.log(`Converted ${NERD_FONT_ICONS.length} icons to ${outputPath}`);
    });
  })
  .on("error", (err) => {
    console.error("Error downloading JSON:", err);
  });
