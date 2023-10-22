import './globals.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { UIProvider } from '@/providers/UIProvider';
import ReduxProvider from '@/providers/ReduxProviders';
import QueryProvider from '@/providers/QueryProvider';
import { Sidebar } from '@/components/sidebar/Sidebar';
import Header from '@/components/header/Header';
import ButtonUp from '@/components/btn-up/ButtonUP';
import SidebarBottom from '@/components/sidebar-bottom/SidebarBottom';

const roboto = Roboto({ subsets: ['latin'], weight: ['400'] });

export const metadata: Metadata = {
  title: 'CineScope',
  description: 'Мир кино',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ReduxProvider>
          <UIProvider>
            <main className="dark text-foreground bg-background flex ">
              <aside className="">
                <Sidebar />
              </aside>
              <div className="relative mb-[48px] md:mb-0 w-full ">
                <Header />
                <QueryProvider>{children}</QueryProvider>
              </div>
              <ButtonUp />
              <SidebarBottom />
            </main>
          </UIProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
