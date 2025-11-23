import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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
export enum Equipment {
  MultiPly = 'Multi_ply',
  Raw = 'Raw',
  SinglePly = 'Single_ply',
  Straps = 'Straps',
  Unlimited = 'Unlimited',
  Wraps = 'Wraps'
}

/** The type of competition that the lifter entered */
export enum Event {
  B = 'B',
  Bd = 'BD',
  D = 'D',
  S = 'S',
  Sb = 'SB',
  Sbd = 'SBD',
  Sd = 'SD'
}

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
export enum Sex {
  F = 'F',
  M = 'M',
  Mx = 'Mx'
}

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Athlete: ResolverTypeWrapper<Athlete>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Equipment: Equipment;
  Event: Event;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Lift: ResolverTypeWrapper<Lift>;
  Meet: ResolverTypeWrapper<Meet>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  SbdDataPoint: ResolverTypeWrapper<SbdDataPoint>;
  Sex: Sex;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Athlete: Athlete;
  Boolean: Scalars['Boolean']['output'];
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Lift: Lift;
  Meet: Meet;
  Mutation: Record<PropertyKey, never>;
  Query: Record<PropertyKey, never>;
  SbdDataPoint: SbdDataPoint;
  String: Scalars['String']['output'];
}>;

export type AthleteResolvers<ContextType = any, ParentType extends ResolversParentTypes['Athlete'] = ResolversParentTypes['Athlete']> = ResolversObject<{
  age?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  ageClass?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  birthYearClass?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lifts?: Resolver<Array<ResolversTypes['Lift']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sex?: Resolver<ResolversTypes['Sex'], ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type LiftResolvers<ContextType = any, ParentType extends ResolversParentTypes['Lift'] = ResolversParentTypes['Lift']> = ResolversObject<{
  age?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  ageClass?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bench1Kg?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  bench2Kg?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  bench3Kg?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  bench4Kg?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  best3BenchKg?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  best3DeadliftKg?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  best3SquatKg?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  birthYearClass?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bodyweightKg?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  deadlift1Kg?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  deadlift2Kg?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  deadlift3Kg?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  deadlift4Kg?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  division?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dots?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  equipment?: Resolver<ResolversTypes['Equipment'], ParentType, ContextType>;
  event?: Resolver<ResolversTypes['Event'], ParentType, ContextType>;
  federation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  glossbrenner?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  goodlift?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  meetCountry?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  meetName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  meetState?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  meetTown?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  parentFederation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  place?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sanctioned?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sex?: Resolver<ResolversTypes['Sex'], ParentType, ContextType>;
  squat1Kg?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  squat2Kg?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  squat3Kg?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  squat4Kg?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tested?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  totalKg?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  weightClassKg?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  wilks?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
}>;

export type MeetResolvers<ContextType = any, ParentType extends ResolversParentTypes['Meet'] = ResolversParentTypes['Meet']> = ResolversObject<{
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  federation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  parentFederation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sanctioned?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  town?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  lifts?: Resolver<Array<ResolversTypes['Lift']>, ParentType, ContextType, RequireFields<QueryLiftsArgs, 'limit' | 'offset'>>;
  sbdByBodyweight?: Resolver<Array<ResolversTypes['SbdDataPoint']>, ParentType, ContextType, RequireFields<QuerySbdByBodyweightArgs, 'limit' | 'offset'>>;
}>;

export type SbdDataPointResolvers<ContextType = any, ParentType extends ResolversParentTypes['SbdDataPoint'] = ResolversParentTypes['SbdDataPoint']> = ResolversObject<{
  best3BenchKg?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  best3DeadliftKg?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  best3SquatKg?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  bodyweightKg?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  equipment?: Resolver<Maybe<ResolversTypes['Equipment']>, ParentType, ContextType>;
  event?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType>;
  sex?: Resolver<Maybe<ResolversTypes['Sex']>, ParentType, ContextType>;
  totalKg?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Athlete?: AthleteResolvers<ContextType>;
  Lift?: LiftResolvers<ContextType>;
  Meet?: MeetResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SbdDataPoint?: SbdDataPointResolvers<ContextType>;
}>;

