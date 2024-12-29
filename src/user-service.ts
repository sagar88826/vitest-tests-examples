import { fetchUserData } from "./api";

export class UserService {
  async getUser(id: string) {
    const data = await fetchUserData(id);
    return {
      ...data,
      lastAccessed: this.getAccessTime(),
    };
  }

  getAccessTime() {
    return new Date().toISOString();
  }
}
