export const RECEIVE_ITEMS = 'RECEIVE_ITEMS';

export function receiveItems (items) {
    return {
      type: RECEIVE_ITEMS,
      items,
    }
  }