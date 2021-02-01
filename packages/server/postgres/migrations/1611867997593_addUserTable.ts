/* eslint-disable @typescript-eslint/camelcase */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

/*
 todos:
 - try defining email as domain
 - try defining identities as domain,
   and then supply a custom type for it
 */

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(`
    CREATE TYPE "TierEnum" AS ENUM (
      'personal',
      'pro',
      'enterprise'
    );

    CREATE TYPE "AuthTokenRole" AS ENUM (
      'su'
    );

    CREATE DOMAIN "AuthTokenRoleDomain" AS "AuthTokenRole";
    CREATE DOMAIN "TierEnumDomain" AS "TierEnum";
    CREATE DOMAIN "AuthIdentities" AS "jsonb";
    CREATE DOMAIN "StringArray" AS "jsonb";

    CREATE EXTENSION citext;
    CREATE DOMAIN email AS citext
      CHECK (VALUE ~ '^[a-zA-Z0-9.!#$%&''*+/=?^_\`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$')
      CHECK (CHAR_LENGTH(VALUE) <= 320);

    CREATE TABLE "User" (
      id VARCHAR(100) PRIMARY KEY,
      email "email" UNIQUE NOT NULL,
      "createdAt" TIMESTAMP NOT NULL,
      "updatedAt" TIMESTAMP NOT NULL,
      "inactive" BOOLEAN NOT NULL DEFAULT FALSE,
      "lastSeenAt" TIMESTAMP,
      "preferredName" VARCHAR(100) NOT NULL,
      tier "TierEnumDomain" NOT NULL DEFAULT 'personal',
      picture VARCHAR(255) NOT NULL,
      tms "StringArray" NOT NULL DEFAULT '[]'::jsonb,
      "featureFlags" "StringArray" NOT NULL DEFAULT '[]'::jsonb,
      identities "AuthIdentities" NOT NULL DEFAULT '[]'::jsonb,
      "lastSeenAtURLs" "StringArray",
      "segmentId" VARCHAR(100),
      "newFeatureId" VARCHAR(100),
      "overLimitCopy" VARCHAR(500),
      "isRemoved" BOOLEAN NOT NULL DEFAULT FALSE,
      "reasonRemoved" VARCHAR(2000),
      rol "AuthTokenRoleDomain",
      "payLaterClickCount" SMALLINT
    );
  `)
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(`
    DROP TABLE "User";
    DROP DOMAIN "TierEnumDomain";
    DROP DOMAIN "AuthIdentities";
    DROP DOMAIN "StringArray";
    DROP DOMAIN "email";
    DROP DOMAIN "AuthTokenRoleDomain";
    DROP TYPE "TierEnum";
    DROP TYPE "AuthTokenRole";
    DROP EXTENSION "citext";
  `)
}
