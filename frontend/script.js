const url_api = 'http://localhost:3000/api/services'
servico_novo = {
    name: 'sakjkd',
    description: 'lmdsk',
    price: 2408,
    image: 'ksks'
}
async function  criar_servico(servico_novo) {
    const response = await fetch(url_api, {
        method: "POST",
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(servico_novo)
    })
    const data = await response.json();
    console.log(data);
    
}
async function pegar_dados() {
    const response = await fetch(url_api)
    const data = await response.json();
    const container = document.getElementById('container')
    console.log(data);
    data.map((servico) =>{
        const div = document.createElement('div');
        const name = document.createElement('h2')
        const description = document.createElement('p');
        const price = document.createElement("span");
        
        name.innerHTML = servico.name;
        description.innerHTML = servico.description;
        price.innerHTML = servico.price;

        div.appendChild(name)
        div.appendChild(description)
        div.appendChild(price)

        container.appendChild(div);
    } )   
}
alert('criar')
criar_servico(servico_novo);
pegar_dados();

