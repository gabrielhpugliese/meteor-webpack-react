import React, {Component} from 'react';
import reactMixin from 'react-mixin';

class DropdownList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createAccount: false,
      username: '',
      password: '',
      passwordRepeat: ''
    };
  }

  onCreateAccountClick() {
    this.setState({
      createAccount: true
    });
  }

  onSignInClick() {
    this.setState({
      createAccount: false
    });
  }

  onUsernameChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  onPasswordChange(event) {
    this.setState({
      password: event.target.value
    });
  }

  onPasswordRepeatChange(event) {
    this.setState({
      passwordRepeat: event.target.value
    });
  }

  onSubmit() {
    debugger;
    let options = {
      username: this.state.username,
      password: this.state.password
    };

    Accounts.createUser(options, (err) => {
      if (err) {
        alert('Erro');
      } else {
        this.props.onCloseClick.call(this);
      }
    });
  }

  render() {
    if (this.props.closed) {
      return (<div></div>);
    }

    let accountButton = (<a id="signup-link" className="additional-link" onClick={this.onCreateAccountClick.bind(this)}>Create account</a>);
    let confirmPassword = this.state.createAccount && (
      <div className="login-password-again-label-and-input">
        <label htmlFor="login-password-again">
          Password (again)
        </label>
        <input id="login-password-again" type="password" onChange={this.onPasswordRepeatChange}/>
      </div>
    );
    let buttonText = this.state.createAccount && 'Create Account' || 'Sign in';

    if (this.state.createAccount) {
      accountButton = (<a id="back-to-login-link" className="additional-link" onClick={this.onSignInClick.bind(this)}>Sign in</a>);
    }

    return (
      <div id="login-dropdown-list" className="accounts-dialog">
        <a className="login-close-text" onClick={this.props.onCloseClick.bind(this)}>Close</a>
        <div className="login-close-text-clear"></div>
        <div className="login-form login-password-form">
          <div className="login-username-label-and-input">
            <label htmlFor="login-username">
              Username
            </label>
            <input id="login-username" type="text" onChange={this.onUsernameChange.bind(this)}/>
          </div>

          <div className="login-password-label-and-input">
            <label htmlFor="login-password">
              Password
            </label>
            <input id="login-password" type="password" onChange={this.onPasswordChange.bind(this)}/>
          </div>

          {confirmPassword}
        </div>

        <div className="login-button login-button-form-submit" id="login-buttons-password" onClick={this.onSubmit.bind(this)}>
          {buttonText}
        </div>

        <div className="additional-link-container">
          {accountButton}
        </div>
      </div>
    );
  }
}

@reactMixin.decorate(ReactMeteorData)
export default class LoginButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      closed: true,
      linkText: 'Sign in ▾'
    };
  }

  getMeteorData() {
    return {
      linkText: Meteor.user() && Meteor.user().username + ' ▾'
    };
  }

  onSignInClick() {
    this.setState({
      closed: false
    });
  }

  onCloseClick() {
    this.setState({
      closed: true
    });
  }

  render() {
    return (
      <div id="login-buttons" className="login-buttons-dropdown-align-">
        <div className="login-link-and-dropdown-list login-form-sign-in">
          <a className="login-link-text" id="login-sign-in-link" onClick={this.onSignInClick.bind(this)}>{this.data.linkText || this.state.linkText}</a>
          <DropdownList
            closed={this.state.closed}
            onCloseClick={this.onCloseClick.bind(this)}
          />
        </div>
      </div>
    );
  }
}
