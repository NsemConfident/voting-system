let votes = [0, 0, 0]; // Initialize vote counts for 3 candidates
let userVote = null;   // Track the user's vote
let isEditing = false; // Track if the user is in edit mode

function vote(candidate) {
    const messageElement = document.getElementById('message');

    if (userVote === candidate) {
        messageElement.textContent = 'You have already voted for this candidate!';
        return;
    }

    if (isEditing && userVote !== null) {
        // User is changing their vote
        votes[userVote - 1]--; // Decrement the previous vote
        messageElement.textContent = 'You have changed your vote!';
    } else if (userVote === null) {
        // First time voting
        messageElement.textContent = 'Thank you for voting!';
    } else {
        // Switching to a new vote without editing
        messageElement.textContent = 'You have changed your vote!';
    }

    // Increment the vote count for the selected candidate
    votes[candidate - 1]++;
    userVote = candidate; // Update the user's vote
    isEditing = false; // Reset editing mode

    // Update the display of votes and total votes
    updateVotesDisplay();
    updateTotalVotesDisplay();
    sortAndDisplayCandidates();
}

function editVote() {
    if (userVote !== null) {
        isEditing = true;
        document.getElementById('message').textContent = 'Please select a new candidate to vote for.';
    } else {
        document.getElementById('message').textContent = 'You have not voted yet!';
    }
}

function updateVotesDisplay() {
    document.querySelectorAll('.candidate').forEach((el, index) => {
        el.querySelector('.votes').textContent = votes[index];
    });
}

function updateTotalVotesDisplay() {
    const totalVotesContainer = document.getElementById('total-votes');
    totalVotesContainer.innerHTML = '';
    
    votes.forEach((voteCount, index) => {
        const candidateName = document.querySelector(`.candidate[data-id="${index + 1}"] .name`).textContent;
        const voteText = document.createElement('div');
        voteText.textContent = `${candidateName}: ${voteCount} votes`;
        totalVotesContainer.appendChild(voteText);
    });
}

function sortAndDisplayCandidates() {
    let candidates = Array.from(document.querySelectorAll('.candidate'));

    candidates.sort((a, b) => {
        let votesA = parseInt(a.querySelector('.votes').textContent);
        let votesB = parseInt(b.querySelector('.votes').textContent);
        return votesB - votesA;
    });

    let container = document.querySelector('.candidates');
    candidates.forEach(candidate => container.appendChild(candidate));
}

// Initial sort and display
sortAndDisplayCandidates();
updateTotalVotesDisplay();
