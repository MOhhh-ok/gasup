// 環境変数を変更する
export function addToEnvString(
  envString: string,
  _items: Record<string, string>
) {
  const items = { ..._items };
  const newLines = [];
  for (const line of envString.split('\n')) {
    if (isCommentLine(line)) {
      newLines.push(line);
    } else {
      const { key, value } = parseLine(line);
      if (key) {
        if (items[key]) {
          newLines.push(`${key}=${items[key]}`);
          delete items[key];
        } else {
          newLines.push(`${key}=${value}`);
        }
      } else {
        newLines.push('');
      }
    }
  }
  newLines.push('');
  for (const [key, value] of Object.entries(items)) {
    if (!key) continue;
    newLines.push(`${key}=${value}`);
  }
  return newLines.join('\n');
}

function isCommentLine(line: string) {
  return line.startsWith('#');
}

function parseLine(line: string) {
  const [key, ...values] = line.split('=');
  return { key, value: values.join('=') };
}
