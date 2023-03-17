-- CreateTable
CREATE TABLE "WebService" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "WebServiceStatus" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "web_service_id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    CONSTRAINT "WebServiceStatus_web_service_id_fkey" FOREIGN KEY ("web_service_id") REFERENCES "WebService" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
