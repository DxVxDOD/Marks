import { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-col justify-center w-screen h-screen align-middle bg-slate-800">
      {children}
    </main>
  );
}

export default Layout;
