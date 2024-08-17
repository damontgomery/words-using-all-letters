import fs from 'fs'
import { MapToWordsMap } from './create-dictionary.js'
import { getNumberOfOnesInMap, mapToString, WordMap } from './binaryMap.js'

// Use arrays so we can easily filter.
const wordFile = JSON.parse(fs.readFileSync('./data/dictionary.json', 'utf8')) as [number, string[]][]

const dictionaryMapToWordsMap: MapToWordsMap =  new Map (wordFile)
const dictionaryWordMaps: WordMap[] = Array.from(dictionaryMapToWordsMap.keys())

const combinations: Set<string> = new Set()

// @todo print the actual words...
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
  availableWordMaps.forEach(wordMap => {
    const usedLettersIncludingNewWord = usedLettersMap | wordMap

    const newCombination = [...usedWordMaps, wordMap]

    if (getNumberOfOnesInMap(usedLettersIncludingNewWord) === 25) {
      const sortedCombination = newCombination.sort()
      const sortedCombinationString = JSON.stringify(sortedCombination)
      
      if (combinations.has(sortedCombinationString)) { return }

      combinations.add(sortedCombinationString)

      console.log('combination (map): ', getMapStringFromCombination(sortedCombination))
      console.log('combination (words): ', getWordStringFromCombination(sortedCombination))

      return
    }

    const remainingAvailableWordMaps = availableWordMaps.filter(
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

combinations.forEach(combination => {
  const combinationWordMaps = JSON.parse(combination)
  console.log('combination (map): ', getMapStringFromCombination(combinationWordMaps))
  console.log('combination: (words', getWordStringFromCombination(combinationWordMaps))
})
