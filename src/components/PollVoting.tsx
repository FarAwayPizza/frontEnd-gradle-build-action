import {useState} from "react";

const PollVoting = () => {
    const [votes, setVotes] = useState([2, 12, 1]); // Placeholder data, replace with real API data

    const handleVote = (index: number, type: 'upvote' | 'downvote') => {
        const newVotes = [...votes];
        if (type === 'upvote') newVotes[index]++;
        if (type === 'downvote') newVotes[index]--;
        setVotes(newVotes);
    };

    return (
        <div>
            <h2>Poll Voting</h2>
            <div>
                <p>"Pineapple on Pizza: Is it ok?"</p>
                <div>
                    {['Oh yammy!', 'Mamma Mia! Hell no!', 'I do not like pizza actually...'].map(
                        (option, index) => (
                            <div key={index}>
                                <span>{option}</span>
                                <button onClick={() => handleVote(index, 'upvote')}>upvote</button>
                                <button onClick={() => handleVote(index, 'downvote')}>downvote</button>
                                <span>{votes[index]} Votes</span>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default PollVoting;
