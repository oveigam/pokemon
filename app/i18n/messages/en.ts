import datagridEn from "@datagrid/features/i18n/messages/datagrid.en";

const en = {
  app: {
    title: "Pokemon Enterprise Edition",
    application: "Application",
    unidentified: "Unidentified",
    options: "Options",
    profile: "Profile",
    theme: "Theme",
    light: "Light",
    dark: "Dark",
    system: "System",
    language: "Language",
    english: "English",
    spanish: "Spanish",
  },

  datagrid: datagridEn,

  navigation: {
    home: "Home",
    pokemon: "Pokemon",
    move: "Moves",
    ability: "Abilities",
    item: "Items",
  },

  action: {
    create: "Create",
    logout: "Log out",
    signin: "Sign in",
    signup: "Sign up",
  },

  user: {
    name: "Name",
    password: "Password",
    email: "Email",
  },

  pokemon: {
    name: "Name",
  },
};

export type BaseTranslations = typeof en;

export default en;
