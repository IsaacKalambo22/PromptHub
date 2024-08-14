"use client"

import {useEffect, useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {useSession, getProviders, signIn, sigOut} from 'next-auth/react';

const Nav = () => {

  // to check if the user is logged in
  const {data: session} = useSession();

  const [providers, setProviders] = useState(null);
   // the useState for the dropdowm menu
   const [toggleDropdown, setToggleDropdown] = useState(false);

  // to get the providers
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    }

    setUpProviders();
  }, [])


  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image 
          src="/assets/images/logo.svg"
          alt='Promptopia Logo'
          width={30}
          height={30}
          className='object-contain'
        />
          <p className='logo_text'>Promptopia</p>
      </Link>
      
      {/* Desktop  Navigation */}
      {/* this is a desktop view, with the condition to check if the user is logged in or not */}
      <div className='sm:flex hidden  '>
        {session?.user ? (
          // if the the user is logged in then it must show them the create post and sign out button
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create prompt' className='black_btn'>
              Create Post
            </Link>
            <button type='button' onClick={sigOut}
            className='outline_btn'>
              Sign Out
            </button>
            <Link href='/profile'>
              <Image 
                src={session.user.image}
                alt='profile'
                width={37}
                height={37}
                className='rounded-full'
              />
            </Link>
          </div>
        ):(
          // if the the use is not logged in then the user should be given the option to sign in
          <>
            {providers && 
            Object.values(providers).map((provider) => (
              <button
                type='button'
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className='black_btn'
              >
                Sign In
              </button>
            ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
             <Image 
                src={session?.user.image}
                alt='profile'
                width={37}
                height={37}
                className='rounded-full'
                onClick={() => setToggleDropdown((prev) => !prev)}
              /> 
            {/* to check if toggle is true then set it to false so it reserts the naviagtion  */}
              {toggleDropdown && (
                <div className='dropdown'>
                  <Link
                    href='/profile'
                    className='dropdown_link'
                    onClick={() => setToggleDropdown(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href='/create-propmt'
                    className='dropdown_link'
                    onClick={() => setToggleDropdown(false)}
                  >
                    Create Prompt
                  </Link>
                  <button
                    type='button'
                    onClick={() =>{
                      setToggleDropdown(false);
                      sigOut();                   
                     }}
                     className="mt-5 w-full black_btn"
                  >
                    Sign Out
                  </button>
                </div>
              )}
          </div>
        ):(
          <>
          {providers && 
          Object.values(providers).map((provider) => (
            <button
              type='button'
              key={provider.name}
              onClick={() => signIn(provider.id)}
              className='black_btn'
            >
              Sign In
            </button>
          ))}
        </>
        )}
      </div>
    </nav>
  )
}

export default Nav