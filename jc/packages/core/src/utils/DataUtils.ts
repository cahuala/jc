export default class DateUltils {
  static parseFlexibleDate(input?: string | Date|null): Date {
    if (!input) return new Date();

    // Se já for Date, retorna direto
    if (input instanceof Date) return input;

    // Remove espaços extras
    const dateStr = input.trim();

    // Caso venha no formato DD/MM/YYYY
    if (dateStr.includes('/')) {
      const [dia, mes, ano] = dateStr.split('/');
      return new Date(`${ano}-${mes}-${dia}`);
    }

    // Caso venha no formato DD-MM-YYYY
    if (dateStr.includes('-')) {
      // Detecta se é formato ISO (YYYY-MM-DD) ou brasileiro (DD-MM-YYYY)
      const parts = dateStr.split('-');
      if (parts[0].length === 4) {
        // ISO
        return new Date(dateStr);
      } else {
        // Brasileiro
        const [dia, mes, ano] = parts;
        return new Date(`${ano}-${mes}-${dia}`);
      }
    }

    // Caso nada se aplique, retorna a data atual
    return new Date();
  }
}
