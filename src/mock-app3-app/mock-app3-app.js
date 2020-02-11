import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';


setPassiveTouchGestures(true);
setRootPath(MyAppGlobals.rootPath);

/**
 * @customElement
 * @polymer
 */
class MockApp3App extends PolymerElement {
  static get template() {
    return html`
    <app-location route="{{route}}"></app-location>
    <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}"></app-route>     
    <iron-pages selected="[[page]]" attr-for-selected="name" role="main">
      <login-page name="login"></login-page>
      <dashboard-page name="dashboard" user-data={{userData}}></dashboard-page>
    </iron-pages>
    `;
  }

  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },
      routeData: Object,
      subroute: Object,
      userData:Object
    };
  }

  ready(){
    super.ready();
    this.addEventListener('login-user',function(event){
      console.log(event.detail.item,"main");
      this.userData=event.detail.item;
      console.log(this.userData,"main");
    })
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)'
    ];
  }

  _routePageChanged(page) {
    if (!page) {
      this.page = 'login';
    } else if (['login', 'dashboard'].indexOf(page) !== -1) {
      this.page = page;
    } else {
      this.page = 'view404';
    }
  }

  _pageChanged(page) {
    switch (page) {
      case 'login':
        import('./login-page.js');
        break;
      case 'dashboard':
        import('./dashboard-page.js');
        break;
      case 'view404':
        import('./view404-page.js');
        break;
    }
  }


}

window.customElements.define('mock-app3-app', MockApp3App);
