import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDTO } from './dto/CreateDTO';
import { UpdateDTO } from './dto/UpdateDTO';
import { PrismaService } from '../prisma/prisma.service';


/**
 * Service layer encapsulating CRUD operations for service records.
 */
@Injectable()
export class ServicesService {

    /**
     * Builds a ServicesService with Prisma access.
     * @param prisma Prisma client service for database access.
     */
    constructor(private readonly prisma: PrismaService){}

    /**
     * Creates a new service record.
     * @param dto Data required to create a service.
     * @returns Newly created service entity.
     */
    create (dto: CreateDTO){
        return this.prisma.service.create({ data: dto as any });
    }

    /**
     * Retrieves all service records.
     * @returns Array of services.
     */
    findAll() {
        return this.prisma.service.findMany();
    }

    /**
     * Retrieves a single service by id.
     * @param id Identifier of the service.
     * @throws NotFoundException when the service does not exist.
     * @returns Service entity.
     */
    async findOne(id: number){
        const found = await this.prisma.service.findUnique({ where: { id } });
        if(!found) throw new NotFoundException(`Service ${id} not found`);
        return found;
    }

    /**
     * Updates an existing service record.
     * @param id Identifier of the service to update.
     * @param dto Partial fields to update.
     * @returns Updated service entity.
     */
    async update(id: number, dto: UpdateDTO){
        await this.findOne(id); // ensure exists
        return this.prisma.service.update({ where: { id }, data: dto as any });
    }

    /**
     * Removes a service record.
     * @param id Identifier of the service to delete.
     * @returns Deletion confirmation payload.
     */
    async remove(id: number){
        await this.findOne(id);
        await this.prisma.service.delete({ where: { id } });
        return {deleted: true, id};
    }
}
