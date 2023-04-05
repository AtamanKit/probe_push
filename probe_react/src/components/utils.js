export function apiUrl() {
    let url = ''

    if (process.env.NODE_ENV === 'production') {
        url = window.location.origin + '/api';
    } else {
        url = 'http://localhost:8000/api';
    };

    return url;
}