const filmsUrl = 'http://localhost:3000/films';
      // Fetch movie data from server
      fetch(`${filmsUrl}/1`)
        .then(response => response.json())
        .then(movie => {
          // Update movie details on the page
          document.querySelector('#poster').src = movie.poster;
          document.querySelector('#title').textContent = movie.title;
          document.querySelector('#runtime').textContent = movie.runtime;
          document.querySelector('#showtime').textContent = movie.showtime;
          const availableTickets = movie.capacity - movie.tickets_sold;
          document.querySelector('#available-tickets').textContent = availableTickets;
          // Add click event listener to Buy Ticket button
          document.querySelector('#buy-ticket').addEventListener('click', () => {
            if (availableTickets > 0) {
              availableTickets--;
              document.querySelector('#available-tickets').textContent = availableTickets;
            }
          });
        });
      // Fetch all movies from server and populate the list
      fetch(filmsUrl)
        .then(response => response.json())
        .then(films => {
          const filmsList = document.querySelector('#films');
          films.forEach(film => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = '#';
            a.textContent = film.title;
            a.addEventListener('click', () => {
              // Fetch movie data from server and update movie details on the page
              fetch(`${filmsUrl}/${film.id}`)
                .then(response => response.json())
                .then(movie => {
                  document.querySelector('#poster').src = movie.poster;
                  document.querySelector('#title').textContent = movie.title;
                  document.querySelector('#runtime').textContent = movie.runtime;
                  document.querySelector('#showtime').textContent = movie.showtime;
                  let availableTickets = movie.capacity - movie.tickets_sold;
                  document.querySelector('#available-tickets').textContent = availableTickets;
                  document.querySelector("#buy-ticket").addEventListener('click', () =>{
                    if (availableTickets > 0) {
                      availableTickets --;
                      document.querySelector('#available-tickets').textContent = availableTickets;
                    }
                  })
                });
            });
            li.appendChild(a);
            filmsList.appendChild(li);
          });
        });