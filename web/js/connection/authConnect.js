const url = 'https://akoonlineshop.herokuapp.com';
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
  const email = document.getElementById('email').value;
  const phoneNumber = document.getElementById('phoneNumber').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const selected = document.getElementById('cont-typ');
  const isBuyer = selected.options[selected.selectedIndex].value;

  const response = await fetch(`${url}/auth/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      name, email, phoneNumber, password, confirmPassword, isBuyer,
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
    sessionStorage.setItem('Authorization', `${json.data.token}`);
    window.location.href = '../html/verify.html';
  }
});


document.getElementById('login').addEventListener('submit', async (e) => {
  e.preventDefault();
  [...document.getElementsByClassName('fields')].forEach((field) => {
    // eslint-disable-next-line no-param-reassign
    field.style.display = 'none';
  });
  document.getElementById('login-error').style.display = 'none';
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const response = await fetch(`${url}/auth/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      email, password,
    }),
  });
  const json = await response.json();

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
    if (json.data.isbuyer) {
      window.location.href = '../html/dashboard2.html';
    } else {
      window.location.href = '../html/dashboard.html';
    }
  }
});

document.getElementById('forgot').addEventListener('submit', async (e) => {
  e.preventDefault();
  [...document.getElementsByClassName('fields')].forEach((field) => {
    // eslint-disable-next-line no-param-reassign
    field.style.display = 'none';
  });
  document.getElementById('forgot-error').style.display = 'none';
  const email = document.getElementById('forgot-email').value;

  const response = await fetch(`${url}/auth/forgot-password`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      email,
    }),
  });
  const json = await response.json();

  if (json.error) {
    if (json.status === 404) {
      const errorDiv = document.getElementById('forgot-error');
      errorDiv.innerHTML = json.error;
      errorDiv.style.display = 'inline';
      errorDiv.style.color = '#d84930';
    } else {
      const errorDiv = document.getElementById(`forgot-${json.path}-div`);
      errorDiv.innerHTML = json.error;
      errorDiv.style.display = 'inline';
      errorDiv.style.color = '#d84930';
    }
  } else {
    const messageDiv = document.getElementById('forgot-message');
    messageDiv.innerHTML = json.message;
    messageDiv.style.display = 'inline';
    messageDiv.style.color = '#28a745';
  }
});
