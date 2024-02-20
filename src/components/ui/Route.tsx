import Link from "next/link";
import clsx from "clsx";
import useMenuActive from "@/hooks/useMenuActive";

interface routeProps {
  route: string;
  label: string;
  //   isActive?: boolean;
  onClick?: () => void;
}

const Route = ({ route, label, onClick }: routeProps) => {
  const isActive = useMenuActive(route);
  return (
    <Link
      href={route}
      onClick={onClick}
      className={clsx(isActive && "text-primary")}
    >
      {label}
    </Link>
  );
};

export default Route;
