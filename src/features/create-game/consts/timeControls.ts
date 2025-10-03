import { TIME_CONTROL_ICONS } from "@/consts";

export const PLAY_TIME_CONTROLS = [
  {
    label: "Bullet",
    icon: TIME_CONTROL_ICONS.bullet,
    options: [
      {
        label: "1 min",
        value: "1",
      },
      {
        label: "1|1",
        value: "1|1",
      },
      {
        label: "2 | 1",
        value: "2|1",
      },
    ],
  },
  {
    label: "Blitz",
    icon: TIME_CONTROL_ICONS.blitz,
    options: [
      {
        label: "3 min",
        value: "3",
      },
      {
        label: "3 | 2",
        value: "3|2",
      },
      {
        label: "5 min",
        value: "5",
      },
    ],
  },
  {
    label: "Rapid",
    icon: TIME_CONTROL_ICONS.rapid,
    options: [
      {
        label: "10 min",
        value: "10",
      },
      {
        label: "15 | 10",
        value: "15|10",
      },
      {
        label: "30 min",
        value: "30",
      },
    ],
  },
];
