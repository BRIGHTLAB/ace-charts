"use client";
import LoginForm from "@/components/LoginForm";
import { getSession, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import Container from "@/components/Container";
import Logo from "@/components/Logo/Logo";

type Props = {};

export default function Page(props: Props) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") router.push("/");
  }, [status]);
  return (
    <Container>
      <div className="flex flex-col gap-[2rem] xl:gap-[5rem] justify-center items-center h-full">
        <Logo />
        <div className="w-full max-w-[37.5rem] rounded-[20px] bg-blue-900/30 p-[1rem] lg:p-[3.13rem] text-black">
          <h1 className=" text-2xl lg:text-5xl font-semibold">
            Welcome to Ace Gallagher
          </h1>
          <p className="lg:text-[1.375rem] mt-[10px]">
            Please enter your credentials to log in.
          </p>
          <LoginForm />
        </div>
      </div>
    </Container>
  );
}
