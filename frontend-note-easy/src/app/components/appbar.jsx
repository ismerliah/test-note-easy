import { Disclosure } from "@headlessui/react";

export default function Appbar() {
  return (
    <Disclosure as="nav" className="bg-slate-100">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16  items-center">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <h1 className="font-agbalumo text-3xl text-A91D3A">
              easy note
            </h1>
          </div>
        </div>
      </div>
    </Disclosure>
  );
}
