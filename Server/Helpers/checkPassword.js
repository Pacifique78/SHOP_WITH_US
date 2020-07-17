import bcrypt from 'bcrypt';

const checkPassword = (password, hashedPassword) =>
  bcrypt.compareSync(password, hashedPassword);
export default checkPassword;
