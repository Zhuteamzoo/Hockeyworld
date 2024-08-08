document.addEventListener('DOMContentLoaded', function() {
    console.log('Hockey website is ready!');

    // Select the Teams button
    const teamsButton = document.querySelector('nav ul li a[href="#teams"]');
    // Select the About button
    const aboutButton = document.querySelector('nav ul li a[href="#about"]');
    // Select the Contact button
    const contactButton = document.querySelector('nav ul li a[href="#contact"]');
    // Select the Events button
    const scrollToEventsButton = document.getElementById('scroll-to-events');

    // Add event listener for click event on Teams button
    teamsButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default anchor behavior
        window.open('https://www.nhl.com', '_blank'); // Open NHL website in a new tab
    });

    // Add event listener for click event on About button
    aboutButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default anchor behavior
        window.open('https://en.wikipedia.org/wiki/Hockey', '_blank'); // Open Wikipedia Hockey page in a new tab
    });

    // Add event listener for click event on Contact button
    contactButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default anchor behavior
        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' }); // Scroll to contact section
    });

    // Add event listener for click event on Scroll to Events button
    scrollToEventsButton.addEventListener('click', function() {
        document.querySelector('#events').scrollIntoView({ behavior: 'smooth' });
    });

    // Fetch and display events
    fetchHockeyEvents();
    // Fetch and display news
    fetchHockeyNews();
    // Fetch and display team rosters
    fetchTeamRosters();
    // Fetch and display player profiles
    fetchPlayerProfiles();
    // Fetch and display match highlights
    fetchMatchHighlights();
    // Load the fan forum
    loadFanForum();
    // Load the event calendar
    loadEventCalendar();
});

function fetchHockeyEvents() {
    const eventList = document.getElementById('event-list');

    // Fetch NHL events
    fetch('https://statsapi.web.nhl.com/api/v1/schedule')
        .then(response => response.json())
        .then(data => {
            const events = data.dates.flatMap(date => date.games);
            displayEvents(events, eventList, 'NHL');
        })
        .catch(error => {
            console.error('Error fetching NHL events:', error);
            eventList.textContent = 'Failed to load NHL events. Please try again later.';
        });

    // Fetch IIHF events (placeholder URL)
    fetch('https://www.iihf.com/en/events') // Replace with actual IIHF API endpoint
        .then(response => response.json())
        .then(data => {
            // Process and display IIHF events here
        })
        .catch(error => {
            console.error('Error fetching IIHF events:', error);
            eventList.textContent += '\nFailed to load IIHF events. Please try again later.';
        });

    // Fetch Winter Olympics events (placeholder URL)
    fetch('https://olympics.com/en/sports/ice-hockey/') // Replace with actual Winter Olympics API endpoint
        .then(response => response.json())
        .then(data => {
            // Process and display Winter Olympics events here
        })
        .catch(error => {
            console.error('Error fetching Winter Olympics events:', error);
            eventList.textContent += '\nFailed to load Winter Olympics events. Please try again later.';
        });
}

function displayEvents(events, eventList, source) {
    if (events.length === 0) {
        eventList.textContent = `No ongoing ${source} events at the moment.`;
    } else {
        eventList.innerHTML = '';
        events.forEach(event => {
            const eventItem = document.createElement('p');
            eventItem.textContent = `${event.teams.away.team.name} vs. ${event.teams.home.team.name} - ${new Date(event.gameDate).toLocaleString()} (${source})`;
            eventList.appendChild(eventItem);
        });
    }
}

function fetchHockeyNews() {
    const newsList = document.getElementById('news-list');

    // Fetch NHL news
    fetch('https://site.api.espn.com/apis/site/v2/sports/hockey/nhl/news')
        .then(response => response.json())
        .then(data => {
            displayNews(data.articles, newsList, 'NHL');
        })
        .catch(error => {
            console.error('Error fetching NHL news:', error);
            newsList.textContent = 'Failed to load NHL news. Please try again later.';
        });

    // Fetch IIHF news (placeholder URL)
    fetch('https://www.iihf.com/en/news') // Replace with actual IIHF API endpoint
        .then(response => response.json())
        .then(data => {
            // Process and display IIHF news here
        })
        .catch(error => {
            console.error('Error fetching IIHF news:', error);
            newsList.textContent += '\nFailed to load IIHF news. Please try again later.';
        });
}

function displayNews(articles, newsList, source) {
    if (articles.length === 0) {
        newsList.textContent = `No recent ${source} news at the moment.`;
    } else {
        newsList.innerHTML = '';
        articles.forEach(article => {
            const newsItem = document.createElement('p');
            newsItem.innerHTML = `<a href="${article.links.web.href}" target="_blank">${article.headline} (${source})</a>`;
            newsList.appendChild(newsItem);
        });
    }
}

function fetchTeamRosters() {
    const teamRoster = document.getElementById('team-roster');
    // Fetch team rosters (placeholder code)
    fetch('https://statsapi.web.nhl.com/api/v1/teams?expand=team.roster')
        .then(response => response.json())
        .then(data => {
            const teams = data.teams;
            displayTeamRosters(teams, teamRoster);
        })
        .catch(error => {
            console.error('Error fetching team rosters:', error);
            teamRoster.textContent = 'Failed to load team rosters. Please try again later.';
        });
}

function displayTeamRosters(teams, teamRoster) {
    if (teams.length === 0) {
        teamRoster.textContent = 'No teams available at the moment.';
    } else {
        teamRoster.innerHTML = '';
        teams.forEach(team => {
            const teamDiv = document.createElement('div');
            teamDiv.innerHTML = `<h3>${team.name}</h3><p>Location: ${team.locationName}</p>`;
            team.roster.roster.forEach(player => {
                const playerItem = document.createElement('p');
                playerItem.textContent = `${player.person.fullName} - ${player.position.name}`;
                teamDiv.appendChild(playerItem);
            });
            teamRoster.appendChild(teamDiv);
        });
    }
}

function fetchPlayerProfiles() {
    const playerProfiles = document.getElementById('player-profiles');
    // Fetch player profiles (placeholder code)
    fetch('https://statsapi.web.nhl.com/api/v1/people/{playerId}')
        .then(response => response.json())
        .then(data => {
            const players = data.people;
            displayPlayerProfiles(players, playerProfiles);
        })
        .catch(error => {
            console.error('Error fetching player profiles:', error);
            playerProfiles.textContent = 'Failed to load player profiles. Please try again later.';
        });
}

function displayPlayerProfiles(players, playerProfiles) {
    if (players.length === 0) {
        playerProfiles.textContent = 'No player profiles available at the moment.';
    } else {
        playerProfiles.innerHTML = '';
        players.forEach(player => {
            const playerDiv = document.createElement('div');
            playerDiv.innerHTML = `<h3>${player.fullName}</h3><p>Position: ${player.primaryPosition.name}</p><p>Team: ${player.currentTeam.name}</p>`;
            playerProfiles.appendChild(playerDiv);
        });
    }
}

function fetchMatchHighlights() {
    const matchHighlights = document.getElementById('match-highlights');
    // Fetch match highlights (placeholder code)
    fetch('https://statsapi.web.nhl.com/api/v1/highlights')
        .then(response => response.json())
        .then(data => {
            const highlights = data.highlights;
            displayMatchHighlights(highlights, matchHighlights);
        })
        .catch(error => {
            console.error('Error fetching match highlights:', error);
            matchHighlights.textContent = 'Failed to load match highlights. Please try again later.';
        });
}

function displayMatchHighlights(highlights, matchHighlights) {
    if (highlights.length === 0) {
        matchHighlights.textContent = 'No match highlights available at the moment.';
    } else {
        matchHighlights.innerHTML = '';
        highlights.forEach(highlight => {
            const highlightDiv = document.createElement('div');
            highlightDiv.innerHTML = `<h3>${highlight.title}</h3><p>${highlight.description}</p><video src="${highlight.videoUrl}" controls></video>`;
            matchHighlights.appendChild(highlightDiv);
        });
    }
}

function loadFanForum() {
    const fanForum = document.getElementById('fan-forum');
    fanForum.innerHTML = `
        <h3>Fan Forum</h3>
        <p>Join our fan forum to discuss all things hockey! <a href="forum.html" target="_blank">Visit Forum</a></p>
    `;
}

function loadEventCalendar() {
    const eventCalendar = document.getElementById('event-calendar');
    eventCalendar.innerHTML = `
        <h3>Event Calendar</h3>
        <iframe src="https://calendar.google.com/calendar/embed?src=your_calendar_id&ctz=America%2FNew_York" style="border: 0" width="800" height="600" frameborder="0" scrolling="no"></iframe>
    `;
}
