export function extractDomain(email: string): string {
  const regex = /@(.+)/;
  const match = email.match(regex);
  return match ? match[1] : "";
}
