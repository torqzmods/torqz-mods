/*
  TORQZ MODS — SITE DATA
  This is the only file you need to edit to add a mod, post an update,
  or turn on a social link. Everything on the site reads from here.
*/

/* Social links. Leave a link as "" and the site shows "Coming soon" instead of a dead link. */
export const LINKS = {
  discord: "https://discord.gg/3efxR7dF4n",
  youtube: "https://www.youtube.com/@itstorqz",
  tiktok: "https://www.tiktok.com/@torqz6",
  github: "https://github.com/torqzmods/torqz-mods",
  patreon: "https://www.patreon.com/cw/Torqz"
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
    status: "Released",
    access: "Free",
    tagline: "Your cars keep their history.",
    description:
      "Own your cars in BeamNG.drive. Add any car to your garage and it keeps its miles, driving time, condition and service history, plus a profile you fill in yourself. Spawn it again later and it's recognized automatically.",
    features: [
      "Recognizes your cars automatically",
      "Mileage and driving time",
      "Oil, tire, brake and filter wear",
      "Worn parts change how the car drives",
      "Spawn any garage car again with its exact parts and paint",
      "Crash and damage history with repair costs",
      "Trip log and 19 milestones",
      "Sell or retire a car and keep its history",
      "Adjustable wear speed and \"due in\" service estimates",
      "Service history",
      "Car profile and owner info",
      "Neon in-game app with mini mode"
    ],
    milestones: [
      { name: "Foundation", status: "done" },
      { name: "Vehicle data", status: "done" },
      { name: "Persistent garage", status: "done" },
      { name: "In-game UI", status: "done" },
      { name: "Testing", status: "done" },
      { name: "Release", status: "done" }
    ],
    image: null,   // e.g. "assets/mods/torqz-garage.jpg" — a screenshot or banner, 16:9 looks best
    version: "2.2.0",
    download: "downloads/Torqz_Garage_2.2.0.zip"
  },
  {
    id: "torqz-garage-pro",
    name: "Torqz Garage Pro",
    project: "Project 02",
    status: "In development",
    access: "Patreon",
    tagline: "The full garage, no limits.",
    description:
      "Everything in Torqz Garage, plus a money system, five more wearing parts, tune presets, daily challenges, stats and graphs, shareable car cards and themes. Built for Torqz Mods Patreon members.",
    features: [
      "Earn money and pay for services and repairs",
      "Engine, transmission, clutch, suspension and exhaust wear",
      "Tune presets with best 0-60 and top speed",
      "Daily and weekly challenges with a streak",
      "Stats, fuel economy and condition graphs",
      "Shareable neon car cards and a photo log",
      "Five color themes",
      "Unlimited cars, named garages, daily backups"
    ],
    milestones: [
      { name: "Foundation", status: "done" },
      { name: "Pro features", status: "done" },
      { name: "Testing", status: "now" },
      { name: "Patreon launch", status: "next" }
    ],
    image: null,
    version: null,
    download: null
  }
];

/* UPDATES — newest first. */
export const UPDATES = [
  {
    date: "2026-10-17",
    mod: "Torqz Garage",
    title: "Torqz Garage 2.2.0 is out",
    text: "Sell or retire a car and keep its whole history in Past cars, set how fast parts wear, see roughly how many miles until each service, and check your garage totals. Six new milestones bring the total to 19. Your 2.1 save loads as it is. Free on the Downloads page."
  },
  {
    date: "2026-10-16",
    mod: "Torqz Garage",
    title: "Torqz Garage 2.1.0 is out",
    text: "The first public release. Add your cars to a garage, spawn them again later, track miles, wear, crashes and trips, and earn milestones. Free to download on the Downloads page."
  },
  {
    date: "2026-10-16",
    mod: "Torqz Garage Pro",
    title: "Torqz Garage Pro is in testing",
    text: "Project 02 is built: a separate Patreon mod with a money system, five extra wearing parts, tune presets, daily challenges, stats and graphs, car cards and themes. The free Torqz Garage stays as it is."
  },
  {
    date: "2026-10-16",
    mod: "Torqz Garage",
    title: "Torqz Garage 2.1: spawn, crashes, trips and wear that matters",
    text: "Spawn any car from your garage with its exact parts and paint. Crashes are logged with a repair cost, every drive is saved in a trip log, and 13 milestones unlock as you rack up miles. Worn oil, tires and brakes now change how the car drives. Tested in-game."
  },
  {
    date: "2026-10-16",
    mod: "Torqz Garage",
    title: "Torqz Garage 2.0: rebuilt from scratch",
    text: "A brand-new in-game app, cars that are recognized when you spawn them again, oil, tire, brake and air filter wear with a service log, and a profile for every car. Now in testing."
  },
  {
    date: "2026-10-16",
    mod: "Torqz Garage",
    title: "Add to Garage works in-game",
    text: "The first car was added to a real garage, and its miles and driving time were saved while driving."
  },
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
