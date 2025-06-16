import { Request, Response } from "express";
import { SearchService } from "../../services/search/SearchService";

class SearchControler{
    async handle(req:Request, res: Response){
        const query = req.query.query as string

        if (!query || query.trim() === '') {
            res.status(400).json({ error: 'Query is required' });
            return 
        }

        const service = new SearchService();

        try {
            const users = await service.execute(query)
            res.json(users)
            return 
        }catch{
            res.status(500).json({ error: 'Erro interno do servidor' });
            return
        }
    }
}

export {SearchControler}