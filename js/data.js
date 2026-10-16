/*
  TORQZ MODS — SITE DATA
  This is the only file you need to edit to add a mod, post an update,
  or turn on a social link. Everything on the site reads from here.
*/

/* Social links. Leave a link as "" and the site shows "Coming soon" instead of a dead link. */
export const LINKS = {
  discord: "",
  youtube: "",
  tiktok: "",
  github: "https://github.com/torqzmods/torqz-mods"
};

/*
  MODS
  status: "In development" | "Released" | "Paused"
  download: put the .zip link here when a mod is released, otherwise leave it null.
  milestones: status is "done" | "now" | "next"
*/
export const MODS = [
  {
    id: "torqz-garage",
    name: "Torqz Garage",
    project: "Project 01",
    status: "In development",
    tagline: "Your cars keep their history.",
    description:
      "Persistent vehicle ownership for BeamNG.drive. Owned cars keep an identity across sessions, with mileage, driving time and service history building up the longer you drive them.",
    features: [
      "Persistent vehicle identity",
      "Mileage tracking",
      "Driving time per car",
      "Garage storage",
      "Service history"
    ],
    milestones: [
      { name: "Foundation", status: "done" },
      { name: "Vehicle data", status: "now" },
      { name: "Persistent garage", status: "next" },
      { name: "In-game UI", status: "next" },
      { name: "Testing", status: "next" }
    ],
    image: null,   // e.g. "assets/mods/torqz-garage.jpg" — a screenshot or banner, 16:9 looks best
    version: null,
    download: null
  }
];

/* UPDATES — newest first. */
export const UPDATES = [
  {
    date: "2026-10-06",
    mod: "Torqz Garage",
    title: "Vehicle data work begins",
    text: "Development has moved into vehicle detection and telemetry, the groundwork every other garage feature depends on."
  },
  {
    date: "2026-10-06",
    mod: "Torqz Garage",
    title: "The mod loads in BeamNG.drive",
    text: "Project 01 now starts up in-game, giving Torqz Garage a working base to build on."
  }
];
