"use client";

import { Separator } from "@/components/ui/separator";
import { Members } from "./members";
import { InfoCard } from "./card";

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Dashboard</h3>
        {/* <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p> */}
      </div>
      <Separator />

      {/* <ProfileForm /> */}
      <main>
        <div className="grid gap-4 md:grid-cols-2">
          <InfoCard
            title="Token"
            value={400}
            info="total supply of the token"
          />
          <InfoCard
            title="Reserved"
            value={100}
            info="total number of tokens reserved for members"
          />
        </div>
        <h3 className="text-lg font-medium">Members</h3>
        <div className="mt-8">
          <Members />
        </div>
      </main>
    </div>
  );
}
