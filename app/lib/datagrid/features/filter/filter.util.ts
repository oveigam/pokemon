export function normalizeForSearch(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function textSearchMulti(search = "", searchIn: string[] = []): boolean {
  return normalizeForSearch(searchIn.join(" ")).includes(normalizeForSearch(search));
}

export function textSearch(search = "", searchIn = ""): boolean {
  return normalizeForSearch(searchIn).includes(normalizeForSearch(search));
}
