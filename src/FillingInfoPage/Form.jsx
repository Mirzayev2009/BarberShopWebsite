import React, { useContext, useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

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
      comment: "",
    },
  });

  const { setPersonalInfo, selectedBarber, selectedHaircut, selectedDate, selectedTime } =
    useContext(DatabaseContext);

  const [submittedData, setSubmittedData] = useState(null);
  const intervalRef = useRef(null);

  const sendMessageToBackend = async (data) => {
    try {
      const response = await fetch("http://localhost:8000/api/messages/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Message failed");
      console.log("Message sent to backend");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  const onSubmit = (data) => {
    if (!selectedBarber || !selectedHaircut || !selectedDate || !selectedTime) {
      alert("Iltimos, barcha maydonlarni to'ldiring.");
      return;
    }

    const fullData = {
      ...data,
      barber: selectedBarber?.id,
      haircut: selectedHaircut?.id,
      date: selectedDate,
      time: selectedTime?.id,
    };

    setPersonalInfo(fullData);
    setSubmittedData(fullData);
    form.reset();
    navigate("/finalpage");
  };

  useEffect(() => {
    const existingId = localStorage.getItem("bookingId");

    if (!submittedData || existingId) return;

    sendMessageToBackend(submittedData);
    intervalRef.current = setInterval(() => {
      sendMessageToBackend(submittedData);
    }, 30000);

    return () => clearInterval(intervalRef.current);
  }, [submittedData]);

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Shaxsiy Ma'lumotlar</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Izoh</FormLabel>
                <FormControl>
                  <Textarea placeholder="Fikr-mulohaza yozing" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-700 text-white text-lg"
          >
            Yuborish
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default PersonalInfoForm;
