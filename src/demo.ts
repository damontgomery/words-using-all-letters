import { getNumberOfOnesInMap, getMapFromWord, mapToString, wordHasVowel } from "./binaryMap.js"

const word = 'hello'
const binaryMap = getMapFromWord(word)
const binaryString = mapToString(binaryMap)
const numberOfOnes = getNumberOfOnesInMap(binaryMap)

console.log(`"${word}" in binary is "${binaryString}"`)
console.log(`"${word}" has ${numberOfOnes} ones in its binary representation`)

const wordWithVowel = 'hello'
const wordWithoutVowel = 'hll'

console.log(`"${wordWithVowel}" has a vowel: ${wordHasVowel(wordWithVowel)}`)
console.log(`"${wordWithoutVowel}" has a vowel: ${wordHasVowel(wordWithoutVowel)}`)
