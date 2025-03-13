export async function getServerSession() {
  // In a real implementation, this would use NextAuth or similar
  // For demo purposes, we'll return a mock session

  return {
    user: {
      id: "1",
      name: "Demo User",
      email: "user@example.com",
      image: null,
    },
  }
}

