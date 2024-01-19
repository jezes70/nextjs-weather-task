"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const Signin = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const { email, password } = form;
      console.log(form);
      await signIn("credentials", {
        redirect: false,
        email,
        password,
      }).then(() => {
        router.push("/dashboard");
        setForm({
          email: "",
          password: "",
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="my-4 p-2 text-white items-center">
      <p className="font-bold pb-2  items-center text-center">Sign In</p>
      <hr />
      <div className="my-3  justify-center flex flex-col gap-2">
        <form onSubmit={handleSubmit} className="flex flex-col ">
          <label htmlFor="email">Enter Email</label>
          <input
            className="h-10 px-2 bg-inherit border-b rounded-none border-gray-500"
            type="email"
            name="email"
            autoComplete="email"
            id="email"
            onChange={handleChange}
          />
          <label htmlFor="password">Enter Password</label>
          <input
            className="h-10 px-2 bg-inherit  border-b rounded-none border-gray-500"
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="bg-slate-500 rounded-xl w-1/3 mx-auto py-2 my-4"
          >
            Enter
          </button>
        </form>
        <h1 className="text-center">
          New User ?{" "}
          <Link href="/signup" className="cursor-pointer">
            sign up.
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default Signin;
