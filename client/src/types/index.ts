/**
 * Mandatory. The sex category in which the lifter competed, M, F, or Mx.
 * Mx (pronounced Muks) is a gender-neutral title — like Mr and Ms — originating from the UK.
 * It is a catch-all sex category that is particularly appropriate for non-binary lifters.
 */
export type Sex = "M" | "F" | "Mx";

/**
 * Mandatory. The type of competition that the lifter entered.
 * SBD: Squat-Bench-Deadlift, also commonly called "Full Power".
 * BD: Bench-Deadlift, also commonly called "Ironman" or "Push-Pull".
 * SD: Squat-Deadlift, very uncommon.
 * SB: Squat-Bench, very uncommon.
 * S: Squat-only.
 * B: Bench-only.
 * D: Deadlift-only.
 */
export type Event = "SBD" | "BD" | "SD" | "SB" | "S" | "B" | "D";

/**
 * Mandatory. The equipment category under which the lifts were performed.
 * Note that this does not mean that the lifter was actually wearing that equipment!
 * Raw: Bare knees or knee sleeves.
 * Wraps: Knee wraps were allowed.
 * Single-ply: Equipped, single-ply suits.
 * Multi-ply: Equipped, multi-ply suits (includes Double-ply).
 * Unlimited: Equipped, multi-ply suits or rubberized gear (like Bench Daddies).
 * Straps: Allowed straps on the deadlift (used mostly for exhibitions, not real meets).
 */
export type Equipment =
  | "Raw"
  | "Wraps"
  | "Single-ply"
  | "Multi-ply"
  | "Unlimited"
  | "Straps";

/**
 * Mandatory. The recorded place of the lifter in the given division at the end of the meet.
 * Positive number: the place the lifter came in.
 * G: Guest lifter. The lifter succeeded, but wasn't eligible for awards.
 * DQ: Disqualified. Note that DQ could be for procedural reasons, not just failed attempts.
 * DD: Doping Disqualification. The lifter failed a drug test.
 * NS: No-Show. The lifter did not show up on the meet day.
 */
export type Place = string;

/**
 * Optional. Yes if the lifter entered a drug-tested category, empty otherwise.
 * Note that this records whether the results count as drug-tested, which does not imply
 * that the lifter actually took a drug test.
 */
export type Tested = "Yes" | "";

/**
 * Optional. Whether the meet counts as officially sanctioned by a federation we recognize.
 * "Yes" for sanctioned, "No" for unsanctioned. Defaults to "Yes".
 */
export type Sanctioned = "Yes" | "No";

export interface Lift {
  /** Internal database ID */
  id: string;

  /** Mandatory. The name of the lifter in UTF-8 encoding. */
  name: string;

  /** Mandatory. The sex category in which the lifter competed. */
  sex: Sex;

  /** Mandatory. The type of competition that the lifter entered. */
  event: Event;

  /** Mandatory. The equipment category under which the lifts were performed. */
  equipment: Equipment;

  /**
   * Optional. The age of the lifter on the start date of the meet, if known.
   * Exact ages are integers (e.g., 23). Approximate ages are integer + 0.5 (e.g., 23.5).
   */
  age?: number;

  /**
   * Optional. The age class in which the lifter falls, for example 40-45.
   * Based on exact age of the lifter on the day of competition.
   */
  ageClass?: string;

  /**
   * Optional. The birth year class in which the lifter falls, for example 40-49.
   * Used primarily by the IPF and IPF affiliates.
   */
  birthYearClass?: string;

  /**
   * Optional. Free-form UTF-8 text describing the division of competition,
   * like "Open" or "Juniors 20-23" or "Professional".
   */
  division?: string;

  /** Optional. The recorded bodyweight of the lifter at the time of competition (kg). */
  bodyweightKg?: number;

  /**
   * Optional. The weight class in which the lifter competed (kg).
   * Maximums are just the number (e.g., "90" means up to 90kg).
   * Minimums have a + suffix (e.g., "90+" means above 90kg).
   */
  weightClassKg?: string;

  /** Optional. First squat attempt (kg). Negative values indicate failed attempts. */
  squat1Kg?: number;

  /** Optional. Second squat attempt (kg). Negative values indicate failed attempts. */
  squat2Kg?: number;

  /** Optional. Third squat attempt (kg). Negative values indicate failed attempts. */
  squat3Kg?: number;

  /**
   * Optional. Fourth squat attempt (kg). Does not count toward total.
   * Used for recording single-lift records. Negative values indicate failed attempts.
   */
  squat4Kg?: number;

  /**
   * Optional. Maximum of the first three successful squat attempts.
   * Rarely may be negative (lowest weight attempted and failed).
   */
  best3SquatKg?: number;

  /** Optional. First bench attempt (kg). Negative values indicate failed attempts. */
  bench1Kg?: number;

  /** Optional. Second bench attempt (kg). Negative values indicate failed attempts. */
  bench2Kg?: number;

  /** Optional. Third bench attempt (kg). Negative values indicate failed attempts. */
  bench3Kg?: number;

  /**
   * Optional. Fourth bench attempt (kg). Does not count toward total.
   * Used for recording single-lift records. Negative values indicate failed attempts.
   */
  bench4Kg?: number;

  /**
   * Optional. Maximum of the first three successful bench attempts.
   * Rarely may be negative (lowest weight attempted and failed).
   */
  best3BenchKg?: number;

  /** Optional. First deadlift attempt (kg). Negative values indicate failed attempts. */
  deadlift1Kg?: number;

  /** Optional. Second deadlift attempt (kg). Negative values indicate failed attempts. */
  deadlift2Kg?: number;

  /** Optional. Third deadlift attempt (kg). Negative values indicate failed attempts. */
  deadlift3Kg?: number;

  /**
   * Optional. Fourth deadlift attempt (kg). Does not count toward total.
   * Used for recording single-lift records. Negative values indicate failed attempts.
   */
  deadlift4Kg?: number;

  /**
   * Optional. Maximum of the first three successful deadlift attempts.
   * Rarely may be negative (lowest weight attempted and failed).
   */
  best3DeadliftKg?: number;

  /**
   * Optional. Sum of Best3SquatKg, Best3BenchKg, and Best3DeadliftKg, if all three were successful.
   * Empty if one lift failed or lifter was disqualified.
   */
  totalKg?: number;

  /** Mandatory. The recorded place of the lifter in the given division at the end of the meet. */
  place: Place;

  /**
   * Optional. Dots points (similar to Wilks).
   * Built against data from drug-tested Raw lifters. Created by Tim Konertz of the BVDK in 2019.
   */
  dots?: number;

  /**
   * Optional. Wilks points (most common formula for determining Best Lifter).
   */
  wilks?: number;

  /**
   * Optional. Glossbrenner points (update of Wilks formula).
   * Most commonly used by GPC-affiliated federations.
   */
  glossbrenner?: number;

  /**
   * Optional. IPF GL Points (successor to IPF Points as of 2019-01-01).
   * Expresses relative performance to expected performance at an IPF World Championship event, as a percentage.
   */
  goodlift?: number;

  /** Optional. "Yes" if the lifter entered a drug-tested category, empty otherwise. */
  tested?: Tested;

  /** Optional. The home country of the lifter, if known. */
  country?: string;

  /** Optional. The home state/province/oblast/division of the lifter, if known. */
  state?: string;

  /** Mandatory. The federation that hosted the meet. */
  federation: string;

  /** Optional. The topmost federation that sanctioned the meet (usually the international body). */
  parentFederation?: string;

  /**
   * Mandatory. The start date of the meet in ISO 8601 format (YYYY-MM-DD).
   * Meets that last more than one day only have the start date recorded.
   */
  date: string;

  /** Mandatory. The country in which the meet was held. */
  meetCountry: string;

  /** Optional. The state, province, or region in which the meet was held. */
  meetState?: string;

  /** Optional. The town in which the meet was held. */
  meetTown?: string;

  /**
   * Mandatory. The name of the meet.
   * Never includes the year or federation (e.g., "Raw National Championships" not "2019 USAPL Raw National Championships").
   */
  meetName: string;

  /**
   * Optional. Whether the meet counts as officially sanctioned ("Yes" or "No").
   * Defaults to "Yes".
   */
  sanctioned?: Sanctioned;
}

export interface LeaderboardData {
  leaderboard: Lift[];
}

export interface LifterHistoryData {
  lifterHistory: Lift[];
}

export interface MeetResultsData {
  meetResults: Lift[];
}
