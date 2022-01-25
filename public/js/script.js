document.addEventListener('DOMContentLoaded', () => {
    switch (true) {
        case window.location.href.includes('verify'):
            console.log('verify');
            break;
        case window.location.href.includes('reset'):
            console.log('reset');
            break;
        default:
            console.log('404');
            break;

    }
}
)