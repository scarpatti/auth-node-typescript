import { createPaginator } from 'prisma-pagination'

export class Paginator {
    public static handler(req: any, res: any, next: any) {
        req.paginate = createPaginator({ page: req.query.page, perPage: 20 });

        next();
    }
}
