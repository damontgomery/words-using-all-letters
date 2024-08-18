import { workerData, parentPort } from "worker_threads";

import { searchForWordsUsingDifferentLetters } from './search-for-words.js'
import { dictionaryWordMaps } from './dictionary.js'

searchForWordsUsingDifferentLetters({
  usedLettersMap: 0,
  usedWordMaps: [],
  availableWordMaps: dictionaryWordMaps,
  combinations: workerData.combinations,
  start: workerData.start,
  end: workerData.end,
})
