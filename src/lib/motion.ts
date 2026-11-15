/**
 * Motion tokens. One source for timing so the site moves as one system.
 * CSS mirrors these as --ease-out, --ease-in-out, --dur-fast/base/slow in globals.css.
 */

type Bezier = [number, number, number, number];

/** Default for anything entering or responding to the user: fast start, soft landing. */
export const EASE_OUT: Bezier = [0.22, 1, 0.36, 1];

/** For things that move between two on-screen positions. */
export const EASE_IN_OUT: Bezier = [0.65, 0, 0.35, 1];

/** Seconds, for framer-motion. */
export const DUR = {
  /** Hover, press, small state changes. */
  fast: 0.2,
  /** Reveals, menus, cards. */
  base: 0.4,
  /** Hero entrances and large surfaces. */
  slow: 0.7,
} as const;
