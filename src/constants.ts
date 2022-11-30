import { author, name } from "../config/metadata.cjs";

// From metadata
export const NAME = name;
export const AUTHOR = author;

// Other constants
export const DEFAULT_CACHE_TIME = 1000 * 60 * 60 * 24; // 1 day
export const TMDB_LANGUAGE = "en-US";
export const UNIQUE = "abtexr";
export const ANIDB_CLIENT_NAME = "abtexr";
export const ANIDB_CLIENT_VERSION = "1";
export const TMDB_DEFAULT_API_KEY = "fe87c50cd11a52087a6e806623385b73";
export const MAL_DEFAULT_API_KEY = "015cace9ce2a8dbd866dd7d9fa3ab561";
export const internetOrWebsiteDownErrorTitle = (websiteName: string) =>
  `Make sure you're connected to the internet and that ${websiteName} is not down.`;
