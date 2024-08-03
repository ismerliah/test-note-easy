"use client"

import {
  Disclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useRouter } from 'next/navigation'
import ProfileModal from "./profile-model";
import { useEffect, useState } from "react";

export default function Nav() {
  const [isProfileOpen, setisProfileOpen] = useState(false);
  const [username, setUsername] = useState();
  const router = useRouter()
  function closeProfileModal() {
    setisProfileOpen(false);
  }

  function openProfileModal() {
    setisProfileOpen(true);
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/user", { withCredentials: true });
        if (response.data.username) {
          setUsername(response.data.username);
        } else {
          console.error('Username not found in response');
        }        
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  const handleSignout = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3001/api/signout')
    .then(result => console.log(result),
    router.push('/')
  )
    .catch(err => console.log(err))
  }

  return (
    <Disclosure as="nav" className="bg-slate-100">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <h1 className="font-agbalumo text-3xl text-A91D3A">
              easy note
            </h1>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full text-sm">
                  <UserCircleIcon className="h-8 w-8 text-gray-900" />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition"
              >
                <MenuItem  as="div" >
                  <a
                    className="0block px-4 py-3 text-lg font-bold text-C75B7A data-[focus]:bg-gray-100"
                  >
                    Hello, {username}
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    onClick={openProfileModal}
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                  >
                    Edit Profile
                  </a>
                </MenuItem>

                <MenuItem>
                  <a
                    onClick={handleSignout}
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                  >
                    Sign out
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>
      <ProfileModal isProfileOpen={isProfileOpen} closeProfileModal={closeProfileModal} />
    </Disclosure>
  );
}
