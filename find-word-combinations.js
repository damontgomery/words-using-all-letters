import fs from 'fs'

// Use arrays so we can easily filter.
const wordFile = JSON.parse(fs.readFileSync('./five-letter-words.json', 'utf8'))

let combinations = new Set()

searchForWordsUsingDifferentLetters(new Set(), wordFile)

// combinations.forEach(combination => {
//   console.log('final combination: ', printWords(combination))
// })

function searchForWordsUsingDifferentLetters(previouslyUsedLetters, availableWords) {
  availableWords.forEach(word => {
    const usedLetters = getUsedLettersIncludingWord(previouslyUsedLetters, word)

    if (usedLetters.size === 25) {
      combinations.add(usedLetters)

      console.log(getWordsString(usedLetters))

      return
    }

    const remainingAvailableWords = getAvailableWordsWithoutUsedLetters(availableWords, usedLetters)

    if (remainingAvailableWords.length === 0) { return }

    searchForWordsUsingDifferentLetters(usedLetters, remainingAvailableWords)
  })
}

function getAvailableWordsWithoutUsedLetters(availableWords, usedLetters) {
  return availableWords.filter((word) => {
    return word.split('')
      .reduce((previous, current) => {
        return previous && usedLetters.has(current) === false
      }, true)
  })
}

function getUsedLettersIncludingWord(usedLetters, word) {
  return new Set([...usedLetters, ...word.split('')])
}

function getWordsString(usedLetters) {
  return [...usedLetters]
    .map((letter, index) => index > 4 && index % 5 === 0 ? ` ${letter}` : letter)
    .join('')
}
