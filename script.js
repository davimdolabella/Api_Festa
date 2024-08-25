const parties_container = document.getElementById('parties_container');
const url_api_parties = 'http://localhost:3000/api/parties'
var parties = [];

async function Get_parties() {
    const response = await fetch(url_api_parties);
    const data = await response.json();
    return data
}

async function start_parties() {
    const parties = await Get_parties();  // Espera a função Get_parties terminar
   

    if (parties.length > 0) {
        parties_container.innerHTML = ''; 
        parties.forEach(party => {
            let party_servicos = '';
            console.log(party.services.length == 0) 
            if(party.services.length == 0){party_servicos = ' Nenhum'}
            for (let i = 0; i < party.services.length; i++) {
                party_servicos += ` ${party.services[i].name}`; 
            }
            parties_container.innerHTML += `
            <div class="col-lg-4 col-md-6 col-sm-12">
                <div class="card mb-5 shadow-sm p-2">
                    <img src="${party.image}" class="img-fluid rounded">
                    <div class="card-body">
                        <div class="card-title">
                            <h2>${party.title}</h2>
                        </div>
                        <div class="card-text">
                            <hr>
                            <p>
                                Descrição: ${party.description}
                            </p>
                            <hr>
                            <p>
                                Orçamento: R$${party.budget}
                            </p>
                            <hr>
                            <p>
                                Serviços: ${party_servicos}
                            </p>
                        </div>
                        <div class="btn btn-outline-primary rounded">Editar</div>
                        <div class="btn btn-outline-primary rounded">Detalhes</div>
                    </div>
                </div>
            </div>
            `;
        });
    } else {
        parties_container.innerHTML = '<h2>Carregando...</h2>';
    }
}

// Use setInterval apenas se precisar atualizar periodicamente
start_parties();

