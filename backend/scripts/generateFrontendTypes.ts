import { Type } from "../src/generated/prisma/enums.ts";
import fs from "fs";

function generateFrontendTypes(enumValues: typeof Type): string {
  const entries = Object.entries(enumValues).reduce((acc, [key, value]) => {
    return acc + `  ${key}: "${value}",\n`;
  }, "");

  return `export const Type = {\n${entries}} as const;\n\nexport type Type = (typeof Type)[keyof typeof Type];\n`;
}

const frontendType = generateFrontendTypes(Type);
fs.writeFileSync("../frontend/src/lib/generatedType.ts", frontendType);
console.log("Frontend Type generated successfully.");
