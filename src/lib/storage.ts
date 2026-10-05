/** Accès protégé au localStorage (navigation privée, stockage bloqué…). */
export const storage = {
  get(key: string): string | null {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string): void {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      /* stockage indisponible : la préférence ne sera simplement pas mémorisée */
    }
  },
};
