export const converVND = (value) => {
  return value.toLocaleString("it-IT", { style: "currency", currency: "VND" });
};

export const converTimestampToDate = (value) => {
  const x = new Date(value * 1000);
  return `${x.getDate()}/${x.getMonth() + 1}/${x.getFullYear()} `;
};
