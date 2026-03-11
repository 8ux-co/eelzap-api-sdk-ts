import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

export function updateCoverageBaseline({ currentPath, baselinePath } = {}) {
  const cwd = process.cwd();
  const resolvedCurrentPath = currentPath ?? path.join(cwd, 'coverage', 'coverage-summary.json');
  const resolvedBaselinePath = baselinePath ?? path.join(cwd, 'coverage-baseline.json');

  if (!fs.existsSync(resolvedCurrentPath)) {
    throw new Error(
      'Coverage summary not found. Run `npm run test:coverage` to generate coverage first.',
    );
  }

  fs.copyFileSync(resolvedCurrentPath, resolvedBaselinePath);
  return resolvedBaselinePath;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    updateCoverageBaseline();
    console.log('Updated coverage-baseline.json from coverage summary.');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
