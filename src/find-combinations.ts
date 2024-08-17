import { searchForWordsUsingDifferentLetters } from './search-for-words.js'
import { dictionaryWordMaps } from './dictionary.js'

// We stringify the combination to use it as a key in a Set so that we can check if we have already found it already.
const combinations: Set<string> = new Set()

searchForWordsUsingDifferentLetters({
  usedLettersMap: 0,
  usedWordMaps: [],
  availableWordMaps: dictionaryWordMaps,
  combinations,
})
