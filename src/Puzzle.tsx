import axios from 'axios';
import React from 'react';

const shuffleWord = (word: string) => {

    if (!word) {
        return ''
    }

    var a = word.split(""),
        n = a.length;

    for (var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}

const Puzzle = () => {

    const [words, setWords] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const [guess, setGuess] = React.useState('');

    React.useEffect(() => {
        console.log('getting puzzle');
        axios.get(`http://localhost:4500/getWord`).then((data) => {
            const word = data.data.word;

            console.log(word);

            axios.get(`http://localhost:4500/getMaps/${word}`).then((data) => {

                const solutions = data.data.solutions;

                if (solutions.length) {
                    setWords(data.data.solutions);
                } else {
                    setWords([])
                    console.log('solutions is empty')
                }

                setIsLoading(false);

            }).catch((err) => {
                console.log(err)
            })
        });
    }, [])

    if (!isLoading) {

        const handleChange = (e: any) => {
            const writtenGuess = e.target.value;
            setGuess(writtenGuess);
        }

        const handleSubmit = (e: any) => {
            e.preventDefault();

            //@ts-ignore
            if (words.includes(guess)) {
                console.log('guess found');
            }
        }

        const puzzleWord = shuffleWord(words[0])

        return (
            <>
                <h1>{puzzleWord}</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input onChange={(e) => handleChange(e)} />
                </form>
                <div>{words.map((solution, index) => {
                    return (
                        <h6 key={index}>
                            {solution}
                        </h6>
                    )
                })}</div>
            </>
        );
    } else {
        return (<div>Loading...</div>)
    }
}

export { Puzzle };