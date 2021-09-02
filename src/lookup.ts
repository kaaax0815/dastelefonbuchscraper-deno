import { cheerio } from 'https://deno.land/x/cheerio@1.0.4/mod.ts';

export async function lookup(number: string): Promise<Result[]> {
  const result = await fetch(`https://www.dastelefonbuch.de/R%C3%BCckw%C3%A4rts-Suche/${number}`);
  if (!result.ok) {
    if (result.status === 410) {
      throw new Error('Number not found');
    }
    throw new Error('Result not okay');
  }
  const text = await result.text();
  const $ = cheerio.load(text);
  const nameElements = $('div.name[title]');
  const results = Array.from(
    nameElements.map((_i, v) => {
      if (v.type === 'text') return;
      if (v.parent.type === 'text') return;
      const isPrivate = v.parent.attribs.itemtype === 'http://schema.org/Person';
      const type = isPrivate ? 'person' : 'company';
      return { name: v.attribs.title, type };
    })
  ) as unknown as Result[];
  return results;
}

export interface Result {
  name: string;
  type: 'person' | 'company';
}
