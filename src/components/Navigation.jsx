import React, { useEffect } from "react";
import "../styles/nav.css";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/logo.svg";
import DefaultUserImg from "../../public/user-icon.svg";
import { UserAuth } from "../context/AuthContext";

const Navigation = () => {
  const { user, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
    };
    checkAuthentication();
  }, [user]);

  return (
    <header className="flex justify-between items-center py-x px-8 text-center bg-[#edf1f6]">
      {/* need to make a map here */}
      <Link href="/">
        <Image src={Logo} alt="Logo" className="z-0 m-2" />
      </Link>

      <div>
        <Link href="/" className="px-8 font-bold text-lg">
          Home
        </Link>
        <Link href="/gallery" className="px-8 font-bold text-lg">
          Gallery
        </Link>
        <Link href="/contact" className="px-8 font-bold text-lg">
          Contact
        </Link>
      </div>

      {user ? (
        <div className="flex flex-row">
          <Image
            src={user?.photoURL || DefaultUserImg}
            width={50}
            height={50}
          />
          <div className="px-8 pt-3">{user.email}</div>
          <button
            className="place-self-center text-white bg-red-600 font-medium rounded-full text-xl px-5 py-2.5 me-2 mb-2 mr-2 h-full"
            onClick={handleSignOut}
          >
            Log out
          </button>
        </div>
      ) : (
        <Link
          href="/signin"
          className="place-self-center text-white bg-gray-800 font-medium rounded-full text-xl px-5 py-2.5 me-2 mb-2 mr-2 h-full"
        >
          Sign In
        </Link>
      )}
    </header>
  );
};

export default Navigation;
