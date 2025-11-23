// Utility to convert GraphQL enum values to DB format (underscore -> hyphen)
const toDbEnum = (value: string): string => value.replace(/_/g, "-");

// Utility to convert DB values to GraphQL enum format (hyphen -> underscore)
const toGraphQLEnum = (value: string): string => value.replace(/-/g, "_");

export { toDbEnum, toGraphQLEnum };
