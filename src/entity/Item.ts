export interface Item {
  'id': string,
  'companyName': string,
  'title': string,
  'industry': string,
  'careerLevel': string,
  'qualification': string,
  'location': string,
  'employmentType': string,
  'others': string,
  'yearsOfExp': string,
  'benefits': string[],
  'postedDate': string,
  'fromWebSite': string
}

export const initialState: Item = {
  'id': 'N/A',
  'companyName': 'N/A',
  'title': 'N/A',
  'industry': 'N/A',
  'careerLevel': 'N/A',
  'qualification': 'N/A',
  'location': 'N/A',
  'employmentType': 'N/A',
  'others': 'N/A',
  'yearsOfExp': 'N/A',
  'benefits': [],
  'postedDate': 'N/A',
  'fromWebSite': 'N/A'
}
