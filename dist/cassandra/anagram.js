"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reverseAnagram = exports.createAnagram = void 0;
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
/**
 * Creates an anagram by shuffling the input text and prepending some meaningful words.
 *
 * @param {string} text - The input text to be shuffled and prepended with words.
 * @return {string} The resulting anagram.
 */
function createAnagram(text) {
    // Shuffle the input text
    let shuffledText = text
        .split('')
        .sort(() => 0.5 - Math.random())
        .join('');
    // Prepend some meaningful words to the shuffled text
    const anagram = words.join('') + shuffledText;
    return anagram;
}
exports.createAnagram = createAnagram;
/**
 * Reverses an anagram by extracting the original shuffled text and sorting it back to its original order.
 *
 * @param {string} anagram - The anagram to be reversed.
 * @return {string} The original text.
 */
function reverseAnagram(anagram) {
    // Extract the original shuffled text from the anagram
    // The original shuffled text is the part of the anagram after the meaningful words
    const shuffledText = anagram.slice(words.join('').length);
    // Simple implementation: sort back to original (assuming it was originally sorted alphabetically)
    // Split the shuffled text into individual characters, sort them alphabetically, and join them back into a string
    const originalText = shuffledText.split('').sort().join('');
    return originalText;
}
exports.reverseAnagram = reverseAnagram;
//# sourceMappingURL=anagram.js.map