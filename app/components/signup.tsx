"use client";
import React, { useState } from "react";
import { SIGNUP_USER } from "../apolloclient/action";
import { useMutation } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [createUser] = useMutation(SIGNUP_USER);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser({
        variables: form,
      }).then(() => {
        router.push("/");
        setForm({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      });
    } catch (error) {
      console.log(error + `error`);
    }
  };
  return (
    <div className="my-4 p-2  text-white items-center ">
      <p className="font-bold pb-2 text-center">Sign Up</p>
      <hr />
      <div className="my-3  flex flex-col gap-2">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label htmlFor="name">Enter name</label>
          <input
            className="h-10 px-2 bg-inherit border-b rounded-none border-gray-500"
            type="text"
            name="name"
            onChange={handleChange}
          />
          <label htmlFor="email">Enter Email</label>
          <input
            className="h-10 px-2 bg-inherit border-b rounded-none border-gray-500"
            type="email"
            name="email"
            autoComplete="email"
            onChange={handleChange}
          />
          <label htmlFor="password">Enter Password</label>
          <input
            className="h-10 px-2 bg-inherit  border-b rounded-none border-gray-500"
            type="password"
            name="password"
            id=""
            onChange={handleChange}
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            className="h-10 px-2 bg-inherit border-b rounded-none border-gray-500"
            type="password"
            name="confirmPassword"
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
          Already have an account ?
          <Link href="/" className="cursor-pointer">
            {" "}
            sign in.
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default Signup;
