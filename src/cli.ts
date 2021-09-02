import { Input } from 'https://deno.land/x/cliffy@v0.19.5/prompt/mod.ts';
import { lookup } from '../mod.ts';

const number = await Input.prompt({ message: 'Number?' });

try {
  const result = await lookup(number);
  console.table(result);
} catch (e) {
  console.error(e.message || e);
}
