export interface ILogger {
  info(message: string, meta?: Record<string, any>): void;
  warn(message: string, meta?: Record<string, any>): void;
  error(message: string, error?: Error | string, meta?: Record<string, any>): void;
  audit(action: string, userId: string, details?: string, ipAddress?: string): void;
}

class ConsoleLogger implements ILogger {
  private formatMessage(level: string, message: string, meta?: Record<string, any>): string {
    const timestamp = new Date().toISOString();
    const metaString = meta ? ` | Meta: ${JSON.stringify(meta)}` : "";
    return `[${timestamp}] [${level}] ${message}${metaString}`;
  }

  info(message: string, meta?: Record<string, any>): void {
    console.log(this.formatMessage("INFO", message, meta));
  }

  warn(message: string, meta?: Record<string, any>): void {
    console.warn(this.formatMessage("WARN", message, meta));
  }

  error(message: string, error?: Error | string, meta?: Record<string, any>): void {
    const errorDetails = error instanceof Error ? error.stack || error.message : error;
    const finalMeta = { ...meta, error: errorDetails };
    console.error(this.formatMessage("ERROR", message, finalMeta));
  }

  audit(action: string, userId: string, details?: string, ipAddress?: string): void {
    const auditMeta = { userId, details, ipAddress };
    console.log(this.formatMessage("AUDIT", `ACTION: ${action}`, auditMeta));
    // In later phases, this writes directly to the AuditLog database table
  }
}

// Export a singleton instance. Change the class instantiation here to switch logging engines.
export const logger: ILogger = new ConsoleLogger();
