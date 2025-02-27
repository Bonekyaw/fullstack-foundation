import { Link, useActionData, useNavigation, useSubmit } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "./Password-Input";
import {
  Form,
  FormControl,
  //FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const FormSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be 8 digits.")
    .max(8, "Password must be 8 digits.")
    .regex(/^\d+$/, "Password must be numbers"),
  confirmPassword: z
    .string()
    .min(8, "Password must be 8 digits.")
    .max(8, "Password must be 8 digits.")
    .regex(/^\d+$/, "Password must be numbers"),
});

export function ConfirmPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const submit = useSubmit();
  const navigation = useNavigation();
  const actionData = useActionData() as {
    error?: string;
    message?: string;
  };

  const isSubmitting = navigation.state === "submitting";

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    // console.log(values);
    submit(values, { method: "post", action: "/register/confirm-password" });
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <Link
              to="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md">
                <Icons.logo className="mr-2 h-6 w-6" aria-hidden="true" />
              </div>
              <span className="sr-only">Confirm Password</span>
            </Link>
            <h1 className="text-xl font-bold">Please confirm your password</h1>
            <div className="text-center text-sm">
              Passwords must be 8 digits long and contain only numbers. They
              must match.
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                  autoComplete="off"
                >
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <PasswordInput
                            required
                            // minLength={8}
                            // maxLength={8}
                            inputMode="numeric"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <PasswordInput
                            required
                            // minLength={8}
                            // maxLength={8}
                            inputMode="numeric"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {actionData && (
                    <p className="text-xs text-red-400">
                      {actionData?.message}
                    </p>
                  )}
                  <div className="grid gap-4">
                    <Button type="submit" className="mt-4 w-full">
                      {isSubmitting ? "Submitting..." : "Confirm"}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
