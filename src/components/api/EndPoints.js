const Url = 'https://saqiest.com/api/';
export const ENDPOINTS = {
  sections: {
    url: `${Url}sections`,
    method: 'Get',
  },
  allProviders: {
    url: `${Url}providers`,
    method: 'Get',
  },
  subSections: {
    url: `${Url}sub_section/`,
    method: 'Get',
  },
  capacities: {
    url: `${Url}capacities`,
    method: 'Get',
  },
  about_us: {
    url: `${Url}about_us`,
    method: 'Get',
  },
  terms_and_conditions: {
    url: `${Url}terms_and_conditions`,
    method: 'Get',
  },
  faq: {
    url: `${Url}faq`,
    method: 'Get',
  },
  contact_us: {
    url: `${Url}contact_us`,
    method: 'Post',
  },
  allPaymetMethods: {
    url: `${Url}payment_methods`,
    method: 'Get',
  },
  cities: {
    url: `${Url}cities`,
    method: 'Get',
  },
  addAddress: {
    url: `${Url}shipping_address/add`,
    method: 'Post',
  },
  getAllAdress: {
    url: `${Url}shipping_address`,
    method: 'Get',
  },
  getAdressByID: {
    url: `${Url}shipping_address/`,
    method: 'Get',
  },
  updateAddress: {
    url: `${Url}shipping_address/update/`,
    method: 'Post',
  },
  updateToDefault: {
    url: `${Url}shipping_address/update/default/`,
    method: 'Post',
  },
  getDefaultAdress: {
    url: `${Url}shipping_address/show/default`,
    method: 'Get',
  },
  getAds: {
    url: `${Url}ads`,
    method: 'Get',
  },
  sendRate: {
    url: `${Url}review/send`,
    method: 'Post',
  },
  Providers: {
    url: `${Url}providers/`,
    method: 'Get',
  },
  ProviderService: {
    url: `${Url}provider/my/service/`,
    method: 'Get',
  },
  userCart: {
    url: `${Url}cart`,
    method: 'Get',
  },
};
