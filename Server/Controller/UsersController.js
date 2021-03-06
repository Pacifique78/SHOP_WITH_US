import { querry } from '../Db';

class Users {
  async getAllUsers(req, res) {
    const selectQuerry = 'SELECT * FROM users WHERE NOT isadmin;';
    const results = await querry(selectQuerry);
    if (results[0]) {
      return res.status(200).json({
        status: 200,
        name: req.tokenData.name,
        message: 'Users successfully retreived',
        data: results,
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

  async selectByName(req, res) {
    const { model } = req.params;
    const { start } = req.params;
    const selectQuerry = `SELECT * FROM ${model} ${
      model === 'users'
        ? 'WHERE NOT isadmin AND UPPER(name) LIKE $1'
        : 'WHERE UPPER(productname) LIKE $1'
    };`;
    const result = await querry(selectQuerry, [`${start}%`]);
    if (result[0]) {
      return res.status(200).json({
        status: 200,
        message: `${
          model.charAt(0).toUpperCase() + model.slice(1)
        } successfully retrieved`,
        data: result,
      });
    }
    return res.status(404).json({
      status: 404,
      error: `${
        model.charAt(0).toUpperCase() + model.slice(1)
      } with name starting with ${start} not found`,
    });
  }

  async desactivateUser(req, res) {
    const selectQuerry = 'SELECT * FROM users WHERE id=$1;';
    const result = await querry(selectQuerry, [
      parseInt(req.params.userId, 10),
    ]);
    if (result[0]) {
      const updateQuery = 'UPDATE users SET status=$1 WHERE id=$2 RETURNING *';
      let updatedUser = result[0];
      if (result[0].status === 'active') {
        updatedUser = await querry(updateQuery, [
          'inactive',
          parseInt(req.params.userId, 10),
        ]);
      } else {
        updatedUser = await querry(updateQuery, [
          'active',
          parseInt(req.params.userId, 10),
        ]);
      }
      return res.status(200).json({
        status: 200,
        message: `User ${
          updatedUser[0].status === 'active' ? 'Activated' : 'Desactivated'
        }`,
        data: updatedUser[0],
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'User not found',
    });
  }

  async changeUser(req, res) {
    const selectQuerry = 'SELECT * FROM users WHERE id=$1;';
    const result = await querry(selectQuerry, [
      parseInt(req.params.userId, 10),
    ]);
    if (result[0]) {
      const updateQuery = 'UPDATE users SET isbuyer=$1 WHERE id=$2 RETURNING *';
      const updatedUser = await querry(updateQuery, [
        'false',
        parseInt(req.params.userId, 10),
      ]);
      return res.status(200).json({
        status: 200,
        message: 'User successfully changed',
        data: updatedUser[0],
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'User not found',
    });
  }

  async paginate(req, res) {
    const { pageNbr } = req.params;
    const { model } = req.params;
    const selectQuerry = `SELECT * FROM ${model} ${
      model === 'users' ? 'WHERE NOT isadmin' : ''
    };`;
    const limit = `${model === 'users' ? 8 : 6}`;
    const startIndex = (pageNbr - 1) * limit;
    const endIndex = pageNbr * limit;
    const results = await querry(selectQuerry);
    if (results[0]) {
      const paginatedResult = {};
      paginatedResult.results = results.slice(startIndex, endIndex);
      if (endIndex < results.length) {
        paginatedResult.next = `${model}/page/${+pageNbr + 1}`;
      }
      if (startIndex > 0) {
        paginatedResult.prev = `${model}/page/${+pageNbr - 1}`;
      }
      return res.status(200).json({
        status: 200,
        name: req.tokenData.name,
        message: `${
          model.charAt(0).toUpperCase() + model.slice(1)
        } successfully retreived`,
        data: paginatedResult,
      });
    }
    return res.status(404).json({
      status: 404,
      name: req.tokenData.name,
      error: `No ${model} found`,
    });
  }

  async search(req, res) {
    const { searchKey } = req.params;
    const { model } = req.params;
    const selectQuerry = `SELECT * FROM ${model} ${
      model === 'users' ? 'WHERE NOT isadmin' : ''
    };`;
    const results = await querry(selectQuerry);
    if (results[0]) {
      const searchResults = [];
      if (searchKey === undefined) {
        return res.status(200).json({
          status: 200,
          name: req.tokenData.name,
          message: `${
            model.charAt(0).toUpperCase() + model.slice(1)
          } successfully retreived`,
          data: results,
        });
      }
      results.forEach((result) => {
        const searchEl = `${
          model === 'users'
            ? result.name.toUpperCase()
            : result.productname.toUpperCase()
        }`;
        if (searchEl.indexOf(searchKey.toUpperCase()) > -1) {
          searchResults.push(result);
        }
      });
      return res.status(200).json({
        status: 200,
        name: req.tokenData.name,
        message: `${
          model.charAt(0).toUpperCase() + model.slice(1)
        } successfully retreived`,
        data: searchResults,
      });
    }
    return res.status(404).json({
      status: 404,
      name: req.tokenData.name,
      error: `No ${model} found`,
    });
  }
}
export default Users;
