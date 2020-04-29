const url = 'https://akoonlineshop.herokuapp.com';
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

  document.getElementById('user').innerHTML = json.name || 'User Name';
  if (json.error) {
    if (json.status === 404) {
      const containerDiv = document.getElementById('container');
      containerDiv.innerHTML = json.error;
    } else {
      const containerDiv = document.getElementById('container');
      containerDiv.innerHTML = json.error;
      containerDiv.style.color = '#d84930';
    }
  } else {
    json.data.results.forEach((result) => {
      document.getElementById('list').innerHTML += `
      <div id="products" class="grid-ho list-group" style="background: white; border-bottom: 2px solid #007bff;">
      <div class="item  ">
          <div class="thumbnail">
              <img class="group list-group-image" src="../img/bg-img/spii.png" alt="${result.id}" />
              <div class="caption" style="display: table;">   
                  <div class="col-12 hot-dog"><p>Items: <i>${result.productname} </i></p></div>
                  <div class="col-12 hot-dog"><p>time: <i>${result.updatedon}</i></p></div>
                  
              </div>
              <div class="col-xs-12 " style="display: flex;align-items: center; justify-content: center;">
                  <a class="btn btn-outline-primary take" href=""data-toggle="modal" data-target="#exampleModal">edit</a>
                  <button type="button" class="delete btn btn-outline-primary bg-red" data-dismiss="modal" style="margin-left: 26%; min-width: 100px;">Delete</button>
              </div>
          </div>
      </div>
</div>`;
    });
  }
});
