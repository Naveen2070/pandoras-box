export function createAnagram(text: string): string {
  // An example implementation for creating an anagram with meaningful words
  // This is a placeholder implementation; replace it with your actual logic
  const words = [
    'encryption',
    'security',
    'cipher',
    'algorithm',
    'data',
    'key',
    'iv',
    'block',
    'stream',
    'secret',
    'code',
    'lock',
    'decode',
    'encode',
    'mask',
  ];

  // Shuffle the text into meaningful words (simple example, replace with your logic)
  const shuffled = text
    .split('')
    .sort(() => 0.5 - Math.random())
    .join('');

  return words.reduce((acc, word) => acc + word, '') + shuffled;
}
