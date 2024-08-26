const url_api_parties = 'http://localhost:3000/api/parties'
const url_api_services = 'http://localhost:3000/api/services'
const parties_container = document.getElementById('parties_container');
const party_form = document.getElementById('party_form');
const create_party_button = document.getElementById('create_party_button')
let parties = [];
let servicesdata = [];
create_party_button.onclick = () =>{
    if(parties_container.style.display != 'none'){
        parties_container.style.display = 'none';
        party_form.style.display = 'flex';
    }else{
        parties_container.style.display = 'flex';
        party_form.style.display = 'none';
    }
}
async function Get_parties() {
    const response = await fetch(url_api_parties);
    const data = await response.json();
    return data
}

async function get_services() {
    const services_form = document.getElementById('services_form')
    const response = await fetch('http://localhost:3000/api/services');
    const data = await response.json();
    servicesdata = data;
    console.log(servicesdata);
    
    data.forEach(service =>{
        services_form.innerHTML += `
            <div class="col-md-4 col-sm-12">
                <div class="card mb-5 shadow-sm p-2">
                    <div class="img_party" style=" background-image: url('${service.image}'); background-size: cover;"></div>
                    <div class="card-body">
                        <div class="card-title">
                            <h2>${service.name}</h2>
                        </div>
                        <div class="card-text">
                            <hr>
                            <p>
                                Orçamento: R$${service.price}
                            </p>
                        </div>
                        <input type="checkbox" value="${service._id}" class="form-check-input me-2"> <span>Adicionar</span>
                    </div>      
                </div>
            </div>
        `
        console.log(service.name + ': '+ service._id);
    })
    
}
party_form.onsubmit = async (e) => {
    e.preventDefault();
    let party_object = {
        "title": document.getElementById('title_party_form').value,
        "author": document.getElementById('author_party_form').value,
        "description": document.getElementById('description_party_form').value,
        "budget": parseFloat(document.getElementById('budget_party_form').value),
        "image":document.getElementById('image_party_form').value,
        "services": []
    }
    let service_price = 0;
     const service_checkboxes = document.querySelectorAll('#services_form input[type="checkbox"]');
     service_checkboxes.forEach(checkbox => {
         if (checkbox.checked) {
             const serviceId = checkbox.value;
             const selectedService = servicesdata.find(service => service._id === serviceId);
 
             if (selectedService) {
                 party_object.services.push(selectedService);
                 service_price += selectedService.price
             }
         }
     });
     if(service_price <= party_object.budget){
        const response = await fetch(url_api_parties,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(party_object)
        })
        const data = await response.json();
        console.log(data);
        start_parties();
        party_form.reset();
        parties_container.style.display = 'flex';
        party_form.style.display = 'none';
     }else{
        alert('orçamento muito baixo!')
     }
    
    
}

get_services();
async function start_parties() {
    const parties = await Get_parties();  // Espera a função Get_parties terminar
   
    
    if (parties.length > 0) {
        parties_container.innerHTML = ''; 
        parties.forEach(party => {
            let party_servicos = '';
            if(party.services.length == 0){party_servicos = ' Nenhum'}
            for (let i = 0; i < party.services.length; i++) {
                party_servicos += ` "${party.services[i].name}"`; 
            }
            parties_container.innerHTML += `
            <div class="col-lg-4 col-md-6 col-sm-12">
                <div class="card mb-5 shadow-sm p-2">
                    <div class="img_party" style=" background-image: url('${party.image}');"></div>
                    <div class="card-body">
                        <div class="card-title">
                            <h2>${party.title}</h2>
                        </div>
                        <div class="card-text">
                            <hr>
                            <p>
                                Orçamento: R$${party.budget}
                            </p>
                        </div>
                        <div class="btn btn-outline-primary rounded " id="${party.id}">Detalhes</div>
                    </div>
                </div>
            </div>
            `;
        });
    } else {
        parties_container.innerHTML = '<h2 class="text-center">Nenhuma festa...</h2>';
    }
}

// Use setInterval apenas se precisar atualizar periodicamente
start_parties();

