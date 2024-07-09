/**
 * v0 by Vercel.
 * @see https://v0.dev/t/kEsmXLz8MFe
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"

export default function Footer() {
  return (
    // <footer className="bg-muted py-8 md:py-12">
    //   <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-6">
    //     <div className="flex flex-col gap-4">
    //       <Link href="#" className="flex items-center gap-2" prefetch={false}>
    //         <MountainIcon className="h-6 w-6" />
    //         <span className="text-lg font-bold">EduTeck</span>
    //       </Link>
    //       <p className="text-muted-foreground">
    //         EduTeck is a leading provider of innovative educational technology solutions, empowering learners and
    //         educators worldwide.
    //       </p>
    //     </div>
    //     <div className="grid grid-cols-2 gap-4">
    //       <div className="grid gap-2">
    //         <h3 className="text-lg font-semibold">Quick Links</h3>
    //         <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}>
    //           About
    //         </Link>
    //         <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}>
    //           Courses
    //         </Link>
    //         <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}>
    //           Contact
    //         </Link>
    //       </div>
    //       <div className="grid gap-2">
    //         <h3 className="text-lg font-semibold">Resources</h3>
    //         <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}>
    //           Blog
    //         </Link>
    //         <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}>
    //           FAQ
    //         </Link>
    //         <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}>
    //           Support
    //         </Link>
    //       </div>
    //     </div>
    //     <div className="flex flex-col gap-4 justify-end">
            
    //       <p className="text-muted-foreground text-sm">&copy; 2024 EduTeck. All rights reserved.</p>
    //       <div className="flex gap-4">
    //         <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}>
    //           Privacy Policy
    //         </Link>
    //         <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}>
    //           Terms of Service
    //         </Link>
    //       </div>
    //     </div>
    //   </div>
    // </footer>
    <>
    </>
  )
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}