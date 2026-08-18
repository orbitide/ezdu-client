// import type { ReactNode } from 'react';

// export default function AuthLayout({ children }: { children: ReactNode }) {
//     return (
//         <div className="flex min-h-screen flex-col bg-background">
//             {children}
//         </div>
//     );
// }




import { notFound } from "next/navigation";


export default function AuthLayout() {
    // Temporary feature-area block. Remove this layout guard and restore the
    // app shell when routes inside the `(main)` group are ready to go live.
    notFound();
}