import clsx from "clsx";

interface StatusProps {
  status: string;
}

export const Status = ({ status }: StatusProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "online":
        return "text-[#42A25A] underline underline-offset-2 decoration-[#42A25A]/50";
      case "idle":
        return "text-[#CA9654] underline underline-offset-2 decoration-[#CA9654]/50";
      case "dnd":
        return "text-[#D83A42] underline underline-offset-2 decoration-[#D83A42]/50";
      case "offline":
        return "text-gray-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    if (status.toLowerCase() === "dnd") {
      return "on do not disturb";
    }
    return status;
  };

  return (
    <span className={clsx(getStatusColor(status))}>
      {getStatusText(status)}
    </span>
  );
};
