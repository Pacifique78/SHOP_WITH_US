const url = 'http://localhost:4500';
const displayName = document.getElementById('user');
const getAllOrders = async () =>
  await fetch(`${url}/orders`, {
    method: 'GET',
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
      Accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
    },
  });
const getAllUsers = async () =>
  await fetch(`${url}/users`, {
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
const desactivateUser = async (userId) =>
  await fetch(`${url}/users/${userId}`, {
    method: 'PATCH',
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
      Accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
    },
  });
const changeUser = async (userId) =>
  await fetch(`${url}/change-user/${userId}`, {
    method: 'PATCH',
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
      Accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
    },
  });
const getOrders = async () => {
  const response = await getAllOrders();
  const json = await response.json();
  if (!json.data) return [];
  return json.data;
};
const getPendingOrders = async () => {
  const orders = await getOrders();
  if (!orders) {
    return [];
  }
  return orders.filter((order) => order.state === 'pending');
};
const getAcceptedorders = async () => {
  const orders = await getOrders();
  if (!orders) {
    return [];
  }
  return orders.filter((order) => order.state === 'accepted');
};
const getCompleteOrders = async () => {
  const orders = await getOrders();
  if (!orders) {
    return [];
  }
  return orders.filter((order) => order.state === 'delivered');
};
const updateDOM = async () => {
  const pendingOrders = await getPendingOrders();
  const acceptedOrders = await getAcceptedorders();
  const completedOrders = await getCompleteOrders();
  const orders = await getOrders();
  document.getElementById('pending').innerText = ` ${pendingOrders.length}`;
  document.getElementById('accepted').innerText = ` ${acceptedOrders.length}`;
  document.getElementById('completed').innerText = ` ${completedOrders.length}`;
  document.getElementById('total').innerText = ` ${orders.length}`;
};
updateDOM();
document
  .getElementById('users')
  .addEventListener(
    'click',
    () => (window.location.href = '../html/Admin.html')
  );
document
  .getElementById('orders')
  .addEventListener(
    'click',
    () => (window.location.href = '../html/Admin.html')
  );
window.addEventListener('load', async (e) => {
  const userResponse = await getPaginatedUsers(1);
  const orderResponse = await getPaginatedOrders(1);
  const users = await userResponse.json();
  const orders = await orderResponse.json();
  displayName.innerHTML = users.name || 'Admin Name';
  const usersTable = document.getElementById('users-table');
  const orderTable = document.getElementById('order-table');
  if (users.data) {
    users.data.results.forEach((user) => {
      const row = document.createElement('tr'); // creates a table row element
      row.innerHTML = `
      <th scope="row">${user.id}</th>
      <td>${user.name}</td>
      <td>${user.isbuyer ? 'Buyer' : 'Deliverer'}</td>
      <td>${
        user.isbuyer
          ? `<button type="button" class="change btn btn-outline-primary bg-green" data-userId=${user.id} data-dismiss="modal">Change</button>`
          : '-----'
      }</td>
      <td><button type="button" class="activate btn btn-outline-primary bg-red" data-userId=${
        user.id
      } data-dismiss="modal">${
        user.status === 'active' ? 'Desactivate' : 'Activate'
      }</button></td>`;

      usersTable.appendChild(row); // adds the created table row element to the table body
      desactivate();
      changeBuyer();
    });
  }
  if (orders.data) {
    orders.data.results.forEach((order) => {
      const row = document.createElement('tr');
      row.innerHTML = `
    <th scope="row">${order.id}</th>
    <td>${order.buyername}</td>
    <td>${order.location}</td>
    <td>${order.updatedon}</td>
    <td>${order.state} </td>`;
      orderTable.appendChild(row);
    });
  }
});
const activateBtns = document.getElementsByClassName('activate');
const desactivate = () => {
  // eslint-disable-next-line no-restricted-syntax
  for (const activateBtn of activateBtns) {
    activateBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const userId = activateBtn.getAttribute('data-userId');
      document.getElementById('activate').setAttribute('data-userId', userId);
    });
  }
};
const activateBtn = document.getElementById('activate');
activateBtn.addEventListener('click', async () => {
  const orderId = activateBtn.getAttribute('data-userId');
  await desactivateUser(orderId);
  window.location.reload();
});

const changeBtns = document.getElementsByClassName('change');
const changeBuyer = () => {
  // eslint-disable-next-line no-restricted-syntax
  for (const changeBtn of changeBtns) {
    changeBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const userId = changeBtn.getAttribute('data-userId');
      document.getElementById('activate').setAttribute('data-userId', userId);
    });
  }
};
const changeBtn = document.getElementById('activate');
changeBtn.addEventListener('click', async () => {
  const orderId = changeBtn.getAttribute('data-userId');
  await changeUser(orderId);
  window.location.reload();
});
