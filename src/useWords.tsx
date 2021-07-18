import axios from 'axios';
import React from 'react';

const useWords = () => {
    const [words, setWords] = React.useState([]);
    
    React.useEffect(() => {
        axios.get('http://localhost:4500/getWords').then((data) => {
            const wordsString = data.data.words;
            setWords(wordsString.split('\n'))
        })
    }, [])

    return words;
}

export { useWords }