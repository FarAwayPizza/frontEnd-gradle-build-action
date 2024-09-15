import React, { useState } from 'react';

const VotePoll = ({ pollId }: { pollId: number }) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleVoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(e.target.value);
    };

    const handleSubmitVote = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!selectedOption) {
            console.log('Please select an option');
            return;
        }

        try {
            const response = await fetch(`/api/polls/${pollId}/votes`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    option: selectedOption, // Option chosen by the user
                }),
            });

            if (response.ok) {
                console.log('Vote submitted successfully');
            } else {
                console.error('Error submitting vote');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Vote on Poll #{pollId}</h2>
            <form onSubmit={handleSubmitVote}>
                <label>
                    <input
                        type="radio"
                        value="Option1"
                        checked={selectedOption === 'Option1'}
                        onChange={handleVoteChange}
                    />
                    Option 1
                </label>
                <label>
                    <input
                        type="radio"
                        value="Option2"
                        checked={selectedOption === 'Option2'}
                        onChange={handleVoteChange}
                    />
                    Option 2
                </label>
                <button type="submit">Submit Vote</button>
            </form>
        </div>
    );
};

export default VotePoll;
