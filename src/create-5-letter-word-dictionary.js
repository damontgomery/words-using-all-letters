import fs from 'fs'

const wordFile = fs.readFileSync('./words_dictionary.json', 'utf8')

const wordList = Object.keys(JSON.parse(wordFile))

const fiveLetterWordList = wordList
  .filter(word => word.length === 5)
  .filter(word => {
    const letters = new Set(word.split(''))
    return letters.size === 5
  })
  // Check that the word contains a vowel. If it doesn't , there will be 11 unique letters.
  .filter(word => new Set([...word.split(''), 'a', 'e', 'i', 'o', 'u', 'y']).size < 11)

console.log(fiveLetterWordList.length)

fs.writeFileSync('./five-letter-words.json', JSON.stringify(fiveLetterWordList), 'utf8')
