import { test, expect } from 'vitest';
import { getMusicBasedSuggestions } from '../suggestions.js';

test('Should always return a list of suggestions', async () => {
  const result = await getMusicBasedSuggestions('ronQgBo0ZCY');
  expect(result.length).toBeGreaterThan(1);
});
