let contacts = document.querySelector('#contacts')

// delete handler
const deleteHandler = async (id) => {
    if(window.confirm(`Are you sure to delete user data?`)){
        await fetch(`/api/contact/delete/${id}`,{
            method:'DELETE'
        }).then(res => res.json()).then(res => {
            alert(res.msg)
            window.location = '/'
        })
    }
}
const print = (data) => {
    data.forEach(item => {
        contacts.innerHTML += `
    <div class='col-lg-4 col-md-4 col-sm-6'>
        <div class='card'>
            <img class='card-img-top' src="${item.image}"/>
            <div class="card-body">
                <h4 class='text-center text-success'>${item.name}</h4>
                <ul class='list-group'>
                    <li class='list-group-item'>
                        <b>Email : </b>
                        <span class='float-end'>${item.email}</span>
                    </li>
                    <li class='list-group-item'>
                        <b>Mobile : </b>
                        <span class='float-end'>${item.mobile}</span>
                    </li>
                    <li class='list-group-item'>
                        <b>Website : </b>
                        <span class='float-end'>${item.website}</span>
                    </li>
                </ul>
            </div>
            <div class='card-footer'>
            <a href="/edit?id=${item._id}" class='btn btn-info'><i class='bi bi-pencil'></i></a>
            <a onclick="deleteHandler('${item._id}')" class='btn btn-danger float-end'><i class='bi bi-trash'></i></a>
            </div>
        </div>
    </div>`
    });
}
const read = async () => {
    await fetch('/api/contact/all').then(res => res.json())
    .then(res => {
        {console.log('res ', res)
        print(res.contacts);
    }
    }).catch(err => console.log(err))
}
read()