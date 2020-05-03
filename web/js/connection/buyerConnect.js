const url = 'https://akoonlineshop.herokuapp.com';
const deleteBtns = document.getElementsByClassName('delete');
const deleteOrder = () => {
  // eslint-disable-next-line no-restricted-syntax
  for (const deleteBtn of deleteBtns) {
    deleteBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const orderId = deleteBtn.getAttribute('id');
      const response = await fetch(`${url}/myorders/${orderId}`, {
        method: 'DELETE',
        headers: {
          Authorization: sessionStorage.getItem('Authorization'),
          Accept: 'application/json, text/plain, */*',
          'content-type': 'application/json',
        },
      });
      if (response.status === 204) {
        window.location.reload();
      } else {
        window.location.href = '../html/error.html';
      }
    });
  }
};
const displayName = document.getElementById('user');
window.addEventListener('load', async (e) => {
  e.preventDefault();
  const response = await fetch(`${url}/myorders`, {
    method: 'GET',
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
      Accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
    },
  });
  const json = await response.json();

  displayName.innerHTML = json.name || 'User Name';
  if (json.error) {
    if (json.status === 404) {
      const containerDiv = document.getElementById('container');
      containerDiv.innerHTML = json.error;
    } else {
      window.location.href = '../html/error.html';
    }
  } else {
    json.data.results.map((result) => {
      const list = document.getElementById('list');
      list.innerHTML += `
      <div class="grid-ho list-group" style="background: white; border-bottom: 2px solid #007bff;">
        <div class="item  ">
          <div class="thumbnail">
            <img class="group list-group-image" src="../img/bg-img/spii.png" alt="${result.id}" />
              <div class="caption" style="display: table;">
                <div class="col-12 hot-dog"><p>Items: <i>${result.productname} </i></p></div>
                <div class="col-12 hot-dog"><p>State: <i>${result.state} </i></p></div>
                <div class="col-12 hot-dog"><p>time: <i>${result.updatedon}</i></p></div>
              </div>
            <div class="col-xs-12 " style="display: flex;align-items: center; justify-content: center;">
              <a class="btn btn-outline-primary take" href=""data-toggle="modal" data-target="#exampleModal">edit</a>
              <button type="button" id="${result.id}" class="delete btn btn-outline-primary bg-red" data-dismiss="modal" style="margin-left: 26%; min-width: 100px;">Delete</button>
            </div>
          </div>
        </div>
      </div>`;
      return list;
    });
    deleteOrder();
  }
});
document.getElementById('logout').addEventListener('click', (e) => {
  e.preventDefault();
  sessionStorage.removeItem('Authorization');
  window.location.href = '../html/login.html';
});
