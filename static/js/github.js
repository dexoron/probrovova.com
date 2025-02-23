async function getGitHubStats(username) {
  const userUrl = `https://api.github.com/users/${username}`;
  const eventsUrl = `https://api.github.com/users/${username}/events`;

  try {
    // Получаем общее число репозиториев
    const userResponse = await fetch(userUrl);
    const userData = await userResponse.json();
    document.getElementById("repoCount").textContent = userData.public_repos;

    // Получаем события пользователя (commits, PRs и т. д.)
    const eventsResponse = await fetch(eventsUrl);
    const eventsData = await eventsResponse.json();

    // Фильтруем только push-ивенты (commits)
    const commitEvents = eventsData.filter(
      (event) => event.type === "PushEvent"
    );

    // Фильтруем коммиты за месяц и за год
    const now = new Date();
    const yearAgo = new Date(now.getFullYear(), 0, 1);
    const monthAgo = new Date(now.getFullYear(), now.getMonth(), 1);

    const yearlyCommits = commitEvents.filter(
      (event) => new Date(event.created_at) >= yearAgo
    ).length;
    const monthlyCommits = commitEvents.filter(
      (event) => new Date(event.created_at) >= monthAgo
    ).length;

    // Выводим данные в нужные теги
    document.getElementById("yearlyCommits").textContent = yearlyCommits;
    document.getElementById("monthlyCommits").textContent = monthlyCommits;
  } catch (error) {
    console.error("Ошибка получения данных:", error);
  }
}

// Вызываем функцию для пользователя Dexoron
getGitHubStats("dexoron");
