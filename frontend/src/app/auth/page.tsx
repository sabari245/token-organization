import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Wallet2, ArrowRight } from "lucide-react";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { useWeb3Modal } from "@web3modal/react";
import contract from "@/components/interface.json";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

type CreateOrgFormDetails = {
  orgName: string;
  tokenSymbol: string;
  initialSupply: number;
};

export function CreateOrgDialog() {
  const form = useForm<CreateOrgFormDetails>();

  // chain interactors
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  async function onSubmit(formData: CreateOrgFormDetails) {
    // Handle form submission

    if (!walletClient) {
      console.log("wallets not connected");
      return;
    }

    const [address] = await walletClient.getAddresses();

    const { request } = await publicClient.simulateContract({
      abi: contract.abi,
      address: `0x${contract.address.substring(2)}`,
      functionName: "createOrganization",
      args: [formData.orgName, formData.tokenSymbol, formData.initialSupply],
      account: address,
    });

    const hash = await walletClient.writeContract(request);
  }

  return (
    <>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Organization</DialogTitle>
          <DialogDescription>
            Enter the details of the Organization that you'd like to create
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="orgName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter organization name" {...field} />
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
              name="initialSupply"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Initial Supply</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter initial supply"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">Create Organization</Button>
          </form>
        </Form>
      </DialogContent>
    </>
  );
}

export default function LoginPage() {
  // wallet interactors
  const { open, close } = useWeb3Modal();
  const { status, isConnected, address } = useAccount();

  // chain interactors
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  return (
    <main>
      <Dialog>
        <div className="flex items-center justify-center w-screen min-h-screen">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Connect Your Wallet</CardTitle>
              <CardDescription>
                Please, connect your wallet to proceed further
              </CardDescription>
            </CardHeader>
            <CardContent>
              {status === "connected" ? (
                <Button variant="outline" className="w-full">
                  <Wallet2 className="w-4 h-4 mr-2" />
                  Connected to 0x{address.substring(address.length - 4)}
                </Button>
              ) : (
                <Button onClick={open} variant="outline" className="w-full">
                  <Wallet2 className="w-4 h-4 mr-2" />
                  Connect Your Wallet
                </Button>
              )}
              <Separator className="my-4" />
              <div className="grid gap-2">
                <Label htmlFor="text">Organization Address</Label>
                <Input id="text" type="text" placeholder="0x0000" />
              </div>
            </CardContent>
            <CardFooter className="flex-col">
              <Button className="w-full">
                Login to Organization
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <div>
                <p className="px-8 mt-2 text-sm text-right text-muted-foreground">
                  Wanna create one?{" "}
                  <DialogTrigger asChild>
                    <Button
                      variant="link"
                      className="p-0 m-0 underline underline-offset-4 hover:text-primary"
                    >
                      Create Organization
                    </Button>
                  </DialogTrigger>
                </p>
              </div>
            </CardFooter>
          </Card>
        </div>
        <CreateOrgDialog />
      </Dialog>
    </main>
  );
}
