import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const metrics = ['lines', 'functions', 'branches', 'statements'];
const round = (value) => Math.round(value * 100) / 100;

export function checkCoverage({ baselinePath, currentPath } = {}) {
  const cwd = process.cwd();
  const resolvedBaselinePath = baselinePath ?? path.join(cwd, 'coverage-baseline.json');
  const resolvedCurrentPath = currentPath ?? path.join(cwd, 'coverage', 'coverage-summary.json');

  if (!fs.existsSync(resolvedBaselinePath)) {
    throw new Error(
      'Coverage baseline not found. Run `npm run test:coverage:baseline` to create it.',
    );
  }

  if (!fs.existsSync(resolvedCurrentPath)) {
    throw new Error(
      'Coverage summary not found. Run `npm run test:coverage` to generate coverage first.',
    );
  }

  const baseline = JSON.parse(fs.readFileSync(resolvedBaselinePath, 'utf8'));
  const current = JSON.parse(fs.readFileSync(resolvedCurrentPath, 'utf8'));
  const failures = [];

  for (const metric of metrics) {
    const baselinePct = round(baseline.total?.[metric]?.pct ?? 0);
    const currentPct = round(current.total?.[metric]?.pct ?? 0);

    if (currentPct < baselinePct) {
      failures.push({ metric, baselinePct, currentPct });
    }
  }

  return failures;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const failures = checkCoverage();

    if (failures.length > 0) {
      console.error('Coverage dropped below baseline:');
      for (const { metric, baselinePct, currentPct } of failures) {
        console.error(`- ${metric}: ${currentPct}% < ${baselinePct}%`);
      }
      process.exit(1);
    }

    console.log('Coverage meets or exceeds baseline.');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
