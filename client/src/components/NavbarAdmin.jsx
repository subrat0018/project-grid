import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { HiMenuAlt2 } from 'react-icons/hi';

import { useDispatch, useSelector } from 'react-redux';
import { adminLogOut } from '../store/auth/adminAuthSlice';

const NavbarAdmin = () => {
  const [navColor, setNavColor] = useState(false);
  const [nav, setNav] = useState(false);

  const dispatch = useDispatch();
  const { admin } = useSelector((store) => store.admin);

  // mobile nav
  const handleNav = () => setNav(!nav);

  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setNavColor(true);
    } else {
      setNavColor(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeBackground);

    return () => {
      window.removeEventListener('scroll', changeBackground);
    };
  }, []);

  const handleLogout = () => {
    dispatch(adminLogOut());
  };

  return (
    <>
      <header
        className={`${
          navColor ? 'bg-bgcolor2 border-b border-zinc-200' : 'bg-bgcolor'
        } fixed z-20 w-full transition duration-200 ease-in-out`}
      >
        <nav className="container mx-auto flex items-center justify-between px-6 py-4 lg:px-16 ">
          {/* mobile nav */}
          <div className="flex text-2xl md:hidden" onClick={handleNav}>
            <HiMenuAlt2 />
          </div>

          {/* logo */}
          <div>
            <NavLink to="/dashboard">
              <img
                className="w-20"
                src="https://res.cloudinary.com/sambitsankalp/image/upload/v1691781777/grid/logo_b2cjoi.png"
                alt="logo"
              />
            </NavLink>
          </div>

          {/* nav links */}
          <div className="flex items-center space-x-3">
            {/* about and products */}
            <ul className="hidden space-x-3 md:flex">
              {admin ? (
                <li className="font-urbanist hover:text-primary space-x-3 font-bold text-zinc-600 transition duration-200 ease-in-out">
                  <span>{admin.email}</span>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              ) : (
                <>
                  <li className="font-urbanist hover:text-primary font-bold text-zinc-600 transition duration-200 ease-in-out">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? 'text-primary' : null
                      }
                      to="/admin/login"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="font-urbanist hover:text-primary font-bold text-zinc-600 transition duration-200 ease-in-out">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? 'text-primary' : null
                      }
                      to="/admin/signup"
                    >
                      Signup
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>

        {/* mobile menu */}
        <div className={nav ? 'absolute w-full md:hidden' : 'hidden'}>
          <div
            className={
              navColor
                ? 'bg-bgcolor transition duration-200 ease-in-out'
                : 'bg-bgcolor2 border-b border-zinc-200 transition duration-200 ease-in-out'
            }
          >
            <ul className="container mx-auto space-y-3 px-6 py-3 lg:px-16">
              <li className="font-urbanist hover:text-primary font-bold text-zinc-600 transition duration-200 ease-in-out">
                <NavLink
                  onClick={handleNav}
                  className={({ isActive }) =>
                    isActive ? 'text-primary' : null
                  }
                  to="/admin/login"
                >
                  Login
                </NavLink>
              </li>
              <li className="font-urbanist hover:text-primary font-bold text-zinc-600 transition duration-200 ease-in-out">
                <NavLink
                  onClick={handleNav}
                  className={({ isActive }) =>
                    isActive ? 'text-primary' : null
                  }
                  to="/admin/signup"
                >
                  Signup
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};

export default NavbarAdmin;
