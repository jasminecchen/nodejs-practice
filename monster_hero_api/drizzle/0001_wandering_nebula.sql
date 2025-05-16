ALTER TABLE "monsters" DROP CONSTRAINT "monsters_kill_by_heroes_id_fk";
--> statement-breakpoint
ALTER TABLE "monsters" ADD CONSTRAINT "fk_kill_by" FOREIGN KEY ("kill_by") REFERENCES "public"."heroes"("id") ON DELETE set null ON UPDATE restrict;