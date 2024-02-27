"use client";
import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  FacebookLoginButton,
  GithubLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import { FormInput } from "@/components/ui/FormInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Button from "@/components/ui/Button";
const Page = () => {
  const session = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      // console.log("Authenticated", session);
      router.push("/");
    }
  }, [session?.status, router]);

  const socialAction = (action: string, data?: {}) => {
    setIsLoading(true);

    signIn(action, { ...data, redirect: false })
      .then((callback) => {
        if (callback?.error) {
          return;
        }

        if (callback?.ok) {
          router.push("/");
        }
      })
      .finally(() => setIsLoading(false));
  };
  interface IFormInput {
    email: string;
    password: string;
  }
  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Email is required")
      .required("email is a required field"),
    password: Yup.string().required("password is a required field"),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(schema) });

  return (
    <div className=" w-full px-4 md:px-24 mb-1">
      <div className="bg-white shadow sm:rounded-lg flex  justify-start h-auto overflow-hidden">
        <div className=" w-2/3 max-sm:w-full flex gap-2 flex-col justify-center items-center mx-auto">
          <Link href={"/"} className="mb-1">
            <h1 className="text-3xl font-extrabold text-secondary">
              Explore
              <span className="text-primary">X</span>
            </h1>
          </Link>

          <form
            onSubmit={handleSubmit((data) => socialAction("credentials", data))}
            className=" w-[80%] flex flex-col gap-2  max-sm:w-full bg-slate-100/50  shadow-lg  p-4 "
          >
            <h2 className="text-center">Login Here:</h2>
            <FormInput
              id="userName"
              type="text"
              name="email"
              label="Email"
              register={register}
              error={errors.email}
            />
            <FormInput
              id="password"
              type="password"
              name="password"
              label="password"
              register={register}
              error={errors.password}
            />
            <Button
              type="submit"
              text={isLoading ? "Signing In.." : "Sign In"}
              aria="sign in"
            />
          </form>
          <div className="mt-6 w-full">
            <p className="text-md p-2  text-center font-bold text-primary">
              <strong>Or</strong> Sign In with the links below
            </p>
            <GoogleLoginButton onClick={() => socialAction("google")} />
            <FacebookLoginButton />
            <GithubLoginButton />
          </div>
        </div>

        <Image
          src="/assets/access.jpg"
          height={400}
          width={400}
          alt="Sign up form image"
          className="object-cover -order-1 w-3/4 md:block hidden"
        />
      </div>
    </div>
  );
};

export default Page;
