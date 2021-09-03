import nodeHTMLParser from 'https://esm.sh/node-html-parser';

export async function lookup(number: string): Promise<Result[]> {
  const result = await fetch(`https://www.dastelefonbuch.de/R%C3%BCckw%C3%A4rts-Suche/${number}`);
  if (!result.ok) {
    if (result.status === 410) {
      throw new Error('Number not found');
    }
    throw new Error('Result not okay');
  }
  const text = await result.text();
  const dom = nodeHTMLParser(text);
  const nameElements = dom.querySelectorAll('div.name[title]');
  const results = nameElements.map((v) => {
    const isPrivate = v.parentNode.attributes.itemtype == 'http://schema.org/Person';
    const type = isPrivate ? 'person' : 'company';
    return { name: v.attributes.title, type } as Result
  });
  return results;
}

export interface Result {
  name: string;
  type: 'person' | 'company';
}
