"use client";
import React, { useEffect, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { signIn } from "next-auth/react";
import Loading from "./Loading";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type credentials = {
  username: string;
  password: string;
};

const LoginForm = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState<credentials>({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const emptyCredentials = () => {
    if (
      credentials.username.trim() === "" ||
      credentials.password.trim() === ""
    )
      return true;
    return false;
  };

  const handleLogin = async () => {
    if (emptyCredentials()) return;
    setIsLoading(true);
    const response = await signIn("credentials", {
      ...credentials,
      redirect: false,
    });
    if (!response?.ok) {
      setIsLoading(false);
      toast.error("Invalid credentials");
    } else {
      router.push("/");
    }
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}
    >
      <div className="mt-5">
        <Input
          placeholder="Username"
          onChange={({ target }) =>
            setCredentials((prev) => ({ ...prev, username: target.value }))
          }
        />
      </div>
      <div className="mt-3">
        <Input
          placeholder="Password"
          type="password"
          onChange={({ target }) =>
            setCredentials((prev) => ({ ...prev, password: target.value }))
          }
        />
      </div>
      <div className="mt-11">
        <div className="w-[15.375rem] h-12 mx-auto">
          <Button
            disabled={emptyCredentials() || isLoading}
            onClick={handleLogin}
          >
            {isLoading ? <Loading /> : "Log In"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
