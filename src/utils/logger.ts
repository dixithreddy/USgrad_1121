import pino from 'pino';
import { format } from 'date-fns';

// Create a custom formatter for timestamps
const customTimestamp = () => `,"time":"${format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")}"`;

const logger = pino({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  timestamp: customTimestamp,
  formatters: {
    level: (label) => {
      return { level: label.toUpperCase() };
    },
  },
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      ignore: 'pid,hostname',
      translateTime: 'SYS:standard'
    }
  }
});

// Create child loggers for different contexts
export const loggers = {
  user: logger.child({ context: 'user' }),
  access: logger.child({ context: 'access' }),
  error: logger.child({ context: 'error' }),
  performance: logger.child({ context: 'performance' }),
  security: logger.child({ context: 'security' }),
  audit: logger.child({ context: 'audit' })
};

// Helper functions for common logging patterns
export const logUserActivity = (userId: string, action: string, details: any) => {
  loggers.user.info({ userId, action, details }, 'User activity');
};

export const logAccessAttempt = (userId: string, resource: string, success: boolean, details?: any) => {
  loggers.access.info({ userId, resource, success, details }, 'Access attempt');
};

export const logError = (error: Error, context: any = {}) => {
  loggers.error.error({ 
    error: {
      message: error.message,
      stack: error.stack,
      name: error.name
    },
    ...context
  }, 'Error occurred');
};

export const logPerformanceMetric = (metric: string, value: number, tags: any = {}) => {
  loggers.performance.info({ metric, value, tags }, 'Performance metric');
};

export const logSecurityEvent = (event: string, severity: 'low' | 'medium' | 'high', details: any) => {
  loggers.security.warn({ event, severity, details }, 'Security event');
};

export const logAuditTrail = (action: string, userId: string, changes: any) => {
  loggers.audit.info({ action, userId, changes }, 'Audit trail');
};