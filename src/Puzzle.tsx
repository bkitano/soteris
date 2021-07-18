import React from 'react';
import { useWords } from './useWords';

const Puzzle = () => {

    // api to get words from localhost lol
    const words = useWords();

    const word = words[Math.floor(Math.random() * (words.length + 1))]

    return (<div>{word}</div>);
}

export { Puzzle };