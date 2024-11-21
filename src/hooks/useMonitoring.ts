import { useEffect } from 'react';
import { performanceMonitor } from '../utils/monitoring';
import { logUserActivity } from '../utils/logger';
import { useAuth } from './useAuth';

export const useMonitoring = () => {
  const { user } = useAuth();

  useEffect(() => {
    // Start monitoring when component mounts
    const pageLoadTime = performance.now();
    performanceMonitor.recordMetric('page.load', pageLoadTime);

    // Monitor memory usage periodically
    const memoryMonitorInterval = setInterval(() => {
      performanceMonitor.recordMemoryUsage();
    }, 60000); // Every minute

    // Log user session start
    if (user) {
      logUserActivity(user.sub, 'session_start', {
        timestamp: new Date().toISOString()
      });
    }

    return () => {
      clearInterval(memoryMonitorInterval);
      // Log user session end
      if (user) {
        logUserActivity(user.sub, 'session_end', {
          timestamp: new Date().toISOString()
        });
      }
    };
  }, [user]);

  return {
    startTimer: performanceMonitor.startTimer.bind(performanceMonitor),
    endTimer: performanceMonitor.endTimer.bind(performanceMonitor),
    recordMetric: performanceMonitor.recordMetric.bind(performanceMonitor)
  };
};