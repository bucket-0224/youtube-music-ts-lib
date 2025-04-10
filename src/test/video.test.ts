import { test, expect } from 'vitest';
import { getMusic } from '../getMusic';

test('Should always return the video data', async () => {
  const result = await getMusic('TrjzOu-JXa8');
  expect(result).toBeDefined();
  expect(result.id).toBeDefined();
});
