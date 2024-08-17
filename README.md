The puzzle is to find groups of 5 letter words that use as many (25 of 26) available letters of the alphabet.

See Matt Parker's Math Puzzles.

Example

```bash
nvm use
npm install
time npm run find-combinations > output/combinations-using-maps
```

Takes ~25 minutes to run on my old laptop.

The solution was described by some of the videos by Matt Parker. Basically, if we represent the letter in a word using binary, we can very quickly check if new words include the same letters using bitwise operations. The previous attempt I went with used Set objects to store the letters.
