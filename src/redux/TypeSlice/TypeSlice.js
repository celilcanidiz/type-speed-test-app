import { createSlice } from "@reduxjs/toolkit";
import wordsjson from '../../json/words.json';

const wordCount = 40;

const getWords = (arr, num) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  const newWords = shuffled.slice(0, num);
  return newWords.map((word) => ({ ...word, status: '' }));
};

export const weatherSlice = createSlice({
  name:"typing",
  initialState: {
    theme: window.localStorage.getItem("theme")
      ? window.localStorage.getItem("theme")
      : null,
    items:getWords(wordsjson.words, wordCount),
    keyCount: 0,
    correct: 0,
    incorrect: 0,
    timer: 60,
    gameover:false,
    typingstart:false,
    lang: 'turkish',
  },
  reducers: {
    setStatus: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      item.status = action.payload.status;
    },
    changeTheme: (state, action) => {
      state.theme = action.payload;
    },
    changeGameOver:(state,action) => {
      state.gameover = action.payload;
    },
    setLang: (state, action) => {
      state.lang = action.payload;
    },
    tick: (state) => {
      state.timer -= 1;
    },
    refleshWords: (state) => {
      state.items = getWords(wordsjson.words, wordCount);
    },
    keyCounter: (state) => {
      state.keyCount += 1;
    },
    addCorrect: (state) => {
      state.correct += 1;
    },
    addInCorrect: (state) => {
      state.incorrect += 1;
    },
    TypingStart:(state, action) => {
      state.typingstart = action.payload;
    },
    changeinput:(state,action) => {
      state.inputredux = action.payload;
    },
     resetAll:(state) => {
      state.typingstart=false;
      state.timer = 60;
      state.correct = 0;
      state.incorrect=0;
      state.items = getWords(wordsjson.words, wordCount);
      state.input = '';
      state.keyCount = 0;
      state.gameover = false;
    }
  },
});


export const { TypingStart,changeinput,changeTheme,changeGameOver,setStatus ,resetAll, setLang, tick, refleshWords, keyCounter, addCorrect, addInCorrect} = weatherSlice.actions;
export default weatherSlice.reducer;