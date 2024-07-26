import React, { startTransition, useTransition } from "react";
import { Button } from "./ui/button";
import { MdOutlinePublic } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { FaIcons } from "react-icons/fa";
import { toast } from "./ui/use-toast";
import { PublishForm } from "@/actions/form";
import { useRouter } from "next/navigation";

function PublishedFormBtn({ id }: { id: number }) {
  const [loading, startTransition] = useTransition();
  const router = useRouter();
  async function publishForm() {
    try {
      await PublishForm(id);
      toast({
        title: "Success",
        description: "Form published successfully.",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong while publishing form.",
        variant: "destructive",
      });
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={"outline"}
          className="text-white bg-gradient-to-r from-green-500 to-teal-500 gap-1 md:gap-2 p-1 md:p-2"
        >
          <MdOutlinePublic className="w-4 h-4 md:w-6 md:h-6" />
          Published
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Lorem, ipsum dolor sit amet
            consectetur adipisicing elit. Dignissimos aliquam nobis ex laborum?
            Veniam cum aut incidunt eligendi consectetur reiciendis alias
            adipisci perferendis quasi culpa autem, voluptate aspernatur
            molestiae consequuntur?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              startTransition(publishForm);
            }}
          >
            Confirm{loading && <FaIcons className="ml-2 animate-spin" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default PublishedFormBtn;
