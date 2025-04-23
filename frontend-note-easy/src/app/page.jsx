export default function First() {
  return (
    <main>
      <div className="bg-slate-100 flex h-screen flex-1 flex-col justify-center items-center">
        <div className="flex flex-col bg-white rounded-lg border-y-indigo-950 shadow-lg p-12 md:w-2/5">
        
          <div className="text-center sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="font-agbalumo text-5xl text-A91D3A">
              short note
            </h2>
          </div>

          <div className="mt-10 space-y-9 sm:mx-auto sm:w-40 sm:max-w-sm">
            <a
              href="register"
              className="flex w-50 justify-center rounded-md bg-slate-800 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
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
