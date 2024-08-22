#!/usr/bin/env bun
import { mkdir, writeFile, readFile, access } from "fs/promises";
import { join, resolve } from "path";
import { constants } from "fs";
import { ErrorLike } from "bun";

interface AlgorithmInfo {
  week: number;
  difficulty: "easy" | "advanced";
  name: string;
  description?: string;
}

function createFileContent(description?: string): string {
  if (description) {
    return `/**\n * ${description}\n */\n\n`;
  }
  return "";
}

async function fileExists(path: string): Promise<boolean> {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function createAlgorithmFile(
  weekNumber: number,
  difficulty: string,
  algorithmName: string,
  description?: string
): Promise<void> {
  const baseDir = process.cwd();
  const weekDir = `week${weekNumber}`;
  const resolvedPath = resolve(baseDir, weekDir, difficulty);
  const mainFilePath = join(resolvedPath, `${algorithmName}.ts`);
  const testFilePath = join(resolvedPath, `${algorithmName}.test.ts`);

  if ((await fileExists(mainFilePath)) || (await fileExists(testFilePath))) {
    console.log(`Skipping ${algorithmName}: Files already exist.`);
    return;
  }

  await mkdir(resolvedPath, { recursive: true });

  const fileContent = createFileContent(description);
  await writeFile(mainFilePath, fileContent);
  await writeFile(testFilePath, fileContent);

  console.log(`Created files for ${algorithmName}:`);
  console.log(`  ${mainFilePath}`);
  console.log(`  ${testFilePath}`);

  await updatePackageJson(weekNumber, difficulty, algorithmName);
}

async function updatePackageJson(
  weekNumber: number,
  difficulty: string,
  algorithmName: string
): Promise<void> {
  const packageJsonPath = "package.json";

  try {
    let packageJson: any = {};
    try {
      const packageJsonContent = await readFile(packageJsonPath, "utf-8");
      packageJson = JSON.parse(packageJsonContent);
    } catch (error) {
      console.warn("package.json not found. Creating a new one.");
    }

    if (!packageJson.scripts) {
      packageJson.scripts = {};
    }

    const testPath = `week${weekNumber}/${difficulty}/${algorithmName}.test.ts`;
    const scriptName = `test:week${weekNumber}-${difficulty}-${algorithmName}`;

    if (!packageJson.scripts[scriptName]) {
      packageJson.scripts[scriptName] = `bun test ${testPath}`;
      packageJson.scripts["caf"] = "bun run create_algorithm_files.ts";

      await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
      console.log(`Updated package.json with new script '${scriptName}'`);
    }
  } catch (error: any) {
    console.error("Failed to update package.json:", error.message);
  }
}

async function batchCreateAlgorithms(jsonFilePath: string): Promise<void> {
  try {
    const fileContent = await readFile(jsonFilePath, "utf-8");
    const algorithms: AlgorithmInfo[] = JSON.parse(fileContent);

    for (const algo of algorithms) {
      if (!algo.week || !algo.difficulty || !algo.name) {
        console.error(
          `Invalid algorithm info: ${JSON.stringify(algo)}. Skipping...`
        );
        continue;
      }

      if (algo.difficulty !== "easy" && algo.difficulty !== "advanced") {
        console.error(
          `Invalid difficulty for ${algo.name}: ${algo.difficulty}. Skipping...`
        );
        continue;
      }

      await createAlgorithmFile(
        algo.week,
        algo.difficulty,
        algo.name,
        algo.description
      );
    }

    console.log("Batch creation completed.");
  } catch (error: any) {
    console.error("An error occurred during batch creation:", error.message);
  }
}

function printHelp() {
  console.log("Usage:");
  console.log(
    "  caf <week> <difficulty> <name> [description]    Create a single algorithm file"
  );
  console.log(
    "  caf -batch <jsonFilePath>                       Batch create algorithm files from JSON"
  );
  console.log(
    "  caf -help                                       Show this help message"
  );
  console.log("\nExamples:");
  console.log('  caf 1 easy TwoSum "Find two numbers that add up to a target"');
  console.log("  caf -batch algorithms.json");
}

async function main() {
  const args = Bun.argv.slice(2); // Remove 'bun' and script name from args

  if (args.length === 0 || args[0] === "-help") {
    printHelp();
    return;
  }

  if (args[0] === "-batch") {
    if (args.length !== 2) {
      console.error("Error: -batch option requires a JSON file path.");
      printHelp();
      return;
    }
    await batchCreateAlgorithms(args[1]);
  } else if (args.length >= 3) {
    const [week, difficulty, name, ...descriptionParts] = args;
    const description = descriptionParts.join(" ");
    if (
      isNaN(Number(week)) ||
      (difficulty !== "easy" && difficulty !== "advanced")
    ) {
      console.error("Error: Invalid arguments for single algorithm creation.");
      printHelp();
      return;
    }
    await createAlgorithmFile(Number(week), difficulty, name, description);
  } else {
    console.error("Error: Invalid number of arguments.");
    printHelp();
  }
}

main();
