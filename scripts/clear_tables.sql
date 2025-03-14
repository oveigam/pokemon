BEGIN;
SET session_replication_role = 'replica'; -- Disables FK checks

DELETE FROM pokemon_ability;
DELETE FROM ability_flavor_text;
DELETE FROM ability_effect;
DELETE FROM ability_name;
DELETE FROM ability;
DELETE FROM pokemon_move;
DELETE FROM move_learn_method_description;
DELETE FROM move_learn_method_name;
DELETE FROM move_learn_method;
DELETE FROM move_flavor_text;
DELETE FROM move_past_values;
DELETE FROM move_effect;
DELETE FROM move_name;
DELETE FROM move_machine;
DELETE FROM move;
DELETE FROM type_damage_relation;
DELETE FROM type_name;
DELETE FROM type;
DELETE FROM location_area_name;
DELETE FROM location_area;
DELETE FROM location_generation;
DELETE FROM location_name;
DELETE FROM location;
DELETE FROM region_name;
DELETE FROM region;
DELETE FROM version_group_region;
DELETE FROM version_group;
DELETE FROM version_name;
DELETE FROM version;
DELETE FROM item_pocket_name;
DELETE FROM item_pocket;
DELETE FROM item_category_name;
DELETE FROM item_category;
DELETE FROM item_attribute_description;
DELETE FROM item_attribute_name;
DELETE FROM item_attribute;
DELETE FROM item_item_attribute;
DELETE FROM item_generation;
DELETE FROM item_flavor_text;
DELETE FROM item_fling_effect;
DELETE FROM item_effect;
DELETE FROM item_name;
DELETE FROM item;
DELETE FROM pokedex_version_group;
DELETE FROM egg_group_name;
DELETE FROM egg_group;
DELETE FROM pokemon_species_egg_group;
DELETE FROM pokemon_species_flavor_text;
DELETE FROM pokemon_held_item;
DELETE FROM pokemon_version_appearance;
DELETE FROM pokemon_form_name;
DELETE FROM pokemon_form;
DELETE FROM pokemon_past_type;
DELETE FROM pokemon;
DELETE FROM pokemon_species_genus;
DELETE FROM pokemon_species_name;
DELETE FROM pokemon_species;
DELETE FROM pokedex_entry;
DELETE FROM pokedex_description;
DELETE FROM pokedex_name;
DELETE FROM pokedex;
DELETE FROM generation_name;
DELETE FROM generation;
DELETE FROM language_name;
DELETE FROM language;

SET session_replication_role = 'origin'; -- Re-enable FK checks
COMMIT;
