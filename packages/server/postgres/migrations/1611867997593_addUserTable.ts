/* eslint-disable @typescript-eslint/camelcase */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  // const emailRe = '^[a-zA-Z0-9.!#$%&\'\'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$'
  // const emailCharLimit = 320

  pgm.sql(`
    CREATE EXTENSION citext;
    CREATE DOMAIN email AS citext
      CHECK (VALUE ~ '^[a-zA-Z0-9.!#$%&''*+/=?^_\`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$')
      CHECK (CHAR_LENGTH(VALUE) <= 320);

    CREATE TYPE "TierEnum" AS ENUM (
      'personal',
      'pro',
      'enterprise'
    );

    CREATE TYPE "AuthTokenRole" AS ENUM (
      'su'
    );

    CREATE TABLE "User" (
      id VARCHAR(100) PRIMARY KEY,
      email EMAIL UNIQUE NOT NULL,
      "createdAt" TIMESTAMP NOT NULL,
      "updatedAt" TIMESTAMP NOT NULL,
      "inactive" BOOLEAN DEFAULT FALSE,
      "lastSeenAt" TIMESTAMP,
      "preferredName" VARCHAR(100) NOT NULL,
      tier "TierEnum" DEFAULT 'personal',
      picture VARCHAR(255) NOT NULL,
      tms JSONB DEFAULT '[]'::jsonb,
      "featureFlags" JSONB DEFAULT '[]'::jsonb,
      identities JSONB DEFAULT '[]'::jsonb,
      "lastSeenAtURLs" JSONB,
      "segmentId" VARCHAR(100),
      "newFeatureId" VARCHAR(100),
      "overLimitCopy" VARCHAR(500),
      "isRemoved" BOOLEAN DEFAULT FALSE,
      "reasonRemoved" VARCHAR(2000),
      rol "AuthTokenRole",
      "payLaterClickCount" SMALLINT
    );
  `, {})
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(`
    DROP DOMAIN email;
    DROP TYPE "TierEnum";
    DROP TYPE "AuthTokenRole";
    DROP TABLE "User";
  `)
}
