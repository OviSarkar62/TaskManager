import moment from "moment";

export const getAntdFormInputRules = [
  {
    required: true,
    message: "Required",
  },
];

export const getDateFormat = (date) => {
  return moment(date).format("DD/MM/YY, hh:mm A");
}