// Bangladesh-specific currency and number formatting utilities

/**
 * Format number with Bangladeshi/Indian grouping: 12,34,567.89
 * @param value - Number to format
 * @returns Formatted string with Bangla grouping
 */
export function formatBanglaNumber(value: number): string {
  const [integerPart, decimalPart] = value.toFixed(2).split('.');
  
  // Indian number system: last 3 digits, then groups of 2
  const lastThree = integerPart.slice(-3);
  const otherNumbers = integerPart.slice(0, -3);
  
  const formatted = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + 
    (otherNumbers ? ',' : '') + lastThree;
  
  return decimalPart ? `${formatted}.${decimalPart}` : formatted;
}

/**
 * Format amount in BDT with ৳ symbol
 * @param amount - Amount to format
 * @param showSymbol - Whether to show ৳ symbol (default: true)
 * @returns Formatted BDT string
 */
export function formatBDT(amount: number, showSymbol: boolean = true): string {
  const formatted = formatBanglaNumber(amount);
  return showSymbol ? `৳${formatted}` : formatted;
}

/**
 * Calculate VAT amount
 * @param base - Base amount
 * @param rate - VAT rate (default: 0.15 for 15%)
 * @returns VAT amount
 */
export function calcVAT(base: number, rate: number = 0.15): number {
  return base * rate;
}

/**
 * Calculate WHT (Withholding Tax) amount
 * @param base - Base amount
 * @param rate - WHT rate (e.g., 0.05 for 5%, 0.10 for 10%)
 * @returns WHT amount
 */
export function calcWHT(base: number, rate: number): number {
  return base * rate;
}

/**
 * Parse BDT string back to number
 * @param bdtString - Formatted BDT string
 * @returns Parsed number
 */
export function parseBDT(bdtString: string): number {
  return parseFloat(bdtString.replace(/[৳,]/g, ''));
}
