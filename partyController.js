const PartyModel = require('../models/party')

const checkPartyBudget = (budget, services) =>{
    const priceSum = services.reduce((sum, service) => sum + service.price, 0)
    console.log(priceSum, budget);
    
    if (priceSum > budget){
        return false
    }

    return true
}

const partyController = {
    create: async (req, res) => {
        try {
            const party = {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                budget: req.body.budget,
                image: req.body.image,
                services: req.body.services,

            }

            if(party.services && !checkPartyBudget(party.budget, party.services)){
                res.status(406).json({msg: "o seu orçamento é insuficiente"})
                return
            }

            const response = await PartyModel.create(party)

            res.status(201).json({response, msg: 'festa criada com sucesso!'})
        } catch (error) {
            console.log(error);

        }
    },
    getAll: async (req, res) =>{
        try {
            const parties = await PartyModel.find();

            res.json(parties)
        } catch (error) {
            console.log(error);
        }
    },
    get: async (req, res) =>{
        try {
            const id = req.params.id

            const party = await  PartyModel.findById(id)

            if(!party){
                res.status(404).json({msg: "Festa não encontrada"})
                return
            }

            res.json(party)
        } catch (error) {
            console.log(error);
            
        }
    },
    delete: async (req, res) =>{

        const id = req.params.id
        const party = await PartyModel.findById(id)

        if(!party){
            res.status(404).json({msg: "Festa não encontrada"})
            return
        }

        const deletedParty = await PartyModel.findByIdAndDelete(id)

        res.status(200).json({deletedParty, msg: "festa deletada com sucesso!"})
    },
    update: async (req, res) => {
        try {
            const id = req.params.id

            const party = {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                budget: req.body.budget,
                image: req.body.image,
                services: req.body.services,
            }

            if(party.services && !checkPartyBudget(party.budget, party.services)){
                res.status(406).json({msg: "o seu orçamento é insuficiente"})
                return
            }
            if(!party){
                res.status(404).json({msg: "Festa não encontrada"})
                return
            }
            const updatedParty = await PartyModel.findByIdAndUpdate(id, party)
            res.status(200).json({party, msg: 'Festa atualizada com sucesso'})
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = partyController;