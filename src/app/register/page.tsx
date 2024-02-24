"use client";

import { SubmitHandler, UseFormGetValues, useForm } from "react-hook-form";
import { z } from "zod";
import * as Yup from "yup";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { handleRegisterSubmit } from "@/actions/register";
import { FormInput } from "@/components/ui/FormInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export interface IFormInput {
  userName: string;
  userEmail: string;
  password: string;
}

export default function Page() {
  const { status } = useSession();
  console.log("status is", status);
  const router = useRouter();
  useEffect(() => {
    if (status == "authenticated") {
      router.push("/");
    }

    return () => {
      // second
    };
  }, [status, router]);

  const onRegisterSubmit = async (data: IFormInput) => {
    console.log("in form submit");

    await handleRegisterSubmit(data);
    reset();
    router.push("/");
  };
  // const { register, handleSubmit, } = useForm<registerFields>({
  //   resolver: zodResolver(registerSchema),
  //   defaultValues: {
  //     userName: "",
  //     userEmail: "",
  //     password: "",
  //   },
  // });

  const schema = Yup.object().shape({
    userName: Yup.string().required(" username is a required field"),
    userEmail: Yup.string()
      .email("Email is required")
      .required("Email is a required field"),
    password: Yup.string()
      .required("password is a required field")
      .min(5, "password must be min 5 chars")
      .max(10, "password can't be more than 10 chars"),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(schema) });

  return (
    <>
      <form
        onSubmit={handleSubmit(onRegisterSubmit)}
        className="w-2/3  max-sm:w-full flex flex-col gap-8 justify-center align-middle shadow-lg bg-orange-100/50 p-4 mx-auto "
      >
        <FormInput
          id="userName"
          type="text"
          name="userName"
          label="UserName"
          register={register}
          error={errors.userName}
        />

        <FormInput
          id="userEmail"
          type="email"
          name="userEmail"
          label="UserEmail"
          register={register}
          error={errors.userEmail}
        />
        <FormInput
          id="password"
          name="password"
          type="password"
          label="password"
          register={register}
          error={errors.password}
        />
        <input type="submit" />
      </form>
    </>
    // <form
    //   onSubmit={handleSubmit(onSubmit)}
    //   className="w-2/3  max-sm:w-full flex flex-col gap-8 justify-center align-middle shadow-lg bg-orange-100/50 p-4 mx-auto "
    // >
    //   <div>
    //     <label>User Name</label>
    //     <Input type="text" {...register("userName")} />
    //     {/* <Input type="text"/> */}
    //   </div>
    //   <div>
    //     <label>Email</label>
    //     <Input type="Email" placeholder="Email" {...register("userEmail")} />
    //   </div>
    //   <div>
    //     <label>Password</label>
    //     <Input
    //       type="password"
    //       placeholder="password"
    //       {...register("password")}
    //     />
    //   </div>
    //   <input type="submit" name="submit" />
    // </form>
  );
}
