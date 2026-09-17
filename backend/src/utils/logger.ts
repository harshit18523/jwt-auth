const logger = {
  info: (...args: any[]) => {
    console.log('[INFO]', ...args);
  },
  error: (...args: any[]) => {
    console.error('[ERROR]', ...args);
  },
  warn: (...args: any[]) => {
    console.warn('[WARN]', ...args);
  },
};

export default logger;
