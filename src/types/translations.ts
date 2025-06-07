// Translation system types
export type TranslationObject = { [key: string]: string | TranslationObject };

export interface TranslationHookReturn {
  t: (key: string, placeholders?: Record<string, string | number>) => string;
  formatDate: (date: Date | string | number, format?: string) => string;
}
