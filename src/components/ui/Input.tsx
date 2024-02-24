import clsx from "clsx";

interface inputProps {
  name: string;
  type: string;
  placeholder?: string;
  value?: string | number | readonly string[] | undefined;
  formRef?: string | {} | any;
}

const Input = ({ name, type, placeholder, value, formRef }: inputProps) => {
  console.log("props are", { formRef });
  return (
    <>
      <input
        className="text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6 border w-full border-gray-200 p-2 rounded-md py-1.5"
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        {...formRef}
        required
      />
    </>
  );
};

export default Input;
