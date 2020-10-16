import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import Orphanage from '../models/Orphanage';

export default {

    async index(request: Request, response: Response){

        const orphanagesRepository = getRepository(Orphanage);
        const orphanages = await orphanagesRepository.find();

        return response.json(orphanages);
    },

    async show(request: Request, response: Response){
        const {id} = request.params;
        const orphanagesRepository = getRepository(Orphanage);
        const orphanage = await orphanagesRepository.findOneOrFail(id);

        return response.json(orphanage);
    },

    async create(req: Request, resp: Response) {

        const {
            name, latitude, longitude, about, instructions, opening_hours, open_on_weekends
        } = req.body;

        const orphanagesRepository = getRepository(Orphanage);

        const orphanage = orphanagesRepository.create({ name, latitude, longitude, about, instructions, opening_hours, open_on_weekends });

        await orphanagesRepository.save(orphanage);

        //Criação deu certo
        return resp.status(201).json(orphanage);
    }
}