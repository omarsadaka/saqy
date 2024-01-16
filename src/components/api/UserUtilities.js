import {ENDPOINTS} from './EndPoints';
import {Network} from './Network';

export class User {
  static sections() {
    return Network.fetch(
      ENDPOINTS.sections.url,
      {
        method: ENDPOINTS.sections.method,
      },
      false,
    );
  }

  static allProviders() {
    return Network.fetch(
      ENDPOINTS.allProviders.url,
      {
        method: ENDPOINTS.allProviders.method,
      },
      false,
    );
  }

  static subSections(id) {
    return Network.fetch(
      ENDPOINTS.subSections.url + `${id}`,
      {
        method: ENDPOINTS.subSections.method,
      },
      false,
    );
  }

  static capacities() {
    return Network.fetch(
      ENDPOINTS.capacities.url,
      {
        method: ENDPOINTS.capacities.method,
      },
      false,
    );
  }

  static about_us() {
    return Network.fetch(
      ENDPOINTS.about_us.url,
      {
        method: ENDPOINTS.about_us.method,
      },
      false,
    );
  }

  static terms_and_conditions() {
    return Network.fetch(
      ENDPOINTS.terms_and_conditions.url,
      {
        method: ENDPOINTS.terms_and_conditions.method,
      },
      false,
    );
  }

  static faq() {
    return Network.fetch(
      ENDPOINTS.faq.url,
      {
        method: ENDPOINTS.faq.method,
      },
      false,
    );
  }

  static contact_us(data) {
    const values = new FormData();
    values.append('name', data.name);
    values.append('mobile', data.mobile);
    values.append('email', data.email);
    values.append('subject', data.subject);
    values.append('message', data.message);
    values.append('type', data.type);
    return Network.fetch(
      ENDPOINTS.contact_us.url,
      {
        body: values,
        method: ENDPOINTS.contact_us.method,
      },
      false,
    );
  }

  static allPaymetMethods() {
    return Network.fetch(
      ENDPOINTS.allPaymetMethods.url,
      {
        method: ENDPOINTS.allPaymetMethods.method,
      },
      false,
    );
  }

  static cities() {
    return Network.fetch(
      ENDPOINTS.cities.url,
      {
        method: ENDPOINTS.cities.method,
      },
      false,
    );
  }

  static addAddress(data) {
    const values = new FormData();
    values.append('city_id', data.city_id);
    values.append('address', data.address);
    values.append('lat', data.lat);
    values.append('lng', data.lng);
    values.append('default', data.default);
    return Network.fetch(
      ENDPOINTS.addAddress.url,
      {
        body: values,
        method: ENDPOINTS.addAddress.method,
      },
      true,
    );
  }

  static getAllAdress() {
    return Network.fetch(
      ENDPOINTS.getAllAdress.url,
      {
        method: ENDPOINTS.getAllAdress.method,
      },
      true,
    );
  }

  static getAdressByID(id) {
    return Network.fetch(
      ENDPOINTS.getAdressByID.url + `${id}`,
      {
        method: ENDPOINTS.getAdressByID.method,
      },
      true,
    );
  }

  static updateAddress(data, id) {
    const values = new FormData();
    values.append('city_id', data.city_id);
    values.append('address', data.address);
    values.append('lat', data.lat);
    values.append('lng', data.lng);
    values.append('default', data.default);
    return Network.fetch(
      ENDPOINTS.updateAddress.url + `${id}`,
      {
        body: values,
        method: ENDPOINTS.updateAddress.method,
      },
      true,
    );
  }

  static updateToDefault(id) {
    return Network.fetch(
      ENDPOINTS.updateToDefault.url + `${id}`,
      {
        method: ENDPOINTS.updateToDefault.method,
      },
      true,
    );
  }

  static getDefaultAdress() {
    return Network.fetch(
      ENDPOINTS.getDefaultAdress.url,
      {
        method: ENDPOINTS.getDefaultAdress.method,
      },
      true,
    );
  }

  static getAds() {
    return Network.fetch(
      ENDPOINTS.getAds.url,
      {
        method: ENDPOINTS.getAds.method,
      },
      false,
    );
  }

  static sendRate(data) {
    const values = new FormData();
    values.append('provider_id', data.provider_id);
    values.append('rate', data.rate);
    values.append('comment', data.comment);
    return Network.fetch(
      ENDPOINTS.sendRate.url,
      {
        body: values,
        method: ENDPOINTS.sendRate.method,
      },
      true,
    );
  }

  static Providers(id) {
    return Network.fetch(
      ENDPOINTS.Providers.url + `${id}`,
      {
        method: ENDPOINTS.Providers.method,
      },
      true,
    );
  }

  static ProviderService(id) {
    return Network.fetch(
      ENDPOINTS.ProviderService.url + `${id}`,
      {
        method: ENDPOINTS.ProviderService.method,
      },
      true,
    );
  }

  static userCart() {
    return Network.fetch(
      ENDPOINTS.userCart.url,
      {
        method: ENDPOINTS.userCart.method,
      },
      true,
    );
  }
}
