import { Resolvers } from "./__generated__/resolvers-types";
import { lifts } from "./resolvers/lifts";
import { sbdByBodyweight } from "./resolvers/sbdByBodyweight";

export const resolvers: Resolvers = {
  Query: {
    lifts,
    sbdByBodyweight,
  },
  Mutation: {},
};
