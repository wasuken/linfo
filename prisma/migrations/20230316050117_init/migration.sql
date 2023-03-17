/*
  Warnings:

  - You are about to drop the column `web_service_id` on the `WebServiceStatus` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `WebService` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `WebServiceStatus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `webServiceId` to the `WebServiceStatus` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WebService" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_WebService" ("description", "id", "name", "url") SELECT "description", "id", "name", "url" FROM "WebService";
DROP TABLE "WebService";
ALTER TABLE "new_WebService" RENAME TO "WebService";
CREATE TABLE "new_WebServiceStatus" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "webServiceId" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "WebServiceStatus_webServiceId_fkey" FOREIGN KEY ("webServiceId") REFERENCES "WebService" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_WebServiceStatus" ("id", "status") SELECT "id", "status" FROM "WebServiceStatus";
DROP TABLE "WebServiceStatus";
ALTER TABLE "new_WebServiceStatus" RENAME TO "WebServiceStatus";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
