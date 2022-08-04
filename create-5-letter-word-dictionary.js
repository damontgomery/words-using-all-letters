import fs from 'fs'

const wordFile = fs.readFileSync('./words_dictionary.json', 'utf8')

const wordList = Object.keys(JSON.parse(wordFile))

const fiveLetterWordList = wordList
  .filter((word) => word.length === 5)
  .filter((word) => {
    const letters = new Set(word.split(''))
    return letters.size === 5
  })

console.log(fiveLetterWordList.length)

fs.writeFileSync('./five-letter-words.json', JSON.stringify(fiveLetterWordList), 'utf8')
