import path from 'path';
import fs from 'fs-extra';
import chalk from 'chalk';
import { isEqual } from 'lodash';
import writeJson from 'yoshi-common/build/write-json';
import { LoadGraphResult } from './load-package-graph';

export default async function verifyTypeScriptReferences({
  graph,
}: LoadGraphResult): Promise<void> {
  await Promise.all(
    Array.from(graph).map(async ([, pkg]) => {
      const tsconfigPath = path.join(pkg.location, 'tsconfig.json');
      const tsconfig = await fs.readJSON(tsconfigPath);
      const references = Array.from(pkg.localDependencies)
        .map(([depName]) => {
          return path.relative(pkg.location, graph.get(depName)!.location);
        })
        .sort()
        .map((relativePath) => ({ path: relativePath }));

      const originalReferencesSorted = [
        ...(tsconfig.references || []),
      ].sort((a, b) => (a.path > b.path ? 1 : -1));

      // Only update `tsconfig` and show a message if an update is needed
      if (isEqual(references, originalReferencesSorted)) {
        return;
      }

      const clonedTsconfig = { ...tsconfig, references };
      // Don't write empty references
      if (clonedTsconfig.references.length === 0) {
        delete clonedTsconfig.references;
      }

      console.log(
        chalk.bold(
          `Changes have been made to the references of ${chalk.cyan(
            path.relative(process.cwd(), tsconfigPath),
          )}.`,
        ),
      );

      writeJson(tsconfigPath, clonedTsconfig);
    }),
  );

  console.log();
}
