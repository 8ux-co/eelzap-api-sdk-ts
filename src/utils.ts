import type { ClientDefaults, CommonRequestOptions, QueryPrimitive } from './types/common';
import type { ItemFilters } from './types/items';

export function normalizeBaseUrl(baseUrl: string): string {
  return baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
}

export function toArrayParam(values: string[] | undefined): string | undefined {
  return values && values.length > 0 ? values.join(',') : undefined;
}

export function mergeRequestOptions<T extends CommonRequestOptions>(
  defaults: ClientDefaults,
  options?: T,
): T {
  return {
    ...defaults,
    ...options,
  } as T;
}

export function cleanParams(
  params: Record<string, QueryPrimitive | undefined>,
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(params).flatMap(([key, value]) => {
      return value === undefined ? [] : [[key, String(value)]];
    }),
  );
}

function isOperatorMap(
  value: ItemFilters[string],
): value is Exclude<ItemFilters[string], QueryPrimitive> {
  return typeof value === 'object' && !Array.isArray(value);
}

export function serializeFilters(filters?: ItemFilters): Record<string, string> {
  if (!filters) {
    return {};
  }

  return Object.entries(filters).reduce<Record<string, string>>((acc, [field, value]) => {
    if (!isOperatorMap(value)) {
      acc[`filter[${field}]`] = String(value);
      return acc;
    }

    for (const [operator, operatorValue] of Object.entries(value)) {
      if (operatorValue === undefined) {
        continue;
      }

      const serializedValue = Array.isArray(operatorValue)
        ? operatorValue.join(',')
        : String(operatorValue);
      acc[`filter[${field}][${operator}]`] = serializedValue;
    }

    return acc;
  }, {});
}

export function maskApiKey(apiKey: string): string {
  if (apiKey.length <= 8) {
    return '***';
  }

  return `${apiKey.slice(0, 4)}...${apiKey.slice(-4)}`;
}
