import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-collapse/iron-collapse.js';
import '@polymer/app-route/app-location.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';

class DashboardPage extends PolymerElement {
    static get template() {
        return html`
            <style>
                .container{
                    display:grid;
                    background-color:rgba(0,0,0,0.1);
                    grid-template-rows:60px auto auto;
                    grid-template-columns:auto;
                    grid-template-areas:"h""md""td";
                }
                .header{
                    grid-area:h;
                    background-color:rgba(0,0,0,0.2);
                }
                .myDetails{
                    grid-area:md;
                    padding:10px;
                    display:flex;
                    flex-direction:row;
                    justify-content:space-around;
                    align-items:center;
                    // border:2px solid;
                    border-radius:5px;
                    height:100px;
                    width:1100px;
                    margin:20px;
                    background-color:rgba(255,255,255,0.7);
                    position:relative;
                    left:80px;
                    z-index:1;
                }
                .transferDetails{
                    grid-area:td;
                    padding:10px;
                    border-radius:5px;
                    width:1100px;
                    margin:20px;
                    background-color:rgba(255,255,255,0.7);
                    position:relative;
                    left:80px;
                    z-index:1;
                }
                #headerAction{
                    position:relative;
                    bottom:71px;
                    left:1090px;
                    width:250px;
                }
                iron-collapse{
                    width:250px;
                }
                #logoutDropdown{
                    display:flex;
                    flex-direction:column;
                    background-color:rgba(255,255,255,0.8);
                    color:black;
                    width:255px;
                    position:relative;
                    bottom:70px;
                    border-radius:2px;
                    z-index:2;
                }
                #expandTrigger{
                    background-color:rgba(255,255,255,0.8);
                    color:black;
                    border-radius:2px;
                    height:60px;
                    width:45px;
                    position:relative;
                    bottom:70px;
                    left:210px;
                }
                #transferTrigger{
                    background-color:rgba(0,0,0,0.7);
                    color:white;
                    border-radius:2px;
                    height:60px;
                    position:relative;
                    bottom:10px;
                    right:5px;
                }
                #headerLogo{
                    margin:0px;
                    position:relative;
                    bottom:12px;
                    left:50px
                    width:300px;
                }
                td{
                    padding:10px;
                }
                .accountDetails{
                    margin:0px 200px 0px 10px
                }
                .values{
                    color:green;
                }
                #ad1{
                    position:relative;
                    right:80px;
                }
            </style>
            <app-location route="{{route}}"></app-location>
            <div class=container>
                <div class="header">
                    <div id='headerLogo'>
                        <h1>easyXchange</h1>
                    </div>
                    <div id='headerAction'>
                        <paper-button id='transferTrigger' on-click='_handleCurrencyTransfer'><iron-icon icon='account-balance'></iron-icon>Currency Transfer</paper-button><iron-icon icon='expand-more' on-click='_handleCollapse' id='expandTrigger'></iron-icon>
                        <iron-collapse id='collapsibleLogout'>
                            <div id='logoutDropdown'>
                                <h3 style="margin-left:60px">Hi, <span class='values'>{{userName}}</span></h3>
                                <paper-button on-click='_handleLogout'>LOGOUT</paper-button>
                            </div>
                        </iron-collapse>
                    </div>
                </div>
                <div class="myDetails">
                    <div class='accountDetails' id="ad1">
                        <h3>NAME: <span class='values'>{{userName}}</span></h3>
                        <h3>A/C NO: <span class='values'>{{accountNumber}}</span></h3>
                    </div> 
                    <div class='accountDetails' id="ad2">
                        <h3> A/C BALANCE: <span class='values'>{{accountDetails.accountBalance}}</span></h3>
                        <h3>CURRENCY TYPE: <span class='values'>{{accountDetails.currencyType}}</span></h3>
                    </div>
                </div>
                <div class="transferDetails">
                    <table>
                        <thead>
                            <tr>
                                <td>To Account</td>
                                <td>Transaction Id</td>
                                <td>Currency Type</td>
                                <td>Transfer Amount</td>
                                <td>Remit Charges</td>
                                <td>Total Amount</td>
                                <td>Status</td>
                            </tr>
                        </thead>
                        <tbody>
                            <template is="dom-repeat" items="{{transactionSummary}}">
                                <tr>
                                    <td>{{item.toAccount}}</td>
                                    <td>{{item.transactionId}}</td>
                                    <td>{{item.currencyType}}</td>
                                    <td>{{item.transferAmount}}</td>
                                    <td>{{item.remitCharges}}</td>
                                    <td>{{item.totalAmount}}</td>
                                    <td>{{item.status}}</td>
                                </tr>
                            </template>
                            <tr>
                                    <td>abc</td>
                                    <td>abc</td>
                                    <td>abc</td>
                                    <td>abc</td>
                                    <td>abc</td>
                                    <td>abc</td>
                                    <td>abc</td>
                                </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <iron-ajax id='ajax' handle-as='json' on-response='_handleResponse' on-error='_handleError' content-type='application/json'></iron-ajax>
        `;
    }

    static get properties() {
        return {
            userName: String,
            userId: Number,
            accountNumber: Number,
            userData: {
                type: Object,
                value:this.userData,
                observer:"_userDataChanged"
            },
            accountDetails: {
                type: Array,
                value: []
            },
            accountSummary: {
                type: Array,
                value: []
            },
            transactionSummary: {
                type: Array,
                value: []
            }
        };
    }

    _userDataChanged(newVal) {
        console.log(newVal);
        let userDataObj = {userName:newVal.userName,userId:newVal.userId,accountNumber:newVal.accountNumber};
        sessionStorage.setItem('userDataObj',JSON.stringify(userDataObj));
        this.userName = JSON.parse(sessionStorage.getItem('userDataObj')).userName;
        this.userId = JSON.parse(sessionStorage.getItem('userDataObj')).userId;
        this.accountNumber = JSON.parse(sessionStorage.getItem('userDataObj')).accountNumber;
        // let userDataReq = (this._getAjaxConfig('', 'get')).generateRequest();
        // let accountSummaryReq = (this._getAjaxConfig('', 'get')).generateRequest();
        // let transactionSummaryReq = (this._getAjaxConfig('', 'get')).generateRequest();

        // let thisContext = this;
        // Promise.all([userDataReq.completes,accountSummaryReq.completes,transactionSummaryReq.completes]).then(function (requests) {
        //     thisContext.accountDetails = requests[0].response;
        //     thisContext.accountSummary = requests[1].response;
        //     thisContext.transactionSummary = requests[2].response;
        // });
    }

    _handleCurrencyTransfer() {
        this.set('route.path', '/transfer');
    }

    _handleLogout() {
        this.set('route.path', '/login');
    }

    _handleCollapse() {
        if (this.$.collapsibleLogout.opened) {
            this.$.collapsibleLogout.opened = false;
        }
        else {
            this.$.collapsibleLogout.opened = true;
        }
    }

    _getAjaxConfig(url, method) {
        let ajax = this.$.ajax;
        ajax.url = url;
        ajax.method = method;
        return ajax;
    }

    _postAjaxConfig(url, method, postObj) {
        let ajax = this.$.ajax;
        ajax.url = url;
        ajax.method = method;
        ajax.body = postObj ? JSON.stringify(postObj) : undefined;
        return ajax;
    }
}
window.customElements.define('dashboard-page', DashboardPage);