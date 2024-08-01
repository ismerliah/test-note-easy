import Link from "next/link";

export const metadata = {
  title: "Home",
  description: "Home page",
};

export default function Home() {
  return (
    <main>
      <div className="bg-slate-200 flex h-screen flex-1 flex-col justify-center items-center">
        <div className="bg-white rounded-lg border-y-indigo-950 shadow-lg p-12 md:w-2/5">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-8 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
              Welcome to Note Easy!
            </h2>
          </div>

          <div className="mt-10 space-y-9 sm:mx-auto sm:w-full sm:max-w-sm">
            <a
              href="register"
              className="flex w-50 justify-center rounded-md bg-gray-900 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Register
            </a>

            <a
              href="signin"
              className="flex w-full justify-center rounded-md bg-gray-900 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
            >
              Sign in
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
