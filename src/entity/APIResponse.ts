export interface APIResponse<T> {
  'code': string,
  'message': string,
  'items': T[],
  'totalItems': number
}

export const initialState: APIResponse<any> = {
  'code': '',
  'message': '',
  'items': [],
  'totalItems': 0
}
