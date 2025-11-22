export const typeDefs = `#graphql
  type Query {
    """Get a leaderboard filtered by various criteria and sorted by a coefficient"""
    leaderboard(
      sex: Sex
      equipment: Equipment
      weightClass: String
      event: Event
      federation: String
      country: String
      state: String
      ageClass: String
      tested: Boolean
      minDate: String
      maxDate: String
      limit: Int = 100
      sortBy: LeaderboardSort = DOTS
    ): [Lift!]!
    
    """Get all recorded lifts for a specific lifter by name"""
    lifterHistory(name: String!): [Lift!]!
    
    """Get all results from a specific meet"""
    meetResults(meetName: String!, date: String!): [Lift!]!
    
    """Search for lifters by partial name match"""
    searchLifters(query: String!, limit: Int = 20): [String!]!
    
    """Get aggregate statistics for a lifter"""
    lifterStats(name: String!): LifterStats
  }

  """The sex category in which the lifter competed"""
  enum Sex {
    M
    F
    Mx
  }

  """The equipment category under which the lifts were performed"""
  enum Equipment {
    Raw
    Wraps
    Single_ply
    Multi_ply
    Unlimited
    Straps
  }

  """The type of competition that the lifter entered"""
  enum Event {
    SBD
    BD
    SD
    SB
    S
    B
    D
  }

  """Available sorting options for leaderboards"""
  enum LeaderboardSort {
    DOTS
    WILKS
    TOTAL
    GLOSSBRENNER
    GOODLIFT
  }

  """Aggregate statistics for a lifter across all their meets"""
  type LifterStats {
    name: String!
    totalMeets: Int!
    bestDots: Float
    bestWilks: Float
    bestTotal: Float
    bestSquat: Float
    bestBench: Float
    bestDeadlift: Float
    firstMeetDate: String
    lastMeetDate: String
    federations: [String!]!
  }

  """A single lift performance record"""
  type Lift {
    id: ID!
    
    # Lifter Information
    """The name of the lifter in UTF-8 encoding"""
    name: String!
    
    """The sex category in which the lifter competed"""
    sex: Sex!
    
    """The type of competition that the lifter entered"""
    event: Event!
    
    """The equipment category under which the lifts were performed"""
    equipment: Equipment!
    
    """The age of the lifter on the start date of the meet. Approximate ages end in .5"""
    age: Float
    
    """The age class in which the lifter competed (e.g., 40-45)"""
    ageClass: String
    
    """The birth year class in which the lifter falls (e.g., 40-49)"""
    birthYearClass: String
    
    """Free-form text describing the division of competition"""
    division: String
    
    """The recorded bodyweight of the lifter at the time of competition (kg)"""
    bodyweightKg: Float
    
    """The weight class in which the lifter competed (kg). Uses + suffix for minimums (e.g., 90+)"""
    weightClassKg: String
    
    # Squat Attempts
    squat1Kg: Float
    squat2Kg: Float
    squat3Kg: Float
    squat4Kg: Float
    
    """Maximum of the first three successful squat attempts"""
    best3SquatKg: Float
    
    # Bench Attempts
    bench1Kg: Float
    bench2Kg: Float
    bench3Kg: Float
    bench4Kg: Float
    
    """Maximum of the first three successful bench attempts"""
    best3BenchKg: Float
    
    # Deadlift Attempts
    deadlift1Kg: Float
    deadlift2Kg: Float
    deadlift3Kg: Float
    deadlift4Kg: Float
    
    """Maximum of the first three successful deadlift attempts"""
    best3DeadliftKg: Float
    
    """Sum of Best3SquatKg, Best3BenchKg, and Best3DeadliftKg if all three were successful"""
    totalKg: Float
    
    """The recorded place of the lifter (number, G, DQ, DD, or NS)"""
    place: String!
    
    # Coefficients
    """Dots points (updated Wilks formula, built against drug-tested Raw lifters)"""
    dots: Float
    
    """Wilks points (most common formula for determining Best Lifter)"""
    wilks: Float
    
    """Glossbrenner points (used by GPC-affiliated federations)"""
    glossbrenner: Float
    
    """IPF GL Points (expresses relative performance as a percentage)"""
    goodlift: Float
    
    # Location & Testing
    """Whether the lifter entered a drug-tested category"""
    tested: String
    
    """The home country of the lifter"""
    country: String
    
    """The home state/province of the lifter"""
    state: String
    
    # Meet Information
    """The federation that hosted the meet"""
    federation: String!
    
    """The topmost federation that sanctioned the meet"""
    parentFederation: String
    
    """The start date of the meet in ISO 8601 format (YYYY-MM-DD)"""
    date: String!
    
    """The country in which the meet was held"""
    meetCountry: String!
    
    """The state/province in which the meet was held"""
    meetState: String
    
    """The town in which the meet was held"""
    meetTown: String
    
    """The name of the meet (excludes year and federation)"""
    meetName: String!
    
    """Whether the meet was officially sanctioned"""
    sanctioned: String
  }
`;
