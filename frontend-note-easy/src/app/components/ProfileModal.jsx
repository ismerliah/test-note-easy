import React, { useEffect, useState, Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import axios from "axios";
import { Button, IconButton } from "@mui/material";
import { Input } from "antd";
import { FiX } from "react-icons/fi";

function ProfileModal({ isProfileOpen, closeProfileModal }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [id, setID] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/user`,
          {
            withCredentials: true,
          }
        );
        if (response.data) {
          setEmail(response.data.email);
          setUsername(response.data.username);
          setID(response.data._id);
          //console.log(response.data);
        } else {
          console.error("User not found");
          router.push("/");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/edit-user`,
        { id, username, email },
        { withCredentials: true }
      );
      //console.log(result);
      closeProfileModal();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Transition appear show={isProfileOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeProfileModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="absolute top-4 right-4">
                  <IconButton onClick={closeProfileModal}>
                    <FiX size={20} />
                  </IconButton>
                </div>
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Profile
                </DialogTitle>

                <form
                  className="mt-6 space-y-6"
                  onSubmit={handleSubmit}
                  method="POST"
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email
                    </label>
                    <div className="mt-2">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        className="w-full rounded-md"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Username
                    </label>
                    <div className="mt-2">
                      <Input
                        id="username"
                        name="username"
                        type="text"
                        value={username}
                        className="w-full rounded-md"
                        required
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end gap-3">
                    <Button
                      variant="outlined"
                      onClick={closeProfileModal}
                      style={{
                        borderRadius: "6px",
                      }}
                      disableElevation
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      type="submit"
                      style={{
                        borderRadius: "6px",
                      }}
                      disableElevation
                    >
                      Save
                    </Button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ProfileModal;
