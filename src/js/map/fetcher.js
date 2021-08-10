export default function(request){
    return fetch(request)
        .then(response => response.json())
        .then(data => data)
        .catch(err => console.error(error))
}