import { querry } from '../Db';

class Users {
  async getAllUsers(req, res) {
    const selectQuerry = 'SELECT * FROM users;';
    const results = await querry(selectQuerry);
    if (results[0]) {
      return res.status(200).json({
        status: 200,
        name: req.tokenData.name,
        message: 'Users successfully retreived',
        data: {
          results,
        },
      });
    }
  }

  async getSpecificUser(req, res) {
    const userId = parseInt(req.params.userId, 10);
    const selectQuerry = 'SELECT * FROM users WHERE id=$1;';
    const result = await querry(selectQuerry, [userId]);
    if (result[0]) {
      return res.status(200).json({
        status: 200,
        message: 'user successfully retrieved',
        data: result[0],
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'User not found',
    });
  }

  async selectUserByName(req, res) {
    const { start } = req.params;
    const selectQuerry = 'SELECT * FROM users WHERE UPPER(name) LIKE $1;';
    const result = await querry(selectQuerry, [`${start}%`]);
    if (result[0]) {
      return res.status(200).json({
        status: 200,
        message: 'users successfully retrieved',
        data: result,
      });
    }
    return res.status(404).json({
      status: 404,
      error: `Users with name starting with ${start} not found`,
    });
  }

  async desactivateUser(req, res) {
    const selectQuerry = 'SELECT * FROM users WHERE id=$1;';
    const result = await querry(selectQuerry, [parseInt(req.params.userId, 10)]);
    if (result[0]) {
      const updateQuery = 'UPDATE users SET status=$1 WHERE id=$2 RETURNING *';
      let updatedUser = result[0];
      if (result[0].status === 'active') {
        updatedUser = await querry(updateQuery, ['inactive', parseInt(req.params.userId, 10)]);
      } else {
        updatedUser = await querry(updateQuery, ['active', parseInt(req.params.userId, 10)]);
      }
      return res.status(200).json({
        status: 200,
        message: 'Users desactivated/activated',
        data: {
          updatedUser,
        },
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'User not found',
    });
  }

  async changeUser(req, res) {
    const selectQuerry = 'SELECT * FROM users WHERE id=$1;';
    const result = await querry(selectQuerry, [parseInt(req.params.userId, 10)]);
    if (result[0]) {
      const updateQuery = 'UPDATE users SET isbuyer=$1 WHERE id=$2 RETURNING *';
      const updatedUser = await querry(updateQuery, ['false', parseInt(req.params.userId, 10)]);
      return res.status(200).json({
        status: 200,
        message: 'Users successfully changed',
        data: {
          updatedUser,
        },
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'User not found',
    });
  }
}
export default Users;