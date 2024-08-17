import { getNumberOfOnesInMap, mapToString, WordMap } from './binaryMap.js'
import { dictionaryMapToWordsMap } from './dictionary.js'

const getWordStringFromCombination = (wordMaps: WordMap[]) => wordMaps.map(wordMap => JSON.stringify(dictionaryMapToWordsMap.get(wordMap))).join(' ')

const getMapStringFromCombination = (wordMaps: WordMap[]) => wordMaps.map(wordMap => mapToString(wordMap)).join(' ')

export const searchForWordsUsingDifferentLetters = ({
  usedLettersMap,
  usedWordMaps,
  availableWordMaps,
  combinations,
  start,
  end,
}:{
  usedLettersMap: WordMap,
  usedWordMaps: WordMap[],
  availableWordMaps: WordMap[],
  combinations: Set<string>, // This will be modified in place.
  start?: number,
  end?: number,
}): void => {
  // If we are doing multithreading, we want to allow only traversing a part of the space.
  for (let index = start ?? 0; index < (end ?? availableWordMaps.length); index++) {
    const wordMap = availableWordMaps[index]
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

      continue
    }

    // We should be able to trim any word "before" the current word we are checking since we already checked those combinations.
    const remainingAvailableWordMaps = availableWordMaps
      .slice(index + 1)
      .filter(
        (wordMap) => (wordMap & usedLettersIncludingNewWord) === 0
      )

    if (remainingAvailableWordMaps.length === 0) { continue }

    searchForWordsUsingDifferentLetters({
      usedLettersMap: usedLettersIncludingNewWord,
      usedWordMaps: [...usedWordMaps, wordMap],
      availableWordMaps: remainingAvailableWordMaps,
      combinations,
    })
  }
}
