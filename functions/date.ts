export const formatTodoDate = (isoDate: string) => {
  const date = new Date(isoDate);

  const day = date.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  const time = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${day} • ${time}`;
};
