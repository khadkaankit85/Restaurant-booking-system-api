export interface user {
  id: number;
  username: string;
  password: string;
  phone?: string;
  email: string;
  role: "admin" | "user";
}

export interface CreateUserRequest {
  body: {
    username: string;
    password: string;
    email: string;
    phone?: string;
  };
}

export interface LoginRequest {
  body: {
    username: string;
    password: string;
  };
}

export interface PasswordChangeRequest {
  req: {
    body: {
      username: string;
      oldpassword: string;
      newpassword: string;
    };
  };
}
