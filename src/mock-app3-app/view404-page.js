import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';

class LoginPage extends PolymerElement {
    static get template() {
        return html`
        <h1>Error 404: Page does not exist</h1>
        `;
    }
}
window.customElements.define('login-page', LoginPage);