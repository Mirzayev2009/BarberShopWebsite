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
  comment: z.string().optional(),
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

  const { setPersonalInfo } = useContext(DatabaseContext);

  const [showSMSInput, setShowSMSInput] = useState(false);
  const [smsCode, setSmsCode] = useState("");
  const [timer, setTimer] = useState(0);
  const [submittedPhone, setSubmittedPhone] = useState(null);
  const intervalRef = useRef(null);

  // Cleanup timer on component unmount
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const startTimer = () => {
    setTimer(30);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev === 1) {
          clearInterval(intervalRef.current);
        }
        return prev - 1;
      });
    }, 1000);
  };

  const sendSMS = async (phone) => {
    try {
      const res = await fetch("http://192.168.1.61:8000/request-sms-code/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      if (!res.ok) throw new Error("SMS yuborishda xatolik");

      setSubmittedPhone(phone);
      setShowSMSInput(true);
      setSmsCode("");
      startTimer();
    } catch (err) {
      console.error(err);
      alert("SMS yuborishda muammo yuz berdi.");
    }
  };

  const verifyCode = async () => {
    try {
      const res = await fetch("http://192.168.1.61:8000/verify-sms-code/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: submittedPhone, code: smsCode }),
      });

      if (res.ok) {
        navigate("/finalpage");
      } else {
        alert("Kod noto‘g‘ri yoki vaqti tugagan.");
      }
    } catch (err) {
      console.error("Kodni tekshirishda xatolik:", err);
    }
  };

  const onSubmit = async (data) => {
    setPersonalInfo(data);
    if (timer === 0) {
      await sendSMS(data.phone);
    } else {
      alert(`Kod yuborilgan. Iltimos ${timer} soniya kuting.`);
    }
  };

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

      {showSMSInput && (
        <div className="mt-6 p-4 border rounded-md bg-gray-50">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            SMS Kodni kiriting:
          </label>
          <Input
            type="text"
            placeholder="123456"
            value={smsCode}
            onChange={(e) => setSmsCode(e.target.value)}
            className="mb-2"
          />
          <Button
            onClick={verifyCode}
            disabled={!smsCode}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Tasdiqlash
          </Button>
          <p className="mt-2 text-sm text-gray-500">
            Kodni qayta yuborish uchun {timer} soniya kuting...
          </p>
        </div>
      )}
    </div>
  );
}

export default PersonalInfoForm;
