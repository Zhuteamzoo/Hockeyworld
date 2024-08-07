document.addEventListener('DOMContentLoaded', function() {
    console.log('Hockey website is ready!');

    // Select the Teams button
    const teamsButton = document.querySelector('nav ul li a[href="#teams"]');
    // Select the About button
    const aboutButton = document.querySelector('nav ul li a[href="#about"]');
    // Select the Contact button
    const contactButton = document.querySelector('nav ul li a[href="#contact"]');

    const aboutownerButton = document.querySelector('nav ul li a [href="#aboutowner"]');

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
        // Add event listener for click event on Contact button
    aboutownerButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default anchor behavior
        document.querySelector('#aboutowner').scrollIntoView({ behavior: 'smooth' }); // Scroll to contact section
    });
});
