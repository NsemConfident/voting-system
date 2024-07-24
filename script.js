let votes = [0, 0, 0]; // Initialize vote counts for 3 candidates

function vote(candidate) {
    // Check if the user has already voted
    if (localStorage.getItem('hasVoted')) {
        document.getElementById('message').textContent = 'You have already voted! Thank you';
        return;
    }

    // Increment the vote count for the selected candidate
    votes[candidate - 1]++;
    
    // Update the display
    document.querySelectorAll('.candidate').forEach((el, index) => {
        el.querySelector('.votes').textContent = votes[index];
    });

    // Sort the candidates based on votes
    sortCandidates();

    // Set the flag in local storage to indicate the user has voted
    localStorage.setItem('hasVoted', true);
    document.getElementById('message').textContent = 'Thank you for voting!';
}

function sortCandidates() {
    let candidates = Array.from(document.querySelectorAll('.candidate'));

    candidates.sort((a, b) => {
        let votesA = parseInt(a.querySelector('.votes').textContent);
        let votesB = parseInt(b.querySelector('.votes').textContent);
        return votesB - votesA;
    });

    let container = document.querySelector('.candidates');
    candidates.forEach(candidate => container.appendChild(candidate));
}
