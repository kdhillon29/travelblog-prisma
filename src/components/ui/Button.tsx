import clsx from "clsx";

interface buttonProps {
  text: string;
  onClick?: () => void;
  aria: string;
  action?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button = ({ text, onClick, aria, action, type }: buttonProps) => {
  return (
    <button
      className={clsx(
        "bg-primary py-2 px-4 rounded-lg hover:bg-primary/80 duration-500 inline-block text-white",
        action &&
          "absolute top-0 z-[2] right-1 bg-red-600 px-2 py-1 text-white rounded-full hover:bg-red-500"
      )}
      onClick={onClick}
      aria-label={aria}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
