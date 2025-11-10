import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDTO } from './dto/CreateProjectDTO';
import { UpdateProjectDTO } from './dto/UpdateProjectDTO';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateProjectDTO) {
    return this.prisma.project.create({ data: dto as any, include: { client: true, milestones: true, tasks: true, services: true, users: true } });
  }

  /**
   * Find projects.
   * If userId is provided, return projects assigned to that user.
   * If userId is not provided (unauthenticated), return only public projects.
   */
  findAll(userId?: number | null) {
    const where = userId
      ? { users: { some: { id: userId } } }
      : { public: true };
    return this.prisma.project.findMany({ where, include: { client: true, milestones: true, tasks: true, services: true, users: true } });
  }

  async findOne(id: number) {
    const found = await this.prisma.project.findUnique({ where: { id }, include: { client: true, milestones: true, tasks: true, services: true, users: true } });
    if (!found) throw new NotFoundException(`Project ${id} not found`);
    return found;
  }

  async update(id: number, dto: UpdateProjectDTO) {
    await this.findOne(id);
    return this.prisma.project.update({ where: { id }, data: dto as any, include: { client: true, milestones: true, tasks: true, services: true, users: true } });
  }

  async addUserToProject(projectId: number, userId: number) {
    // ensure project exists
    await this.findOne(projectId);

    // ensure user exists
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException(`User ${userId} not found`);

    const updated = await this.prisma.project.update({
      where: { id: projectId },
      data: {
        users: {
          connect: { id: userId }
        }
      },
      include: { client: true, milestones: true, tasks: true, services: true, users: true }
    });

    return updated;
  }

  async addServiceToProject(projectId: number, serviceId: number) {
    // ensure project exists
    await this.findOne(projectId);

    // ensure service exists
    const service = await this.prisma.service.findUnique({ where: { id: serviceId } });
    if (!service) throw new NotFoundException(`Service ${serviceId} not found`);

    const updated = await this.prisma.project.update({
      where: { id: projectId },
      data: {
        services: {
          connect: { id: serviceId }
        }
      },
      include: { client: true, milestones: true, tasks: true, services: true, users: true }
    });

    return updated;
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.project.delete({ where: { id } });
    return { deleted: true, id };
  }
}
