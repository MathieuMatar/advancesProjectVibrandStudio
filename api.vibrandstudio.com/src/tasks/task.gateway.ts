import {
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class TaskGateway {
  @WebSocketServer()
  server: Server;

  /**
   * Emits a taskUpdated event to all subscribers.
   */
  emitTaskUpdated(task: any) {
    this.server.emit('taskUpdated', task);
  }
}
