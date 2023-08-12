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

type MintFormValues = {
  tokenName: string;
  tokenSymbol: string;
  amountToMint: number;
};

export function MintForm() {
  const form = useForm<MintFormValues>();

  function onSubmit(data: MintFormValues) {
    // Handle form submission
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="tokenName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Token Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter token name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tokenSymbol"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Token Symbol</FormLabel>
              <FormControl>
                <Input placeholder="Enter token symbol" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amountToMint"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount to Mint</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter amount to mint"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Mint Token</Button>
      </form>
    </Form>
  );
}
