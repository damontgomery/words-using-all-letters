import { dictionaryWordMaps } from './dictionary.js'
import { Worker } from "worker_threads";
import { searchForWordsUsingDifferentLetters } from './search-for-words.js';

// We stringify the combination to use it as a key in a Set so that we can check if we have already found it already.
const combinations: Set<string> = new Set()

const splitPoint = Math.floor(dictionaryWordMaps.length / 6)

// Not using workers.
// searchForWordsUsingDifferentLetters({
//   usedLettersMap: 0,
//   usedWordMaps: [],
//   availableWordMaps: dictionaryWordMaps,
//   combinations,
// })

const worker1 = new Worker("./dist/worker.js", {
  workerData: {
    end: splitPoint,
    combinations
  },
})

// const worker2 = new Worker("./dist/worker.js", {
//   workerData: {
//     start: splitPoint,
//     combinations
//   },
// })

// Promise.all([worker1]).then(() => {
//   console.log(combinations.size)
// })

// @todo pass messages back and forth to update combinations?
