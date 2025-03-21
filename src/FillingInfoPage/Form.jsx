import React, { useContext } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatabaseContext } from "@/DataBase";

const formSchema = z.object({
  name: z.string().min(5, { message: "Ism kamida 5 ta harfdan iborat bo'lishi kerak" }),
  phone: z.string().min(13, { message: "Telefon raqamni to'liq kiriting" }),
  email: z.string().email({ message: "Emailni kiriting" }),
  comment: z.string().min(10, { message: "Izoh kamida 10 ta harf bo'lishi kerak" }).optional(),
});


export function PersonalInfoForm() {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
  });
  const {setPersonalInfo} = useContext(DatabaseContext)

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    setPersonalInfo(data)
    navigate("/finalpage"); // Redirect after successful form submission
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-4">Shaxsiy ma'lumotlar</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ism</FormLabel>
                <FormControl>
                  <Input placeholder="Ismingizni kiriting" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefon raqam</FormLabel>
                <FormControl>
                  <Input placeholder="+998 99 999 99 99" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="misoluchun@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="comment"  // This should match your form schema
            render={({ field }) => (
             <FormItem>
              <FormLabel>Izoh</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Fikr-mulohaza yozing" />
             </FormControl>
             <FormMessage />
           </FormItem>
          )}
        />


          <Button type="submit" className="w-full bg-amber-600">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default PersonalInfoForm;

