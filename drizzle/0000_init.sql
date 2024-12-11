CREATE TABLE IF NOT EXISTS "ability" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"is_main_series" boolean NOT NULL,
	"generation_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ability_effect" (
	"language_id" integer NOT NULL,
	"resource_id" integer NOT NULL,
	"text" text NOT NULL,
	"short_text" text,
	"version_group_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ability_flavor_text" (
	"language_id" integer NOT NULL,
	"resource_id" integer NOT NULL,
	"version_group_id" integer NOT NULL,
	"text" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ability_name" (
	"language_id" integer NOT NULL,
	"resource_id" integer NOT NULL,
	"text" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "egg_group" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "egg_group_name" (
	"language_id" integer NOT NULL,
	"resource_id" integer NOT NULL,
	"text" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "generation" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "generation_name" (
	"language_id" integer NOT NULL,
	"resource_id" integer NOT NULL,
	"text" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "item" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"cost" integer NOT NULL,
	"fling_power" integer,
	"category_id" integer NOT NULL,
	"sprite" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "item_attribute" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "item_attribute_description" (
	"language_id" integer NOT NULL,
	"resource_id" integer NOT NULL,
	"text" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "item_attribute_name" (
	"language_id" integer NOT NULL,
	"resource_id" integer NOT NULL,
	"text" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "item_category" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"item_pocket_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "item_category_name" (
	"language_id" integer NOT NULL,
	"resource_id" integer NOT NULL,
	"text" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "item_effect" (
	"language_id" integer NOT NULL,
	"resource_id" integer NOT NULL,
	"text" text NOT NULL,
	"short_text" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "item_flavor_text" (
	"language_id" integer NOT NULL,
	"resource_id" integer NOT NULL,
	"version_group_id" integer NOT NULL,
	"text" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "item_fling_effect" (
	"language_id" integer NOT NULL,
	"resource_id" integer NOT NULL,
	"text" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "item_generation" (
	"item_id" integer NOT NULL,
	"generation_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "item_item_attribute" (
	"item_id" integer NOT NULL,
	"item_attribute_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "item_name" (
	"language_id" integer NOT NULL,
	"resource_id" integer NOT NULL,
	"text" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "item_pocket" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "item_pocket_name" (
	"language_id" integer NOT NULL,
	"resource_id" integer NOT NULL,
	"text" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "language" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"official" boolean NOT NULL,
	"iso639" text NOT NULL,
	"iso3166" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "language_name" (
	"id" serial PRIMARY KEY NOT NULL,
	"language_id" integer NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "location" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"region_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "location_area" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"location_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "location_area_name" (
	"language_id" integer NOT NULL,
	"resource_id" integer NOT NULL,
	"text" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "location_generation" (
	"location_id" integer NOT NULL,
	"generation_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "location_name" (
	"language_id" integer NOT NULL,
	"resource_id" integer NOT NULL,
	"text" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "move" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"type_id" integer NOT NULL,
	"accuracy" integer,
	"effect_chance" integer,
	"pp" integer,
	"priority" integer NOT NULL,
	"power" integer,
	"generation_id" integer NOT NULL,
	"damage_class" text NOT NULL,
	"target" text NOT NULL,
	"change_attack" integer,
	"change_defense" integer,
	"change_special_attack" integer,
	"change_special_defense" integer,
	"change_speed" integer,
	"change_accuracy" integer,
	"change_evasion" integer,
	"ailment" text,
	"category" text,
	"min_hits" integer,
	"max_hits" integer,
	"min_turns" integer,
	"max_turns" integer,
	"drain" integer,
	"healing" integer,
	"crit_rate" integer,
	"ailment_chance" integer,
	"flinch_chance" integer,
	"stat_chance" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "move_effect" (
	"language_id" integer NOT NULL,
	"resource_id" integer NOT NULL,
	"text" text NOT NULL,
	"short_text" text,
	"version_group_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "move_flavor_text" (
	"language_id" integer NOT NULL,
	"resource_id" integer NOT NULL,
	"version_group_id" integer NOT NULL,
	"text" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "move_learn_method" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "move_learn_method_description" (
	"language_id" integer NOT NULL,
	"resource_id" integer NOT NULL,
	"text" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "move_learn_method_name" (
	"language_id" integer NOT NULL,
	"resource_id" integer NOT NULL,
	"text" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "move_machine" (
	"move_id" integer NOT NULL,
	"item_id" integer NOT NULL,
	"version_group_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "move_name" (
	"language_id" integer NOT NULL,
	"resource_id" integer NOT NULL,
	"text" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "move_past_values" (
	"move_id" integer NOT NULL,
	"version_group_id" integer NOT NULL,
	"type_id" integer,
	"accuracy" integer,
	"effect_chance" integer,
	"pp" integer,
	"power" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pokedex" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"is_main_series" boolean NOT NULL,
	"region_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pokedex_description" (
	"language_id" integer NOT NULL,
	"resource_id" integer NOT NULL,
	"text" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pokedex_entry" (
	"pokedex_id" integer NOT NULL,
	"pokemon_species_id" integer NOT NULL,
	"entry_number" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pokedex_name" (
	"language_id" integer NOT NULL,
	"resource_id" integer NOT NULL,
	"text" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pokedex_version_group" (
	"pokedex_id" integer NOT NULL,
	"version_group_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pokemon" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"base_experience" integer NOT NULL,
	"height" real NOT NULL,
	"weight" real NOT NULL,
	"order" integer NOT NULL,
	"primary_type_id" integer NOT NULL,
	"secondary_type_id" integer,
	"species_id" integer NOT NULL,
	"base_hp" integer NOT NULL,
	"base_attack" integer NOT NULL,
	"base_defense" integer NOT NULL,
	"base_special_attack" integer NOT NULL,
	"base_special_defense" integer NOT NULL,
	"base_speed" integer NOT NULL,
	"ev_hp" integer NOT NULL,
	"ev_attack" integer NOT NULL,
	"ev_defense" integer NOT NULL,
	"ev_special_attack" integer NOT NULL,
	"ev_special_defense" integer NOT NULL,
	"ev_speed" integer NOT NULL,
	"front_default" text,
	"front_female" text,
	"front_shiny" text,
	"front_shiny_female" text,
	"back_default" text,
	"back_female" text,
	"back_shiny" text,
	"back_shiny_female" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pokemon_ability" (
	"pokemon_id" integer NOT NULL,
	"ability_id" integer NOT NULL,
	"is_hidden" boolean NOT NULL,
	"slot" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pokemon_form" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"pokemon_id" integer NOT NULL,
	"order" integer NOT NULL,
	"is_default" boolean NOT NULL,
	"is_battle_only" boolean NOT NULL,
	"is_mega" boolean NOT NULL,
	"version_group_id" integer NOT NULL,
	"primary_type_id" integer NOT NULL,
	"secondary_type_id" integer,
	"front_default" text,
	"front_female" text,
	"front_shiny" text,
	"front_shiny_female" text,
	"back_default" text,
	"back_female" text,
	"back_shiny" text,
	"back_shiny_female" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pokemon_form_name" (
	"language_id" integer NOT NULL,
	"resource_id" integer NOT NULL,
	"text" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pokemon_held_item" (
	"pokemon_id" integer NOT NULL,
	"item_id" integer NOT NULL,
	"version_id" integer NOT NULL,
	"rarity" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pokemon_move" (
	"pokemon_id" integer NOT NULL,
	"move_id" integer NOT NULL,
	"version_group_id" integer NOT NULL,
	"learn_method_id" integer,
	"learn_level" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pokemon_past_type" (
	"pokemon_id" integer NOT NULL,
	"generation_id" integer NOT NULL,
	"primary_type_id" integer NOT NULL,
	"secondary_type_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pokemon_species" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"order" integer NOT NULL,
	"gender_rate" integer NOT NULL,
	"capture_rate" integer NOT NULL,
	"base_happiness" integer,
	"is_baby" boolean NOT NULL,
	"is_legendary" boolean NOT NULL,
	"is_mythical" boolean NOT NULL,
	"hatch_counter" integer,
	"has_gender_differences" boolean NOT NULL,
	"forms_switchable" boolean NOT NULL,
	"growth_rate" text NOT NULL,
	"color" text NOT NULL,
	"shape" text NOT NULL,
	"evolves_from_pokemon_species_id" integer,
	"generation_id" integer NOT NULL,
	"habitat" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pokemon_species_egg_group" (
	"pokemon_species_id" integer NOT NULL,
	"egg_group_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pokemon_species_flavor_text" (
	"resource_id" integer NOT NULL,
	"version_id" integer NOT NULL,
	"language_id" integer NOT NULL,
	"text" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pokemon_species_genus" (
	"language_id" integer NOT NULL,
	"resource_id" integer NOT NULL,
	"text" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pokemon_species_name" (
	"language_id" integer NOT NULL,
	"resource_id" integer NOT NULL,
	"text" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pokemon_version_appearance" (
	"pokemon_id" integer NOT NULL,
	"version_id" integer NOT NULL,
	"front_default" text,
	"front_female" text,
	"back_default" text,
	"back_female" text,
	"front_shiny" text,
	"front_shiny_female" text,
	"back_shiny" text,
	"back_shiny_female" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "region" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"main_generation_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "region_name" (
	"language_id" integer NOT NULL,
	"resource_id" integer NOT NULL,
	"text" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "type" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"generation_id" integer NOT NULL,
	"damage_class" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "type_damage_relation" (
	"from_type_id" integer NOT NULL,
	"to_type_id" integer NOT NULL,
	"damage" real NOT NULL,
	"generation_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "type_name" (
	"language_id" integer NOT NULL,
	"resource_id" integer NOT NULL,
	"text" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "version" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"version_group_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "version_group" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"order" integer NOT NULL,
	"generation_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "version_group_region" (
	"version_group_id" integer NOT NULL,
	"region_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "version_name" (
	"language_id" integer NOT NULL,
	"resource_id" integer NOT NULL,
	"text" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ability" ADD CONSTRAINT "ability_generation_id_generation_id_fk" FOREIGN KEY ("generation_id") REFERENCES "public"."generation"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ability_effect" ADD CONSTRAINT "ability_effect_language_id_language_id_fk" FOREIGN KEY ("language_id") REFERENCES "public"."language"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ability_effect" ADD CONSTRAINT "ability_effect_resource_id_ability_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."ability"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ability_effect" ADD CONSTRAINT "ability_effect_version_group_id_version_group_id_fk" FOREIGN KEY ("version_group_id") REFERENCES "public"."version_group"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ability_flavor_text" ADD CONSTRAINT "ability_flavor_text_language_id_language_id_fk" FOREIGN KEY ("language_id") REFERENCES "public"."language"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ability_flavor_text" ADD CONSTRAINT "ability_flavor_text_resource_id_ability_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."ability"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ability_flavor_text" ADD CONSTRAINT "ability_flavor_text_version_group_id_version_group_id_fk" FOREIGN KEY ("version_group_id") REFERENCES "public"."version_group"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ability_name" ADD CONSTRAINT "ability_name_language_id_language_id_fk" FOREIGN KEY ("language_id") REFERENCES "public"."language"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ability_name" ADD CONSTRAINT "ability_name_resource_id_ability_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."ability"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "egg_group_name" ADD CONSTRAINT "egg_group_name_language_id_language_id_fk" FOREIGN KEY ("language_id") REFERENCES "public"."language"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "egg_group_name" ADD CONSTRAINT "egg_group_name_resource_id_egg_group_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."egg_group"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "generation_name" ADD CONSTRAINT "generation_name_language_id_language_id_fk" FOREIGN KEY ("language_id") REFERENCES "public"."language"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "generation_name" ADD CONSTRAINT "generation_name_resource_id_generation_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."generation"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "item" ADD CONSTRAINT "item_category_id_item_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."item_category"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "item_attribute_description" ADD CONSTRAINT "item_attribute_description_language_id_language_id_fk" FOREIGN KEY ("language_id") REFERENCES "public"."language"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "item_attribute_description" ADD CONSTRAINT "item_attribute_description_resource_id_item_attribute_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."item_attribute"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "item_attribute_name" ADD CONSTRAINT "item_attribute_name_language_id_language_id_fk" FOREIGN KEY ("language_id") REFERENCES "public"."language"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "item_attribute_name" ADD CONSTRAINT "item_attribute_name_resource_id_item_attribute_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."item_attribute"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "item_category" ADD CONSTRAINT "item_category_item_pocket_id_item_pocket_id_fk" FOREIGN KEY ("item_pocket_id") REFERENCES "public"."item_pocket"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "item_category_name" ADD CONSTRAINT "item_category_name_language_id_language_id_fk" FOREIGN KEY ("language_id") REFERENCES "public"."language"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "item_category_name" ADD CONSTRAINT "item_category_name_resource_id_item_category_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."item_category"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "item_effect" ADD CONSTRAINT "item_effect_language_id_language_id_fk" FOREIGN KEY ("language_id") REFERENCES "public"."language"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "item_effect" ADD CONSTRAINT "item_effect_resource_id_item_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."item"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "item_flavor_text" ADD CONSTRAINT "item_flavor_text_language_id_language_id_fk" FOREIGN KEY ("language_id") REFERENCES "public"."language"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "item_flavor_text" ADD CONSTRAINT "item_flavor_text_resource_id_item_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."item"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "item_flavor_text" ADD CONSTRAINT "item_flavor_text_version_group_id_version_group_id_fk" FOREIGN KEY ("version_group_id") REFERENCES "public"."version_group"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "item_fling_effect" ADD CONSTRAINT "item_fling_effect_language_id_language_id_fk" FOREIGN KEY ("language_id") REFERENCES "public"."language"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "item_fling_effect" ADD CONSTRAINT "item_fling_effect_resource_id_item_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."item"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "item_generation" ADD CONSTRAINT "item_generation_item_id_item_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."item"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "item_generation" ADD CONSTRAINT "item_generation_generation_id_generation_id_fk" FOREIGN KEY ("generation_id") REFERENCES "public"."generation"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "item_item_attribute" ADD CONSTRAINT "item_item_attribute_item_id_item_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."item"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "item_item_attribute" ADD CONSTRAINT "item_item_attribute_item_attribute_id_item_attribute_id_fk" FOREIGN KEY ("item_attribute_id") REFERENCES "public"."item_attribute"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "item_name" ADD CONSTRAINT "item_name_language_id_language_id_fk" FOREIGN KEY ("language_id") REFERENCES "public"."language"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "item_name" ADD CONSTRAINT "item_name_resource_id_item_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."item"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "item_pocket_name" ADD CONSTRAINT "item_pocket_name_language_id_language_id_fk" FOREIGN KEY ("language_id") REFERENCES "public"."language"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "item_pocket_name" ADD CONSTRAINT "item_pocket_name_resource_id_item_pocket_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."item_pocket"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "language_name" ADD CONSTRAINT "language_name_language_id_language_id_fk" FOREIGN KEY ("language_id") REFERENCES "public"."language"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "location" ADD CONSTRAINT "location_region_id_region_id_fk" FOREIGN KEY ("region_id") REFERENCES "public"."region"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "location_area" ADD CONSTRAINT "location_area_location_id_location_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."location"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "location_area_name" ADD CONSTRAINT "location_area_name_language_id_language_id_fk" FOREIGN KEY ("language_id") REFERENCES "public"."language"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "location_area_name" ADD CONSTRAINT "location_area_name_resource_id_location_area_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."location_area"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "location_generation" ADD CONSTRAINT "location_generation_location_id_location_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."location"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "location_generation" ADD CONSTRAINT "location_generation_generation_id_generation_id_fk" FOREIGN KEY ("generation_id") REFERENCES "public"."generation"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "location_name" ADD CONSTRAINT "location_name_language_id_language_id_fk" FOREIGN KEY ("language_id") REFERENCES "public"."language"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "location_name" ADD CONSTRAINT "location_name_resource_id_location_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."location"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "move" ADD CONSTRAINT "move_type_id_type_id_fk" FOREIGN KEY ("type_id") REFERENCES "public"."type"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "move" ADD CONSTRAINT "move_generation_id_generation_id_fk" FOREIGN KEY ("generation_id") REFERENCES "public"."generation"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "move_effect" ADD CONSTRAINT "move_effect_language_id_language_id_fk" FOREIGN KEY ("language_id") REFERENCES "public"."language"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "move_effect" ADD CONSTRAINT "move_effect_resource_id_move_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."move"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "move_effect" ADD CONSTRAINT "move_effect_version_group_id_version_group_id_fk" FOREIGN KEY ("version_group_id") REFERENCES "public"."version_group"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "move_flavor_text" ADD CONSTRAINT "move_flavor_text_language_id_language_id_fk" FOREIGN KEY ("language_id") REFERENCES "public"."language"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "move_flavor_text" ADD CONSTRAINT "move_flavor_text_resource_id_move_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."move"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "move_flavor_text" ADD CONSTRAINT "move_flavor_text_version_group_id_version_group_id_fk" FOREIGN KEY ("version_group_id") REFERENCES "public"."version_group"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "move_learn_method_description" ADD CONSTRAINT "move_learn_method_description_language_id_language_id_fk" FOREIGN KEY ("language_id") REFERENCES "public"."language"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "move_learn_method_description" ADD CONSTRAINT "move_learn_method_description_resource_id_move_learn_method_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."move_learn_method"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "move_learn_method_name" ADD CONSTRAINT "move_learn_method_name_language_id_language_id_fk" FOREIGN KEY ("language_id") REFERENCES "public"."language"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "move_learn_method_name" ADD CONSTRAINT "move_learn_method_name_resource_id_move_learn_method_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."move_learn_method"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "move_machine" ADD CONSTRAINT "move_machine_move_id_move_id_fk" FOREIGN KEY ("move_id") REFERENCES "public"."move"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "move_machine" ADD CONSTRAINT "move_machine_item_id_item_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."item"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "move_machine" ADD CONSTRAINT "move_machine_version_group_id_version_group_id_fk" FOREIGN KEY ("version_group_id") REFERENCES "public"."version_group"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "move_name" ADD CONSTRAINT "move_name_language_id_language_id_fk" FOREIGN KEY ("language_id") REFERENCES "public"."language"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "move_name" ADD CONSTRAINT "move_name_resource_id_move_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."move"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "move_past_values" ADD CONSTRAINT "move_past_values_move_id_move_id_fk" FOREIGN KEY ("move_id") REFERENCES "public"."move"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "move_past_values" ADD CONSTRAINT "move_past_values_version_group_id_version_group_id_fk" FOREIGN KEY ("version_group_id") REFERENCES "public"."version_group"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "move_past_values" ADD CONSTRAINT "move_past_values_type_id_type_id_fk" FOREIGN KEY ("type_id") REFERENCES "public"."type"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokedex" ADD CONSTRAINT "pokedex_region_id_region_id_fk" FOREIGN KEY ("region_id") REFERENCES "public"."region"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokedex_description" ADD CONSTRAINT "pokedex_description_language_id_language_id_fk" FOREIGN KEY ("language_id") REFERENCES "public"."language"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokedex_description" ADD CONSTRAINT "pokedex_description_resource_id_pokedex_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."pokedex"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokedex_entry" ADD CONSTRAINT "pokedex_entry_pokedex_id_pokedex_id_fk" FOREIGN KEY ("pokedex_id") REFERENCES "public"."pokedex"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokedex_entry" ADD CONSTRAINT "pokedex_entry_pokemon_species_id_pokemon_species_id_fk" FOREIGN KEY ("pokemon_species_id") REFERENCES "public"."pokemon_species"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokedex_name" ADD CONSTRAINT "pokedex_name_language_id_language_id_fk" FOREIGN KEY ("language_id") REFERENCES "public"."language"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokedex_name" ADD CONSTRAINT "pokedex_name_resource_id_pokedex_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."pokedex"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokedex_version_group" ADD CONSTRAINT "pokedex_version_group_pokedex_id_pokedex_id_fk" FOREIGN KEY ("pokedex_id") REFERENCES "public"."pokedex"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokedex_version_group" ADD CONSTRAINT "pokedex_version_group_version_group_id_version_group_id_fk" FOREIGN KEY ("version_group_id") REFERENCES "public"."version_group"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon" ADD CONSTRAINT "pokemon_primary_type_id_type_id_fk" FOREIGN KEY ("primary_type_id") REFERENCES "public"."type"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon" ADD CONSTRAINT "pokemon_secondary_type_id_type_id_fk" FOREIGN KEY ("secondary_type_id") REFERENCES "public"."type"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon" ADD CONSTRAINT "pokemon_species_id_pokemon_species_id_fk" FOREIGN KEY ("species_id") REFERENCES "public"."pokemon_species"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon_ability" ADD CONSTRAINT "pokemon_ability_pokemon_id_pokemon_id_fk" FOREIGN KEY ("pokemon_id") REFERENCES "public"."pokemon"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon_ability" ADD CONSTRAINT "pokemon_ability_ability_id_ability_id_fk" FOREIGN KEY ("ability_id") REFERENCES "public"."ability"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon_form" ADD CONSTRAINT "pokemon_form_pokemon_id_pokemon_id_fk" FOREIGN KEY ("pokemon_id") REFERENCES "public"."pokemon"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon_form" ADD CONSTRAINT "pokemon_form_version_group_id_version_group_id_fk" FOREIGN KEY ("version_group_id") REFERENCES "public"."version_group"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon_form" ADD CONSTRAINT "pokemon_form_primary_type_id_type_id_fk" FOREIGN KEY ("primary_type_id") REFERENCES "public"."type"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon_form" ADD CONSTRAINT "pokemon_form_secondary_type_id_type_id_fk" FOREIGN KEY ("secondary_type_id") REFERENCES "public"."type"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon_form_name" ADD CONSTRAINT "pokemon_form_name_language_id_language_id_fk" FOREIGN KEY ("language_id") REFERENCES "public"."language"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon_form_name" ADD CONSTRAINT "pokemon_form_name_resource_id_pokemon_form_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."pokemon_form"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon_held_item" ADD CONSTRAINT "pokemon_held_item_pokemon_id_pokemon_id_fk" FOREIGN KEY ("pokemon_id") REFERENCES "public"."pokemon"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon_held_item" ADD CONSTRAINT "pokemon_held_item_item_id_item_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."item"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon_held_item" ADD CONSTRAINT "pokemon_held_item_version_id_version_id_fk" FOREIGN KEY ("version_id") REFERENCES "public"."version"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon_move" ADD CONSTRAINT "pokemon_move_pokemon_id_pokemon_id_fk" FOREIGN KEY ("pokemon_id") REFERENCES "public"."pokemon"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon_move" ADD CONSTRAINT "pokemon_move_move_id_move_id_fk" FOREIGN KEY ("move_id") REFERENCES "public"."move"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon_move" ADD CONSTRAINT "pokemon_move_version_group_id_version_group_id_fk" FOREIGN KEY ("version_group_id") REFERENCES "public"."version_group"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon_move" ADD CONSTRAINT "pokemon_move_learn_method_id_move_learn_method_id_fk" FOREIGN KEY ("learn_method_id") REFERENCES "public"."move_learn_method"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon_past_type" ADD CONSTRAINT "pokemon_past_type_pokemon_id_pokemon_id_fk" FOREIGN KEY ("pokemon_id") REFERENCES "public"."pokemon"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon_past_type" ADD CONSTRAINT "pokemon_past_type_generation_id_generation_id_fk" FOREIGN KEY ("generation_id") REFERENCES "public"."generation"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon_past_type" ADD CONSTRAINT "pokemon_past_type_primary_type_id_type_id_fk" FOREIGN KEY ("primary_type_id") REFERENCES "public"."type"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon_past_type" ADD CONSTRAINT "pokemon_past_type_secondary_type_id_type_id_fk" FOREIGN KEY ("secondary_type_id") REFERENCES "public"."type"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon_species" ADD CONSTRAINT "pokemon_species_generation_id_generation_id_fk" FOREIGN KEY ("generation_id") REFERENCES "public"."generation"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon_species_egg_group" ADD CONSTRAINT "pokemon_species_egg_group_pokemon_species_id_pokemon_species_id_fk" FOREIGN KEY ("pokemon_species_id") REFERENCES "public"."pokemon_species"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon_species_egg_group" ADD CONSTRAINT "pokemon_species_egg_group_egg_group_id_egg_group_id_fk" FOREIGN KEY ("egg_group_id") REFERENCES "public"."egg_group"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon_species_flavor_text" ADD CONSTRAINT "pokemon_species_flavor_text_resource_id_pokemon_species_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."pokemon_species"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon_species_flavor_text" ADD CONSTRAINT "pokemon_species_flavor_text_version_id_version_id_fk" FOREIGN KEY ("version_id") REFERENCES "public"."version"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon_species_flavor_text" ADD CONSTRAINT "pokemon_species_flavor_text_language_id_language_id_fk" FOREIGN KEY ("language_id") REFERENCES "public"."language"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon_species_genus" ADD CONSTRAINT "pokemon_species_genus_language_id_language_id_fk" FOREIGN KEY ("language_id") REFERENCES "public"."language"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon_species_genus" ADD CONSTRAINT "pokemon_species_genus_resource_id_pokemon_species_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."pokemon_species"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon_species_name" ADD CONSTRAINT "pokemon_species_name_language_id_language_id_fk" FOREIGN KEY ("language_id") REFERENCES "public"."language"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon_species_name" ADD CONSTRAINT "pokemon_species_name_resource_id_pokemon_species_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."pokemon_species"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon_version_appearance" ADD CONSTRAINT "pokemon_version_appearance_pokemon_id_pokemon_id_fk" FOREIGN KEY ("pokemon_id") REFERENCES "public"."pokemon"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon_version_appearance" ADD CONSTRAINT "pokemon_version_appearance_version_id_version_id_fk" FOREIGN KEY ("version_id") REFERENCES "public"."version"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "region" ADD CONSTRAINT "region_main_generation_id_generation_id_fk" FOREIGN KEY ("main_generation_id") REFERENCES "public"."generation"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "region_name" ADD CONSTRAINT "region_name_language_id_language_id_fk" FOREIGN KEY ("language_id") REFERENCES "public"."language"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "region_name" ADD CONSTRAINT "region_name_resource_id_region_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."region"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "type" ADD CONSTRAINT "type_generation_id_generation_id_fk" FOREIGN KEY ("generation_id") REFERENCES "public"."generation"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "type_damage_relation" ADD CONSTRAINT "type_damage_relation_from_type_id_type_id_fk" FOREIGN KEY ("from_type_id") REFERENCES "public"."type"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "type_damage_relation" ADD CONSTRAINT "type_damage_relation_to_type_id_type_id_fk" FOREIGN KEY ("to_type_id") REFERENCES "public"."type"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "type_damage_relation" ADD CONSTRAINT "type_damage_relation_generation_id_generation_id_fk" FOREIGN KEY ("generation_id") REFERENCES "public"."generation"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "type_name" ADD CONSTRAINT "type_name_language_id_language_id_fk" FOREIGN KEY ("language_id") REFERENCES "public"."language"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "type_name" ADD CONSTRAINT "type_name_resource_id_type_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."type"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "version" ADD CONSTRAINT "version_version_group_id_version_group_id_fk" FOREIGN KEY ("version_group_id") REFERENCES "public"."version_group"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "version_group" ADD CONSTRAINT "version_group_generation_id_generation_id_fk" FOREIGN KEY ("generation_id") REFERENCES "public"."generation"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "version_group_region" ADD CONSTRAINT "version_group_region_version_group_id_version_group_id_fk" FOREIGN KEY ("version_group_id") REFERENCES "public"."version_group"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "version_group_region" ADD CONSTRAINT "version_group_region_region_id_region_id_fk" FOREIGN KEY ("region_id") REFERENCES "public"."region"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "version_name" ADD CONSTRAINT "version_name_language_id_language_id_fk" FOREIGN KEY ("language_id") REFERENCES "public"."language"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "version_name" ADD CONSTRAINT "version_name_resource_id_version_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."version"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
