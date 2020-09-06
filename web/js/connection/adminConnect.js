const url = 'http://localhost:4500';
const deleteOrdersAPI = async (orderId) =>
  await fetch(`${url}/orders/${orderId}`, {
    method: 'DELETE',
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
      Accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
    },
  });
const getUserByName = async (model, start) =>
  await fetch(`${url}/${model}/prefix/${start}`, {
    method: 'GET',
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
      Accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
    },
  });
const getOrderByName = async (start) =>
  await fetch(`${url}/orders/prefix/${start}`, {
    method: 'GET',
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
      Accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
    },
  });
const getAllUsersAPI = async () =>
  await fetch(`${url}/users`, {
    method: 'GET',
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
      Accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
    },
  });
const getAllOrdersAPI = async () =>
  await fetch(`${url}/orders`, {
    method: 'GET',
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
      Accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
    },
  });
const getPaginatedOrders = async (page) =>
  await fetch(`${url}/orders/page/${page}`, {
    method: 'GET',
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
      Accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
    },
  });
const getPaginatedUsers = async (page) =>
  await fetch(`${url}/users/page/${page}`, {
    method: 'GET',
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
      Accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
    },
  });
const updateOrder = async (orderId) =>
  await fetch(`${url}/rejected/${orderId}`, {
    method: 'PATCH',
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
      Accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
    },
  });
const searchAPI = async (model, searchKey = '') =>
  await fetch(`${url}/search/${model}/${searchKey}`, {
    method: 'GET',
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
      Accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
    },
  });
const deleteBtns = document.getElementsByClassName('delete');
const deleteOrder = () => {
  // eslint-disable-next-line no-restricted-syntax
  for (const deleteBtn of deleteBtns) {
    deleteBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const orderId = deleteBtn.getAttribute('data-orderId');
      const response = await deleteOrdersAPI(orderId);
      if (response.status === 204) {
        document.getElementById('orders').click();
      } else {
        sessionStorage.setItem('errorMessage', response.error);
        sessionStorage.setItem('status', response.status);
        window.location.href = '../html/error.html';
      }
    });
  }
};
const editBtns = document.getElementsByClassName('edit');
const editOrder = () => {
  // eslint-disable-next-line no-restricted-syntax
  for (const editBtn of editBtns) {
    editBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const orderId = editBtn.getAttribute('data-orderId');
      const res = await updateOrder(orderId);
      const js = await res.json();
      if (js.error) {
        sessionStorage.setItem('errorMessage', js.error);
        sessionStorage.setItem('status', js.status);
        window.location.href = '../html/error.html';
      } else {
        document.getElementById('orders').click();
      }
    });
  }
};
const letters = document.getElementsByClassName('Tabs-tab');
const displayUserByName = () => {
  // eslint-disable-next-line no-restricted-syntax
  for (const letter of letters) {
    letter.addEventListener('click', async (e) => {
      e.preventDefault();
      const start = letter.innerText;
      const key = sessionStorage.getItem('searchItem');
      if (key === 'users' || key === '' || key === undefined) {
        if (start === 'All') {
          document.getElementById('users').click();
        } else {
          const response = await getUserByName('users', start);
          const json = await response.json();
          if (json.error) {
            if (json.status === 404) {
              document.getElementById('list').innerHTML = json.error;
            }
          } else {
            document.getElementById('list').innerHTML = '';
            json.data.map((result) => {
              const users = document.getElementById('list');
              users.innerHTML += `
            <div class="col-lg-3   item-entry mb-3">
                        <div class="container">
                          <div class="card">
                            <img src="../img/bg-img/spii.png" alt="">
                            <h1>${result.name}</h1>
                            <h2>${result.isbuyer ? 'Buyer' : 'Deliverer'}</h2>
                            <div class="row">
                              <div class="container">
                                  ${
                                    result.isbuyer
                                      ? '<span class="fa fa-chart-line"></span>'
                                      : '<span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fas fa-star-half-alt"> 4.6</span>'
                                  }
                              </div>
                            </div>
                            <div class="row">
                              <div class="container " style="padding-top:6%;">
                                <a class="button btm-btn bg-blue" href="" target="_blank"><span class="fa fa-envelope"></span></a>
                                <a class="button btm-btn2 bg-blue" href="" target="_blank"><span class="fa fa-gear"></span></a>
                              </div>
                            </div>
  
                          </div>
                        </div>
                      </div>`;
              return users;
            });
          }
        }
      }
      if (key === 'orders') {
        if (start === 'All') {
          document.getElementById('orders').click();
        } else {
          const response = await getUserByName('orders', start);
          const json = await response.json();
          if (json.error) {
            if (json.status === 404) {
              document.getElementById('list').innerHTML = json.error;
            }
          } else {
            document.getElementById('list').innerHTML = '';
            json.data.map((result) => {
              const users = document.getElementById('list');
              users.innerHTML += `
              <div id="products" class="col-lg-4  col-sm-12 item-entry mb-4 list-group" style="background: white; border-bottom: 2px solid #007bff;">
              <div class="item  ">
                  <div class="thumbnail">
                      <img class="group list-group-image" src="../img/bg-img/spii.png" alt="" />
                      <div class="caption" style="display: table;">
                          <div class="col-12 hot-dog"><p>Items: <i>${result.productname} </i></p></div>
                          <div class="col-12 hot-dog"><p>time: <i>${result.updatedon}</i></p></div>
                          <div class="col-12 hot-dog"><p>State: <i>${result.state} </i></p></div>
                      </div>
                      <div class="col-xs-12 " style="display: flex;align-items: center; justify-content: center;">
                        <button type="button" class="edit btn btn-outline-primary orderz" data-OrderId="${result.id}" data-dismiss="modal">edit</button>
                        <button type="button" data-OrderId="${result.id}" class="delete btn btn-outline-primary bg-red" data-dismiss="modal">Delete</button>
                      </div>
                  </div>
              </div>
      </div>`;
              return users;
            });
          }
        }
      }
      deleteOrder();
      editOrder();
    });
  }
};
const displayName = document.getElementById('user');
const getAllUsers = async () => {
  sessionStorage.setItem('searchItem', 'users');
  const response = await getPaginatedUsers(1);
  const json = await response.json();
  displayName.innerHTML = json.name || 'Admin Name';
  if (json.error) {
    sessionStorage.setItem('errorMessage', json.error);
    sessionStorage.setItem('status', json.status);
    window.location.href = '../html/error.html';
  } else {
    document.getElementById('list').innerHTML = '';
    json.data.results.map((result) => {
      const users = document.getElementById('list');
      users.innerHTML += `
        <div class="col-lg-3  col-sm-12 item-entry mb-3">
                    <div class="container">
                      <div class="card">
                        <img src="../img/bg-img/spii.png" alt="">
                        <h1>${result.name}</h1>
                        <h2>${result.isbuyer ? 'Buyer' : 'Deliverer'}</h2>
                        <div class="row">
                          <div class="container">
                              ${
                                result.isbuyer
                                  ? '<span class="fa fa-chart-line"></span>'
                                  : '<span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fas fa-star-half-alt"> 4.6</span>'
                              }
                          </div>
                        </div>
                        <div class="row">
                          <div class="container " style="padding-top:6%;">
                            <a class="button btm-btn bg-blue" href="" target="_blank"><span class="fa fa-envelope"></span></a>
                            <a class="button btm-btn2 bg-blue" href="" target="_blank"><span class="fa fa-gear"></span></a>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>`;
      return users;
    });
    deleteOrder();
    editOrder();
    displayUserByName();
  }
};
const getAllOrders = async () => {
  sessionStorage.setItem('searchItem', 'orders');
  const response = await getPaginatedOrders(1);
  const json = await response.json();
  displayName.innerHTML = json.name || 'Admin Name';
  if (json.error) {
    if (json.status === 404) {
      const containerDiv = document.getElementById('list');
      containerDiv.innerHTML = json.error;
    } else {
      sessionStorage.setItem('errorMessage', json.error);
      sessionStorage.setItem('status', json.status);
      window.location.href = '../html/error.html';
    }
  } else {
    document.getElementById('list').innerHTML = '';
    json.data.results.forEach((result) => {
      document.getElementById('list').innerHTML += `
          <div id="products" class="col-lg-4  col-sm-12 item-entry mb-4 list-group" style="background: white; border-bottom: 2px solid #007bff;">
                            <div class="item  ">
                                <div class="thumbnail">
                                    <img class="group list-group-image" src="../img/bg-img/spii.png" alt="" />
                                    <div class="caption" style="display: table;">
                                        <div class="col-12 hot-dog"><p>Items: <i>${result.productname} </i></p></div>
                                        <div class="col-12 hot-dog"><p>time: <i>${result.updatedon}</i></p></div>
                                        <div class="col-12 hot-dog"><p>State: <i>${result.state} </i></p></div>
                                    </div>
                                    <div class="col-xs-12 " style="display: flex;align-items: center; justify-content: center;">
                                      <button type="button" class="edit btn btn-outline-primary orderz" data-OrderId="${result.id}" data-dismiss="modal">edit</button>
                                      <button type="button" data-OrderId="${result.id}" class="delete btn btn-outline-primary bg-red" data-dismiss="modal">Delete</button>
                                    </div>
                                </div>
                            </div>
                    </div>`;
    });
    deleteOrder();
    editOrder();
    displayUserByName();
  }
};
const search = async () => {
  const searchItem = sessionStorage.getItem('searchItem');
  const input = document.getElementById('search-input').value;
  const response = await searchAPI(searchItem, input);
  const json = await response.json();
  displayName.innerHTML = json.name || 'Admin Name';
  const DOMEl = document.getElementById('list');
  DOMEl.innerHTML = '';
  json.data.forEach((result) => {
    DOMEl.innerHTML +=
      searchItem === 'users'
        ? `
        <div class="col-lg-3  col-sm-12 item-entry mb-3">
        <div class="container">
          <div class="card">
            <img src="../img/bg-img/spii.png" alt="">
            <h1>${result.name}</h1>
            <h2>${result.isbuyer ? 'Buyer' : 'Deliverer'}</h2>
            <div class="row">
              <div class="container">
                  ${
                    result.isbuyer
                      ? '<span class="fa fa-chart-line"></span>'
                      : '<span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fas fa-star-half-alt"> 4.6</span>'
                  }
              </div>
            </div>
            <div class="row">
              <div class="container " style="padding-top:6%;">
                <a class="button btm-btn bg-blue" href="" target="_blank"><span class="fa fa-envelope"></span></a>
                <a class="button btm-btn2 bg-blue" href="" target="_blank"><span class="fa fa-gear"></span></a>
              </div>
            </div>

          </div>
        </div>
      </div>
  `
        : `<div id="products" class="col-lg-4  col-sm-12 item-entry mb-4 list-group" style="background: white; border-bottom: 2px solid #007bff;">
        <div class="item  ">
            <div class="thumbnail">
                <img class="group list-group-image" src="../img/bg-img/spii.png" alt="" />
                <div class="caption" style="display: table;">
                    <div class="col-12 hot-dog"><p>Items: <i>${result.productname} </i></p></div>
                    <div class="col-12 hot-dog"><p>time: <i>${result.updatedon}</i></p></div>
                    <div class="col-12 hot-dog"><p>State: <i>${result.state} </i></p></div>
                </div>
                <div class="col-xs-12 " style="display: flex;align-items: center; justify-content: center;">
                  <button type="button" class="edit btn btn-outline-primary orderz" data-OrderId="${result.id}" data-dismiss="modal">edit</button>
                  <button type="button" data-OrderId="${result.id}" class="delete btn btn-outline-primary bg-red" data-dismiss="modal">Delete</button>
                </div>
            </div>
        </div>
</div>
  `;
  });
};
window.addEventListener('load', async (e) => {
  e.preventDefault();
  getAllUsers();
  deleteOrder();
  editOrder();
  displayUserByName();
});
document.getElementById('all').addEventListener('click', () => {
  document.getElementById('users').click();
});
document.getElementById('users').addEventListener('click', (e) => {
  e.preventDefault();
  getAllUsers();
});
document.getElementById('orders').addEventListener('click', (e) => {
  e.preventDefault();
  getAllOrders();
});
document.getElementById('logout').addEventListener('click', (e) => {
  e.preventDefault();
  sessionStorage.removeItem('Authorization');
  window.location.href = '../html/login.html';
});
document.getElementById('search-input').addEventListener('input', (e) => {
  e.preventDefault();
  search();
});
