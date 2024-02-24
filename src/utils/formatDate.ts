export const formatDate = (dateTime: string) => {
  const dateObj = new Date(dateTime);

  const date = dateObj.getDate();
  const monthName = dateObj.toLocaleString("default", { month: "long" });
  // const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();

  return `${monthName}-${date}-${year}`;
};
