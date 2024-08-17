import fs from 'fs'
import { MapToWordsMap } from './create-dictionary.js'
import { getNumberOfOnesInMap, mapToString, WordMap } from './binaryMap.js'

const wordFile = JSON.parse(fs.readFileSync('./data/dictionary.json', 'utf8')) as [number, string[]][]

const dictionaryMapToWordsMap: MapToWordsMap =  new Map (wordFile)
const dictionaryWordMaps: WordMap[] = Array.from(dictionaryMapToWordsMap.keys())

// We stringify the combination to use it as a key in a Set so that we can check if we have already found it already.
const combinations: Set<string> = new Set()

const getWordStringFromCombination = (wordMaps: WordMap[]) => wordMaps.map(wordMap => JSON.stringify(dictionaryMapToWordsMap.get(wordMap))).join(' ')

const getMapStringFromCombination = (wordMaps: WordMap[]) => wordMaps.map(wordMap => mapToString(wordMap)).join(' ')

const searchForWordsUsingDifferentLetters = ({
  usedLettersMap,
  usedWordMaps,
  availableWordMaps
}:{
  usedLettersMap: WordMap,
  usedWordMaps: WordMap[],
  availableWordMaps: WordMap[]
}): void => {
  availableWordMaps.forEach((wordMap, index) => {
    const usedLettersIncludingNewWord = usedLettersMap | wordMap

    const newCombination = [...usedWordMaps, wordMap]

    if (getNumberOfOnesInMap(usedLettersIncludingNewWord) === 25) {
      const sortedCombination = newCombination.sort()
      const sortedCombinationString = JSON.stringify(sortedCombination)
      
      if (combinations.has(sortedCombinationString)) { return }

      combinations.add(sortedCombinationString)

      // Print as we go so we can see the results.
      console.log('combination (map): ', getMapStringFromCombination(sortedCombination))
      console.log('combination (words): ', getWordStringFromCombination(sortedCombination))

      return
    }

    // We should be able to trim any word "before" the current word we are checking since we already checked those combinations.
    const remainingAvailableWordMaps = availableWordMaps
      .slice(index + 1)
      .filter(
        (wordMap) => (wordMap & usedLettersIncludingNewWord) === 0
      )

    if (remainingAvailableWordMaps.length === 0) { return }

    searchForWordsUsingDifferentLetters({
      usedLettersMap: usedLettersIncludingNewWord,
      usedWordMaps: [...usedWordMaps, wordMap],
      availableWordMaps: remainingAvailableWordMaps,
    })
  })
}

searchForWordsUsingDifferentLetters({
  usedLettersMap: 0,
  usedWordMaps: [],
  availableWordMaps: dictionaryWordMaps,
})
