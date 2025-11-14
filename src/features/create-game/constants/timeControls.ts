import { TIME_CONTROL_ICONS } from "@/constants/timeControlIcons";

export const PLAY_TIME_CONTROLS = [
  {
    label: "bullet",
    icon: TIME_CONTROL_ICONS.bullet,
    options: [
      {
        label: "1 min",
        time: 60,
        increment: 0,
      },
      {
        label: "1|1",
        time: 60,
        increment: 1,
      },
      {
        label: "2 | 1",
        time: 120,
        increment: 1,
      },
    ],
  },
  {
    label: "blitz",
    icon: TIME_CONTROL_ICONS.blitz,
    options: [
      {
        label: "3 min",
        time: 180,
        increment: 0,
      },
      {
        label: "3 | 2",
        time: 180,
        increment: 2,
      },
      {
        label: "5 min",
        time: 300,
        increment: 0,
      },
    ],
  },
  {
    label: "rapid",
    icon: TIME_CONTROL_ICONS.rapid,
    options: [
      {
        label: "10 min",
        time: 600,
        increment: 0,
      },
      {
        label: "15 | 10",
        time: 900,
        increment: 10,
      },
      {
        label: "30 min",
        time: 1800,
        increment: 0,
      },
    ],
  },
];
