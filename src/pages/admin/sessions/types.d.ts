export interface Session {
  id: string; // Guid
  description: string;

  createdAtUtc: string; // ISO DateTime
  expiresAtUtc: string; // ISO DateTime

  isRevoked: boolean;
  revokedAtUtc: string | null;

  accessCount: number;
  lastAccessedAtUtc: string | null;
}
