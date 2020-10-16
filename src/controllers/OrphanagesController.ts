import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';
import orphanageView from '../views/orphanages_view';

export default {

    async index(request: Request, response: Response) {

        const orphanagesRepository = getRepository(Orphanage);
        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        });

        return response.json(orphanageView.renderMany(orphanages));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;
        const orphanagesRepository = getRepository(Orphanage);
        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images']
        });

        return response.json(orphanageView.render(orphanage));
    },

    async create(req: Request, resp: Response) {

        const {
            name, latitude, longitude, about, instructions, opening_hours, open_on_weekends
        } = req.body;

        const orphanagesRepository = getRepository(Orphanage);

        //forçando que é um array de arquivo
        const requestImages = req.files as Express.Multer.File[] ;
        const images = requestImages.map(image => {
         return{  path:  image.filename}
        })
        const orphanage = orphanagesRepository.create(
            {
                name,
                latitude,
                longitude,
                about,
                instructions,
                opening_hours,
                open_on_weekends,
                images
            });

        await orphanagesRepository.save(orphanage);

        //Criação deu certo
        return resp.status(201).json(orphanage);
    }
}