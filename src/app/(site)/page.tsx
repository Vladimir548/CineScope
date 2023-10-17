import HomePage from '@/app/pages-ui/home-page/HomePage';
import dynamic from 'next/dynamic';

const DynamicHome = dynamic(() => import('@/app/pages-ui/home-page/HomePage'), {
  loading: () => (
    <div className={'fixed top-0 left-0 z-999 bg-black w-full h-full'}>
      <p className={'flex justify-center items-center'}>CineScope</p>
    </div>
  ),
});
export default async function Home() {
  return (
    <main>
      <DynamicHome />
    </main>
  );
}
