/** Replaces `{key}` placeholders in a translation template. */
export function interpolate(
  template: string,
  params: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (_match, key: string) => {
    const value = params[key];
    return value === undefined || value === null ? '' : String(value);
  });
}
