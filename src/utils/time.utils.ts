export function parseDurationToMs(duration: string): number {
  const match = duration.match(/^(\d+(?:\.\d+)?)\s*([dhms])?$/i);
  
  if (!match) {
    throw new Error(`Invalid duration format: ${duration}`);
  }
  
  const value = parseFloat(match[1]);
  const unit = (match[2] || 's').toLowerCase();
  
  const multipliers: Record<string, number> = {
    d: 24 * 60 * 60 * 1000, // дни
    h: 60 * 60 * 1000,      // часы
    m: 60 * 1000,           // минуты
    s: 1000                 // секунды
  };
  
  return Math.round(value * multipliers[unit]);
}
