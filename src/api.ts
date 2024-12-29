export async function fetchUserData(userId: string) {
  const response = await fetch(`https://api.example.com/users/${userId}`);
  return response.json();
}

export function getCurrentTime() {
  return new Date().toISOString();
}
