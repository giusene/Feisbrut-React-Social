document.addEventListener('DOMContentLoaded', () => {
  switch (true) {
    case window.location.href.includes('verify'):
      verify();
      break;
    case window.location.href.includes('reset'):
      reset();
      break;
    default:
      other();
      break;

  }
}
)


const verify = () => {
  const id = window.location.href.split('=')[1];
  console.log('verify', id);
  httpPOST(`/confirmation`, { id: id })
    .then(data => {
      const container = document.querySelector('.container');
      const textWrapper = document.querySelector('.waiting');
      textWrapper.textContent = `${data.response}`;
      const button = document.createElement('a');
      button.textContent = "Vai alla pagina di login";
      button.setAttribute('href', 'https://giusene.github.io/Feisbrut-React-Social/');
      container.appendChild(button);
    })
    .catch(err => {
      const container = document.querySelector('.container');
      const textWrapper = document.querySelector('.waiting');
      textWrapper.textContent = "C'è stato un errore!'";
      const button = document.createElement('a');
      button.textContent = "Vai alla pagina di login";
      button.setAttribute('href', 'https://giusene.github.io/Feisbrut-React-Social/');
      container.appendChild(button);
      console.log(err)
    })

}

const reset = () => {
  const id = window.location.href.split('=')[1];
  console.log('reset', id);
}

const other = () => {
  console.log('other');
}


const httpUPDATE = (resource, data) =>
  fetch('https://feisbrut.herokuapp.com' + resource, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(data),
  }).then(response => response.json());