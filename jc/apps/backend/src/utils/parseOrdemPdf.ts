/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-useless-escape */
/* eslint-disable no-control-regex */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Injectable } from '@nestjs/common';
import { Poppler, PdfToCairoOptions } from 'node-poppler';
import Tesseract from 'tesseract.js';
import fs from 'fs';
import path from 'path';

@Injectable()
export class OrdemPdfService {
  private poppler = new Poppler();

  async extractDataFromPdf(fileBuffer: Buffer) {
    // 1. Salva o PDF temporariamente
    const pdfPath = path.join(__dirname, 'temp.pdf');
    fs.writeFileSync(pdfPath, fileBuffer);

    // 2. Define prefixo de saída das imagens
    const outputPrefix = path.join(__dirname, 'page');

    // 3. Opções do pdfToCairo
    const options: PdfToCairoOptions = {
      pngFile: true,

      singleFile: false, // uma imagem por página
    };

    // 4. Converte PDF para imagens PNG
    await this.poppler.pdfToCairo(pdfPath, outputPrefix, options);

    // 5. Lista todas as imagens geradas
    const images = fs
      .readdirSync(__dirname)
      .filter((f) => f.startsWith('page') && f.endsWith('.png'))
      .sort(); // garante ordem de páginas

    let allLines: string[] = [];

    // 6. Extrai texto de cada imagem
    for (const img of images) {
      const imgPath = path.join(__dirname, img);
      const {
        data: { text },
      } = await Tesseract.recognize(imgPath, 'por');

      // 7. Divide em linhas e corrige encoding
      const lines = text
        .split('\n')
        .map((l) => this.fixEncoding(l).trim())
        .filter((l) => l);

      allLines.push(...lines);

      // Remove imagem temporária
      fs.unlinkSync(imgPath);
    }

    // Remove PDF temporário
    fs.unlinkSync(pdfPath);

    // 8. Filtra linhas irrelevantes e ignora após "Cumpra-se" na última página
    allLines = this.filterLines(allLines);

    // 9. Extrai campos
    const numeroOrdem = this.extractNumeroOrdem(allLines);
    const assunto = this.extractAssunto(allLines);
    const datas = this.extractDatas(allLines);
    const militares = this.extractMilitares(allLines);

    return {
      totalPaginas: images.length,
      numeroOrdem,
      assunto,
      datas,
      militares,
    };
  }

  private fixEncoding(text: string) {
    let cleaned = text.replace(/[\uFFFD]/g, '').normalize('NFC');

    const fixes = [
      { wrong: 'Ã§', correct: 'ç' },
      { wrong: 'Ã£', correct: 'ã' },
      { wrong: 'Ãº', correct: 'ú' },
      { wrong: 'Ã¡', correct: 'á' },
      { wrong: 'Ã©', correct: 'é' },
      { wrong: 'Ãª', correct: 'ê' },
      { wrong: 'Ã³', correct: 'ó' },
      { wrong: 'Ã‰', correct: 'É' },
      { wrong: 'Ãš', correct: 'Ú' },
      { wrong: 'Ã€', correct: 'À' },
      { wrong: 'Ã“', correct: 'Ó' },
      { wrong: 'â€“', correct: '–' },
      { wrong: 'â€”', correct: '—' },
      { wrong: 'â€˜', correct: '‘' },
      { wrong: 'â€™', correct: '’' },
      { wrong: 'â€œ', correct: '“' },
      { wrong: 'â€\u009d', correct: '”' },
      { wrong: 'â€¢', correct: '•' },
    ];

    for (const f of fixes) cleaned = cleaned.split(f.wrong).join(f.correct);
    cleaned = cleaned.replace(/[^\x00-\x7FÀ-ÿ0-9A-Za-z\s:\/\.,-]/g, '');
    cleaned = cleaned.replace(/\s+/g, ' ').trim();

    return cleaned;
  }

  private filterLines(lines: string[]): string[] {
    const keywords = ['CÓPIA', 'CONFIDENCIAL', 'VALIDADO', 'CARIMBO', 'SELADO'];
    const filtered: string[] = [];

    let stopAfterCumpraSe = false;

    for (const line of lines) {
      const upper = line.toUpperCase();

      if (upper.includes('CUMPRA-SE')) stopAfterCumpraSe = true;
      if (stopAfterCumpraSe) break;

      if (!keywords.some((kw) => upper.includes(kw))) filtered.push(line);
    }

    return filtered;
  }

  private extractNumeroOrdem(lines: string[]): string | null {
    for (const l of lines) {
      const m = l.match(/ORDEM\s+MILITAR\s+N[ºo]?\s*([\w\/\.\-]+)/i);
      if (m) return m[1].trim();
    }
    return null;
  }

  private extractAssunto(lines: string[]): string | null {
    for (const l of lines) {
      const m = l.match(/ASSUNTO\s*[:\s]\s*(.+)/i);
      if (m) return m[1].trim();
    }
    return null;
  }

  private extractDatas(lines: string[]) {
    let aprov: any = null;
    let pub: any = null;
    let vigor: any = null;

    for (const l of lines) {
      if (!aprov && /DATA\s+DE\s+APROVAÇÃO/i.test(l)) {
        const m = l.match(/DATA\s+DE\s+APROVAÇÃO\s*[:\s]\s*([0-9\/\-\.]+)/i);
        if (m) aprov = m[1].trim();
      }
      if (!pub && /DATA\s+DE\s+PUBLICAÇÃO/i.test(l)) {
        const m = l.match(/DATA\s+DE\s+PUBLICAÇÃO\s*[:\s]\s*([0-9\/\-\.]+)/i);
        if (m) pub = m[1].trim();
      }
      if (!vigor && /DATA\s+DE\s+ENTRADA\s+EM\s+VIGOR/i.test(l)) {
        const m = l.match(
          /DATA\s+DE\s+ENTRADA\s+EM\s+VIGOR\s*[:\s]\s*([0-9\/\-\.]+)/i,
        );
        if (m) vigor = m[1].trim();
      }
    }

    return {
      aprovacao: aprov,
      publicacao: pub,
      entradaVigor: vigor,
    };
  }

  private extractMilitares(lines: string[]) {
    const militares: {
      numero: string;
      mecanografico: string;
      posto: string;
      arma: string;
      nome: string;
    }[] = [];

    for (const l of lines) {
      const m = l.match(
        /^(\d{3})\s+(\d{6,12})\s+([A-Za-zÀ-ÿ]+)\s+([A-Z]{2,10})\s+(.+)$/,
      );
      if (m) {
        militares.push({
          numero: m[1],
          mecanografico: m[2],
          posto: m[3],
          arma: m[4],
          nome: m[5].trim(),
        });
      }
    }

    return militares;
  }
}
