<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="outline">
      <Link href="#" className="flex items-center gap-2" prefetch={false}>
        <TrashIcon className="h-4 w-4" />
        Delete
      </Link>
    </Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
      This will permanently delete the student's
      record.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
