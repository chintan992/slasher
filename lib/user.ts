export async function getUserProfile(userId: string) {
  // In a real implementation, this would fetch from your database
  // For demo purposes, we'll return mock data

  return {
    id: userId,
    name: "Demo User",
    email: "user@example.com",
    bio: "Movie enthusiast and binge-watcher extraordinaire.",
    avatar: null,
    createdAt: "2023-01-01T00:00:00Z",
  }
}

// Get user watchlist
export async function getUserWatchlist(userId: string) {
  // In a real implementation, this would fetch from your database
  // For demo purposes, we'll return mock data

  return [
    {
      id: 550,
      title: "Fight Club",
      type: "movie",
      poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
      release_date: "1999-10-15",
    },
    {
      id: 278,
      title: "The Shawshank Redemption",
      type: "movie",
      poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
      release_date: "1994-09-23",
    },
    {
      id: 1399,
      name: "Game of Thrones",
      title: "Game of Thrones",
      type: "tv",
      poster_path: "/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg",
      first_air_date: "2011-04-17",
    },
  ]
}

