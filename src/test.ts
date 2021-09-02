import { lookup } from '../mod.ts';

const result1 = await lookup('097717900');
const result2 = await lookup('0977194800');

if (result1.length !== 1 || result2.length !== 2) {
  throw new Error('Bad Result Length');
}

if (
  result1[0].type !== 'person' ||
  result2[0].type !== 'company' ||
  result2[1].type !== 'company'
) {
  throw new Error('Bad Result Types');
}

if (
  result2[0].name !== 'Hotline zum Thema Coronavirus' ||
  result2[1].name !== 'SG 3.4 - Gesundheitsamt Corona-Hotline'
) {
  throw new Error('Bad Result Names');
}

console.log('All Checks passed');
