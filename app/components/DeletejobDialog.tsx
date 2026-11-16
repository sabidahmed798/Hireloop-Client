"use client"
import { Trash2Icon } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { JobPost } from "../dashboard/recruiter/jobs/page"
import { useState } from "react"
import { toast } from "@/components/ui/toast"

export function DeletejobDialog({
  job,
  onDelete,
}: {
  job: JobPost
  onDelete: (id: string) => Promise<{ deleteCount: number }>
}) {
  const [open, setOpen] = useState(false)
  const handleDelete = async () => {
    const res = await onDelete(job._id)
    console.log("deleting", job._id, res)
    // if (res.deleteCount) {
    setOpen(false)
    toast.add({
      title: "Job deleted",
      description: "the job has been deleted successfully",
    })
    // }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button variant="destructive">
            {" "}
            <Trash2Icon />
          </Button>
        }
      />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete job post?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete “{job.title}”. This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} variant="destructive">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
