CREATE TABLE "heroes" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"gender" char(1),
	"age" integer,
	"hero_level" char(1) NOT NULL,
	"hero_rank" integer,
	"description" text
);
--> statement-breakpoint
CREATE TABLE "monsters" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"danger_level" char(1) NOT NULL,
	"description" text,
	"kill_by" integer
);
--> statement-breakpoint
ALTER TABLE "monsters" ADD CONSTRAINT "monsters_kill_by_heroes_id_fk" FOREIGN KEY ("kill_by") REFERENCES "public"."heroes"("id") ON DELETE no action ON UPDATE no action;