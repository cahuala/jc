/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */ /* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import libre from 'libreoffice-convert';
import { promisify } from 'util';

const convertAsync = promisify(libre.convert);

export async function convertDocxToPdf(docxBuffer: Buffer): Promise<Buffer> {
  const pdfBuffer = await convertAsync(docxBuffer, '.pdf', undefined);

  return pdfBuffer as Buffer;
}
