import clsx from "clsx";

interface StatusProps {
  status: string;
}

type ColorType = "background" | "text";

export const getStatusColor = (
  status: string | number,
  type: ColorType = "text"
) => {
  if (typeof status === "string") {
    switch (status.toLowerCase()) {
      case "online":
        return type === "background" ? "bg-[#42A25A]" : "text-[#42A25A]";
      case "idle":
        return type === "background" ? "bg-[#CA9654]" : "text-[#CA9654]";
      case "dnd":
        return type === "background" ? "bg-[#D83A42]" : "text-[#D83A42]";
      case "offline":
        return type === "background" ? "bg-[#6B7280]" : "text-[#6B7280]";
      default:
        return type === "background" ? "bg-[#6B7280]" : "text-[#6B7280]";
    }
  }

  return type === "background" ? "bg-[#6B7280]" : "text-[#6B7280]";
};

export const Status = ({ status }: StatusProps) => {
  const getStatusText = (status: string) => {
    if (status.toLowerCase() === "dnd") {
      return "on do not disturb";
    }
    return status;
  };

  const color = getStatusColor(status, "text");
  const isOffline =
    status.toLowerCase() === "offline" || status.toLowerCase() === "";

  return (
    <span className={clsx(`${color}`, !isOffline)}>
      {getStatusText(status)}
    </span>
  );
};
