type User = {
  username: string;
  lastname: string;
  password: string;
  avatar?: string;
  isActive: boolean;
  bio?: string;
  createdAt: Date;
  email?: string;
};

export { User };
