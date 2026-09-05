import prisma from "../src/prisma.ts";

function getExtentionIcon(url: string): string {
  const itemName = new URL(url).searchParams.get("itemName")!;
  const [publisher, ...rest] = itemName?.split(".");
  const extensionName = rest.join(".");
  return `https://${publisher}.gallery.vsassets.io/_apis/public/gallery/publisher/${publisher}/extension/${extensionName}/latest/assetbyname/Microsoft.VisualStudio.Services.Icons.Default`;
}

const extensions = [
  {
    title: "Auto Close Tag",
    description: "Automatically closes HTML and XML tags as you type.",
    url: "https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag",
  },
  {
    title: "Auto Rename Tag",
    description:
      "Renames the matching closing tag when you edit an opening tag.",
    url: "https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag",
  },
  {
    title: "Dobri Next",
    description: "Collection of dark color themes and icon packs for VS Code.",
    url: "https://marketplace.visualstudio.com/items?itemName=sldobri.bunker",
  },
  {
    title: "Charkoal",
    description: "Diagrams your codebase as connected visual notes.",
    url: "https://marketplace.visualstudio.com/items?itemName=Charkoal.charkoal",
  },
  {
    title: "Code Background",
    description: "Sets a custom background image inside the VS Code editor.",
    url: "https://marketplace.visualstudio.com/items?itemName=Katsute.code-background",
  },
  {
    title: "CSS Peek",
    description:
      "Jump to CSS class and ID definitions directly from your HTML.",
    url: "https://marketplace.visualstudio.com/items?itemName=pranaygp.vscode-css-peek",
  },
  {
    title: "Draw.io Integration",
    description: "Edit and preview draw.io diagrams directly inside VS Code.",
    url: "https://marketplace.visualstudio.com/items?itemName=hediet.vscode-drawio",
  },
  {
    title: "Error Lens",
    description:
      "Highlights errors and warnings inline, right next to the code.",
    url: "https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens",
  },
  {
    title: "ESLint",
    description:
      "Integrates ESLint into VS Code for real-time JavaScript linting.",
    url: "https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint",
  },
  {
    title: "Filetree Pro",
    description:
      "Generates a project's file and folder structure as a shareable tree.",
    url: "https://marketplace.visualstudio.com/items?itemName=0xTanzim.filetree-pro",
  },
  {
    title: "Five Server",
    description: "Live-reloading local dev server, an upgrade to Live Server.",
    url: "https://marketplace.visualstudio.com/items?itemName=yandeu.five-server",
  },
  {
    title: "Git Graph",
    description:
      "Visualizes your Git commit history and branches as an interactive graph.",
    url: "https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph",
  },
  {
    title: "GitLens",
    description:
      "Supercharges Git within VS Code with blame, history, and comparisons.",
    url: "https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens",
  },
  {
    title: "Indent Rainbow",
    description:
      "Adds rainbow colors to indentation levels for better code readability.Colorizes indentation levels to make nested code easier to read.",
    url: "https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow",
  },
  {
    title: "JSON Crack",
    description: "Visualizes JSON files as an interactive node graph.",
    url: "https://marketplace.visualstudio.com/items?itemName=AykutSarac.jsoncrack-vscode",
  },
  {
    title: "Live Share",
    description:
      "Real-time collaborative editing and debugging with teammates.",
    url: "https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare",
  },
  {
    title: "Path Intellisense",
    description: "Autocompletes filenames and paths as you type.",
    url: "https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense",
  },
  {
    title: "Prettier",
    description:
      "Opinionated code formatter that keeps style consistent automatically.",
    url: "https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode",
  },
  {
    title: "Quokka.js",
    description: "Live scratchpad showing JS/TS results inline as you type.",
    url: "https://marketplace.visualstudio.com/items?itemName=WallabyJs.quokka-vscode",
  },
  {
    title: "Rainbow CSV",
    description:
      "Highlights CSV and TSV columns in different colors for readability.",
    url: "https://marketplace.visualstudio.com/items?itemName=mechatroner.rainbow-csv",
  },
  {
    title: "Reload",
    description: "Reloads the VS Code window quickly without restarting.",
    url: "https://marketplace.visualstudio.com/items?itemName=natqe.reload",
  },
  {
    title: "Todo Highlight",
    description: "Highlights TODO, FIXME, and other custom comment tags.",
    url: "https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight",
  },
  {
    title: "VSC Icons",
    description: "Adds file and folder icons by file type to the explorer.",
    url: "https://marketplace.visualstudio.com/items?itemName=yusifaliyevpro.vscicons",
  },
];

for (const extension of extensions) {
  await prisma.resource.create({
    data: {
      ...extension,
      type: "Extensions",
      logo: getExtentionIcon(extension.url),
    },
  });
}
