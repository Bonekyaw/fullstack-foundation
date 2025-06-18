export const UserService = {
  async create(user: { name: string; email: string }) {
    // Simulating DB Logic
    return { id: "123", ...user };
  },
};
