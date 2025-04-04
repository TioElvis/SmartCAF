"use client";
import { z } from "zod";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { _axios } from "@/providers/axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { extractAxiosErrorMessage } from "@/lib/utils";

export default function Page() {
  const schema = z.object({
    email: z.string().min(1, { message: "Required" }).email(),
    password: z.string().min(1, { message: "Required" }),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const { toast } = useToast();
  const { push } = useRouter();

  const { mutate, isPending } = useMutation({
    mutationKey: ["sign-in"],
    mutationFn: async (values: z.infer<typeof schema>) => {
      try {
        await _axios.post("/auth/sign-in", values);
      } catch (error) {
        throw new Error(extractAxiosErrorMessage(error));
      }
    },
    onSuccess: () => {
      push("/");
    },
    onError: (error) => {
      toast({
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <main className="w-full h-screen p-4 grid lg:grid-cols-2">
      <section className="flex items-center justify-center">
        <Form {...form}>
          <form
            className="space-y-6"
            onSubmit={form.handleSubmit(async (values) => mutate(values))}>
            <h2 className="text-4xl font-semibold">Benvenuto 👋</h2>
            <p className="max-w-[28rem] text-muted-foreground">
              Noi ti aiutiamo con tutti i servizi di cui hai bisogno. Accedi per
              gestire le tue pratiche in modo semplice e veloce!
            </p>
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="on"
                      placeholder="Inserisci la tua email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Inserisci la tua password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex justify-end">
              <Link href="#" className="text-primary hover:underline">
                Hai dimenticato la password?
              </Link>
            </div>
            <Button className="w-full" disabled={isPending}>
              {isPending ? <Spinner className="flex gap-2" /> : "Accedi"}
            </Button>
          </form>
        </Form>
      </section>
      <section className="hidden lg:block w-full h-full rounded-2xl bg-top bg-[url('/abraham_mignon_flowers_metal_vase.jpg')]"></section>
    </main>
  );
}
