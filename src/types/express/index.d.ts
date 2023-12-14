import {Express} from 'express-serve-static-core'
import { Socket } from 'socket.io'
declare global {
  module Express {
    interface Request {
      userId?: number
    }
  
  }

  module socket.io {
    interface Socket {
      userId?: number
    }
  }


}
