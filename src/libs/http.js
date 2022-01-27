const BASE_URL = process.env.REACT_APP_BE_ENDPOINT;
const LINK_PREVIEW_API = process.env.REACT_APP_LINK_PREVIEW;

/////// QUESTA POTREBBE ESSERE DA TOGLIERE
const http = (resource) => fetch(BASE_URL + resource)
    .then(response => response.json());

// SONO TUTTE UGUALI //////////////
const httpPOST = (resource, data) =>
    fetch(BASE_URL + resource, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data),
    }).then(response => response.json());

const httpFRIENDS = (resource, data) =>
    fetch(BASE_URL + resource, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data),
    }).then(response => response.json());

const httpCOMMENT = (resource, data) =>
    fetch(BASE_URL + resource, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data),
    }).then(response => response);

const getPost = (data) =>
    fetch(BASE_URL + '/getmypost', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data),
    }).then(response => response.json());


const likeFunc = (data) =>
    fetch(BASE_URL + '/like', {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data),
    }).then((response) => response);



/////////////////////////////////////////////////////////////////////

const httpUPDATE = (resource, data) =>
    fetch(BASE_URL + resource, {
        method: "PATCH",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data),
    }).then(response => response.json());

const httpDELETE = (resource, data) =>
    fetch(BASE_URL + resource, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data),
    }).then(response => response.json());


const dataConvert = (data) => {
    let formData = new FormData();
    formData.append(
        'image',
        data,
    );
    return formData;
}

const uploadImg = (data) =>
    fetch(process.env.REACT_APP_IMG_UPLOAD_ENDPOINT, {
        method: 'POST',
        body: dataConvert(data),
    }).then((response) => response.json());


const sendEmail = (email, res, name, type) => {
    let template;
    switch (type) {
        case 'verify/key=':
            template = 'template_kwdpgz7';
            break;
        case 'passreset/key=':
            template = 'template_xr8np26';
            break;
        default:
            break;
    }
    const emailBody = {
        service_id: process.env.REACT_APP_EMAIL_SERVICE_ID,
        template_id: template,
        user_id: process.env.REACT_APP_EMAIL_USER_ID,
        template_params: {
            'destinatario': email,
            'message': `${window.location.href + type + res}`,
            'to_name': name
        }
    }
    fetch(process.env.REACT_APP_EMAIL_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(emailBody),
    }).then((response) => response)
}

const linkPreview = (resource) => fetch(`http://api.linkpreview.net/?key=${LINK_PREVIEW_API}&q=` + resource)
    .then(response => response.json());


export { http, httpPOST, httpUPDATE, httpDELETE, httpCOMMENT, httpFRIENDS, getPost, uploadImg, likeFunc, linkPreview, sendEmail }