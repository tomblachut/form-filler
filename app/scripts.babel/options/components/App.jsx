/* eslint-disable react/no-danger */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset } from 'redux-form';

import { resetOptions } from '../actions';
import { GetBrowser, GetMessage } from '../../form-filler/helpers';
import GeneralSettingsPage from './GeneralSettingsPage';
import CustomFieldsPage from './CustomFieldsPage';
import KeyboardShortcutsPage from './KeyboardShortcutsPage';
import BackupAndRestorePage from './BackupAndRestorePage';
import ChangelogPage from './ChangelogPage';

class App extends Component {
  constructor(props) {
    super(props);
    this.dispatch = props.dispatch;
    this.resetSettings = this.resetSettings.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  getRateThisExtensionMessage() {
    let rateKey;
    let rateLink;

    if (GetBrowser() === 'Firefox') {
      rateLink = 'https://bit.ly/FormFillerFirefox';
      rateKey = 'leftNav_rate_AMO';
    } else {
      rateLink = 'https://bit.ly/FormFiller';
      rateKey = 'leftNav_rate_Chrome';
    }

    return { __html: GetMessage(rateKey, [rateLink]) };
  }

  // eslint-disable-next-line class-methods-use-this
  getSendFeedbackMessage() {
    return { __html: chrome.i18n.getMessage('leftNav_sendFeedback', ['husainsfabbas@gmail.com']) };
  }

  getActiveClass(match, exact) {
    if (exact) {
      if (this.props.location.pathname === match) {
        return 'active';
      }
    } else if (this.props.location.pathname.startsWith(match)) {
      return 'active';
    }

    return '';
  }

  resetSettings(event) {
    event.preventDefault();
    // eslint-disable-next-line no-alert
    if (window.confirm(GetMessage('leftNav_confirmResetSettings'))) {
      this.dispatch(resetOptions());
      this.dispatch(reset('settingsForm'));
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-3">
            <h1>
              <img src="images/logo.svg" height="32" alt={GetMessage('extensionName')}/>
            </h1>
            <ul className="nav nav-pills nav-stacked">
              <li className={this.getActiveClass('/', true)}>
                <Link to="/">{GetMessage('leftNav_General')}</Link>
              </li>
              <li className={this.getActiveClass('/custom-fields')}>
                <Link to="/custom-fields">{GetMessage('leftNav_customFields')}</Link>
              </li>
              <li className={this.getActiveClass('/keyboard-shortcuts')}>
                <Link to="/keyboard-shortcuts">{GetMessage('leftNav_keyboardShortcuts')}</Link>
              </li>
              <li className={this.getActiveClass('/backup')}>
                <Link to="/backup">{GetMessage('leftNav_backupRestore')}</Link>
              </li>
            </ul>
            <div id="about">
              <p>
                <span dangerouslySetInnerHTML={this.getRateThisExtensionMessage()}/>
                {' '}
                <span dangerouslySetInnerHTML={this.getSendFeedbackMessage()}/>
              </p>
              <ul className="list-inline">
                <li>
                  <a href="" onClick={this.resetSettings}>{GetMessage('leftNav_restoreFactorySettings')}</a>
                </li>
                <li>
                  <Link to="/changelog">{GetMessage('leftNav_changelog')}</Link>
                </li>
                <li>
                  <a href="https://github.com/husainshabbir/form-filler/" target="_blank" rel="noopener noreferrer">
                    {GetMessage('leftNav_source')}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-sm-9">
            <Route path="/" exact component={GeneralSettingsPage}/>
            <Route path="/custom-fields" component={CustomFieldsPage}/>
            <Route path="/keyboard-shortcuts" component={KeyboardShortcutsPage}/>
            <Route path="/backup" component={BackupAndRestorePage}/>
            <Route path="/changelog" component={ChangelogPage}/>
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect()(App);
