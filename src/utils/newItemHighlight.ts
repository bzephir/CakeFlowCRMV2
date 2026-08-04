export const NEW_ITEM_THRESHOLD_DAYS = 7;

export const NEW_ITEM_ROW_CLASS = 'bg-coral-50 hover:bg-coral-100 dark:bg-coral-900/20 dark:hover:bg-coral-900/30';
export const NORMAL_ITEM_ROW_CLASS = 'bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700';

export function isNewByDate(createdAt: string | undefined, thresholdDays: number = NEW_ITEM_THRESHOLD_DAYS): boolean {
  if (!createdAt) return false;
  const created = new Date(createdAt);
  if (isNaN(created.getTime())) return false;
  const now = new Date();
  const diffMs = now.getTime() - created.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays >= 0 && diffDays <= thresholdDays;
}

export function isNewByOpenedAt(openedAt: string | null | undefined): boolean {
  return !openedAt;
}

export function getNewItemRowClass(isNew: boolean): string {
  return isNew ? NEW_ITEM_ROW_CLASS : NORMAL_ITEM_ROW_CLASS;
}
