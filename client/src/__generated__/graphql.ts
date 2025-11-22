/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

/** The equipment category under which the lifts were performed */
export type Equipment =
  | 'Multi_ply'
  | 'Raw'
  | 'Single_ply'
  | 'Straps'
  | 'Unlimited'
  | 'Wraps';

/** The type of competition that the lifter entered */
export type Event =
  | 'B'
  | 'BD'
  | 'D'
  | 'S'
  | 'SB'
  | 'SBD'
  | 'SD';

/** Available sorting options for leaderboards */
export type LeaderboardSort =
  | 'DOTS'
  | 'GLOSSBRENNER'
  | 'GOODLIFT'
  | 'TOTAL'
  | 'WILKS';

/** A single lift performance record */
export type Lift = {
  __typename?: 'Lift';
  /** The age of the lifter on the start date of the meet. Approximate ages end in .5 */
  age: Maybe<Scalars['Float']['output']>;
  /** The age class in which the lifter competed (e.g., 40-45) */
  ageClass: Maybe<Scalars['String']['output']>;
  bench1Kg: Maybe<Scalars['Float']['output']>;
  bench2Kg: Maybe<Scalars['Float']['output']>;
  bench3Kg: Maybe<Scalars['Float']['output']>;
  bench4Kg: Maybe<Scalars['Float']['output']>;
  /** Maximum of the first three successful bench attempts */
  best3BenchKg: Maybe<Scalars['Float']['output']>;
  /** Maximum of the first three successful deadlift attempts */
  best3DeadliftKg: Maybe<Scalars['Float']['output']>;
  /** Maximum of the first three successful squat attempts */
  best3SquatKg: Maybe<Scalars['Float']['output']>;
  /** The birth year class in which the lifter falls (e.g., 40-49) */
  birthYearClass: Maybe<Scalars['String']['output']>;
  /** The recorded bodyweight of the lifter at the time of competition (kg) */
  bodyweightKg: Maybe<Scalars['Float']['output']>;
  /** The home country of the lifter */
  country: Maybe<Scalars['String']['output']>;
  /** The start date of the meet in ISO 8601 format (YYYY-MM-DD) */
  date: Scalars['String']['output'];
  deadlift1Kg: Maybe<Scalars['Float']['output']>;
  deadlift2Kg: Maybe<Scalars['Float']['output']>;
  deadlift3Kg: Maybe<Scalars['Float']['output']>;
  deadlift4Kg: Maybe<Scalars['Float']['output']>;
  /** Free-form text describing the division of competition */
  division: Maybe<Scalars['String']['output']>;
  /** Dots points (updated Wilks formula, built against drug-tested Raw lifters) */
  dots: Maybe<Scalars['Float']['output']>;
  /** The equipment category under which the lifts were performed */
  equipment: Equipment;
  /** The type of competition that the lifter entered */
  event: Event;
  /** The federation that hosted the meet */
  federation: Scalars['String']['output'];
  /** Glossbrenner points (used by GPC-affiliated federations) */
  glossbrenner: Maybe<Scalars['Float']['output']>;
  /** IPF GL Points (expresses relative performance as a percentage) */
  goodlift: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  /** The country in which the meet was held */
  meetCountry: Scalars['String']['output'];
  /** The name of the meet (excludes year and federation) */
  meetName: Scalars['String']['output'];
  /** The state/province in which the meet was held */
  meetState: Maybe<Scalars['String']['output']>;
  /** The town in which the meet was held */
  meetTown: Maybe<Scalars['String']['output']>;
  /** The name of the lifter in UTF-8 encoding */
  name: Scalars['String']['output'];
  /** The topmost federation that sanctioned the meet */
  parentFederation: Maybe<Scalars['String']['output']>;
  /** The recorded place of the lifter (number, G, DQ, DD, or NS) */
  place: Scalars['String']['output'];
  /** Whether the meet was officially sanctioned */
  sanctioned: Maybe<Scalars['String']['output']>;
  /** The sex category in which the lifter competed */
  sex: Sex;
  squat1Kg: Maybe<Scalars['Float']['output']>;
  squat2Kg: Maybe<Scalars['Float']['output']>;
  squat3Kg: Maybe<Scalars['Float']['output']>;
  squat4Kg: Maybe<Scalars['Float']['output']>;
  /** The home state/province of the lifter */
  state: Maybe<Scalars['String']['output']>;
  /** Whether the lifter entered a drug-tested category */
  tested: Maybe<Scalars['String']['output']>;
  /** Sum of Best3SquatKg, Best3BenchKg, and Best3DeadliftKg if all three were successful */
  totalKg: Maybe<Scalars['Float']['output']>;
  /** The weight class in which the lifter competed (kg). Uses + suffix for minimums (e.g., 90+) */
  weightClassKg: Maybe<Scalars['String']['output']>;
  /** Wilks points (most common formula for determining Best Lifter) */
  wilks: Maybe<Scalars['Float']['output']>;
};

/** Aggregate statistics for a lifter across all their meets */
export type LifterStats = {
  __typename?: 'LifterStats';
  bestBench: Maybe<Scalars['Float']['output']>;
  bestDeadlift: Maybe<Scalars['Float']['output']>;
  bestDots: Maybe<Scalars['Float']['output']>;
  bestSquat: Maybe<Scalars['Float']['output']>;
  bestTotal: Maybe<Scalars['Float']['output']>;
  bestWilks: Maybe<Scalars['Float']['output']>;
  federations: Array<Scalars['String']['output']>;
  firstMeetDate: Maybe<Scalars['String']['output']>;
  lastMeetDate: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  totalMeets: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  /** Get a leaderboard filtered by various criteria and sorted by a coefficient */
  leaderboard: Array<Lift>;
  /** Get all recorded lifts for a specific lifter by name */
  lifterHistory: Array<Lift>;
  /** Get aggregate statistics for a lifter */
  lifterStats: Maybe<LifterStats>;
  /** Get all results from a specific meet */
  meetResults: Array<Lift>;
  /** Search for lifters by partial name match */
  searchLifters: Array<Scalars['String']['output']>;
};


export type QueryLeaderboardArgs = {
  ageClass: InputMaybe<Scalars['String']['input']>;
  country: InputMaybe<Scalars['String']['input']>;
  equipment: InputMaybe<Equipment>;
  event: InputMaybe<Event>;
  federation: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  maxDate: InputMaybe<Scalars['String']['input']>;
  minDate: InputMaybe<Scalars['String']['input']>;
  sex: InputMaybe<Sex>;
  sortBy?: InputMaybe<LeaderboardSort>;
  state: InputMaybe<Scalars['String']['input']>;
  tested: InputMaybe<Scalars['Boolean']['input']>;
  weightClass: InputMaybe<Scalars['String']['input']>;
};


export type QueryLifterHistoryArgs = {
  name: Scalars['String']['input'];
};


export type QueryLifterStatsArgs = {
  name: Scalars['String']['input'];
};


export type QueryMeetResultsArgs = {
  date: Scalars['String']['input'];
  meetName: Scalars['String']['input'];
};


export type QuerySearchLiftersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  query: Scalars['String']['input'];
};

/** The sex category in which the lifter competed */
export type Sex =
  | 'F'
  | 'M'
  | 'Mx';

export type LeaderboardQueryVariables = Exact<{
  limit: InputMaybe<Scalars['Int']['input']>;
  sex: InputMaybe<Sex>;
  equipment: InputMaybe<Equipment>;
  event: InputMaybe<Event>;
  weightClass: InputMaybe<Scalars['String']['input']>;
}>;


export type LeaderboardQuery = { __typename?: 'Query', leaderboard: Array<{ __typename?: 'Lift', name: string, sex: Sex, event: Event, equipment: Equipment, bodyweightKg: number | null, weightClassKg: string | null, best3SquatKg: number | null, best3BenchKg: number | null, best3DeadliftKg: number | null, totalKg: number | null, dots: number | null, wilks: number | null, date: string, meetName: string, federation: string }> };


export const LeaderboardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Leaderboard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sex"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Sex"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"equipment"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Equipment"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"event"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Event"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"weightClass"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leaderboard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"sex"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sex"}}},{"kind":"Argument","name":{"kind":"Name","value":"equipment"},"value":{"kind":"Variable","name":{"kind":"Name","value":"equipment"}}},{"kind":"Argument","name":{"kind":"Name","value":"event"},"value":{"kind":"Variable","name":{"kind":"Name","value":"event"}}},{"kind":"Argument","name":{"kind":"Name","value":"weightClass"},"value":{"kind":"Variable","name":{"kind":"Name","value":"weightClass"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sex"}},{"kind":"Field","name":{"kind":"Name","value":"event"}},{"kind":"Field","name":{"kind":"Name","value":"equipment"}},{"kind":"Field","name":{"kind":"Name","value":"bodyweightKg"}},{"kind":"Field","name":{"kind":"Name","value":"weightClassKg"}},{"kind":"Field","name":{"kind":"Name","value":"best3SquatKg"}},{"kind":"Field","name":{"kind":"Name","value":"best3BenchKg"}},{"kind":"Field","name":{"kind":"Name","value":"best3DeadliftKg"}},{"kind":"Field","name":{"kind":"Name","value":"totalKg"}},{"kind":"Field","name":{"kind":"Name","value":"dots"}},{"kind":"Field","name":{"kind":"Name","value":"wilks"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"meetName"}},{"kind":"Field","name":{"kind":"Name","value":"federation"}}]}}]}}]} as unknown as DocumentNode<LeaderboardQuery, LeaderboardQueryVariables>;