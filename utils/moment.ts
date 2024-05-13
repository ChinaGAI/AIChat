import dayjs from "dayjs";
import { isNumber } from "lodash";

const moment = (date?: string | number | dayjs.Dayjs | Date | null | undefined) => {
  if (isNumber(date) && date.toString().length === 10) {
    date = date * 1000;
  }
  return dayjs(date);
};

export default moment;
