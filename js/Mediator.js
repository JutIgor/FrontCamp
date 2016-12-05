import settings from './settings';

import Storage from './Storage';
import Renderer from './Renderer';
import Loader from './Loader';
import App from './App';

const dataKey = 'data';

let instance = null;

// Mediator
class Mediator {
  constructor() {
    if (instance !== null) {
      return instance;
    }

    this.url = settings.apiUrl;
    this.rootElementId = settings.rootElementId;

    this.storage = new Storage();
    this.renderer = new Renderer(this.rootElementId, this);
    this.app = new App(this);
  }

  loadData() {
    return Loader.getData(this.url)
      .then(data => this.storage.set(dataKey, data));
  }

  render() {
    this.renderer.render();
  }

  getArticles() {
    return this.storage.get('data');
  }
}

export default Mediator;