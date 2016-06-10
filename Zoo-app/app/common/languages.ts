export enum Language {
  English,
  Czech
}

namespace Language {
  export function toString(language: Language) {
    switch (language) {
      case Language.English:
        return "English";
      case Language.Czech:
        return "Český";
    }
  }

  export function get(language: string) {
    switch (language) {
      case "en":
        return Language.English;
      case "cz":
        return Language.Czech;
    }
  }
}
