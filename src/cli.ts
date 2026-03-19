#!/usr/bin/env node

import { runCli } from './cli/index';

runCli().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : 'Unknown CLI error.';
  console.error(`[eelzap-codegen] ${message}`);
  process.exitCode = 1;
});
