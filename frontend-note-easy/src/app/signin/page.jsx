"use client";

import React from "react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
// import AppBar from "../components/AppBar";

export default function SigninPage() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();

  axios.defaults.withCredentials = true;
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/signin`, { email, password })
      .then((result) => {
        //console.log(result)
        if (result.data === "User signed in") {
          router.push("/home");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="bg-slate-100 h-screen ">
      {/* <AppBar /> */}
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="bg-white rounded-lg border-y-indigo-950 shadow-lg p-12 max-md:w-2/5">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} method="POST" className="space-y-7">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Do not have an account?
              <a
                href="register"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Register!
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
