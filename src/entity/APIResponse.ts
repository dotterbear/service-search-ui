export interface APIResponse<T> {
  'code': string,
  'message': string,
  'items': T[]
}

export const initialState: APIResponse<any> = {
  'code': '',
  'message': '',
  'items': []
}
