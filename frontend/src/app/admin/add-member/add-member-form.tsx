import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type AddMemberFormValues = {
  name: string;
  address: string;
  tokenAllocated: number;
  date: string;
};

export function AddMemberForm() {
  const form = useForm<AddMemberFormValues>();

  function onSubmit(data: AddMemberFormValues) {
    // Handle form submission
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ethereum Wallet Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter Ethereum wallet address" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tokenAllocated"
          render={({ field }) => (
            <FormItem>
              <FormLabel>No of Tokens Allocated</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter number of tokens allocated"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="date" placeholder="Enter date" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Add Member</Button>
      </form>
    </Form>
  );
}
