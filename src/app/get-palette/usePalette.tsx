'use client';
import { useEffect, useState } from 'react';
import { getPalette } from '@/app/get-palette/getPalette';

export function usePalette(imgUrl: string, quantityColor: number, startColor: number) {
  const [isPalette, setIsPalette] = useState<any[]>([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const dominantColor = await getPalette(imgUrl, quantityColor, startColor);
        setIsPalette(dominantColor);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [imgUrl]);

  return isPalette;
}
