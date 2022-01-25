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
}

const reset = () => {
  const id = window.location.href.split('=')[1];
  console.log('reset', id);
}

const other = () => {
  console.log('other', id);
}
