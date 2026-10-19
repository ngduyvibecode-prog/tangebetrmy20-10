import { QRConfig } from '@/types';

/**
 * Downloads SVG as PNG by rendering onto an HTML5 Canvas element
 */
export async function downloadQRCodePNG(
  svgElementId: string,
  fileName: string,
  resolution: number = 800
): Promise<string> {
  const svg = document.getElementById(svgElementId);
  if (!svg) {
    throw new Error('SVG element not found');
  }

  const svgData = new XMLSerializer().serializeToString(svg);
  const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
  const URL = window.URL || window.webkitURL || window;
  const blobURL = URL.createObjectURL(svgBlob);

  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = resolution;
      canvas.height = resolution;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas context unavailable'));
        return;
      }

      // Fill white background for scanability
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, resolution, resolution);

      // Draw image
      ctx.drawImage(image, 0, 0, resolution, resolution);
      URL.revokeObjectURL(blobURL);

      const pngData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `${fileName}.png`;
      link.href = pngData;
      link.click();
      resolve(pngData);
    };

    image.onerror = (err) => {
      URL.revokeObjectURL(blobURL);
      reject(err);
    };

    image.src = blobURL;
  });
}

/**
 * Downloads the raw SVG file for vector graphic printing
 */
export function downloadQRCodeSVG(svgElementId: string, fileName: string) {
  const svg = document.getElementById(svgElementId);
  if (!svg) return;

  const svgData = new XMLSerializer().serializeToString(svg);
  const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
  const blobURL = URL.createObjectURL(svgBlob);

  const link = document.createElement('a');
  link.download = `${fileName}.svg`;
  link.href = blobURL;
  link.click();

  URL.revokeObjectURL(blobURL);
}
