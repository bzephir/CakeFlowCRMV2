// Document numbering utility functions
// Format: [Prefix]-[YYYYMM]-[Sequence]
// Examples: Q-202506-0001, O-202506-0001, I-202506-0001

export type DocumentType = 'quote' | 'order' | 'invoice';

interface DocumentCounter {
  yearMonth: string;
  sequence: number;
}

// In a real application, this would be stored in your database
// For demo purposes, we'll use localStorage to persist counters
const STORAGE_KEY = 'document_counters';

const getDocumentPrefix = (type: DocumentType): string => {
  switch (type) {
    case 'quote': return 'Q';
    case 'order': return 'O';
    case 'invoice': return 'I';
    default: return 'D';
  }
};

const getCurrentYearMonth = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  return `${year}${month}`;
};

const getStoredCounters = (): Record<string, DocumentCounter> => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

const saveCounters = (counters: Record<string, DocumentCounter>): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(counters));
  } catch {
    // Handle storage errors gracefully
    console.warn('Failed to save document counters to localStorage');
  }
};

const getCounterKey = (type: DocumentType): string => {
  return `${getDocumentPrefix(type)}_counter`;
};

export const generateDocumentNumber = (type: DocumentType): string => {
  const prefix = getDocumentPrefix(type);
  const currentYearMonth = getCurrentYearMonth();
  const counterKey = getCounterKey(type);
  
  // Get existing counters
  const counters = getStoredCounters();
  const existingCounter = counters[counterKey];
  
  let sequence = 1;
  
  // If we have an existing counter for this document type
  if (existingCounter) {
    // If it's the same year-month, increment the sequence
    if (existingCounter.yearMonth === currentYearMonth) {
      sequence = existingCounter.sequence + 1;
    }
    // If it's a new year-month, reset to 1 (sequence is already 1)
  }
  
  // Update the counter
  counters[counterKey] = {
    yearMonth: currentYearMonth,
    sequence: sequence
  };
  
  // Save to storage
  saveCounters(counters);
  
  // Format the sequence with leading zeros (4 digits)
  const formattedSequence = sequence.toString().padStart(4, '0');
  
  // Return the formatted document number
  return `${prefix}-${currentYearMonth}-${formattedSequence}`;
};

export const parseDocumentNumber = (documentNumber: string): {
  prefix: string;
  yearMonth: string;
  sequence: number;
  isValid: boolean;
} => {
  const parts = documentNumber.split('-');
  
  if (parts.length !== 3) {
    return { prefix: '', yearMonth: '', sequence: 0, isValid: false };
  }
  
  const [prefix, yearMonth, sequenceStr] = parts;
  const sequence = parseInt(sequenceStr, 10);
  
  // Validate format
  const isValidPrefix = ['Q', 'O', 'I'].includes(prefix);
  const isValidYearMonth = /^\d{6}$/.test(yearMonth);
  const isValidSequence = !isNaN(sequence) && sequence > 0;
  
  return {
    prefix,
    yearMonth,
    sequence,
    isValid: isValidPrefix && isValidYearMonth && isValidSequence
  };
};

export const getDocumentTypeFromNumber = (documentNumber: string): DocumentType | null => {
  const { prefix, isValid } = parseDocumentNumber(documentNumber);
  
  if (!isValid) return null;
  
  switch (prefix) {
    case 'Q': return 'quote';
    case 'O': return 'order';
    case 'I': return 'invoice';
    default: return null;
  }
};

// Utility function to get the next document number without incrementing the counter
export const previewNextDocumentNumber = (type: DocumentType): string => {
  const prefix = getDocumentPrefix(type);
  const currentYearMonth = getCurrentYearMonth();
  const counterKey = getCounterKey(type);
  
  const counters = getStoredCounters();
  const existingCounter = counters[counterKey];
  
  let nextSequence = 1;
  
  if (existingCounter && existingCounter.yearMonth === currentYearMonth) {
    nextSequence = existingCounter.sequence + 1;
  }
  
  const formattedSequence = nextSequence.toString().padStart(4, '0');
  return `${prefix}-${currentYearMonth}-${formattedSequence}`;
};

// Reset counters for testing purposes (admin function)
export const resetDocumentCounters = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

// Get current counter status for all document types
export const getCounterStatus = (): Record<DocumentType, { yearMonth: string; nextSequence: number }> => {
  const currentYearMonth = getCurrentYearMonth();
  const counters = getStoredCounters();
  
  const types: DocumentType[] = ['quote', 'order', 'invoice'];
  const status: Record<DocumentType, { yearMonth: string; nextSequence: number }> = {} as any;
  
  types.forEach(type => {
    const counterKey = getCounterKey(type);
    const existingCounter = counters[counterKey];
    
    let nextSequence = 1;
    if (existingCounter && existingCounter.yearMonth === currentYearMonth) {
      nextSequence = existingCounter.sequence + 1;
    }
    
    status[type] = {
      yearMonth: currentYearMonth,
      nextSequence
    };
  });
  
  return status;
};