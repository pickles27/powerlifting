import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client/react';
import * as ApolloReactHooks from '@apollo/client/react';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

/** Represents a person who competes in powerlifting competitions. */
export type Athlete = {
  __typename?: 'Athlete';
  /** The lifter's age at the time of competition, if known */
  age?: Maybe<Scalars['Float']['output']>;
  /** The age class in which the lifter falls, if known */
  ageClass?: Maybe<Scalars['String']['output']>;
  /** The birth year class in which the lifter falls, if known */
  birthYearClass?: Maybe<Scalars['String']['output']>;
  /** The lifter's home country, if known */
  country?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** All lifts/meet results for this athlete */
  lifts: Array<Lift>;
  /** The full name of the lifter (may include a #number for disambiguation) */
  name: Scalars['String']['output'];
  /** The sex category in which the lifter competed (M, F, or Mx) */
  sex: Sex;
  /** The lifter's home state/province/region, if known */
  state?: Maybe<Scalars['String']['output']>;
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

/** A single lift performance record */
export type Lift = {
  __typename?: 'Lift';
  /** The age of the lifter on the start date of the meet. Approximate ages end in .5 */
  age?: Maybe<Scalars['Float']['output']>;
  /** The age class in which the lifter competed (e.g., 40-45) */
  ageClass?: Maybe<Scalars['String']['output']>;
  bench1Kg?: Maybe<Scalars['Float']['output']>;
  bench2Kg?: Maybe<Scalars['Float']['output']>;
  bench3Kg?: Maybe<Scalars['Float']['output']>;
  bench4Kg?: Maybe<Scalars['Float']['output']>;
  /** Maximum of the first three successful bench attempts */
  best3BenchKg?: Maybe<Scalars['Float']['output']>;
  /** Maximum of the first three successful deadlift attempts */
  best3DeadliftKg?: Maybe<Scalars['Float']['output']>;
  /** Maximum of the first three successful squat attempts */
  best3SquatKg?: Maybe<Scalars['Float']['output']>;
  /** The birth year class in which the lifter falls (e.g., 40-49) */
  birthYearClass?: Maybe<Scalars['String']['output']>;
  /** The recorded bodyweight of the lifter at the time of competition (kg) */
  bodyweightKg?: Maybe<Scalars['Float']['output']>;
  /** The home country of the lifter */
  country?: Maybe<Scalars['String']['output']>;
  /** The start date of the meet in ISO 8601 format (YYYY-MM-DD) */
  date: Scalars['String']['output'];
  deadlift1Kg?: Maybe<Scalars['Float']['output']>;
  deadlift2Kg?: Maybe<Scalars['Float']['output']>;
  deadlift3Kg?: Maybe<Scalars['Float']['output']>;
  deadlift4Kg?: Maybe<Scalars['Float']['output']>;
  /** Free-form text describing the division of competition */
  division?: Maybe<Scalars['String']['output']>;
  /** Dots points (updated Wilks formula, built against drug-tested Raw lifters) */
  dots?: Maybe<Scalars['Float']['output']>;
  /** The equipment category under which the lifts were performed */
  equipment: Equipment;
  /** The type of competition that the lifter entered */
  event: Event;
  /** The federation that hosted the meet */
  federation: Scalars['String']['output'];
  /** Glossbrenner points (used by GPC-affiliated federations) */
  glossbrenner?: Maybe<Scalars['Float']['output']>;
  /** IPF GL Points (expresses relative performance as a percentage) */
  goodlift?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  /** The country in which the meet was held */
  meetCountry: Scalars['String']['output'];
  /** The name of the meet (excludes year and federation) */
  meetName: Scalars['String']['output'];
  /** The state/province in which the meet was held */
  meetState?: Maybe<Scalars['String']['output']>;
  /** The town in which the meet was held */
  meetTown?: Maybe<Scalars['String']['output']>;
  /** The name of the lifter in UTF-8 encoding */
  name: Scalars['String']['output'];
  /** The topmost federation that sanctioned the meet */
  parentFederation?: Maybe<Scalars['String']['output']>;
  /** The recorded place of the lifter (number, G, DQ, DD, or NS) */
  place: Scalars['String']['output'];
  /** Whether the meet was officially sanctioned */
  sanctioned?: Maybe<Scalars['String']['output']>;
  /** The sex category in which the lifter competed */
  sex: Sex;
  squat1Kg?: Maybe<Scalars['Float']['output']>;
  squat2Kg?: Maybe<Scalars['Float']['output']>;
  squat3Kg?: Maybe<Scalars['Float']['output']>;
  squat4Kg?: Maybe<Scalars['Float']['output']>;
  /** The home state/province of the lifter */
  state?: Maybe<Scalars['String']['output']>;
  /** Whether the lifter entered a drug-tested category */
  tested?: Maybe<Scalars['String']['output']>;
  /** Sum of Best3SquatKg, Best3BenchKg, and Best3DeadliftKg if all three were successful */
  totalKg?: Maybe<Scalars['Float']['output']>;
  /** The weight class in which the lifter competed (kg). Uses + suffix for minimums (e.g., 90+) */
  weightClassKg?: Maybe<Scalars['String']['output']>;
  /** Wilks points (most common formula for determining Best Lifter) */
  wilks?: Maybe<Scalars['Float']['output']>;
};

export type Meet = {
  __typename?: 'Meet';
  country: Scalars['String']['output'];
  date: Scalars['String']['output'];
  federation: Scalars['String']['output'];
  name: Scalars['String']['output'];
  parentFederation?: Maybe<Scalars['String']['output']>;
  sanctioned?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  town?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  lifts: Array<Lift>;
  sbdByBodyweight: Array<SbdDataPoint>;
};


export type QueryLiftsArgs = {
  ageClass?: InputMaybe<Scalars['String']['input']>;
  ageMax?: InputMaybe<Scalars['Float']['input']>;
  ageMin?: InputMaybe<Scalars['Float']['input']>;
  bodyweightMax?: InputMaybe<Scalars['Float']['input']>;
  bodyweightMin?: InputMaybe<Scalars['Float']['input']>;
  dateMax?: InputMaybe<Scalars['String']['input']>;
  dateMin?: InputMaybe<Scalars['String']['input']>;
  equipment?: InputMaybe<Equipment>;
  event?: InputMaybe<Event>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sex?: InputMaybe<Sex>;
};


export type QuerySbdByBodyweightArgs = {
  bodyweightMax?: InputMaybe<Scalars['Float']['input']>;
  bodyweightMin?: InputMaybe<Scalars['Float']['input']>;
  equipment?: InputMaybe<Equipment>;
  event?: InputMaybe<Event>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sex?: InputMaybe<Sex>;
};

/** Simplified lift data for SBD */
export type SbdDataPoint = {
  __typename?: 'SbdDataPoint';
  best3BenchKg?: Maybe<Scalars['Float']['output']>;
  best3DeadliftKg?: Maybe<Scalars['Float']['output']>;
  best3SquatKg?: Maybe<Scalars['Float']['output']>;
  bodyweightKg: Scalars['Float']['output'];
  equipment?: Maybe<Equipment>;
  event?: Maybe<Event>;
  sex?: Maybe<Sex>;
  totalKg?: Maybe<Scalars['Float']['output']>;
};

/** The sex category in which the lifter competed */
export type Sex =
  | 'F'
  | 'M'
  | 'Mx';

export type LiftsQueryVariables = Exact<{
  bodyweightMin?: InputMaybe<Scalars['Float']['input']>;
  bodyweightMax?: InputMaybe<Scalars['Float']['input']>;
  dateMin?: InputMaybe<Scalars['String']['input']>;
  dateMax?: InputMaybe<Scalars['String']['input']>;
  sex?: InputMaybe<Sex>;
  event?: InputMaybe<Event>;
  equipment?: InputMaybe<Equipment>;
  ageMin?: InputMaybe<Scalars['Float']['input']>;
  ageMax?: InputMaybe<Scalars['Float']['input']>;
  ageClass?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type LiftsQuery = { __typename?: 'Query', lifts: Array<{ __typename?: 'Lift', id: string, name: string, sex: Sex, event: Event, equipment: Equipment, bodyweightKg?: number | null, age?: number | null, ageClass?: string | null, date: string, best3SquatKg?: number | null, best3BenchKg?: number | null, best3DeadliftKg?: number | null, totalKg?: number | null }> };

export type SbdByBodyweightQueryVariables = Exact<{
  bodyweightMin?: InputMaybe<Scalars['Float']['input']>;
  bodyweightMax?: InputMaybe<Scalars['Float']['input']>;
  sex?: InputMaybe<Sex>;
  event?: InputMaybe<Event>;
  equipment?: InputMaybe<Equipment>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type SbdByBodyweightQuery = { __typename?: 'Query', sbdByBodyweight: Array<{ __typename?: 'SbdDataPoint', bodyweightKg: number, best3BenchKg?: number | null, best3SquatKg?: number | null, best3DeadliftKg?: number | null, totalKg?: number | null, sex?: Sex | null, event?: Event | null, equipment?: Equipment | null }> };


export const LiftsDocument = gql`
    query Lifts($bodyweightMin: Float, $bodyweightMax: Float, $dateMin: String, $dateMax: String, $sex: Sex, $event: Event, $equipment: Equipment, $ageMin: Float, $ageMax: Float, $ageClass: String, $limit: Int, $offset: Int) {
  lifts(
    bodyweightMin: $bodyweightMin
    bodyweightMax: $bodyweightMax
    dateMin: $dateMin
    dateMax: $dateMax
    sex: $sex
    event: $event
    equipment: $equipment
    ageMin: $ageMin
    ageMax: $ageMax
    ageClass: $ageClass
    limit: $limit
    offset: $offset
  ) {
    id
    name
    sex
    event
    equipment
    bodyweightKg
    age
    ageClass
    date
    best3SquatKg
    best3BenchKg
    best3DeadliftKg
    totalKg
  }
}
    `;

/**
 * __useLiftsQuery__
 *
 * To run a query within a React component, call `useLiftsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLiftsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLiftsQuery({
 *   variables: {
 *      bodyweightMin: // value for 'bodyweightMin'
 *      bodyweightMax: // value for 'bodyweightMax'
 *      dateMin: // value for 'dateMin'
 *      dateMax: // value for 'dateMax'
 *      sex: // value for 'sex'
 *      event: // value for 'event'
 *      equipment: // value for 'equipment'
 *      ageMin: // value for 'ageMin'
 *      ageMax: // value for 'ageMax'
 *      ageClass: // value for 'ageClass'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useLiftsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<LiftsQuery, LiftsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<LiftsQuery, LiftsQueryVariables>(LiftsDocument, options);
      }
export function useLiftsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<LiftsQuery, LiftsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<LiftsQuery, LiftsQueryVariables>(LiftsDocument, options);
        }
export function useLiftsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<LiftsQuery, LiftsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<LiftsQuery, LiftsQueryVariables>(LiftsDocument, options);
        }
export type LiftsQueryHookResult = ReturnType<typeof useLiftsQuery>;
export type LiftsLazyQueryHookResult = ReturnType<typeof useLiftsLazyQuery>;
export type LiftsSuspenseQueryHookResult = ReturnType<typeof useLiftsSuspenseQuery>;
export type LiftsQueryResult = ApolloReactCommon.QueryResult<LiftsQuery, LiftsQueryVariables>;
export const SbdByBodyweightDocument = gql`
    query SbdByBodyweight($bodyweightMin: Float, $bodyweightMax: Float, $sex: Sex, $event: Event, $equipment: Equipment, $limit: Int, $offset: Int) {
  sbdByBodyweight(
    bodyweightMin: $bodyweightMin
    bodyweightMax: $bodyweightMax
    sex: $sex
    event: $event
    equipment: $equipment
    limit: $limit
    offset: $offset
  ) {
    bodyweightKg
    best3BenchKg
    best3SquatKg
    best3DeadliftKg
    totalKg
    sex
    event
    equipment
  }
}
    `;

/**
 * __useSbdByBodyweightQuery__
 *
 * To run a query within a React component, call `useSbdByBodyweightQuery` and pass it any options that fit your needs.
 * When your component renders, `useSbdByBodyweightQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSbdByBodyweightQuery({
 *   variables: {
 *      bodyweightMin: // value for 'bodyweightMin'
 *      bodyweightMax: // value for 'bodyweightMax'
 *      sex: // value for 'sex'
 *      event: // value for 'event'
 *      equipment: // value for 'equipment'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useSbdByBodyweightQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SbdByBodyweightQuery, SbdByBodyweightQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<SbdByBodyweightQuery, SbdByBodyweightQueryVariables>(SbdByBodyweightDocument, options);
      }
export function useSbdByBodyweightLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SbdByBodyweightQuery, SbdByBodyweightQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<SbdByBodyweightQuery, SbdByBodyweightQueryVariables>(SbdByBodyweightDocument, options);
        }
export function useSbdByBodyweightSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<SbdByBodyweightQuery, SbdByBodyweightQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<SbdByBodyweightQuery, SbdByBodyweightQueryVariables>(SbdByBodyweightDocument, options);
        }
export type SbdByBodyweightQueryHookResult = ReturnType<typeof useSbdByBodyweightQuery>;
export type SbdByBodyweightLazyQueryHookResult = ReturnType<typeof useSbdByBodyweightLazyQuery>;
export type SbdByBodyweightSuspenseQueryHookResult = ReturnType<typeof useSbdByBodyweightSuspenseQuery>;
export type SbdByBodyweightQueryResult = ApolloReactCommon.QueryResult<SbdByBodyweightQuery, SbdByBodyweightQueryVariables>;