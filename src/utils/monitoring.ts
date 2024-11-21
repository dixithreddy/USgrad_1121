import { logPerformanceMetric } from './logger';

class PerformanceMonitor {
  private metrics: Map<string, { startTime: number; tags: any }>;

  constructor() {
    this.metrics = new Map();
  }

  startTimer(metricName: string, tags: any = {}) {
    this.metrics.set(metricName, {
      startTime: performance.now(),
      tags
    });
  }

  endTimer(metricName: string) {
    const metric = this.metrics.get(metricName);
    if (!metric) return;

    const duration = performance.now() - metric.startTime;
    logPerformanceMetric(metricName, duration, metric.tags);
    this.metrics.delete(metricName);
  }

  recordMetric(name: string, value: number, tags: any = {}) {
    logPerformanceMetric(name, value, tags);
  }

  recordMemoryUsage() {
    if (typeof window !== 'undefined' && (window as any).performance?.memory) {
      const memory = (window as any).performance.memory;
      this.recordMetric('memory.heapSize', memory.usedJSHeapSize);
      this.recordMetric('memory.heapLimit', memory.jsHeapSizeLimit);
    }
  }
}

export const performanceMonitor = new PerformanceMonitor();

// Error monitoring
export const monitorErrors = () => {
  window.addEventListener('error', (event) => {
    logError(event.error, {
      type: 'uncaught_error',
      message: event.message,
      filename: event.filename,
      lineNumber: event.lineno,
      columnNumber: event.colno
    });
  });

  window.addEventListener('unhandledrejection', (event) => {
    logError(event.reason, {
      type: 'unhandled_rejection'
    });
  });
};

// Network monitoring
export const monitorNetworkRequests = () => {
  const originalFetch = window.fetch;
  window.fetch = async (...args) => {
    const startTime = performance.now();
    try {
      const response = await originalFetch(...args);
      const duration = performance.now() - startTime;
      logPerformanceMetric('network.request', duration, {
        url: args[0],
        status: response.status
      });
      return response;
    } catch (error) {
      const duration = performance.now() - startTime;
      logPerformanceMetric('network.error', duration, {
        url: args[0],
        error: error.message
      });
      throw error;
    }
  };
};