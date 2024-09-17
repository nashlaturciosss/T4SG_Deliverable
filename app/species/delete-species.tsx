import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { createBrowserSupabaseClient } from "@/lib/client-utils";
import type { Database } from "@/lib/schema";
import { useRouter } from "next/navigation";

type Species = Database["public"]["Tables"]["species"]["Row"];

export default function DeleteSpecies({ species }: { species: Species }) {
  const router = useRouter();

  const onDelete = async (specie: Species) => {
    const supabase = createBrowserSupabaseClient();
    const error = await supabase.from("species").delete().eq("id", species.id);
    router.refresh();
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary">
            <Icons.trash className="mr-3 h-5 w-5" />
            Delete Species
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[600px]">
          <DialogTitle>Are you sure you want to delete {species.scientific_name}?</DialogTitle>
          <div className="flex">
            <Button onClick={() => void onDelete(species)} type="submit" className="ml-1 mr-1 flex-auto">
              Delete
            </Button>
            <DialogClose asChild>
              <Button type="button" className="ml-1 mr-1 flex-auto" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
