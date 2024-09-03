"use client";
import Image from "next/image";
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Home() {

  const { data: session, status } = useSession();
  const loading = status === 'loading';

  function LogIn(provider: string) {
    signIn(provider, { redirect: false })
  }

  return (
    <main className="flex flex-col min-h-screen justify-center items-center gap-y-3 p-24">
      {!session && (
        <>
          <span>
            You are not signed in
          </span>
          <div className="flex flex-col justify-center items-center gap-3 w-full max-w-screen-sm p-14">
            <div className="relative z-0 w-full">
              <input
                type="text"
                id="email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" " />
              <label
                htmlFor="email"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                Email
              </label>
            </div>

            <div className="relative z-0 w-full">
              <input
                type="password"
                id="password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" " />
              <label
                htmlFor="password"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                Password
              </label>
            </div>

            <div className="flex items-center justify-between w-full gap-x-3">
              <button
                type="button"
                className="text-black font-bold flex justify-center items-center p-2 w-full bg-white rounded-sm hover:bg-slate-200 mt-3"
                onClick={() => LogIn("email")}
              >
                Sign up
              </button>

              <button
                type="button"
                className="text-black font-bold flex justify-center items-center p-2 w-full bg-white rounded-sm hover:bg-slate-200 mt-3"
                onClick={() => LogIn("email")}
              >
                Sign in
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              className="flex justify-center items-center p-2 w-10 h-10 bg-white rounded-sm hover:bg-slate-200"
              onClick={() => LogIn("facebook")}
            >
              <Image
                src={"/images/Facebook_Logo.png"}
                width={40}
                height={40}
                alt="facebook-logo"
              />
            </button>
            <button
              type="button"
              className="flex justify-center items-center p-2 w-10 h-10 bg-white rounded-sm hover:bg-slate-200"
              onClick={() => LogIn("google")}
            >
              <Image
                src={"/images/Google_Logo.png"}
                width={40}
                height={40}
                alt="google-logo"
              />
            </button>
            <button
              type="button"
              className="flex justify-center items-center p-2 w-10 h-10 bg-white rounded-sm hover:bg-slate-200"
              onClick={() => LogIn("azure-ad")}
            >
              <Image
                src={"/images/Microsoft_logo.png"}
                width={40}
                height={40}
                alt="microsoft-logo"
              />
            </button>
            <button
              type="button"
              className="flex justify-center items-center p-2 w-10 h-10 bg-white rounded-sm hover:bg-slate-200"
              onClick={() => LogIn("line")}
            >
              <Image
                src={"/images/LINE_logo.png"}
                width={40}
                height={40}
                alt="line-logo"
              />
            </button>
          </div>
        </>
      )}
      {session?.user && (
        <>
          {session.user.image && (
            <span
              style={{ backgroundImage: `url('${session.user.image}')` }}
            ></span>
          )}
          <span >
            <small>Signed in as</small>
            <br />
            <strong>{session.user.email ?? session.user.name}</strong>
          </span>
          <a
            href={`/api/auth/signout`}
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
          >
            {' '}
            Sign Out
          </a>
        </>
      )}
    </main>
  );
}
