export const passwordExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,60}$/;
export const mobileExp = /^[6,7,8,9]{1}[0-9]{9}$/;

export const getCapitalize = (str) => {
  if (str) str = str.toString();

  return str
    ? str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      })
    : "";
};
