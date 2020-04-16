[...document.getElementsByTagName('input')].forEach((input) => {
  input.addEventListener('click', () => {
    [...document.getElementsByClassName('fields')].forEach((field) => {
      // eslint-disable-next-line no-param-reassign
      field.style.display = 'none';
    });
  });
});
document.getElementById('register').addEventListener('submit', async (e) => {
  e.preventDefault();
  [...document.getElementsByClassName('fields')].forEach((field) => {
    // eslint-disable-next-line no-param-reassign
    field.style.display = 'none';
  });
  document.getElementById('error').style.display = 'none';
  const name = document.getElementById('name').value;
  const userName = document.getElementById('userName').value;
  const phoneNumber = document.getElementById('phoneNumber').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const selected = document.getElementById('cont-typ');
  const isBuyer = selected.options[selected.selectedIndex].value;

  const response = await fetch('http://localhost:4500/auth/signup', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      name, userName, phoneNumber, password, confirmPassword, isBuyer,
    }),
  });
  const json = await response.json();
  if (json.error) {
    if (json.status === 409) {
      const errorDiv = document.getElementById('error');
      errorDiv.innerHTML = json.error;
      errorDiv.style.display = 'inline';
      errorDiv.style.color = '#d84930';
    } else {
      const errorDiv = document.getElementById(`${json.path}-div`);
      errorDiv.innerHTML = json.error;
      errorDiv.style.display = 'inline';
      errorDiv.style.color = '#d84930';
    }
  } else {
    sessionStorage.setItem('Authorization', `${json.token}`);
    document.getElementById('login-btn-redirect').click();
  }
});


document.getElementById('login').addEventListener('submit', async (e) => {
  e.preventDefault();
  [...document.getElementsByClassName('fields')].forEach((field) => {
    // eslint-disable-next-line no-param-reassign
    field.style.display = 'none';
  });
  document.getElementById('login-error').style.display = 'none';
  const userName = document.getElementById('login-userName').value;
  const password = document.getElementById('login-password').value;

  const response = await fetch('http://localhost:4500/auth/signin', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      userName, password,
    }),
  });
  const json = await response.json();

  console.log(json);
  if (json.error) {
    if (json.status === 401) {
      const errorDiv = document.getElementById('login-error');
      errorDiv.innerHTML = json.error;
      errorDiv.style.display = 'inline';
      errorDiv.style.color = '#d84930';
    } else {
      const errorDiv = document.getElementById(`login-${json.path}-div`);
      errorDiv.innerHTML = json.error;
      errorDiv.style.display = 'inline';
      errorDiv.style.color = '#d84930';
    }
  } else {
    sessionStorage.setItem('Authorization', `${json.data.token}`);
    document.getElementById('login').submit();
  }
});
