'use client'

import Image from "next/image";
import Logo from "../app/assests/Logo.svg";
import { ChangeEvent, useEffect, useState, Suspense, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

function HomeContent() {

  //for state mangement through contextAPI
  const { login, isAuthenticated } = useAuth();
  //for Navigation
  const router = useRouter();
  //for query parameters
  const searchParams = useSearchParams();
  //form data
  const [formData, setFromData] = useState({
    username: '',
    password: '',
  })
  //error data
  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });

  // ref to track if the effect has already run
  const effectRan = useRef(false);

  // checking if the user is trying to access unauthorised routes
  useEffect(() => {
    if (effectRan.current) return;

    const AuthMsg = searchParams.get('auth');
    if (AuthMsg === 'N') {
      toast.warning('Please Login!');
    }

    effectRan.current = true;
  }, [searchParams]);

  // Handling the changes of the form
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFromData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  // checks the form validation
  const validateForm = () => {
    const usernameRegex = /^[a-zA-Z0-9]+$/; // Allows only letters and numbers
    const newErrors = {
      username: '',
      password: '',
    };
    let isValid = true;
  
    if (formData.username.trim() === '') {
      newErrors.username = 'Username is required';
      isValid = false;
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters long';
      isValid = false;
    } else if (!usernameRegex.test(formData.username)) {
      newErrors.username = 'Username must not contain special characters';
      isValid = false;
    }
  
    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
      isValid = false;
    }
  
    setErrors(newErrors);
    return isValid;
  };

  //Handles form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return;
    }

    //calls the login API
    const response = await fetch('/api/Login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: formData.username, password: formData.password })
    })

    if (response.ok) {
      login();
      // console.log("After login : ",isAuthenticated);
      router.push('/Dashboard');
    } else {
      toast.error('Wrong username or password');
    }
  }

  return (
    <div className="flex min-h-[100dvh] items-center justify-center BgAll px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <div className="flex justify-center w-full">
            <Image src={Logo} alt="Logo" width={150} height={150} />
          </div>
          <h2 className="mt-16 text-center text-3xl font-bold tracking-tight text-foreground">
            Sign in to your account
          </h2>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit} action="#" method="POST">
          <div>
            <label htmlFor="email" className="sr-only">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full rounded-md border border-input px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm text-Dbalck"
            />
            {errors.username && <p className="mt-2 text-sm text-redd">{errors.username}</p>}
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm text-Dbalck"
            />
            {errors.password && <p className="mt-2 text-sm text-redd">{errors.password}</p>}
          </div>
          <div className="">
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-primary py-2 px-4 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-2 bg-LGreen"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}