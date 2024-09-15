import React, { useState } from 'react';

const CreatePoll = () => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState([{ text: '' }]); // Initial state with one empty option

    const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.target.value);
    };

    const handleOptionChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const newOptions = [...options];
        newOptions[index].text = e.target.value;
        setOptions(newOptions);
    };

    const addOption = () => {
        setOptions([...options, { text: '' }]); // Add a new empty option to the array
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Ensure there's at least one valid option
        if (options.length === 0 || question.trim() === '') {
            console.error('Poll must have a question and at least one option.');
            return;
        }

        console.log(question, options); // Debugging logs

        try {
            const response = await fetch('/api/polls', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    question,
                    options: options.map(option => ({ caption: option.text })), // Adjust this according to the backend structure
                    publishedAt: new Date().toISOString(), // Optional: depends on your backend structure
                }),
            });

            if (response.ok) {
                console.log('Poll created successfully');
            } else {
                console.error('Error creating poll');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Create New Poll</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Poll Question:
                    <input
                        type="text"
                        value={question}
                        onChange={handleQuestionChange}
                    />
                </label>
                {options.map((option, index) => (
                    <div key={index}>
                        <label>
                            Option {index + 1}:
                            <input
                                type="text"
                                value={option.text}
                                onChange={(e) => handleOptionChange(index, e)}
                            />
                        </label>
                    </div>
                ))}
                <button type="button" onClick={addOption}>Add Option</button>
                <button type="submit">Submit Poll</button>
            </form>
        </div>
    );
};

export default CreatePoll;


