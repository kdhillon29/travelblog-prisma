"use client";

interface formInputProps {
  name?: string | any;

  type?: string;
  label?: string;
  id?: string;
  register?: any | undefined;
  placeholder?: string;
  value?: string | number | readonly string[] | undefined;
  error?: { message: string } | any;
}

export const FormInput = function formInput({
  register,
  name,
  type,
  error,
  label,
  id,
  ...inputProps
}: formInputProps) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        className={`${
          error ? " border border-red-400" : ""
        }text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6 border w-full border-gray-200 p-2 rounded-md py-1.5"`}
        type={type}
        id={id}
        {...inputProps}
        {...register(name)}
      />
      {error && <p className="text-red-400 mt-[-10px]">{error.message}</p>}
    </>
  );
};
