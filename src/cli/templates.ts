export function renderHeader(header: string): string {
  return `${header}\n`;
}

export function renderDocComment(lines: string[]): string {
  if (lines.length === 0) {
    return '';
  }

  return ['/**', ...lines.map((line) => ` * ${line}`), ' */'].join('\n');
}

export function renderNamedTypeExports(typeNames: string[], source: string): string {
  if (typeNames.length === 0) {
    return '';
  }

  return `export type { ${typeNames.join(', ')} } from ${JSON.stringify(source)};`;
}
