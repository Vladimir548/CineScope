'use client';
import Vibrant from 'node-vibrant';

export async function getPalette(imgUrl: string, quantityColor: number, startColor: number) {
  const image = new Image();
  image.crossOrigin = 'anonymous';
  const paletteData: any = await Vibrant.from(imgUrl).getPalette();
  const colorPromise = Object.values(paletteData).map((swatch: any) => {
    const currentColor = swatch?.getRgb();
    const currentPopulation = swatch?.getPopulation();
    return { color: currentColor, population: currentPopulation };
  });
  const resolvedColors = await Promise.all(colorPromise);
  const sortColors = resolvedColors.sort((a: any, b: any) => b?.population - a?.population);
  const sortedValuesColors = sortColors
    .map((colors) => colors.color)
    .slice(startColor - 1, quantityColor);
  console.log(sortedValuesColors);
  return sortedValuesColors;
}
