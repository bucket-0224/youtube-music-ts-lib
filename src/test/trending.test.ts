import { test, expect } from "vitest";
import { getNewReleased } from "../getNewReleased";

test("Should always return the video data", async () => {
  const result = await getNewReleased();
  expect(result).not.toBeNull();
});
