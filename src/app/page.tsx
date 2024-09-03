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
    <main className="flex min-h-screen flex-col items-center gap-y-3 p-24">
      {!session && (
        <>
          <span>
            You are not signed in
          </span>
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
