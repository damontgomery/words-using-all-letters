import fs from 'fs'
import { getMapFromWord, getNumberOfOnesInMap, wordHasVowel, WordMap } from './binaryMap.js'

const wordFile = fs.readFileSync('./data/words_dictionary.json', 'utf8')

const targetCharactersInWord = 5

const wordList = Object.keys(JSON.parse(wordFile))

type MapWordPair = [WordMap, string]

const mapWordPairs: MapWordPair[] = wordList
  .map(word => [getMapFromWord(word), word] as MapWordPair)
  .filter(([map, word]) => 
    word.length === targetCharactersInWord
    && getNumberOfOnesInMap(map) === targetCharactersInWord
    && wordHasVowel(word)
  )

export type MapToWordsMap = Map<WordMap, string[]>
const mapWordsPairs: MapToWordsMap = new Map()

mapWordPairs.forEach(([map, word]) => {
  mapWordsPairs.set(map, [...mapWordsPairs.get(map) ?? [], word])
})

console.log(mapWordsPairs.size)

fs.writeFileSync('./data/dictionary.json', JSON.stringify(Array.from(mapWordsPairs.entries())), 'utf8')
