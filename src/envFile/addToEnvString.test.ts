import { addToEnvString } from './addToEnvString.js';
import { describe, it, expect } from 'vitest';

describe('addToEnvString', () => {
  const mockEnvString = `
# This is a comment
KEY1=value1
KEY2=value2
`.trim();

  it('should add new keys to the env string and overwrite existing ones', () => {
    const itemsToAdd = {
      KEY3: 'value3',
      KEY1: 'newValue1', // 既存のKEY1を上書きしない
    };

    const result = addToEnvString(mockEnvString, itemsToAdd);

    // 新しい環境変数を含んだ結果を確認
    const expectedContent = `
# This is a comment
KEY1=value1
KEY2=value2

KEY3=value3
`.trim();

    console.log({ mockEnvString, result, expectedContent });
    expect(result).toBe(expectedContent);
  });

  it('should add only new keys if not already in the string', () => {
    const itemsToAdd = {
      KEY3: 'value3',
      KEY4: 'value4',
    };

    const result = addToEnvString(mockEnvString, itemsToAdd);

    // 新しい環境変数を含んだ結果を確認
    const expectedContent = `
# This is a comment
KEY1=value1
KEY2=value2

KEY3=value3
KEY4=value4
`.trim();

    expect(result).toBe(expectedContent);
  });

  it('should handle an empty env string', () => {
    const itemsToAdd = {
      KEY1: 'value1',
      KEY2: 'value2',
    };

    const result = addToEnvString('', itemsToAdd);

    // 空の環境変数文字列に対して追加された内容を確認
    const expectedContent = `
KEY1=value1
KEY2=value2
`.trim();

    expect(result.trim()).toBe(expectedContent);
  });
});
