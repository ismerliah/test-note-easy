import React from "react";
import Nav from "../components/nav";

import { PlusCircleIcon } from "@heroicons/react/24/outline";

export default function HomePage() {
  return (
    <div className="bg-slate-100 h-screen">
      <Nav />
      <div className="flex justify-end">
        <PlusCircleIcon className="h-6 w-6 text-gray-500" />
        <h3 className=" text-xl font-bold text-gray-900">Add new note</h3>
      </div>
    </div>
  );
}
