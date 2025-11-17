export const typeDefs = `#graphql
  type Query {
    leaderboard(
      sex: Sex
      equipment: Equipment
      weightClass: String
      event: Event
      federation: String
      limit: Int = 100
      sortBy: LeaderboardSort = DOTS
    ): [Lift!]!
    
    lifterHistory(name: String!): [Lift!]!
    meetResults(meetName: String!, date: String!): [Lift!]!
  }

  enum Sex {
    M
    F
    Mx
  }

  enum Equipment {
    Raw
    Wraps
    Single_ply
    Multi_ply
    Unlimited
    Straps
  }

  enum Event {
    SBD
    BD
    SD
    SB
    S
    B
    D
  }

  enum LeaderboardSort {
    DOTS
    WILKS
    TOTAL
    GLOSSBRENNER
    GOODLIFT
  }

  type Lift {
    id: ID!
    name: String!
    sex: String
    event: String
    equipment: String
    age: Float
    ageClass: String
    division: String
    bodyweightKg: Float
    weightClassKg: String
    
    best3SquatKg: Float
    best3BenchKg: Float
    best3DeadliftKg: Float
    totalKg: Float
    
    place: String
    dots: Float
    wilks: Float
    
    federation: String
    date: String
    meetName: String
    meetTown: String
    meetState: String
    meetCountry: String
    tested: String
  }
`;
