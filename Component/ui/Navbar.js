import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const [isNightMode, setIsNightMode] = useState(false);
  const router = useRouter();
  const refCode = router.query;

  useEffect(() => {
    if (session) {
      // getUserStatus();
    }
  }, []);

  function logoutHandler() {
    signOut('/login');
    router.push('/login');
    window.localStorage.clear();
  }

  function toggleNightMode() {
    setIsNightMode(!isNightMode);
    document.body.classList.toggle('night-mode', !isNightMode);
  }

  return (
    <>
      <header>
       
      </header>
      <style jsx>{`
        .night-mode {
          background-color: #2c2c2c;
          color: white;
        }
      `}</style>
    </>
  );
};

export default Navbar;
