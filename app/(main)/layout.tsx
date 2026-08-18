import { notFound } from "next/navigation";


export default function MainLayout() {
    // Temporary feature-area block. Remove this layout guard and restore the
    // app shell when routes inside the `(main)` group are ready to go live.
    notFound();
}















// import type { ReactNode } from 'react';
// import { AppSidebar } from '@/components/shared/AppSidebar';
// import { AppHeader } from '@/components/shared/AppHeader';

// export default function MainLayout({ children }: { children: ReactNode }) {
//     return (
//         <div className="flex h-screen overflow-hidden bg-background">
//             <AppSidebar />
//             <div className="flex flex-1 flex-col overflow-hidden">
//                 <AppHeader className="block md:hidden"/>
//                 {/* `min-h-0` lets immersive routes (quiz/challenge sessions)
//                     own the full height with their own `flex-1 overflow-y-auto`. */}
//                 <main className="min-h-0 flex-1 overflow-y-auto">
//                     {children}
//                 </main>
//             </div>
//         </div>
//     );
// }
