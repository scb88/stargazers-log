async function loadStars() {
  const list = document.getElementById('starred-list');

  try {
    const response = await fetch('events.json');
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const repos = await response.json();

    list.innerHTML = repos
      .map(
        (repo) => `
          <li>
            <strong>${repo.name}</strong>
            <div>${repo.description}</div>
            <div class="meta">
              <span>${repo.language}</span> • <span>${repo.stargazers_count} stars</span>
            </div>
            <a href="${repo.html_url}" target="_blank" rel="noreferrer">View on GitHub</a>
          </li>
        `
      )
      .join('');
  } catch (error) {
    list.innerHTML = `<li>Unable to load starred repositories: ${error.message}</li>`;
  }
}

loadStars();
