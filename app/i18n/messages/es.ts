import datagridEs from "@datagrid/features/i18n/messages/datagrid.es";

import type { BaseTranslations } from "./en";

const es: BaseTranslations = {
  app: {
    title: "Pokemon Enterprise Edition",
    application: "Aplicación",
    unidentified: "No Identificado",
    options: "Optionces",
    profile: "Perfil",
    theme: "Estilo",
    light: "Claro",
    dark: "Oscuro",
    system: "Sistema",
    language: "Idioma",
    english: "Inglés",
    spanish: "Español",
  },

  datagrid: datagridEs,

  navigation: {
    home: "Inicio",
    pokemon: "Pokemon",
    move: "Movimientos",
    ability: "Habilidades",
    item: "Items",
  },

  action: {
    create: "Create",
    logout: "Cerrar sesión",
    signin: "Iniciar sesión",
    signup: "Registrarse",
  },

  user: {
    name: "Nombre",
    password: "Contraseña",
    email: "Email",
  },

  pokemon: {
    id: "ID",
    name: "Nombre",
    order: "Orden",
    genderRate: "Tasa de Género",
    captureRate: "Tasa de Captura",
    baseHappiness: "Felicidad Base",
    isBaby: "Es Bebé",
    isLegendary: "Es Legendario",
    isMythical: "Es Mítico",
    hatchCounter: "Contador de Eclosión",
    hasGenderDifferences: "Tiene Diferencias de Género",
    formsSwitchable: "Formas Conmutables",
    growthRate: "Tasa de Crecimiento",
    color: "Color",
    shape: "Forma",
    evolvesFromPokemonSpeciesId: "Evoluciona De la Especie Pokémon ID",
    generationId: "ID de Generación",
    habitat: "Hábitat",
    createdAt: "Creado En",
    updatedAt: "Actualizado En",
  },
};

export default es;
