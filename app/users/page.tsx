import { Separator } from "@/components/ui/separator";
import { TypographyH2 } from "@/components/ui/typography";
import { createServerSupabaseClient } from "@/lib/server-utils";
import { redirect } from "next/navigation";
import UsersCard from "./users-card";

export default async function UsersList() {
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    // this is a protected route - only users who are signed in can view this route
    redirect("/");
  }

  const { data: profiles } = await supabase.from("profiles").select("*").order("id", { ascending: false });

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <TypographyH2>Users List</TypographyH2>
      </div>
      <Separator className="my-4" />
      <div className="flex flex-wrap justify-center">
        {profiles?.map((profiles) => <UsersCard key={profiles.id} user={profiles} />)}
      </div>
    </>
  );

  // Obtain the ID of the currently signed-in user
}
