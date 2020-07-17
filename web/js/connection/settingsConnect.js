const url = 'http://localhost:4500';
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
const getOrders = async () => {
  const response = await getAllOrders();
  const json = await response.json();
  return json.data;
};
const getPendingOrders = async () => {
  const orders = await getOrders();
  return orders.filter((order) => order.state === 'pending');
};
const getCompleteOrders = async () => {
  const orders = await getOrders();
  return orders.filter((order) => order.state === 'delivered');
};
const updateDOM = async () => {
  const pendingOrders = await getPendingOrders();
  const completedOrders = await getCompleteOrders();
  const orders = await getOrders();
  document.getElementById('pending').innerText = ` ${pendingOrders.length}`;
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
  const usersTable = document.getElementById('users-table');
  const orderTable = document.getElementById('order-table');
  users.data.results.forEach((user) => {
    const row = document.createElement('tr'); // creates a table row element
    row.innerHTML = `
    <th scope="row">${user.id}</th>
    <td>${user.name}</td>
    <td>${user.isbuyer ? 'Buyer' : 'Deliverer'}</td>
    <td><button type="button" class="btn btn-outline-primary bg-green" data-userId=${
      user.id
    } data-dismiss="modal">Change</button></td>
    <td><button type="button" class="btn btn-outline-primary bg-red" data-userId=${
      user.id
    } data-dismiss="modal">Remove</button></td>`;

    usersTable.appendChild(row); // adds the created table row element to the table body
  });
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
});
