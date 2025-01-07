export const growthRates = [
  "slow",
  "medium",
  "fast",
  "medium-slow",
  "slow-then-very-fast",
  "fast-then-very-slow",
] as const;

export const pokemonColors = [
  "black",
  "blue",
  "brown",
  "gray",
  "green",
  "pink",
  "purple",
  "red",
  "white",
  "yellow",
] as const;

export const pokemonShapes = [
  "ball",
  "squiggle",
  "fish",
  "arms",
  "blob",
  "upright",
  "legs",
  "quadruped",
  "wings",
  "tentacles",
  "heads",
  "humanoid",
  "bug-wings",
  "armor",
] as const;

export const pokemonHabitat = [
  "cave",
  "forest",
  "grassland",
  "mountain",
  "rare",
  "rough-terrain",
  "sea",
  "urban",
  "waters-edge",
] as const;

export const damageClass = ["status", "physical", "special"] as const;

export const moveTarget = [
  "specific-move",
  "selected-pokemon-me-first",
  "ally",
  "users-field",
  "user-or-ally",
  "opponents-field",
  "user",
  "random-opponent",
  "all-other-pokemon",
  "selected-pokemon",
  "all-opponents",
  "entire-field",
  "user-and-allies",
  "all-pokemon",
  "all-allies",
  "fainting-pokemon",
] as const;

export const moveCategory = [
  "damage",
  "ailment",
  "net-good-stats",
  "heal",
  "damage+ailment",
  "swagger",
  "damage+lower",
  "damage+raise",
  "damage+heal",
  "ohko",
  "whole-field-effect",
  "field-effect",
  "force-switch",
  "unique",
] as const;

export const moveAilment = [
  "unknown",
  "none",
  "paralysis",
  "sleep",
  "freeze",
  "burn",
  "poison",
  "confusion",
  "infatuation",
  "trap",
  "nightmare",
  "torment",
  "disable",
  "yawn",
  "heal-block",
  "no-type-immunity",
  "leech-seed",
  "embargo",
  "perish-song",
  "ingrain",
  "silence",
  "tar-shot",
] as const;
