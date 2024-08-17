import fs from 'fs'
import { MapToWordsMap } from './create-dictionary.js'
import {WordMap } from './binaryMap.js'

const wordFile = JSON.parse(fs.readFileSync('./data/dictionary.json', 'utf8')) as [number, string[]][]

export const dictionaryMapToWordsMap: MapToWordsMap =  new Map (wordFile)
export const dictionaryWordMaps: WordMap[] = Array.from(dictionaryMapToWordsMap.keys())
