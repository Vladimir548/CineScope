import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { UIProvider } from '@/providers/UIProvider';
import ReduxProvider from '@/providers/ReduxProviders';
import QueryProvider from '@/providers/QueryProvider';
import { Sidebar } from '@/components/sidebar/Sidebar';
import Header from '@/components/header/Header';
import ButtonUp from '@/components/btn-up/ButtonUP';
import Footer from '@/components/footer/Footer';
import SidebarBottom from '@/components/sidebar-bottom/SidebarBottom';
import { Suspense } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CineScope',
  description: 'Мир кино',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <ReduxProvider>
            <UIProvider>
              <main className="dark text-foreground bg-background flex ">
                <aside className="">
                  <Sidebar />
                </aside>
                <div className="relative overflow-x-auto  pl-1 mb-[70px] md:mb-0  ">
                  <Header />
                  <Suspense
                    fallback={
                      <h2 className={'fixed top-0 left-0 bg-slate-800 z-50'}>'Loading...'</h2>
                    }
                  >
                    {children}
                  </Suspense>
                </div>
                <ButtonUp />
                <SidebarBottom />
              </main>
            </UIProvider>
          </ReduxProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
