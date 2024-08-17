The puzzle is to find groups of 5 letter words that use as many (25 of 26) available letters of the alphabet.

See Matt Parker's Math Puzzles.

Example

```bash
nvm use
npm install
time npm run find-combinations > output/combinations-using-maps
```

Takes ~2.5 minutes to run on my old laptop.

The solution was described by some of the videos by Matt Parker. Basically, if we represent the letter in a word using binary, we can very quickly check if new words include the same letters using bitwise operations. The previous attempt I went with used Set objects to store the letters.

Optimizations:

Originally I used a Set object and checked everything multiple times. For example, I started with the first word and checked the second, etc. Then when I got to the second word, I checked the first again. I only ran it for 2h and it got midway through the Cs. Maybe it would take ~20h to run?

Using binary maps this time went to 23.5 minutes.

Using an index filter to avoid checking the same groups multiple times, this went down to 2.5 minutes.

There are probably other ways to group the words to avoid checking whole groups. For example if our word starts with an A, all those words can filter the same group of A words. Not sure if referencing if words are in these groups is faster or not than checking the binary maps.
