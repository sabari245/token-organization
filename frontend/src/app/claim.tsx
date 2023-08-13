import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Wallet2, ArrowRight } from "lucide-react";

export function ClaimToken() {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Hello &amp; Welcome</CardTitle>
        <CardDescription>
          Please, claim your tokens once there is no <br />
          remaining time
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          00:00:00
        </h1>
        <div>
          <p className="px-8 mt-2 text-sm text-center text-muted-foreground">
            time remaining to claim
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex-col">
        <Button className="w-full">
          Claim 100 tokens
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
}
