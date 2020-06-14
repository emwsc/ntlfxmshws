import { CHANGE_STATUS_SHOW_STATES } from "./types";
import { SHOW_STATUSES } from "../../logic";

export const STATUS_COLOR: { [key in CHANGE_STATUS_SHOW_STATES]: string } = {
  INIT: "transparent",
  CHANGING: "transparent",
  SUCCESS:
    "linear-gradient(90deg, rgba(247,203,21,0) 0%, rgba(50,150,93,0.6446779395351891) 60%, rgba(50,150,93,1) 75%);",
  FAILED:
    "linear-gradient(90deg, rgba(247,203,21,0) 0%, rgba(229,9,20,1) 60%, rgba(229,9,20,1) 75%);",
  EPISODES_NOT_MATCHING:
    "linear-gradient(90deg, rgba(247,203,21,0) 0%, rgba(229,9,20,1) 60%, rgba(229,9,20,1) 75%);",
  SAME_WATCHED_COUNT: "transparent",
};

export const HOVER_ICON_STYLE = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

export const MY_SHOWS_SHOW_URL = "https://myshows.me/view/";

export const MY_SHOWS_WATCHING_STATUS: { [key in SHOW_STATUSES]: string } = {
  none: "Не отмечено на MyShows",
  watching: "Отмечено как СМОТРЮ на MyShows",
  later: "Отмечено как БУДУ СМОТРЕТЬ на MyShows",
  cancelled: "Отмечено как ПЕРЕСТАЛ СМОТРЕТЬ на MyShows",
  finished: "Полностью посмотрел",
};