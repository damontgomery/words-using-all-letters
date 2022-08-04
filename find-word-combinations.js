import fs from 'fs'

// Use arrays so we can easily filter.
const wordFile = JSON.parse(fs.readFileSync('./five-letter-words.json', 'utf8'))

let availableWords = wordFile

let combinations = new Set()

;(() => {
  for (let i = 0; i < 1; i++) {
    const word = availableWords[0]
  
    let usedLetters = new Set(word.split(''))
    
    availableWords = getAvailableWordsWithoutUsedLetters(availableWords, usedLetters)
    
    let nextWord = availableWords[0]
    usedLetters = getUsedLettersIncludingWord(usedLetters, nextWord)
    
    availableWords = getAvailableWordsWithoutUsedLetters(availableWords, usedLetters)
    if (availableWords.length === 0) { return }
    nextWord = availableWords[0]
    usedLetters = getUsedLettersIncludingWord(usedLetters, nextWord)
   
    console.log(usedLetters)
  
    availableWords = getAvailableWordsWithoutUsedLetters(availableWords, usedLetters)
    if (availableWords.length === 0) { return }
    nextWord = availableWords[0]
    usedLetters = getUsedLettersIncludingWord(usedLetters, nextWord)
  
    console.log(usedLetters)
  
    availableWords = getAvailableWordsWithoutUsedLetters(availableWords, usedLetters)
    if (availableWords.length === 0) { return }
    nextWord = availableWords[0]
    usedLetters = getUsedLettersIncludingWord(usedLetters, nextWord)
  
    console.log(usedLetters)
  }
})()


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

