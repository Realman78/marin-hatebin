const textarea = document.getElementById('mainTA')
const button = document.getElementById('saveButton')

button.addEventListener('click', (e)=>{
    e.preventDefault()
    button.disabled = true
    if (textarea.value.length < 1) return
    const body = {
        text: textarea.value
    }
    if (window.location.pathname.length>10){
        updateBin(body)
    }else{
        createNewPost(body)
    }

})

function createNewPost(body){
    fetch('/save', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(body)
    }).then((res)=>{
        return res.json()
    }).then((data)=>{
        location.href = '/'+data._id
    })
}
function updateBin(body){
    body.id = window.location.pathname.substr(1)
    fetch('/update', {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(body)
    }).then((res)=>{
        alert('successfully updated')
        button.disabled = false
    })
}