import { createHashRouter, Link } from "react-router";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { Form, FormField } from "../../components/ui/form";

import { forgotPasswordSchema } from "../../components/FormSchema"; // login schema uses email validation
import FormFieldInput from "../../components/FormFieldInput";
import LinkButton from "../../components/LinkButton";

import { authService } from "../../services/authService";
import { useState } from "react";
import { set } from "zod";
//import { email } from "zod";

const ForgotPassword = () => {
  const [message, setMessage] = useState('');
  const form = useForm({
    resolver: yupResolver(forgotPasswordSchema),
    criteriaMode: "firstError",
    defaultValues: { email: "" },
  });

  async function onSubmit(values){
    setMessage('');
    try{
      const response = await authService.forgetPassword({
        email: values.email,
      });
      setMessage(response.data.message || `Password reset link sent to your email.`);
    } catch (error){
      setMessage(error.response?.data?.message || 'Failed to send reset link. Please try again.');
      console.log('Error occurs in forget password');
    }

  }
  // function onSubmit(values) {
  //   console.log("send code to", values.email);
  // }

  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-1">
          Forgot Password
        </h2>
        <p className="text-sm text-gray-400 mb-6">
          Don't worry! It occurs. Please enter the email address lined with your
          account
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
                    label="Email"
                    placeholder="abcere@gmail.com"
                  />
                )}
              />

              {/* submit button*/}
              <LinkButton  text="Send code" className="mt-6" />
            </div>
            <div className="mt-3 text-sm text-red-500">
              {message}
            </div>
          </form>

          <div className="flex flex-col gap-4 mt-6">
            <div className="mt-2 flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-300"></div>
              <p className=" text-gray-400 text-sm">Continue with</p>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

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

export default ForgotPassword;
