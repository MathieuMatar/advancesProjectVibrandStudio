import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDTO } from './dto/CreateTaskDTO';
import { UpdateTaskDTO } from './dto/UpdateTaskDTO';
import { TaskGateway } from './task.gateway'; // <-- import

/**
 * Business logic for tasks, including websocket notifications.
 */
@Injectable()
export class TasksService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly taskGateway: TaskGateway, // <-- inject
  ) {}

  /**
   * Creates a new task.
   */
  create(dto: CreateTaskDTO) {
    return this.prisma.task.create({ data: dto as any });
  }

  /**
   * Returns all tasks.
   */
  findAll() {
    return this.prisma.task.findMany();
  }

  /**
   * Retrieves a task by id or throws when missing.
   */
  async findOne(id: number) {
    const found = await this.prisma.task.findUnique({ where: { id } });
    if (!found) throw new NotFoundException(`Task ${id} not found`);
    return found;
  }

  /**
   * Updates a task and emits a websocket notification.
   */
  async update(id: number, dto: UpdateTaskDTO) {
    await this.findOne(id);

    const updated = await this.prisma.task.update({
      where: { id },
      data: dto as any,
    });

    // Emit update to all connected frontend clients
    this.taskGateway.emitTaskUpdated(updated);

    return updated;
  }

  /**
   * Deletes a task and emits deletion notification.
   */
  async remove(id: number) {
    await this.findOne(id);

    await this.prisma.task.delete({ where: { id } });

    // Optional: emit deletion event
    this.taskGateway.server.emit('taskDeleted', { id });

    return { deleted: true, id };
  }
}
