import { Button } from "../../components/ui/button";
import { Link, useNavigate } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { FcGoogle } from "react-icons/fc";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import FormFieldInput from "../../components/FormFieldInput";

import { loginFormSchema } from "../../components/FormSchema";
import LinkButton from "../../components/LinkButton";

const Login = () => {
  const [isView, setIsView] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { login } = useAuth();

  const form = useForm({
    resolver: yupResolver(loginFormSchema),
    criteriaMode: "firstError",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    try{
      const response = await login({
        email: values.email,
        password: values.password,
      })
      if(response.success && response.status === 200)
        navigate("/");
      if(!response.success && response.status === 200){
        setError(response.message)
      }
    } catch(error){
      setError(error.response?.data?.message || "Login failed.");
    }
  }

  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-1 ">Sign In</h2>

        <p className="text-sm text-gray-400 mb-6">
          Login to access all your data
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormFieldInput
                    field={field}
                    label="Email Address"
                    placeholder="Enter your email address"
                  />
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormFieldInput
                    field={field}
                    label="Password"
                    placeholder="Enter your password"
                    icon={
                      isView ? (
                        <FaEyeSlash className="text-gray-500 cursor-pointer" />
                      ) : (
                        <FaEye className="text-gray-500 cursor-pointer" />
                      )
                    }
                    iconType={isView ? "text" : "password"}
                    onIconClick={() => {
                      setIsView(!isView);
                    }}
                  />
                )}
              />
            </div>
            {error  && (
                       <div className="mt-3 text-red-600 text-sm">
                         {error}
                      </div>
            )}
            <div className="space-y-4 mt-2">
              {/* forget password */}
              <div className="flex justify-end  text-sm text-gray-400">
                <Button
                  variant="link"
                  size="sm"
                  className="text-gray-500 px-1"
                  asChild
                >
                  <Link to="/forgot-password" className="text-[13px]">
                    Forgot Password ?
                  </Link>
                </Button>
              </div>
              {/* submit button*/}
              <LinkButton text="Login" />
            </div>
          </form>
          <div className="flex flex-col gap-4 mt-3">
            {/* or line */}
            <div className="mt-2 flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-300"></div>
              <p className=" text-gray-400 text-sm">Continue With</p>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>
            {/* other options to login*/}
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50">
              <span className="text-[15px]">Login with Google</span>
              <FcGoogle className="w-6 h-6" />
            </button>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50">
              <span className="text-[15px]">Login with Whatsapp</span>
              <FaWhatsappSquare className="text-green-600 rounded w-6 h-6" />
            </button>

            {/* already have an account */}
            <div className="text-center text-sm">
              <p className="text-gray-500">
                Don't have an account?{" "}
                <Link to="/register" className="text-blue-600">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
