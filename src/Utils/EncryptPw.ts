import bcrypt from "bcrypt";

const saltRounds = 10;

export const encryptPass = async (password: string) => {
  bcrypt.genSalt(saltRounds).then((salt) => {
    bcrypt.hash(password, salt).then((hashedPw) => {
      return hashedPw;
    });
  });
};

export const comparePass = async (userPw: string, hashedPw: string) => {
  bcrypt.compare(userPw, hashedPw).then((res) => res);
};
