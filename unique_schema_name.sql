CREATE TABLE "users" (
  "id" int PRIMARY KEY,
  "firstName" varchar NOT NULL,
  "lastName" varchar NOT NULL,
  "email" varchar UNIQUE NOT NULL,
  "username" varchar UNIQUE NOT NULL,
  "hashedPassword" varchar NOT NULL
);

CREATE TABLE "notebooks" (
  "id" int PRIMARY KEY,
  "name" varchar NOT NULL DEFAULT 'Untitled',
  "color" varchar,
  "notes" text,
  "userId" int
);

CREATE TABLE "notes" (
  "id" int PRIMARY KEY,
  "name" varchar,
  "content" text,
  "public" bool DEFAULT 'false',
  "userId" int,
  "notebookId" int,
  "createdAt" datetime,
  "updatedAt" datetime
);

CREATE TABLE "user_note" (
  "userId" int,
  "noteId" int,
  "editPriv" bool DEFAULT 'false'
);

ALTER TABLE "notebooks" ADD FOREIGN KEY ("userId") REFERENCES "users" ("id");

ALTER TABLE "notes" ADD FOREIGN KEY ("notebookId") REFERENCES "notebooks" ("id");

ALTER TABLE "notes" ADD FOREIGN KEY ("userId") REFERENCES "users" ("id");

CREATE TABLE "users_user_note" (
  "users_id" int,
  "user_note_userId" int,
  PRIMARY KEY ("users_id", "user_note_userId")
);

ALTER TABLE "users_user_note" ADD FOREIGN KEY ("users_id") REFERENCES "users" ("id");

ALTER TABLE "users_user_note" ADD FOREIGN KEY ("user_note_userId") REFERENCES "user_note" ("userId");


CREATE TABLE "notes_user_note" (
  "notes_id" int,
  "user_note_noteId" int,
  PRIMARY KEY ("notes_id", "user_note_noteId")
);

ALTER TABLE "notes_user_note" ADD FOREIGN KEY ("notes_id") REFERENCES "notes" ("id");

ALTER TABLE "notes_user_note" ADD FOREIGN KEY ("user_note_noteId") REFERENCES "user_note" ("noteId");

