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
import Link from "next/link";

export default function LoginPage() {
  return (
    <main>
      <div className="flex items-center justify-center w-screen min-h-screen">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Connect Your Wallet</CardTitle>
            <CardDescription>
              Please, connect your wallet to proceed further
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <Wallet2 className="w-4 h-4 mr-2" />
              Connect Your Wallet
            </Button>
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
                <Button
                  variant="link"
                  className="p-0 m-0 underline underline-offset-4 hover:text-primary"
                >
                  Create Organization
                </Button>
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
