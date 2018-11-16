(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
  function getBytes() {
    try {
      // Modern Browser
      return Array.from(
        (window.crypto || window.msCrypto).getRandomValues(new Uint8Array(16))
      );
    } catch (error) {
      // Legacy Browser, fallback to Math.random
      var ret = [];
      while (ret.length < 16) ret.push((Math.random() * 256) & 0xff);
      return ret;
    }
  }

  function m(v) {
    v = v.toString(16);
    if (v.length < 2) v = "0" + v;
    return v;
  }

  function genUUID() {
    var rnd = getBytes();
    rnd[6] = (rnd[6] & 0x0f) | 0x40;
    rnd[8] = (rnd[8] & 0x3f) | 0x80;
    rnd = rnd
      .map(m)
      .join("")
      .match(/(.{8})(.{4})(.{4})(.{4})(.{12})/);
    rnd.shift();
    return rnd.join("-");
  }

  var uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
  function isUUID(uuid) {
    return uuidPattern.test(uuid);
  }

  genUUID.valid = isUUID;

  // global
  if (window) {
    window.uuid4 = genUUID;
  }

  // Node-style CJS
  if (typeof module !== "undefined" && module.exports) {
    module.exports = genUUID;
  }

  // AMD - legacy
  if (typeof define === "function" && define.amd) {
    define([], function() {
      return genUUID;
    });
  }
})();

},{}],2:[function(require,module,exports){
/*
 * Copyright 2007-2017 Charles du Jeu - Abstrium SAS <team (at) pyd.io>
 * This file is part of Pydio.
 *
 * Pydio is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Pydio is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Pydio.  If not, see <http://www.gnu.org/licenses/>.
 *
 * The latest code can be found at <https://pydio.com>.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUi = require('material-ui');

var _editorDataSourceEditor = require('../editor/DataSourceEditor');

var _editorDataSourceEditor2 = _interopRequireDefault(_editorDataSourceEditor);

var _editorVersionPolicyEditor = require('../editor/VersionPolicyEditor');

var _editorVersionPolicyEditor2 = _interopRequireDefault(_editorVersionPolicyEditor);

var _pydioModelDataModel = require('pydio/model/data-model');

var _pydioModelDataModel2 = _interopRequireDefault(_pydioModelDataModel);

var _pydioModelNode = require('pydio/model/node');

var _pydioModelNode2 = _interopRequireDefault(_pydioModelNode);

var _pydioUtilLang = require('pydio/util/lang');

var _pydioUtilLang2 = _interopRequireDefault(_pydioUtilLang);

var _pydio = require('pydio');

var _pydio2 = _interopRequireDefault(_pydio);

var _modelDataSource = require('../model/DataSource');

var _modelDataSource2 = _interopRequireDefault(_modelDataSource);

var _pydioHttpRestApi = require('pydio/http/rest-api');

var _uuid4 = require('uuid4');

var _uuid42 = _interopRequireDefault(_uuid4);

var _editorVersionPolicyPeriods = require('../editor/VersionPolicyPeriods');

var _editorVersionPolicyPeriods2 = _interopRequireDefault(_editorVersionPolicyPeriods);

var _EncryptionKeys = require('./EncryptionKeys');

var _EncryptionKeys2 = _interopRequireDefault(_EncryptionKeys);

var _Pydio$requireLib = _pydio2['default'].requireLib('components');

var MaterialTable = _Pydio$requireLib.MaterialTable;

var DataSourcesBoard = (function (_React$Component) {
    _inherits(DataSourcesBoard, _React$Component);

    function DataSourcesBoard(props) {
        _classCallCheck(this, DataSourcesBoard);

        _get(Object.getPrototypeOf(DataSourcesBoard.prototype), 'constructor', this).call(this, props);
        this.state = {
            dataSources: [],
            versioningPolicies: [],
            dsLoaded: false,
            versionsLoaded: false,
            showExportKey: false,
            exportedKey: null,
            showImportKey: false,
            importResult: null,
            keyOperationError: null,
            startedServices: [],
            m: function m(id) {
                return props.pydio.MessageHash["ajxp_admin.ds." + id] || id;
            }
        };
    }

    _createClass(DataSourcesBoard, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this = this;

            this.statusPoller = setInterval(function () {
                _modelDataSource2['default'].loadStatuses().then(function (data) {
                    _this.setState({ startedServices: data.Services });
                });
            }, 2500);
            this.load();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            clearInterval(this.statusPoller);
        }
    }, {
        key: 'load',
        value: function load() {
            var _this2 = this;

            this.setState({ dsLoaded: false, versionsLoaded: false });
            _modelDataSource2['default'].loadDatasources().then(function (data) {
                _this2.setState({ dataSources: data.DataSources || [], dsLoaded: true });
            });
            _modelDataSource2['default'].loadVersioningPolicies().then(function (data) {
                _this2.setState({ versioningPolicies: data.Policies || [], versionsLoaded: true });
            });
            _modelDataSource2['default'].loadStatuses().then(function (data) {
                _this2.setState({ startedServices: data.Services });
            });
            if (this.refs && this.refs.encKeys) {
                this.refs.encKeys.load();
            }
        }
    }, {
        key: 'closeEditor',
        value: function closeEditor() {
            this.props.closeRightPane();
        }
    }, {
        key: 'openDataSource',
        value: function openDataSource(dataSources) {
            if (!dataSources.length) {
                return;
            }
            var dataSource = dataSources[0];
            this.props.openRightPane({
                COMPONENT: _editorDataSourceEditor2['default'],
                PROPS: {
                    ref: "editor",
                    pydio: pydio,
                    dataSource: dataSource,
                    closeEditor: this.closeEditor.bind(this),
                    reloadList: this.load.bind(this)
                }
            });
        }
    }, {
        key: 'computeStatus',
        value: function computeStatus(dataSource) {
            var _state = this.state;
            var startedServices = _state.startedServices;
            var m = _state.m;

            if (!startedServices.length) {
                return m('status.na');
            }
            var index = undefined,
                sync = undefined,
                object = undefined;
            startedServices.map(function (service) {
                if (service.Name === 'pydio.grpc.data.sync.' + dataSource.Name) {
                    sync = true;
                } else if (service.Name === 'pydio.grpc.data.index.' + dataSource.Name) {
                    index = true;
                } else if (service.Name === 'pydio.grpc.data.objects.' + dataSource.ObjectsServiceName) {
                    object = true;
                }
            });
            if (index && sync && object) {
                return m('status.ok');
            } else if (!index && !sync && !object) {
                return _react2['default'].createElement(
                    'span',
                    { style: { color: '#e53935' } },
                    m('status.ko')
                );
            } else {
                var services = [];
                if (!index) {
                    services.push(m('status.index'));
                }
                if (!sync) {
                    services.push(m('status.sync'));
                }
                if (!object) {
                    services.push(m('status.object'));
                }
                return _react2['default'].createElement(
                    'span',
                    { style: { color: '#e53935' } },
                    services.join(' - ')
                );
            }
        }
    }, {
        key: 'openVersionPolicy',
        value: function openVersionPolicy() {
            var versionPolicies = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];

            if (versionPolicies !== undefined && !versionPolicies.length) {
                return;
            }
            var versionPolicy = undefined;
            var create = false;
            if (versionPolicies === undefined) {
                create = true;
                versionPolicy = new _pydioHttpRestApi.TreeVersioningPolicy();
                versionPolicy.Uuid = (0, _uuid42['default'])();
                versionPolicy.VersionsDataSourceName = "default";
                versionPolicy.VersionsDataSourceBucket = "versions";
                var period = new _pydioHttpRestApi.TreeVersioningKeepPeriod();
                period.IntervalStart = "0";
                period.MaxNumber = -1;
                versionPolicy.KeepPeriods = [period];
            } else {
                versionPolicy = versionPolicies[0];
            }
            this.props.openRightPane({
                COMPONENT: _editorVersionPolicyEditor2['default'],
                PROPS: {
                    ref: "editor",
                    versionPolicy: versionPolicy,
                    create: create,
                    pydio: this.props.pydio,
                    readonly: this.props.versioningReadonly,
                    closeEditor: this.closeEditor.bind(this),
                    reloadList: this.load.bind(this)
                }
            });
        }
    }, {
        key: 'createDataSource',
        value: function createDataSource() {
            this.props.openRightPane({
                COMPONENT: _editorDataSourceEditor2['default'],
                PROPS: {
                    ref: "editor",
                    create: true,
                    pydio: pydio,
                    closeEditor: this.closeEditor.bind(this),
                    reloadList: this.load.bind(this)
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _state2 = this.state;
            var dataSources = _state2.dataSources;
            var versioningPolicies = _state2.versioningPolicies;
            var m = _state2.m;

            dataSources.sort(_pydioUtilLang2['default'].arraySorter('Name'));
            versioningPolicies.sort(_pydioUtilLang2['default'].arraySorter('Name'));

            var _props = this.props;
            var currentNode = _props.currentNode;
            var pydio = _props.pydio;
            var versioningReadonly = _props.versioningReadonly;

            var dsColumns = [{ name: 'Name', label: m('name'), style: { fontSize: 15 } }, { name: 'StorageType', label: m('storage'), renderCell: function renderCell(row) {
                    var s = 'storage.fs';
                    switch (row.StorageType) {
                        case "S3":
                            s = 'storage.s3';
                            break;
                        case "AZURE":
                            s = 'storage.azure';
                            break;
                        case "GCS":
                            s = 'storage.gcs';
                            break;
                        default:
                            break;
                    }
                    return m(s);
                } }, { name: 'Status', label: m('status'), renderCell: function renderCell(row) {
                    return row.Disabled ? m('status.disabled') : _this3.computeStatus(row);
                } }, { name: 'EncryptionMode', label: m('encryption'), renderCell: function renderCell(row) {
                    return row['EncryptionMode'] === 'MASTER' ? pydio.MessageHash['440'] : pydio.MessageHash['441'];
                } }, { name: 'VersioningPolicyName', label: m('versioning'), renderCell: function renderCell(row) {
                    var pol = versioningPolicies.find(function (obj) {
                        return obj.Uuid === row['VersioningPolicyName'];
                    });
                    if (pol) {
                        return pol.Name;
                    } else {
                        return row['VersioningPolicyName'];
                    }
                } }];
            var title = currentNode.getLabel();
            var icon = currentNode.getMetadata().get('icon_class');
            var buttons = [_react2['default'].createElement(_materialUi.FlatButton, { primary: true, label: pydio.MessageHash['ajxp_admin.ws.4'], onTouchTap: this.createDataSource.bind(this) })];
            if (!versioningReadonly) {
                buttons.push(_react2['default'].createElement(_materialUi.FlatButton, { primary: true, label: pydio.MessageHash['ajxp_admin.ws.4b'], onTouchTap: function () {
                        _this3.openVersionPolicy();
                    } }));
            }
            var policiesColumns = [{ name: 'Name', label: m('versioning.name'), style: { width: '20%', fontSize: 15 }, headerStyle: { width: '20%' } }, { name: 'Description', label: m('versioning.description') }, { name: 'KeepPeriods', label: m('versioning.periods'), renderCell: function renderCell(row) {
                    return _react2['default'].createElement(_editorVersionPolicyPeriods2['default'], { rendering: 'short', periods: row.KeepPeriods, pydio: pydio });
                } }];

            return _react2['default'].createElement(
                'div',
                { className: 'main-layout-nav-to-stack workspaces-board' },
                _react2['default'].createElement(
                    'div',
                    { className: 'vertical-layout', style: { width: '100%' } },
                    _react2['default'].createElement(AdminComponents.Header, {
                        title: title,
                        icon: icon,
                        actions: buttons,
                        reloadAction: this.load.bind(this),
                        loading: !(this.state.dsLoaded && this.state.versionsLoaded)
                    }),
                    _react2['default'].createElement(
                        'div',
                        { className: 'layout-fill' },
                        _react2['default'].createElement(AdminComponents.SubHeader, { title: m('board.ds.title'), legend: m('board.ds.legend') }),
                        _react2['default'].createElement(
                            _materialUi.Paper,
                            { zDepth: 1, style: { margin: 16 } },
                            _react2['default'].createElement(MaterialTable, {
                                data: dataSources,
                                columns: dsColumns,
                                onSelectRows: this.openDataSource.bind(this),
                                deselectOnClickAway: true,
                                showCheckboxes: false,
                                emptyStateString: "No datasources created yet"
                            })
                        ),
                        _react2['default'].createElement(AdminComponents.SubHeader, { title: m('board.versioning.title'), legend: m('board.versioning.legend') }),
                        _react2['default'].createElement(
                            _materialUi.Paper,
                            { zDepth: 1, style: { margin: 16 } },
                            _react2['default'].createElement(MaterialTable, {
                                data: versioningPolicies,
                                columns: policiesColumns,
                                onSelectRows: this.openVersionPolicy.bind(this),
                                deselectOnClickAway: true,
                                showCheckboxes: false
                            })
                        ),
                        _react2['default'].createElement(AdminComponents.SubHeader, { title: m('board.enc.title'), legend: m('board.enc.legend') }),
                        _react2['default'].createElement(_EncryptionKeys2['default'], { pydio: pydio, ref: "encKeys" })
                    )
                )
            );
        }
    }]);

    return DataSourcesBoard;
})(_react2['default'].Component);

DataSourcesBoard.propTypes = {
    dataModel: _react2['default'].PropTypes.instanceOf(_pydioModelDataModel2['default']).isRequired,
    rootNode: _react2['default'].PropTypes.instanceOf(_pydioModelNode2['default']).isRequired,
    currentNode: _react2['default'].PropTypes.instanceOf(_pydioModelNode2['default']).isRequired,
    openEditor: _react2['default'].PropTypes.func.isRequired,
    openRightPane: _react2['default'].PropTypes.func.isRequired,
    closeRightPane: _react2['default'].PropTypes.func.isRequired,
    filter: _react2['default'].PropTypes.string,
    versioningReadonly: _react2['default'].PropTypes.bool
};

exports['default'] = DataSourcesBoard;
module.exports = exports['default'];

},{"../editor/DataSourceEditor":8,"../editor/VersionPolicyEditor":11,"../editor/VersionPolicyPeriods":12,"../model/DataSource":18,"./EncryptionKeys":3,"material-ui":"material-ui","pydio":"pydio","pydio/http/rest-api":"pydio/http/rest-api","pydio/model/data-model":"pydio/model/data-model","pydio/model/node":"pydio/model/node","pydio/util/lang":"pydio/util/lang","react":"react","uuid4":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _pydioHttpApi = require('pydio/http/api');

var _pydioHttpApi2 = _interopRequireDefault(_pydioHttpApi);

var _pydio = require('pydio');

var _pydio2 = _interopRequireDefault(_pydio);

var _materialUi = require('material-ui');

var _pydioHttpRestApi = require('pydio/http/rest-api');

var _Pydio$requireLib = _pydio2['default'].requireLib('components');

var MaterialTable = _Pydio$requireLib.MaterialTable;

var EncryptionKeys = (function (_React$Component) {
    _inherits(EncryptionKeys, _React$Component);

    function EncryptionKeys(props) {
        _classCallCheck(this, EncryptionKeys);

        _get(Object.getPrototypeOf(EncryptionKeys.prototype), 'constructor', this).call(this, props);
        this.state = {
            keys: [],
            showDialog: false,

            showExportKey: null,
            exportedKey: null,

            showCreateKey: null,
            showImportKey: null,

            m: function m(id) {
                return props.pydio.MessageHash['ajxp_admin.ds.encryption.' + id] || id;
            }
        };
    }

    _createClass(EncryptionKeys, [{
        key: 'load',
        value: function load() {
            var _this = this;

            var api = new _pydioHttpRestApi.ConfigServiceApi(_pydioHttpApi2['default'].getRestClient());
            api.listEncryptionKeys(new _pydioHttpRestApi.EncryptionAdminListKeysRequest()).then(function (result) {
                if (result.Keys) {
                    _this.setState({ keys: result.Keys });
                }
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.load();
        }
    }, {
        key: 'exportKey',
        value: function exportKey() {
            var _this2 = this;

            var pydio = this.props.pydio;
            var m = this.state.m;

            var api = new _pydioHttpRestApi.ConfigServiceApi(_pydioHttpApi2['default'].getRestClient());
            var request = new _pydioHttpRestApi.EncryptionAdminExportKeyRequest();
            request.KeyID = this.state.showExportKey;
            request.StrPassword = this.refs['key-password-field'].getValue();
            var confirm = this.refs['key-password-confirm'].getValue();
            if (confirm !== request.StrPassword) {
                pydio.UI.displayMessage('ERROR', 'Warning, passwords differ!');
                return;
            }
            api.exportEncryptionKey(request).then(function (response) {
                _this2.setState({ exportedKey: response.Key, showExportKey: null }, function () {
                    _this2.timeout = setTimeout(function () {
                        _this2.setState({ exportedKey: '', showDialog: false });
                    }, 10000);
                });
                _this2.setState({ showExportKey: null });
            })['catch'](function (reason) {
                pydio.UI.displayMessage('ERROR', m('key.export.fail') + " : " + reason.message);
                _this2.setState({ showExportKey: null });
            });
        }
    }, {
        key: 'createKey',
        value: function createKey() {
            var _this3 = this;

            var api = new _pydioHttpRestApi.ConfigServiceApi(_pydioHttpApi2['default'].getRestClient());
            var req = new _pydioHttpRestApi.EncryptionAdminCreateKeyRequest();
            req.KeyID = this.refs['createKeyId'].getValue();
            req.Label = this.refs['createKeyLabel'].getValue();
            api.createEncryptionKey(req).then(function (result) {
                _this3.load();
                _this3.setState({ showDialog: false });
            })['catch'](function () {
                _this3.setState({ showDialog: false });
            });
        }
    }, {
        key: 'deleteKey',
        value: function deleteKey(keyId) {
            var _this4 = this;

            var m = this.state.m;

            if (confirm(m('key.delete.warning'))) {
                var api = new _pydioHttpRestApi.ConfigServiceApi(_pydioHttpApi2['default'].getRestClient());
                var req = new _pydioHttpRestApi.EncryptionAdminDeleteKeyRequest();
                req.KeyID = keyId;
                api.deleteEncryptionKey(req).then(function (result) {
                    _this4.load();
                });
            }
        }
    }, {
        key: 'importKey',
        value: function importKey() {
            var _this5 = this;

            var pydio = this.props.pydio;
            var m = this.state.m;

            var api = new _pydioHttpRestApi.ConfigServiceApi(_pydioHttpApi2['default'].getRestClient());

            var importKey = this.state.showImportKey;
            var importExisting = true;
            if (!importKey.ID) {
                importKey = new _pydioHttpRestApi.EncryptionKey();
                importKey.ID = this.refs['key-import-id'].getValue();
                importKey.Label = this.refs['key-import-label'].getValue();
                importExisting = false;
            }
            importKey.Content = this.refs['key-imported-field'].getValue();

            var request = new _pydioHttpRestApi.EncryptionAdminImportKeyRequest();
            request.StrPassword = this.refs['key-password-field'].getValue();
            request.Key = importKey;
            request.Override = importExisting;
            api.importEncryptionKey(request).then(function (response) {
                if (response.Success) {
                    pydio.UI.displayMessage('SUCCESS', m('key.import.success'));
                } else {
                    pydio.UI.displayMessage('ERROR', m('key.import.fail'));
                }
                _this5.load();
                _this5.setState({ showImportKey: false, showDialog: false });
            })['catch'](function () {
                _this5.setState({ showImportKey: false, showDialog: false });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this6 = this;

            var _state = this.state;
            var keys = _state.keys;
            var showDialog = _state.showDialog;
            var showImportKey = _state.showImportKey;
            var showExportKey = _state.showExportKey;
            var exportedKey = _state.exportedKey;
            var showCreateKey = _state.showCreateKey;
            var m = _state.m;
            var pydio = this.props.pydio;

            var columns = [{ name: 'Label', label: m('key.label'), style: { width: '30%', fontSize: 15 }, headerStyle: { width: '30%' } }, { name: 'ID', label: m('key.id') }, { name: 'Owner', label: m('key.owner') }, { name: 'CreationDate', label: m('key.created'), renderCell: function renderCell(row) {
                    return new Date(row.CreationDate * 1000).toUTCString();
                } }, { name: 'Actions', label: '', style: { width: 160, textAlign: 'right', overflow: 'visible' }, headerStyle: { width: '160' }, renderCell: function renderCell(row) {
                    return _react2['default'].createElement(
                        'div',
                        null,
                        _react2['default'].createElement(_materialUi.IconButton, { tooltip: m('key.import'), iconStyle: { color: '#9e9e9e' }, iconClassName: "mdi mdi-import", onTouchTap: function () {
                                _this6.setState({ showDialog: true, showImportKey: row });
                            }, onClick: function (e) {
                                return e.stopPropagation();
                            } }),
                        _react2['default'].createElement(_materialUi.IconButton, { tooltip: m('key.export'), iconStyle: { color: '#9e9e9e' }, iconClassName: "mdi mdi-export", onTouchTap: function () {
                                _this6.setState({ showDialog: true, showExportKey: row.ID });
                            }, onClick: function (e) {
                                return e.stopPropagation();
                            } }),
                        _react2['default'].createElement(_materialUi.IconButton, { tooltip: m('key.delete'), iconStyle: { color: '#9e9e9e' }, iconClassName: "mdi mdi-delete", onTouchTap: function () {
                                _this6.deleteKey(row.ID);
                            }, onClick: function (e) {
                                return e.stopPropagation();
                            } })
                    );
                } }];

            var dialogContent = undefined,
                dialogTitle = undefined,
                dialogActions = [];
            if (showExportKey || exportedKey) {
                dialogTitle = m('key.export');
                if (exportedKey) {
                    dialogContent = _react2['default'].createElement(_materialUi.TextField, {
                        value: exportedKey.Content,
                        fullWidth: true,
                        floatingLabelText: m('key.export.result.copy'),
                        multiLine: true,
                        ref: 'key-imported-field'
                    });
                    dialogActions = [_react2['default'].createElement(_materialUi.FlatButton, { label: "Close", onTouchTap: function () {
                            clearTimeout(_this6.timeout);
                            _this6.setState({ showExportKey: null, exportedKey: '', showDialog: false });
                        } })];
                } else {
                    dialogContent = _react2['default'].createElement(
                        'div',
                        null,
                        _react2['default'].createElement(_materialUi.TextField, { floatingLabelText: m('key.export.password'), ref: 'key-password-field', type: "password", fullWidth: true }),
                        _react2['default'].createElement(_materialUi.TextField, { floatingLabelText: m('key.export.confirm'), ref: 'key-password-confirm', type: "password", fullWidth: true })
                    );
                    dialogActions = [_react2['default'].createElement(_materialUi.FlatButton, { label: pydio.MessageHash['54'], onTouchTap: function () {
                            _this6.setState({ showExportKey: null, showDialog: false });
                        } }), _react2['default'].createElement(_materialUi.FlatButton, { label: m('key.export'), primary: true, onTouchTap: function () {
                            _this6.exportKey();
                        } })];
                }
            } else if (showImportKey) {
                dialogTitle = m('key.import');
                dialogContent = _react2['default'].createElement(
                    'div',
                    null,
                    !showImportKey.ID && _react2['default'].createElement(
                        'div',
                        null,
                        _react2['default'].createElement(_materialUi.TextField, { floatingLabelText: m('key.import.id'), ref: 'key-import-id', fullWidth: true }),
                        _react2['default'].createElement(_materialUi.TextField, { floatingLabelText: m('key.import.label'), ref: 'key-import-label', fullWidth: true })
                    ),
                    _react2['default'].createElement(_materialUi.TextField, { floatingLabelText: m('key.import.password'), ref: 'key-password-field', type: "password", fullWidth: true }),
                    _react2['default'].createElement(_materialUi.TextField, { fullWidth: true, floatingLabelText: m('key.import.content'), multiLine: true, ref: 'key-imported-field' })
                );
                dialogActions = [_react2['default'].createElement(_materialUi.FlatButton, { label: pydio.MessageHash['54'], onTouchTap: function () {
                        _this6.setState({ showImportKey: null, showDialog: false });
                    } }), _react2['default'].createElement(_materialUi.FlatButton, { label: m('key.import'), primary: true, onTouchTap: function () {
                        _this6.importKey();
                    } })];
            } else if (showCreateKey) {
                dialogTitle = "Create a Key";
                dialogContent = _react2['default'].createElement(
                    'div',
                    null,
                    _react2['default'].createElement(_materialUi.TextField, { floatingLabelText: m('key.import.id'), ref: 'createKeyId', fullWidth: true }),
                    _react2['default'].createElement(_materialUi.TextField, { floatingLabelText: m('key.import.label'), ref: 'createKeyLabel', fullWidth: true })
                );
                dialogActions = [_react2['default'].createElement(_materialUi.FlatButton, { label: pydio.MessageHash['54'], onTouchTap: function () {
                        _this6.setState({ showCreateKey: null, showDialog: false });
                    } }), _react2['default'].createElement(_materialUi.FlatButton, { label: m('key.create'), primary: true, onTouchTap: function () {
                        _this6.createKey();
                    } })];
            }

            return _react2['default'].createElement(
                _materialUi.Paper,
                { zDepth: 1, style: { margin: 16, padding: 16 } },
                _react2['default'].createElement(
                    _materialUi.Dialog,
                    {
                        title: dialogTitle,
                        open: showDialog,
                        onRequestClose: function () {
                            _this6.setState({ showDialog: false, showExportKey: null, showImportKey: null, showCreateKey: false });
                        },
                        modal: true,
                        actions: dialogActions,
                        contentStyle: { maxWidth: 340 }
                    },
                    dialogContent
                ),
                _react2['default'].createElement(
                    'div',
                    { style: { textAlign: 'right' } },
                    _react2['default'].createElement(_materialUi.RaisedButton, { primary: true, label: m('key.import'), onTouchTap: function () {
                            _this6.setState({ showImportKey: {}, showDialog: true });
                        }, style: { marginLeft: 16 } }),
                    _react2['default'].createElement(_materialUi.RaisedButton, { primary: true, label: m('key.create'), onTouchTap: function () {
                            _this6.setState({ showCreateKey: true, showDialog: true });
                        }, style: { marginLeft: 16 } })
                ),
                _react2['default'].createElement(MaterialTable, {
                    data: keys,
                    columns: columns,
                    onSelectRows: function () {},
                    showCheckboxes: false,
                    emptyStateString: m('key.emptyState')
                })
            );
        }
    }]);

    return EncryptionKeys;
})(_react2['default'].Component);

exports['default'] = EncryptionKeys;
module.exports = exports['default'];

},{"material-ui":"material-ui","pydio":"pydio","pydio/http/api":"pydio/http/api","pydio/http/rest-api":"pydio/http/rest-api","react":"react"}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _modelMetadata = require('../model/Metadata');

var _modelMetadata2 = _interopRequireDefault(_modelMetadata);

var _materialUi = require('material-ui');

var _pydio = require('pydio');

var _pydio2 = _interopRequireDefault(_pydio);

var _editorMetaNamespace = require('../editor/MetaNamespace');

var _editorMetaNamespace2 = _interopRequireDefault(_editorMetaNamespace);

var _pydioHttpRestApi = require('pydio/http/rest-api');

var _Pydio$requireLib = _pydio2['default'].requireLib('components');

var MaterialTable = _Pydio$requireLib.MaterialTable;

var MetadataBoard = (function (_React$Component) {
    _inherits(MetadataBoard, _React$Component);

    function MetadataBoard(props) {
        _classCallCheck(this, MetadataBoard);

        _get(Object.getPrototypeOf(MetadataBoard.prototype), 'constructor', this).call(this, props);
        this.state = {
            loading: false,
            namespaces: [],
            m: function m(id) {
                return props.pydio.MessageHash['ajxp_admin.metadata.' + id];
            }
        };
    }

    _createClass(MetadataBoard, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.load();
        }
    }, {
        key: 'load',
        value: function load() {
            var _this = this;

            this.setState({ loading: true });
            _modelMetadata2['default'].loadNamespaces().then(function (result) {
                _this.setState({ loading: false, namespaces: result.Namespaces || [] });
            });
        }
    }, {
        key: 'emptyNs',
        value: function emptyNs() {
            var ns = new _pydioHttpRestApi.IdmUserMetaNamespace();
            ns.Policies = [_pydioHttpRestApi.ServiceResourcePolicy.constructFromObject({ Action: 'READ', Subject: '*', Effect: 'allow' }), _pydioHttpRestApi.ServiceResourcePolicy.constructFromObject({ Action: 'WRITE', Subject: '*', Effect: 'allow' })];
            ns.JsonDefinition = JSON.stringify({ type: 'string' });
            return ns;
        }
    }, {
        key: 'create',
        value: function create() {
            this.setState({
                create: true,
                dialogOpen: true,
                selectedNamespace: this.emptyNs()
            });
        }
    }, {
        key: 'deleteNs',
        value: function deleteNs(row) {
            var _this2 = this;

            if (confirm(this.state.m('delete.confirm'))) {
                _modelMetadata2['default'].deleteNS(row).then(function () {
                    _this2.load();
                });
            }
        }
    }, {
        key: 'open',
        value: function open(rows) {
            if (rows.length) {
                this.setState({
                    create: false,
                    dialogOpen: true,
                    selectedNamespace: rows[0]
                });
            }
        }
    }, {
        key: 'close',
        value: function close() {
            this.setState({ dialogOpen: false, selectedNamespace: null });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _state = this.state;
            var namespaces = _state.namespaces;
            var loading = _state.loading;
            var dialogOpen = _state.dialogOpen;
            var selectedNamespace = _state.selectedNamespace;
            var create = _state.create;
            var m = _state.m;

            if (!selectedNamespace) {
                selectedNamespace = this.emptyNs();
            }
            namespaces.sort(function (a, b) {
                if (a.Order === b.Order) return 0;
                return a.Order > b.Order ? 1 : -1;
            });
            var _props = this.props;
            var currentNode = _props.currentNode;
            var pydio = _props.pydio;

            var columns = [{ name: 'Order', label: m('order'), style: { width: 30 }, headerStyle: { width: 30 }, renderCell: function renderCell(row) {
                    return row.Order || '0';
                } }, { name: 'Namespace', label: m('namespace'), style: { fontSize: 15 } }, { name: 'Label', label: m('label'), style: { width: '25%' }, headerStyle: { width: '25%' } }, { name: 'Indexable', label: m('indexable'), style: { width: '25%' }, headerStyle: { width: '25%' }, renderCell: function renderCell(row) {
                    return row.Indexable ? 'Yes' : 'No';
                } }, { name: 'JsonDefinition', label: m('definition'), renderCell: function renderCell(row) {
                    var def = row.JsonDefinition;
                    if (!def) {
                        return '';
                    }
                    var data = JSON.parse(def);
                    return _modelMetadata2['default'].MetaTypes[data.type] || data.type;
                } }, { name: 'actions', label: '', style: { width: 100 }, headerStyle: { width: 100 }, renderCell: function renderCell(row) {
                    return _react2['default'].createElement(_materialUi.IconButton, {
                        iconClassName: 'mdi mdi-delete',
                        onTouchTap: function () {
                            _this3.deleteNs(row);
                        },
                        onClick: function (e) {
                            e.stopPropagation();
                        },
                        iconStyle: { color: 'rgba(0,0,0,0.3)', fontSize: 20 }
                    });
                } }];
            var title = currentNode.getLabel();
            var icon = currentNode.getMetadata().get('icon_class');
            var buttons = [_react2['default'].createElement(_materialUi.FlatButton, { primary: true, label: m('namespace.add'), onTouchTap: function () {
                    _this3.create();
                } })];

            return _react2['default'].createElement(
                'div',
                { className: 'main-layout-nav-to-stack workspaces-board' },
                _react2['default'].createElement(_editorMetaNamespace2['default'], {
                    pydio: pydio,
                    open: dialogOpen,
                    create: create,
                    namespace: selectedNamespace,
                    onRequestClose: function () {
                        return _this3.close();
                    },
                    reloadList: function () {
                        return _this3.load();
                    },
                    namespaces: namespaces
                }),
                _react2['default'].createElement(
                    'div',
                    { className: 'vertical-layout', style: { width: '100%' } },
                    _react2['default'].createElement(AdminComponents.Header, {
                        title: title,
                        icon: icon,
                        actions: buttons,
                        reloadAction: this.load.bind(this),
                        loading: loading
                    }),
                    _react2['default'].createElement(
                        'div',
                        { className: 'layout-fill' },
                        _react2['default'].createElement(AdminComponents.SubHeader, { title: m('namespaces'), legend: m('namespaces.legend') }),
                        _react2['default'].createElement(
                            _materialUi.Paper,
                            { zDepth: 1, style: { margin: 16 } },
                            _react2['default'].createElement(MaterialTable, {
                                data: namespaces,
                                columns: columns,
                                onSelectRows: this.open.bind(this),
                                deselectOnClickAway: true,
                                showCheckboxes: false,
                                emptyStateString: m('empty')
                            })
                        )
                    )
                )
            );
        }
    }]);

    return MetadataBoard;
})(_react2['default'].Component);

exports['default'] = MetadataBoard;
module.exports = exports['default'];

},{"../editor/MetaNamespace":10,"../model/Metadata":19,"material-ui":"material-ui","pydio":"pydio","pydio/http/rest-api":"pydio/http/rest-api","react":"react"}],5:[function(require,module,exports){
/*
 * Copyright 2007-2017 Charles du Jeu - Abstrium SAS <team (at) pyd.io>
 * This file is part of Pydio.
 *
 * Pydio is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Pydio is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Pydio.  If not, see <http://www.gnu.org/licenses/>.
 *
 * The latest code can be found at <https://pydio.com>.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _modelVirtualNode = require('../model/VirtualNode');

var _modelVirtualNode2 = _interopRequireDefault(_modelVirtualNode);

var _modelDataSource = require('../model/DataSource');

var _modelDataSource2 = _interopRequireDefault(_modelDataSource);

var _virtualNodeCard = require('../virtual/NodeCard');

var _virtualNodeCard2 = _interopRequireDefault(_virtualNodeCard);

var _materialUi = require('material-ui');

var VirtualNodes = (function (_React$Component) {
    _inherits(VirtualNodes, _React$Component);

    function VirtualNodes(props) {
        var _this = this;

        _classCallCheck(this, VirtualNodes);

        _get(Object.getPrototypeOf(VirtualNodes.prototype), 'constructor', this).call(this, props);
        this.state = { nodesLoaded: false, nodes: [], dataSourcesLoaded: false, dataSources: [] };
        _modelVirtualNode2['default'].loadNodes(function (result) {
            _this.setState({ nodes: result, nodesLoaded: true });
        });
        _modelDataSource2['default'].loadDatasources().then(function (result) {
            _this.setState({ dataSources: result.DataSources, dataSourcesLoaded: true });
        });
    }

    _createClass(VirtualNodes, [{
        key: 'reload',
        value: function reload() {
            var _this2 = this;

            this.setState({ nodesLoaded: false });
            _modelVirtualNode2['default'].loadNodes(function (result) {
                _this2.setState({ nodes: result, nodesLoaded: true });
            });
        }
    }, {
        key: 'createNode',
        value: function createNode() {
            this.handleRequestClose();
            var newNode = new _modelVirtualNode2['default']();
            newNode.setName(this.state.newName);
            var nodes = this.state.nodes;

            this.setState({ nodes: [].concat(_toConsumableArray(nodes), [newNode]) });
        }
    }, {
        key: 'handleTouchTap',
        value: function handleTouchTap(event) {
            var _this3 = this;

            // This prevents ghost click.
            event.preventDefault();
            this.setState({
                newName: '',
                open: true,
                anchorEl: event.currentTarget
            }, function () {
                setTimeout(function () {
                    if (_this3.refs['newNode']) _this3.refs['newNode'].focus();
                }, 300);
            });
        }
    }, {
        key: 'handleRequestClose',
        value: function handleRequestClose() {
            this.setState({
                open: false
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var _props = this.props;
            var readonly = _props.readonly;
            var pydio = _props.pydio;
            var _state = this.state;
            var nodes = _state.nodes;
            var dataSources = _state.dataSources;
            var nodesLoaded = _state.nodesLoaded;
            var dataSourcesLoaded = _state.dataSourcesLoaded;

            var m = function m(id) {
                return pydio.MessageHash['ajxp_admin.virtual.' + id] || id;
            };
            var vNodes = [];
            nodes.map(function (node) {
                vNodes.push(_react2['default'].createElement(_virtualNodeCard2['default'], { dataSources: dataSources, node: node, reloadList: _this4.reload.bind(_this4), readonly: readonly }));
            });

            var headerActions = [];
            if (!readonly) {
                headerActions.push(_react2['default'].createElement(_materialUi.FlatButton, { primary: true, label: m('create'), onTouchTap: this.handleTouchTap.bind(this) }));
            }

            return _react2['default'].createElement(
                'div',
                { className: 'vertical-layout workspaces-list layout-fill' },
                _react2['default'].createElement(AdminComponents.Header, {
                    title: m('title'),
                    icon: "mdi mdi-help-network",
                    actions: headerActions,
                    reloadAction: this.reload.bind(this),
                    loading: !(nodesLoaded && dataSourcesLoaded)
                }),
                _react2['default'].createElement(
                    _materialUi.Popover,
                    {
                        open: this.state.open,
                        anchorEl: this.state.anchorEl,
                        anchorOrigin: { horizontal: 'right', vertical: 'top' },
                        targetOrigin: { horizontal: 'right', vertical: 'top' },
                        onRequestClose: this.handleRequestClose.bind(this)
                    },
                    _react2['default'].createElement(
                        'div',
                        { style: { margin: '0 10px' } },
                        _react2['default'].createElement(_materialUi.TextField, { ref: 'newNode', floatingLabelText: m('label'), value: this.state.newName, onChange: function (e, v) {
                                _this4.setState({ newName: v });
                            }, hintText: "Provide a label for this node" })
                    ),
                    _react2['default'].createElement(_materialUi.Divider, null),
                    _react2['default'].createElement(
                        'div',
                        { style: { textAlign: 'right', padding: '4px 10px' } },
                        _react2['default'].createElement(_materialUi.FlatButton, { label: pydio.MessageHash['54'], onClick: this.handleRequestClose.bind(this) }),
                        _react2['default'].createElement(_materialUi.RaisedButton, { primary: true, label: m('create.button'), onClick: this.createNode.bind(this) })
                    )
                ),
                _react2['default'].createElement(
                    'div',
                    { style: { padding: 20, paddingBottom: 0 } },
                    m('legend.1'),
                    _react2['default'].createElement('br', null),
                    !readonly && _react2['default'].createElement(
                        'span',
                        null,
                        m('legend.2')
                    )
                ),
                nodesLoaded && dataSourcesLoaded && vNodes,
                (!nodesLoaded || !dataSourcesLoaded) && _react2['default'].createElement(
                    'div',
                    { style: { margin: 16, textAlign: 'center', padding: 20 } },
                    pydio.MessageHash['ajxp_admin.home.6']
                )
            );
        }
    }]);

    return VirtualNodes;
})(_react2['default'].Component);

exports['default'] = VirtualNodes;
module.exports = exports['default'];

},{"../model/DataSource":18,"../model/VirtualNode":20,"../virtual/NodeCard":22,"material-ui":"material-ui","react":"react"}],6:[function(require,module,exports){
/*
 * Copyright 2007-2017 Charles du Jeu - Abstrium SAS <team (at) pyd.io>
 * This file is part of Pydio.
 *
 * Pydio is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Pydio is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Pydio.  If not, see <http://www.gnu.org/licenses/>.
 *
 * The latest code can be found at <https://pydio.com>.
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _pydioModelDataModel = require('pydio/model/data-model');

var _pydioModelDataModel2 = _interopRequireDefault(_pydioModelDataModel);

var _pydioModelNode = require('pydio/model/node');

var _pydioModelNode2 = _interopRequireDefault(_pydioModelNode);

var _pydioUtilLang = require('pydio/util/lang');

var _pydioUtilLang2 = _interopRequireDefault(_pydioUtilLang);

var _pydio = require('pydio');

var _pydio2 = _interopRequireDefault(_pydio);

var _modelWs = require('../model/Ws');

var _modelWs2 = _interopRequireDefault(_modelWs);

var PydioComponents = _pydio2['default'].requireLib('components');
var MaterialTable = PydioComponents.MaterialTable;
exports['default'] = _react2['default'].createClass({
    displayName: 'WorkspaceList',

    mixins: [AdminComponents.MessagesConsumerMixin],

    propTypes: {
        dataModel: _react2['default'].PropTypes.instanceOf(_pydioModelDataModel2['default']).isRequired,
        rootNode: _react2['default'].PropTypes.instanceOf(_pydioModelNode2['default']).isRequired,
        currentNode: _react2['default'].PropTypes.instanceOf(_pydioModelNode2['default']).isRequired,
        openSelection: _react2['default'].PropTypes.func,
        filter: _react2['default'].PropTypes.string
    },

    getInitialState: function getInitialState() {
        return { workspaces: [], loading: false };
    },

    reload: function reload() {
        var _this = this;

        this.setState({ loading: true });
        _pydio2['default'].startLoading();
        _modelWs2['default'].listWorkspaces().then(function (response) {
            _pydio2['default'].endLoading();
            _this.setState({ loading: false, workspaces: response.Workspaces || [] });
        })['catch'](function (e) {
            _pydio2['default'].endLoading();
            _this.setState({ loading: false });
        });
    },

    componentDidMount: function componentDidMount() {
        this.reload();
    },

    openTableRows: function openTableRows(rows) {
        if (rows.length) {
            this.props.openSelection(rows[0].payload);
        }
    },

    computeTableData: function computeTableData() {
        var data = [];
        var workspaces = this.state.workspaces;

        workspaces.map(function (workspace) {
            var summary = ""; // compute root nodes list ?
            if (workspace.RootNodes) {
                summary = Object.keys(workspace.RootNodes).map(function (k) {
                    return _pydioUtilLang2['default'].trimRight(workspace.RootNodes[k].Path, '/');
                }).join(', ');
            }
            data.push({
                payload: workspace,
                label: workspace.Label,
                description: workspace.Description,
                slug: workspace.Slug,
                summary: summary
            });
        });
        data.sort(function (a, b) {
            return a.label > b.label ? 1 : a.label < b.label ? -1 : 0;
        });
        return data;
    },

    render: function render() {
        var pydio = this.props.pydio;

        var m = function m(id) {
            return pydio.MessageHash['ajxp_admin.' + id];
        };
        var s = function s(id) {
            return pydio.MessageHash['settings.' + id];
        };

        var columns = [{ name: 'label', label: s('8'), style: { width: '20%', fontSize: 15 }, headerStyle: { width: '20%' } }, { name: 'description', label: s('103'), style: { width: '30%' }, headerStyle: { width: '30%' } }, { name: 'summary', label: m('ws.board.summary'), style: { width: '30%' }, headerStyle: { width: '30%' } }, { name: 'slug', label: m('ws.5'), style: { width: '20%' }, headerStyle: { width: '20%' } }];
        var loading = this.state.loading;

        var data = this.computeTableData();

        return _react2['default'].createElement(MaterialTable, {
            data: data,
            columns: columns,
            onSelectRows: this.openTableRows.bind(this),
            deselectOnClickAway: true,
            showCheckboxes: false,
            emptyStateString: loading ? m('home.6') : m('ws.board.empty')
        });
    }

});
module.exports = exports['default'];

},{"../model/Ws":21,"pydio":"pydio","pydio/model/data-model":"pydio/model/data-model","pydio/model/node":"pydio/model/node","pydio/util/lang":"pydio/util/lang","react":"react"}],7:[function(require,module,exports){
/*
 * Copyright 2007-2017 Charles du Jeu - Abstrium SAS <team (at) pyd.io>
 * This file is part of Pydio.
 *
 * Pydio is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Pydio is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Pydio.  If not, see <http://www.gnu.org/licenses/>.
 *
 * The latest code can be found at <https://pydio.com>.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUi = require('material-ui');

var _pydioUtilXml = require('pydio/util/xml');

var _pydioUtilXml2 = _interopRequireDefault(_pydioUtilXml);

var _editorWsEditor = require('../editor/WsEditor');

var _editorWsEditor2 = _interopRequireDefault(_editorWsEditor);

var _WorkspaceList = require('./WorkspaceList');

var _WorkspaceList2 = _interopRequireDefault(_WorkspaceList);

var PydioDataModel = require('pydio/model/data-model');
var AjxpNode = require('pydio/model/node');

exports['default'] = _react2['default'].createClass({
    displayName: 'WsDashboard',

    mixins: [AdminComponents.MessagesConsumerMixin],

    propTypes: {
        dataModel: _react2['default'].PropTypes.instanceOf(PydioDataModel).isRequired,
        rootNode: _react2['default'].PropTypes.instanceOf(AjxpNode).isRequired,
        currentNode: _react2['default'].PropTypes.instanceOf(AjxpNode).isRequired,
        openEditor: _react2['default'].PropTypes.func.isRequired,
        openRightPane: _react2['default'].PropTypes.func.isRequired,
        closeRightPane: _react2['default'].PropTypes.func.isRequired,
        filter: _react2['default'].PropTypes.string
    },

    getInitialState: function getInitialState() {
        return { selectedNode: null, filter: this.props.filter || 'workspaces' };
    },

    componentDidMount: function componentDidMount() {
        var _this = this;

        this._setLoading = function () {
            _this.setState({ loading: true });
        };
        this._stopLoading = function () {
            _this.setState({ loading: false });
        };
        this.props.currentNode.observe('loaded', this._stopLoading);
        this.props.currentNode.observe('loading', this._setLoading);
    },

    componentWillUnmount: function componentWillUnmount() {
        this.props.currentNode.stopObserving('loaded', this._stopLoading);
        this.props.currentNode.stopObserving('loading', this._setLoading);
    },

    dirtyEditor: function dirtyEditor() {
        var pydio = this.props.pydio;

        if (this.refs.editor && this.refs.editor.isDirty()) {
            if (!confirm(pydio.MessageHash["role_editor.19"])) {
                return true;
            }
        }
        return false;
    },

    openWorkspace: function openWorkspace(workspace) {
        var _this2 = this;

        if (this.dirtyEditor()) {
            return;
        }
        var editor = _editorWsEditor2['default'];
        var editorNode = _pydioUtilXml2['default'].XPathSelectSingleNode(this.props.pydio.getXmlRegistry(), '//client_configs/component_config[@component="AdminWorkspaces.Dashboard"]/editor');
        if (editorNode) {
            editor = editorNode.getAttribute('namespace') + '.' + editorNode.getAttribute('component');
        }
        var pydio = this.props.pydio;

        var editorData = {
            COMPONENT: editor,
            PROPS: {
                ref: "editor",
                pydio: pydio,
                workspace: workspace,
                closeEditor: this.closeWorkspace,
                reloadList: function reloadList() {
                    _this2.refs['workspacesList'].reload();
                }
            }
        };
        this.props.openRightPane(editorData);
        return true;
    },

    closeWorkspace: function closeWorkspace() {
        if (!this.dirtyEditor()) {
            this.props.closeRightPane();
        }
    },

    showWorkspaceCreator: function showWorkspaceCreator(type) {
        var _this3 = this;

        var pydio = this.props.pydio;

        var editorData = {
            COMPONENT: _editorWsEditor2['default'],
            PROPS: {
                ref: "editor",
                type: type,
                pydio: pydio,
                closeEditor: this.closeWorkspace,
                reloadList: function reloadList() {
                    _this3.refs['workspacesList'].reload();
                }
            }
        };
        this.props.openRightPane(editorData);
    },

    reloadWorkspaceList: function reloadWorkspaceList() {
        this.refs.workspacesList.reload();
    },

    render: function render() {
        var buttons = [];
        var icon = undefined;
        var title = this.props.currentNode.getLabel();
        buttons.push(_react2['default'].createElement(_materialUi.FlatButton, { primary: true, label: this.context.getMessage('ws.3'), onTouchTap: this.showWorkspaceCreator }));
        icon = 'mdi mdi-folder-open';

        return _react2['default'].createElement(
            'div',
            { className: 'main-layout-nav-to-stack workspaces-board' },
            _react2['default'].createElement(
                'div',
                { className: 'vertical-layout', style: { width: '100%' } },
                _react2['default'].createElement(AdminComponents.Header, {
                    title: title,
                    icon: icon,
                    actions: buttons,
                    reloadAction: this.reloadWorkspaceList,
                    loading: this.state.loading
                }),
                _react2['default'].createElement(AdminComponents.SubHeader, { legend: this.context.getMessage('ws.dashboard', 'ajxp_admin') }),
                _react2['default'].createElement(
                    'div',
                    { className: 'layout-fill' },
                    _react2['default'].createElement(
                        _materialUi.Paper,
                        { zDepth: 1, style: { margin: 16 } },
                        _react2['default'].createElement(_WorkspaceList2['default'], {
                            ref: 'workspacesList',
                            pydio: this.props.pydio,
                            dataModel: this.props.dataModel,
                            rootNode: this.props.rootNode,
                            currentNode: this.props.currentNode,
                            openSelection: this.openWorkspace,
                            filter: this.state.filter
                        })
                    )
                )
            )
        );
    }

});
module.exports = exports['default'];

},{"../editor/WsEditor":14,"./WorkspaceList":6,"material-ui":"material-ui","pydio/model/data-model":"pydio/model/data-model","pydio/model/node":"pydio/model/node","pydio/util/xml":"pydio/util/xml","react":"react"}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _pydio = require('pydio');

var _pydio2 = _interopRequireDefault(_pydio);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _modelDataSource = require('../model/DataSource');

var _modelDataSource2 = _interopRequireDefault(_modelDataSource);

var _materialUi = require('material-ui');

var _DataSourceLocalSelector = require('./DataSourceLocalSelector');

var _DataSourceLocalSelector2 = _interopRequireDefault(_DataSourceLocalSelector);

var _Pydio$requireLib = _pydio2['default'].requireLib('components');

var PaperEditorLayout = _Pydio$requireLib.PaperEditorLayout;

var DataSourceEditor = (function (_React$Component) {
    _inherits(DataSourceEditor, _React$Component);

    function DataSourceEditor(props) {
        var _this = this;

        _classCallCheck(this, DataSourceEditor);

        _get(Object.getPrototypeOf(DataSourceEditor.prototype), 'constructor', this).call(this, props);
        var observable = new _modelDataSource2['default'](props.dataSource);
        this.state = {
            dirty: false,
            create: props.create,
            observable: observable,
            model: observable.getModel(),
            loaded: false,
            valid: observable.isValid(),
            encryptionKeys: [],
            versioningPolicies: [],
            m: function m(id) {
                return props.pydio.MessageHash['ajxp_admin.ds.editor.' + id] || id;
            }
        };
        _modelDataSource2['default'].loadEncryptionKeys().then(function (res) {
            _this.setState({ encryptionKeys: res.Keys || [] });
        });
        _modelDataSource2['default'].loadVersioningPolicies().then(function (res) {
            _this.setState({ versioningPolicies: res.Policies || [] });
        });
    }

    _createClass(DataSourceEditor, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            if (newProps.dataSource && this.state.model.Name !== newProps.dataSource.Name) {
                this.setState({ model: new _modelDataSource2['default'](newProps.dataSource).getModel() });
            }
            if (newProps.create && this.state.create !== newProps.create) {
                this.setState({ create: newProps.create });
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var observable = this.state.observable;

            observable.observe("update", function () {
                _this2.setState({ dirty: true });
                _this2.forceUpdate();
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var observable = this.state.observable;

            observable.stopObserving("update");
        }
    }, {
        key: 'resetForm',
        value: function resetForm() {
            var _this3 = this;

            var observable = this.state.observable;

            var newModel = observable.revert();
            this.setState({
                valid: true,
                dirty: false,
                model: newModel
            }, function () {
                _this3.forceUpdate();
            });
        }
    }, {
        key: 'deleteSource',
        value: function deleteSource() {
            var _this4 = this;

            var m = this.state.m;

            if (confirm(m('delete.warning'))) {
                this.state.observable.deleteSource().then(function () {
                    _this4.props.closeEditor();
                    _this4.props.reloadList();
                });
            }
        }
    }, {
        key: 'saveSource',
        value: function saveSource() {
            var _this5 = this;

            this.state.observable.saveSource().then(function () {
                _this5.setState({ valid: true, dirty: false, create: false });
                _this5.props.reloadList();
            });
        }
    }, {
        key: 'launchResync',
        value: function launchResync() {
            this.state.observable.resyncSource();
        }
    }, {
        key: 'toggleEncryption',
        value: function toggleEncryption(value) {
            if (value) {
                this.setState({ showDialog: 'enableEncryption', dialogTargetValue: value });
            } else {
                this.setState({ showDialog: 'disableEncryption', dialogTargetValue: value });
            }
        }
    }, {
        key: 'confirmEncryption',
        value: function confirmEncryption(value) {
            var model = this.state.model;

            model.EncryptionMode = value ? "MASTER" : "CLEAR";
            this.setState({ showDialog: false, dialogTargetValue: null });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this6 = this;

            var _state = this.state;
            var model = _state.model;
            var create = _state.create;
            var observable = _state.observable;
            var encryptionKeys = _state.encryptionKeys;
            var versioningPolicies = _state.versioningPolicies;
            var showDialog = _state.showDialog;
            var dialogTargetValue = _state.dialogTargetValue;
            var m = _state.m;

            var titleActionBarButtons = [];
            if (!create) {
                titleActionBarButtons.push(PaperEditorLayout.actionButton(this.context.getMessage('plugins.6'), 'mdi mdi-undo', function () {
                    _this6.resetForm();
                }, !this.state.dirty));
            }
            titleActionBarButtons.push(PaperEditorLayout.actionButton(this.context.getMessage('53', ''), 'mdi mdi-content-save', function () {
                _this6.saveSource();
            }, !observable.isValid() || !this.state.dirty));

            var leftNav = _react2['default'].createElement(
                'div',
                { style: { padding: '6px 0', color: '#9E9E9E', fontSize: 13 } },
                _react2['default'].createElement(
                    'div',
                    { style: { fontSize: 120, textAlign: 'center' } },
                    _react2['default'].createElement('i', { className: 'mdi mdi-database' })
                ),
                _react2['default'].createElement(
                    'div',
                    { style: { padding: 16 } },
                    this.context.getMessage('ws.75'),
                    ' ',
                    this.context.getMessage('ws.76')
                ),
                create && model.StorageType === 'LOCAL' && _react2['default'].createElement(
                    'div',
                    null,
                    _react2['default'].createElement(_materialUi.Divider, null),
                    _react2['default'].createElement(
                        'div',
                        { style: { padding: 16 } },
                        m('legend.local'),
                        _react2['default'].createElement(
                            'ul',
                            null,
                            _react2['default'].createElement(
                                'li',
                                { style: { listStyle: 'disc', marginLeft: 20 } },
                                m('legend.local.li.1')
                            ),
                            _react2['default'].createElement(
                                'li',
                                { style: { listStyle: 'disc', marginLeft: 20 } },
                                m('legend.local.li.2')
                            ),
                            _react2['default'].createElement(
                                'li',
                                { style: { listStyle: 'disc', marginLeft: 20 } },
                                m('legend.local.li.3')
                            )
                        )
                    )
                ),
                create && model.StorageType === 'S3' && _react2['default'].createElement(
                    'div',
                    null,
                    _react2['default'].createElement(_materialUi.Divider, null),
                    _react2['default'].createElement(
                        'div',
                        { style: { padding: 16 } },
                        m('legend.s3.1'),
                        _react2['default'].createElement('br', null),
                        m('legend.s3.2')
                    )
                ),
                !create && _react2['default'].createElement(
                    'div',
                    null,
                    _react2['default'].createElement(_materialUi.Divider, null),
                    _react2['default'].createElement(
                        'div',
                        { style: { padding: 16 } },
                        m('legend.resync'),
                        _react2['default'].createElement(
                            'div',
                            { style: { textAlign: 'center', marginTop: 10 } },
                            _react2['default'].createElement(_materialUi.RaisedButton, { label: m('legend.resync.button'), onClick: this.launchResync.bind(this) })
                        )
                    )
                ),
                !create && _react2['default'].createElement(
                    'div',
                    null,
                    _react2['default'].createElement(_materialUi.Divider, null),
                    _react2['default'].createElement(
                        'div',
                        { style: { padding: 16 } },
                        m('legend.delete.1'),
                        _react2['default'].createElement('br', null),
                        m('legend.delete.2'),
                        _react2['default'].createElement(
                            'div',
                            { style: { textAlign: 'center', marginTop: 10 } },
                            _react2['default'].createElement(_materialUi.RaisedButton, { secondary: true, label: m('legend.delete.button'), onClick: this.deleteSource.bind(this), style: { marginTop: 16 } })
                        )
                    )
                )
            );

            var title = model.Name ? m('title').replace('%s', model.Name) : m('new');
            var storageConfig = model.StorageConfiguration;
            var styles = {
                title: {
                    fontSize: 20,
                    paddingTop: 20,
                    marginBottom: 0
                },
                legend: {},
                section: { padding: '0 20px 20px' },
                toggleDiv: { height: 50, display: 'flex', alignItems: 'flex-end' }
            };

            return _react2['default'].createElement(
                PydioComponents.PaperEditorLayout,
                {
                    title: title,
                    titleActionBar: titleActionBarButtons,
                    closeAction: this.props.closeEditor,
                    leftNav: leftNav,
                    className: 'workspace-editor',
                    contentFill: false
                },
                _react2['default'].createElement(
                    _materialUi.Dialog,
                    {
                        open: showDialog,
                        title: m('enc.warning'),
                        onRequestClose: function () {
                            _this6.confirmEncryption(!dialogTargetValue);
                        },
                        actions: [_react2['default'].createElement(_materialUi.FlatButton, { label: "Cancel", onTouchTap: function () {
                                _this6.confirmEncryption(!dialogTargetValue);
                            } }), _react2['default'].createElement(_materialUi.FlatButton, { label: m('enc.validate'), onTouchTap: function () {
                                _this6.confirmEncryption(dialogTargetValue);
                            } })]
                    },
                    showDialog === 'enableEncryption' && _react2['default'].createElement(
                        'div',
                        null,
                        _react2['default'].createElement(
                            'p',
                            null,
                            m('enc.dialog.enable.1')
                        ),
                        _react2['default'].createElement(
                            'p',
                            null,
                            m('enc.dialog.enable.2'),
                            ' ',
                            _react2['default'].createElement(
                                'b',
                                null,
                                m('enc.dialog.enable.2bold')
                            )
                        ),
                        _react2['default'].createElement(
                            'p',
                            null,
                            m('enc.dialog.enable.3')
                        )
                    ),
                    showDialog === 'disableEncryption' && _react2['default'].createElement(
                        'div',
                        null,
                        m('enc.dialog.disable')
                    )
                ),
                _react2['default'].createElement(
                    'div',
                    { style: styles.section },
                    _react2['default'].createElement(
                        'div',
                        { style: styles.title },
                        m('options')
                    ),
                    _react2['default'].createElement(_materialUi.TextField, { fullWidth: true, floatingLabelFixed: true, floatingLabelText: m('options.id'), disabled: !create, value: model.Name, onChange: function (e, v) {
                            model.Name = v;
                        } }),
                    !create && _react2['default'].createElement(
                        'div',
                        { style: styles.toggleDiv },
                        _react2['default'].createElement(_materialUi.Toggle, { label: m('options.enabled'), toggled: !model.Disabled, onToggle: function (e, v) {
                                model.Disabled = !v;
                            } })
                    )
                ),
                _react2['default'].createElement(_materialUi.Divider, null),
                _react2['default'].createElement(
                    'div',
                    { style: styles.section },
                    _react2['default'].createElement(
                        'div',
                        { style: styles.title },
                        this.context.getMessage('ds.storage.title', 'ajxp_admin')
                    ),
                    _react2['default'].createElement(
                        _materialUi.SelectField,
                        { fullWidth: true, disabled: !create, floatingLabelText: this.context.getMessage('ds.storage', 'ajxp_admin'), value: model.StorageType, onChange: function (e, i, v) {
                                model.StorageType = v;
                            } },
                        _react2['default'].createElement(_materialUi.MenuItem, { value: "LOCAL", primaryText: this.context.getMessage('ds.storage.fs', 'ajxp_admin') }),
                        _react2['default'].createElement(_materialUi.MenuItem, { value: "S3", primaryText: this.context.getMessage('ds.storage.s3', 'ajxp_admin') }),
                        _react2['default'].createElement(_materialUi.MenuItem, { value: "AZURE", primaryText: this.context.getMessage('ds.storage.azure', 'ajxp_admin') }),
                        _react2['default'].createElement(_materialUi.MenuItem, { value: "GCS", primaryText: this.context.getMessage('ds.storage.gcs', 'ajxp_admin') })
                    ),
                    model.StorageType === 'S3' && _react2['default'].createElement(
                        'div',
                        null,
                        _react2['default'].createElement(_materialUi.TextField, { fullWidth: true, floatingLabelFixed: true, floatingLabelText: m('storage.s3.bucket'), value: model.ObjectsBucket, onChange: function (e, v) {
                                model.ObjectsBucket = v;
                            } }),
                        _react2['default'].createElement(_materialUi.TextField, { fullWidth: true, floatingLabelFixed: true, floatingLabelText: m('storage.s3.api'), value: model.ApiKey, onChange: function (e, v) {
                                model.ApiKey = v;
                            } }),
                        _react2['default'].createElement(_materialUi.TextField, { fullWidth: true, floatingLabelFixed: true, floatingLabelText: m('storage.s3.secret'), value: model.ApiSecret, onChange: function (e, v) {
                                model.ApiSecret = v;
                            } }),
                        _react2['default'].createElement(_materialUi.TextField, { fullWidth: true, floatingLabelFixed: true, floatingLabelText: m('storage.s3.path'), value: model.ObjectsBaseFolder, onChange: function (e, v) {
                                model.ObjectsBaseFolder = v;
                            } }),
                        _react2['default'].createElement(_materialUi.TextField, { fullWidth: true, floatingLabelFixed: true, floatingLabelText: m('storage.s3.endpoint'), hintText: m('storage.s3.endpoint.hint'), value: model.StorageConfiguration.customEndpoint, onChange: function (e, v) {
                                model.StorageConfiguration.customEndpoint = v;
                            } })
                    ),
                    model.StorageType === 'AZURE' && _react2['default'].createElement(
                        'div',
                        null,
                        _react2['default'].createElement(_materialUi.TextField, { fullWidth: true, floatingLabelFixed: true, floatingLabelText: m('storage.azure.bucket'), value: model.ObjectsBucket, onChange: function (e, v) {
                                model.ObjectsBucket = v;
                            } }),
                        _react2['default'].createElement(_materialUi.TextField, { fullWidth: true, floatingLabelFixed: true, floatingLabelText: m('storage.azure.api'), value: model.ApiKey, onChange: function (e, v) {
                                model.ApiKey = v;
                            } }),
                        _react2['default'].createElement(_materialUi.TextField, { fullWidth: true, floatingLabelFixed: true, floatingLabelText: m('storage.azure.secret'), value: model.ApiSecret, onChange: function (e, v) {
                                model.ApiSecret = v;
                            } }),
                        _react2['default'].createElement(_materialUi.TextField, { fullWidth: true, floatingLabelFixed: true, floatingLabelText: m('storage.s3.path'), value: model.ObjectsBaseFolder, onChange: function (e, v) {
                                model.ObjectsBaseFolder = v;
                            } })
                    ),
                    model.StorageType === 'GCS' && _react2['default'].createElement(
                        'div',
                        null,
                        _react2['default'].createElement(_materialUi.TextField, { fullWidth: true, floatingLabelFixed: true, floatingLabelText: m('storage.gcs.bucket'), value: model.ObjectsBucket, onChange: function (e, v) {
                                model.ObjectsBucket = v;
                            } }),
                        _react2['default'].createElement(_materialUi.TextField, { fullWidth: true, floatingLabelFixed: true, floatingLabelText: m('storage.gcs.credentials'), value: model.StorageConfiguration.jsonCredentials, onChange: function (e, v) {
                                model.StorageConfiguration.jsonCredentials = v;
                            }, multiLine: true }),
                        _react2['default'].createElement(_materialUi.TextField, { fullWidth: true, floatingLabelFixed: true, floatingLabelText: m('storage.s3.path'), value: model.ObjectsBaseFolder, onChange: function (e, v) {
                                model.ObjectsBaseFolder = v;
                            } })
                    ),
                    model.StorageType === 'LOCAL' && _react2['default'].createElement(
                        'div',
                        null,
                        _react2['default'].createElement(_DataSourceLocalSelector2['default'], { model: model, pydio: this.props.pydio }),
                        _react2['default'].createElement(
                            'div',
                            { style: styles.toggleDiv },
                            _react2['default'].createElement(_materialUi.Toggle, { label: m('storage.fs.macos'), toggled: storageConfig.normalize === "true", onToggle: function (e, v) {
                                    storageConfig.normalize = v ? "true" : "false";
                                } })
                        )
                    )
                ),
                _react2['default'].createElement(_materialUi.Divider, null),
                _react2['default'].createElement(
                    'div',
                    { style: styles.section },
                    _react2['default'].createElement(
                        'div',
                        { style: styles.title },
                        m('datamanagement')
                    ),
                    _react2['default'].createElement(
                        _materialUi.SelectField,
                        { fullWidth: true, floatingLabelFixed: true, floatingLabelText: m('versioning'), value: model.VersioningPolicyName, onChange: function (e, i, v) {
                                model.VersioningPolicyName = v;
                            } },
                        _react2['default'].createElement(_materialUi.MenuItem, { value: undefined, primaryText: m('versioning.disabled') }),
                        versioningPolicies.map(function (key) {
                            return _react2['default'].createElement(_materialUi.MenuItem, { value: key.Uuid, primaryText: key.Name });
                        })
                    ),
                    _react2['default'].createElement(
                        'div',
                        { style: styles.toggleDiv },
                        _react2['default'].createElement(_materialUi.Toggle, { label: m('enc'), toggled: model.EncryptionMode === "MASTER", onToggle: function (e, v) {
                                _this6.toggleEncryption(v);
                            } })
                    ),
                    model.EncryptionMode === "MASTER" && _react2['default'].createElement(
                        _materialUi.SelectField,
                        { fullWidth: true, floatingLabelFixed: true, floatingLabelText: m('enc.key'), value: model.EncryptionKey, onChange: function (e, i, v) {
                                model.EncryptionKey = v;
                            } },
                        encryptionKeys.map(function (key) {
                            return _react2['default'].createElement(_materialUi.MenuItem, { value: key.ID, primaryText: key.Label });
                        })
                    )
                )
            );
        }
    }]);

    return DataSourceEditor;
})(_react2['default'].Component);

DataSourceEditor.contextTypes = {
    messages: _react2['default'].PropTypes.object,
    getMessage: _react2['default'].PropTypes.func
};

exports['default'] = DataSourceEditor;
module.exports = exports['default'];

},{"../model/DataSource":18,"./DataSourceLocalSelector":9,"material-ui":"material-ui","pydio":"pydio","react":"react"}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _pydioHttpApi = require('pydio/http/api');

var _pydioHttpApi2 = _interopRequireDefault(_pydioHttpApi);

var _pydioHttpRestApi = require('pydio/http/rest-api');

var _materialUi = require('material-ui');

var _lodashDebounce = require('lodash.debounce');

var _lodashDebounce2 = _interopRequireDefault(_lodashDebounce);

var _pydioUtilLang = require('pydio/util/lang');

var _pydioUtilLang2 = _interopRequireDefault(_pydioUtilLang);

var _pydioUtilPath = require('pydio/util/path');

var _pydioUtilPath2 = _interopRequireDefault(_pydioUtilPath);

var AutocompleteTree = (function (_React$Component) {
    _inherits(AutocompleteTree, _React$Component);

    function AutocompleteTree(props) {
        _classCallCheck(this, AutocompleteTree);

        _get(Object.getPrototypeOf(AutocompleteTree.prototype), 'constructor', this).call(this, props);
        this.debounced = (0, _lodashDebounce2['default'])(this.loadValues.bind(this), 300);
        this.state = { searchText: props.value, value: props.value };
    }

    _createClass(AutocompleteTree, [{
        key: 'handleUpdateInput',
        value: function handleUpdateInput(searchText) {
            this.debounced();
            this.setState({ searchText: searchText });
        }
    }, {
        key: 'handleNewRequest',
        value: function handleNewRequest(chosenValue) {
            var key = undefined;
            var nodes = this.state.nodes;

            if (chosenValue.key === undefined) {
                key = chosenValue;
                var ok = false;
                nodes.map(function (node) {
                    if (node.Path === key) {
                        ok = true;
                    }
                });
                if (!ok) {
                    nodes.map(function (node) {
                        if (node.Path.indexOf(key) === 0) {
                            key = node.Path;
                            ok = true;
                        }
                    });
                }
                if (!ok) {
                    return;
                }
            } else {
                key = chosenValue.key;
            }
            this.setState({ value: key });
            this.props.onChange(key);
            this.loadValues(key);
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.lastSearch = null;
            var value = "";
            if (this.props.value) {
                value = this.props.value;
            }
            this.loadValues(value);
        }
    }, {
        key: 'loadValues',
        value: function loadValues() {
            var _this = this;

            var value = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
            var peerAddress = this.props.peerAddress;
            var searchText = this.state.searchText;

            var basePath = value;
            if (!value && searchText) {
                var last = searchText.lastIndexOf('/');
                basePath = searchText.substr(0, last);
            }
            if (this.lastSearch !== null && this.lastSearch === basePath) {
                return;
            }
            this.lastSearch = basePath;
            var api = new _pydioHttpRestApi.ConfigServiceApi(_pydioHttpApi2['default'].getRestClient());
            var listRequest = new _pydioHttpRestApi.RestListPeerFoldersRequest();
            listRequest.PeerAddress = peerAddress;
            listRequest.Path = basePath;
            this.setState({ loading: true });
            api.listPeerFolders(peerAddress, listRequest).then(function (nodesColl) {
                _this.setState({ nodes: nodesColl.Children || [], loading: false });
            })['catch'](function () {
                _this.setState({ loading: false });
            });
        }
    }, {
        key: 'renderNode',
        value: function renderNode(node) {
            var base = _pydioUtilPath2['default'].getBasename(node.Path);
            var dir = _pydioUtilPath2['default'].getDirname(node.Path);
            var label = _react2['default'].createElement(
                'span',
                null,
                node.Path
            );
            var invalid = false;
            if (_pydioUtilLang2['default'].computeStringSlug(base) !== base) {
                label = _react2['default'].createElement(
                    'span',
                    null,
                    _react2['default'].createElement(
                        'span',
                        null,
                        dir
                    ),
                    '/',
                    _react2['default'].createElement(
                        'span',
                        { style: { color: '#c62828' } },
                        base
                    )
                );
            }
            return {
                key: node.Path,
                text: node.Path,
                invalid: invalid,
                value: _react2['default'].createElement(
                    _materialUi.MenuItem,
                    null,
                    _react2['default'].createElement(_materialUi.FontIcon, { className: "mdi mdi-folder", color: '#616161', style: { float: 'left', marginRight: 8 } }),
                    ' ',
                    label
                )
            };
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _state = this.state;
            var nodes = _state.nodes;
            var loading = _state.loading;
            var fieldLabel = this.props.fieldLabel;

            var dataSource = [];
            if (nodes) {
                nodes.forEach(function (node) {
                    dataSource.push(_this2.renderNode(node));
                });
            }

            var displayText = this.state.value;

            return _react2['default'].createElement(
                'div',
                { style: { position: 'relative', marginTop: -5 } },
                _react2['default'].createElement(
                    'div',
                    { style: { position: 'absolute', right: 0, top: 30, width: 30 } },
                    _react2['default'].createElement(_materialUi.RefreshIndicator, {
                        size: 30,
                        left: 0,
                        top: 0,
                        status: loading ? "loading" : "hide"
                    })
                ),
                _react2['default'].createElement(_materialUi.AutoComplete, {
                    fullWidth: true,
                    searchText: displayText,
                    onUpdateInput: this.handleUpdateInput.bind(this),
                    onNewRequest: this.handleNewRequest.bind(this),
                    dataSource: dataSource,
                    floatingLabelText: fieldLabel,
                    floatingLabelStyle: { whiteSpace: 'nowrap' },
                    floatingLabelFixed: true,
                    filter: function (searchText, key) {
                        return key.toLowerCase().indexOf(searchText.toLowerCase()) === 0;
                    },
                    openOnFocus: true,
                    menuProps: { maxHeight: 200 }
                })
            );
        }
    }]);

    return AutocompleteTree;
})(_react2['default'].Component);

var DataSourceLocalSelector = (function (_React$Component2) {
    _inherits(DataSourceLocalSelector, _React$Component2);

    function DataSourceLocalSelector(props) {
        _classCallCheck(this, DataSourceLocalSelector);

        _get(Object.getPrototypeOf(DataSourceLocalSelector.prototype), 'constructor', this).call(this, props);
        this.state = {
            peerAddresses: [],
            invalid: false,
            m: function m(id) {
                return props.pydio.MessageHash['ajxp_admin.ds.editor.' + id] || id;
            }
        };
    }

    _createClass(DataSourceLocalSelector, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this3 = this;

            var api = new _pydioHttpRestApi.ConfigServiceApi(_pydioHttpApi2['default'].getRestClient());
            api.listPeersAddresses().then(function (res) {
                _this3.setState({ peerAddresses: res.PeerAddresses });
            });
        }
    }, {
        key: 'baseIsInvalid',
        value: function baseIsInvalid(path) {
            var m = this.state.m;

            var invalid = false;
            var base = _pydioUtilPath2['default'].getBasename(path);
            var segments = _pydioUtilLang2['default'].trim(path, '/').split('/').length;
            if (segments < 2) {
                invalid = m('selector.error.depth');
            } else if (_pydioUtilLang2['default'].computeStringSlug(base) !== base) {
                invalid = m('selector.error.dnsname');
            }
            console.log(invalid);
            return invalid;
        }
    }, {
        key: 'onPathChange',
        value: function onPathChange(newValue) {
            var model = this.props.model;

            var invalid = this.baseIsInvalid(newValue);
            model.invalid = invalid;
            model.StorageConfiguration.folder = newValue;
            this.setState({ invalid: invalid });
        }
    }, {
        key: 'render',
        value: function render() {
            var model = this.props.model;
            var _state2 = this.state;
            var peerAddresses = _state2.peerAddresses;
            var invalid = _state2.invalid;
            var m = _state2.m;

            return _react2['default'].createElement(
                'div',
                null,
                _react2['default'].createElement(
                    'div',
                    { style: { display: 'flex', alignItems: 'center' } },
                    _react2['default'].createElement(
                        'div',
                        { style: { width: 180, marginRight: 10 } },
                        _react2['default'].createElement(
                            _materialUi.SelectField,
                            {
                                value: model.PeerAddress || '',
                                floatingLabelFixed: true,
                                floatingLabelText: m('selector.peer'),
                                onChange: function (e, i, v) {
                                    model.PeerAddress = v;
                                },
                                fullWidth: true
                            },
                            peerAddresses.map(function (address) {
                                return _react2['default'].createElement(_materialUi.MenuItem, { value: address, primaryText: address });
                            })
                        )
                    ),
                    _react2['default'].createElement(
                        'div',
                        { style: { flex: 1 } },
                        model.PeerAddress && _react2['default'].createElement(AutocompleteTree, {
                            value: model.StorageConfiguration.folder,
                            peerAddress: model.PeerAddress,
                            onChange: this.onPathChange.bind(this),
                            fieldLabel: m('selector.completer')
                        }),
                        !model.PeerAddress && _react2['default'].createElement(_materialUi.TextField, {
                            style: { marginTop: -3 },
                            fullWidth: true,
                            disabled: true,
                            value: model.StorageConfiguration.folder,
                            floatingLabelText: m('selector.folder'),
                            floatingLabelFixed: true,
                            hintText: m('selector.folder.hint')
                        })
                    )
                ),
                invalid && _react2['default'].createElement(
                    'div',
                    { style: { color: '#c62828' } },
                    invalid
                )
            );
        }
    }]);

    return DataSourceLocalSelector;
})(_react2['default'].Component);

exports['default'] = DataSourceLocalSelector;
module.exports = exports['default'];

},{"lodash.debounce":"lodash.debounce","material-ui":"material-ui","pydio/http/api":"pydio/http/api","pydio/http/rest-api":"pydio/http/rest-api","pydio/util/lang":"pydio/util/lang","pydio/util/path":"pydio/util/path","react":"react"}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUi = require('material-ui');

var _pydioHttpRestApi = require('pydio/http/rest-api');

var _pydioUtilLang = require('pydio/util/lang');

var _pydioUtilLang2 = _interopRequireDefault(_pydioUtilLang);

var _modelMetadata = require('../model/Metadata');

var _modelMetadata2 = _interopRequireDefault(_modelMetadata);

var _pydioHttpApi = require('pydio/http/api');

var _pydioHttpApi2 = _interopRequireDefault(_pydioHttpApi);

var MetaNamespace = (function (_React$Component) {
    _inherits(MetaNamespace, _React$Component);

    function MetaNamespace(props) {
        _classCallCheck(this, MetaNamespace);

        _get(Object.getPrototypeOf(MetaNamespace.prototype), 'constructor', this).call(this, props);
        this.state = {
            namespace: this.cloneNs(props.namespace),
            m: function m(id) {
                return props.pydio.MessageHash['ajxp_admin.metadata.' + id];
            }
        };
    }

    _createClass(MetaNamespace, [{
        key: 'cloneNs',
        value: function cloneNs(ns) {
            return _pydioHttpRestApi.IdmUserMetaNamespace.constructFromObject(JSON.parse(JSON.stringify(ns)));
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(props) {
            this.setState({ namespace: this.cloneNs(props.namespace) });
        }
    }, {
        key: 'updateType',
        value: function updateType(value) {
            var namespace = this.state.namespace;

            namespace.JsonDefinition = JSON.stringify({ type: value });
            this.setState({ namespace: namespace });
        }
    }, {
        key: 'updateName',
        value: function updateName(value) {
            var namespace = this.state.namespace;

            var slug = _pydioUtilLang2['default'].computeStringSlug(value);
            if (slug.indexOf('usermeta-') !== 0) {
                slug = 'usermeta-' + slug;
            }
            namespace.Namespace = slug;
            this.setState({ namespace: namespace });
        }
    }, {
        key: 'save',
        value: function save() {
            var _this = this;

            var namespace = this.state.namespace;

            _modelMetadata2['default'].putNS(namespace).then(function () {
                _this.props.onRequestClose();
                _this.props.reloadList();
            });
        }
    }, {
        key: 'getSelectionData',
        value: function getSelectionData() {
            var namespace = this.state.namespace;

            var data = {};
            try {
                var current = JSON.parse(namespace.JsonDefinition).data;
                if (current) {
                    current.split(',').map(function (line) {
                        var _line$split = line.split('|');

                        var _line$split2 = _slicedToArray(_line$split, 2);

                        var key = _line$split2[0];
                        var value = _line$split2[1];

                        data[key] = value;
                    });
                }
            } catch (e) {}
            return data;
        }
    }, {
        key: 'setSelectionData',
        value: function setSelectionData(newData) {
            var namespace = this.state.namespace;

            var def = JSON.parse(namespace.JsonDefinition);

            def.data = Object.keys(newData).map(function (k) {
                return k + '|' + newData[k];
            }).join(',');
            namespace.JsonDefinition = JSON.stringify(def);
            this.setState({ namespace: namespace });
        }
    }, {
        key: 'addSelectionValue',
        value: function addSelectionValue() {
            var data = this.getSelectionData();
            var key = _pydioUtilLang2['default'].computeStringSlug(this.refs.newkey.getValue());
            data[key] = this.refs.newvalue.getValue();
            console.log(data);
            this.setSelectionData(data);
        }
    }, {
        key: 'removeSelectionValue',
        value: function removeSelectionValue(key) {
            var data = this.getSelectionData();
            delete data[key];
            this.setSelectionData(data);
        }
    }, {
        key: 'renderSelectionBoard',
        value: function renderSelectionBoard() {
            var _this2 = this;

            var data = this.getSelectionData();
            var m = this.state.m;

            return _react2['default'].createElement(
                'div',
                { style: { padding: 10, backgroundColor: '#f5f5f5', borderRadius: 2 } },
                _react2['default'].createElement(
                    'div',
                    { style: { fontSize: 13 } },
                    m('editor.selection')
                ),
                _react2['default'].createElement(
                    'div',
                    null,
                    Object.keys(data).map(function (k) {
                        return _react2['default'].createElement(
                            'div',
                            { style: { display: 'flex' } },
                            _react2['default'].createElement(
                                'span',
                                null,
                                _react2['default'].createElement(_materialUi.TextField, { value: k, disabled: true, fullWidth: true })
                            ),
                            _react2['default'].createElement(
                                'span',
                                { style: { marginLeft: 10 } },
                                _react2['default'].createElement(_materialUi.TextField, { value: data[k], disabled: true, fullWidth: true })
                            ),
                            _react2['default'].createElement(
                                'span',
                                null,
                                _react2['default'].createElement(_materialUi.IconButton, { iconClassName: "mdi mdi-delete", onTouchTap: function () {
                                        _this2.removeSelectionValue(k);
                                    } })
                            )
                        );
                    })
                ),
                _react2['default'].createElement(
                    'div',
                    { style: { display: 'flex' } },
                    _react2['default'].createElement(
                        'span',
                        null,
                        _react2['default'].createElement(_materialUi.TextField, { ref: 'newkey', hintText: m('editor.selection.key'), fullWidth: true })
                    ),
                    _react2['default'].createElement(
                        'span',
                        { style: { marginLeft: 10 } },
                        _react2['default'].createElement(_materialUi.TextField, { ref: 'newvalue', hintText: m('editor.selection.value'), fullWidth: true })
                    ),
                    _react2['default'].createElement(
                        'span',
                        null,
                        _react2['default'].createElement(_materialUi.IconButton, { iconClassName: "mdi mdi-plus", onTouchTap: function () {
                                _this2.addSelectionValue();
                            } })
                    )
                )
            );
        }
    }, {
        key: 'togglePolicies',
        value: function togglePolicies(right, value) {
            var _this3 = this;

            var namespace = this.state.namespace;

            var pol = namespace.Policies || [];
            var newPols = pol.filter(function (p) {
                return p.Action !== right;
            });
            newPols.push(_pydioHttpRestApi.ServiceResourcePolicy.constructFromObject({ Action: right, Effect: 'allow', Subject: value ? 'profile:admin' : '*' }));
            namespace.Policies = newPols;
            this.setState({ namespace: namespace }, function () {
                if (right === 'READ' && value) {
                    _this3.togglePolicies('WRITE', true);
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var _props = this.props;
            var create = _props.create;
            var namespaces = _props.namespaces;
            var pydio = _props.pydio;
            var _state = this.state;
            var namespace = _state.namespace;
            var m = _state.m;

            var title = undefined;
            if (namespace.Label) {
                title = namespace.Label;
            } else {
                title = m('editor.title.create');
            }
            var type = 'string';
            if (namespace.JsonDefinition) {
                type = JSON.parse(namespace.JsonDefinition).type;
            }

            var invalid = false,
                nameError = undefined,
                labelError = undefined;
            if (!namespace.Namespace) {
                invalid = true;
                nameError = m('editor.ns.error');
            }
            if (!namespace.Label) {
                invalid = true;
                labelError = m('editor.label.error');
            }
            if (create) {
                if (namespaces.filter(function (n) {
                    return n.Namespace === namespace.Namespace;
                }).length) {
                    invalid = true;
                    nameError = m('editor.ns.exists');
                }
            }
            if (type === 'choice' && Object.keys(this.getSelectionData()).length === 0) {
                invalid = true;
            }

            var adminRead = undefined,
                adminWrite = undefined;
            if (namespace.Policies) {
                namespace.Policies.map(function (p) {
                    if (p.Subject === 'profile:admin' && p.Action === 'READ') {
                        adminRead = true;
                    }
                    if (p.Subject === 'profile:admin' && p.Action === 'WRITE') {
                        adminWrite = true;
                    }
                });
            }

            var actions = [_react2['default'].createElement(_materialUi.FlatButton, { primary: true, label: pydio.MessageHash['54'], onTouchTap: this.props.onRequestClose }), _react2['default'].createElement(_materialUi.FlatButton, { primary: true, disabled: invalid, label: "Save", onTouchTap: function () {
                    _this4.save();
                } })];
            if (type === 'tags') {
                actions.unshift(_react2['default'].createElement(_materialUi.FlatButton, { primary: false, label: m('editor.tags.reset'), onTouchTap: function () {
                        var api = new _pydioHttpRestApi.UserMetaServiceApi(_pydioHttpApi2['default'].getRestClient());
                        api.deleteUserMetaTags(namespace.Namespace, "*").then(function () {
                            pydio.UI.displayMessage('SUCCESS', m('editor.tags.cleared').replace('%s', namespace.Namespace));
                        })['catch'](function (e) {
                            pydio.UI.displayMessage('ERROR', e.message);
                        });
                    } }));
            }

            return _react2['default'].createElement(
                _materialUi.Dialog,
                {
                    title: title,
                    actions: actions,
                    modal: false,
                    contentStyle: { width: 420 },
                    open: this.props.open,
                    onRequestClose: this.props.onRequestClose,
                    autoScrollBodyContent: true
                },
                _react2['default'].createElement(_materialUi.TextField, {
                    floatingLabelText: m('namespace'),
                    disabled: !create,
                    value: namespace.Namespace,
                    onChange: function (e, v) {
                        _this4.updateName(v);
                    },
                    fullWidth: true,
                    errorText: nameError
                }),
                _react2['default'].createElement(_materialUi.TextField, {
                    floatingLabelText: m('label'),
                    value: namespace.Label,
                    onChange: function (e, v) {
                        namespace.Label = v;_this4.setState({ namespace: namespace });
                    },
                    fullWidth: true,
                    errorText: labelError
                }),
                _react2['default'].createElement(_materialUi.TextField, {
                    floatingLabelText: m('order'),
                    value: namespace.Order ? namespace.Order : '0',
                    onChange: function (e, v) {
                        namespace.Order = parseInt(v);_this4.setState({ namespace: namespace });
                    },
                    fullWidth: true,
                    type: "number"
                }),
                _react2['default'].createElement(
                    _materialUi.SelectField,
                    {
                        floatingLabelText: m('type'),
                        value: type,
                        onChange: function (e, i, v) {
                            return _this4.updateType(v);
                        },
                        fullWidth: true },
                    Object.keys(_modelMetadata2['default'].MetaTypes).map(function (k) {
                        return _react2['default'].createElement(_materialUi.MenuItem, { value: k, primaryText: _modelMetadata2['default'].MetaTypes[k] });
                    })
                ),
                type === 'choice' && this.renderSelectionBoard(),
                _react2['default'].createElement(
                    'div',
                    { style: { padding: '20px 0 10px' } },
                    _react2['default'].createElement(_materialUi.Toggle, { label: m('toggle.index'), labelPosition: "left", toggled: namespace.Indexable, onToggle: function (e, v) {
                            namespace.Indexable = v;_this4.setState({ namespace: namespace });
                        } })
                ),
                _react2['default'].createElement(
                    'div',
                    { style: { padding: '20px 0 10px' } },
                    _react2['default'].createElement(_materialUi.Toggle, { label: m('toggle.read'), labelPosition: "left", toggled: adminRead, onToggle: function (e, v) {
                            _this4.togglePolicies('READ', v);
                        } })
                ),
                _react2['default'].createElement(
                    'div',
                    { style: { padding: '20px 0 10px' } },
                    _react2['default'].createElement(_materialUi.Toggle, { label: m('toggle.write'), labelPosition: "left", disabled: adminRead, toggled: adminWrite, onToggle: function (e, v) {
                            _this4.togglePolicies('WRITE', v);
                        } })
                )
            );
        }
    }]);

    return MetaNamespace;
})(_react2['default'].Component);

MetaNamespace.PropTypes = {
    namespace: _react2['default'].PropTypes.instanceOf(_pydioHttpRestApi.IdmUserMetaNamespace).isRequired,
    create: _react2['default'].PropTypes.boolean,
    reloadList: _react2['default'].PropTypes.func,
    onRequestClose: _react2['default'].PropTypes.func
};

exports['default'] = MetaNamespace;
module.exports = exports['default'];

},{"../model/Metadata":19,"material-ui":"material-ui","pydio/http/api":"pydio/http/api","pydio/http/rest-api":"pydio/http/rest-api","pydio/util/lang":"pydio/util/lang","react":"react"}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _pydioHttpResourcesManager = require('pydio/http/resources-manager');

var _pydioHttpResourcesManager2 = _interopRequireDefault(_pydioHttpResourcesManager);

var _materialUi = require('material-ui');

var _pydioHttpRestApi = require('pydio/http/rest-api');

var _pydioHttpApi = require('pydio/http/api');

var _pydioHttpApi2 = _interopRequireDefault(_pydioHttpApi);

var _pydioUtilXml = require('pydio/util/xml');

var _pydioUtilXml2 = _interopRequireDefault(_pydioUtilXml);

var _pydio = require('pydio');

var _pydio2 = _interopRequireDefault(_pydio);

var _VersionPolicyPeriods = require('./VersionPolicyPeriods');

var _VersionPolicyPeriods2 = _interopRequireDefault(_VersionPolicyPeriods);

var PydioForm = _pydio2['default'].requireLib('form');

var _Pydio$requireLib = _pydio2['default'].requireLib('components');

var PaperEditorLayout = _Pydio$requireLib.PaperEditorLayout;

var VersionPolicyEditor = (function (_React$Component) {
    _inherits(VersionPolicyEditor, _React$Component);

    function VersionPolicyEditor(props) {
        _classCallCheck(this, VersionPolicyEditor);

        _get(Object.getPrototypeOf(VersionPolicyEditor.prototype), 'constructor', this).call(this, props);
        this.state = {
            dirty: false,
            policy: props.versionPolicy,
            loaded: true,
            valid: true,
            parameters: null,
            m: function m(id) {
                return props.pydio.MessageHash['ajxp_admin.versions.editor.' + id] || id;
            }
        };
    }

    _createClass(VersionPolicyEditor, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            if (this.state.policy !== newProps.versionPolicy) {
                this.setState({ policy: newProps.versionPolicy });
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this = this;

            _pydioHttpApi2['default'].getRestClient().callApi('/config/discovery/forms/{ServiceName}', 'GET', { ServiceName: 'pydio.grpc.versions' }, {}, {}, {}, null, [], ['application/json'], ['application/json'], "String").then(function (responseAndData) {
                var xmlString = responseAndData.data;
                var domNode = _pydioUtilXml2['default'].parseXml(xmlString);
                _this.setState({
                    parameters: PydioForm.Manager.parseParameters(domNode, "//param"),
                    loaded: true
                });
            });
        }
    }, {
        key: 'resetForm',
        value: function resetForm() {
            this.setState({ valid: true, dirty: false, saveValue: null });
        }
    }, {
        key: 'deleteSource',
        value: function deleteSource() {
            var _this2 = this;

            var m = this.state.m;

            if (confirm(m('delete.confirm'))) {
                _pydioHttpResourcesManager2['default'].loadClass('EnterpriseSDK').then(function (sdk) {
                    var api = new sdk.EnterpriseConfigServiceApi(_pydioHttpApi2['default'].getRestClient());
                    api.deleteVersioningPolicy(_this2.state.policy.Uuid).then(function (r) {
                        _this2.props.closeEditor();
                    });
                });
            }
        }
    }, {
        key: 'saveSource',
        value: function saveSource() {
            var _this3 = this;

            if (this.state.saveValue) {
                (function () {
                    var saveValue = _this3.state.saveValue;

                    _pydioHttpResourcesManager2['default'].loadClass('EnterpriseSDK').then(function (sdk) {
                        var api = new sdk.EnterpriseConfigServiceApi(_pydioHttpApi2['default'].getRestClient());
                        api.putVersioningPolicy(saveValue.Uuid, saveValue).then(function () {
                            _this3.props.reloadList();
                            _this3.setState({
                                dirty: false,
                                policy: saveValue,
                                saveValue: null
                            });
                        });
                    });
                })();
            }
        }
    }, {
        key: 'onFormChange',
        value: function onFormChange(values) {
            var m = this.state.m;

            var newPolicy = VersionPolicyEditor.valuesToTreeVersioningPolicy(values);
            // Check periods
            var periods = newPolicy.KeepPeriods || [];
            var deleteAll = periods.findIndex(function (p) {
                return p.MaxNumber === 0;
            });
            if (deleteAll > -1 && deleteAll < periods.length - 1) {
                pydio.UI.displayMessage('ERROR', m('error.lastdelete'));
                var i = periods.length - 1 - deleteAll;
                while (i > 0) {
                    periods.pop();i--;
                }
            }
            newPolicy.KeepPeriods = periods;
            this.setState({
                saveValue: newPolicy,
                dirty: true
            });
        }
    }, {
        key: 'updateValidStatus',
        value: function updateValidStatus(valid) {
            //this.setState({valid: valid});
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var _props = this.props;
            var create = _props.create;
            var readonly = _props.readonly;
            var pydio = _props.pydio;
            var _state = this.state;
            var loaded = _state.loaded;
            var parameters = _state.parameters;
            var policy = _state.policy;
            var saveValue = _state.saveValue;
            var m = _state.m;

            var form = undefined;
            if (parameters && loaded) {
                var values = VersionPolicyEditor.TreeVersioningPolicyToValues(policy);
                if (saveValue) {
                    values = VersionPolicyEditor.TreeVersioningPolicyToValues(saveValue);
                }
                form = _react2['default'].createElement(PydioForm.FormPanel, {
                    parameters: parameters,
                    values: values,
                    className: 'full-width',
                    onChange: this.onFormChange.bind(this),
                    onValidStatusChange: this.updateValidStatus.bind(this),
                    disabled: readonly,
                    depth: -2
                });
            }

            var titleActionBarButtons = [];
            if (!readonly) {
                if (!create) {
                    titleActionBarButtons.push(PaperEditorLayout.actionButton(m('delete'), 'mdi mdi-delete', function () {
                        _this4.deleteSource();
                    }));
                    titleActionBarButtons.push(PaperEditorLayout.actionButton(this.context.getMessage('plugins.6'), 'mdi mdi-undo', function () {
                        _this4.resetForm();
                    }, !this.state.dirty));
                }
                titleActionBarButtons.push(PaperEditorLayout.actionButton(this.context.getMessage('53', ''), 'mdi mdi-content-save', function () {
                    _this4.saveSource();
                }, !this.state.valid || !this.state.dirty));
            }

            var policyName = saveValue ? saveValue.Name : policy.Name;
            if (!policyName) {
                policyName = '';
            }

            return _react2['default'].createElement(
                PaperEditorLayout,
                {
                    title: loaded && parameters ? m('title').replace('%s', policyName) : pydio.MessageHash['ajxp_admin.home.6'],
                    titleActionBar: titleActionBarButtons,
                    closeAction: this.props.closeEditor,
                    className: 'workspace-editor',
                    contentFill: true
                },
                _react2['default'].createElement(
                    _materialUi.Paper,
                    { zDepth: 1, style: { padding: '0 16px', backgroundColor: '#ECEFF1' } },
                    _react2['default'].createElement(
                        'div',
                        { style: { overflowX: 'auto' } },
                        _react2['default'].createElement(_VersionPolicyPeriods2['default'], { pydio: pydio, periods: saveValue ? saveValue.KeepPeriods : policy.KeepPeriods })
                    )
                ),
                form
            );
        }
    }], [{
        key: 'valuesToTreeVersioningPolicy',
        value: function valuesToTreeVersioningPolicy(values) {
            var periods = [];
            var baseName = "IntervalStart";
            var baseNameMax = "MaxNumber";
            var nextName = baseName;
            var nextMax = baseNameMax;
            var index = 0;
            while (values[nextName] !== undefined && values[nextMax] !== undefined) {
                var period = new _pydioHttpRestApi.TreeVersioningKeepPeriod();
                period.IntervalStart = values[nextName];
                period.MaxNumber = values[nextMax];
                periods.push(period);
                delete values[nextMax];
                delete values[nextName];
                index++;
                nextName = baseName + "_" + index;
                nextMax = baseNameMax + "_" + index;
            }
            values.KeepPeriods = periods;
            return _pydioHttpRestApi.TreeVersioningPolicy.constructFromObject(values);
        }
    }, {
        key: 'TreeVersioningPolicyToValues',
        value: function TreeVersioningPolicyToValues(policy) {
            var values = _extends({}, policy);
            if (values.KeepPeriods) {
                (function () {
                    var i = 0;
                    values.KeepPeriods.map(function (p) {
                        if (i > 0) {
                            values['IntervalStart_' + i] = p.IntervalStart || 0;
                            values['MaxNumber_' + i] = p.MaxNumber || 0;
                        } else {
                            values['IntervalStart'] = p.IntervalStart || 0;
                            values['MaxNumber'] = p.MaxNumber || 0;
                        }
                        i++;
                    });
                })();
            }
            return values;
        }
    }]);

    return VersionPolicyEditor;
})(_react2['default'].Component);

VersionPolicyEditor.contextTypes = {
    messages: _react2['default'].PropTypes.object,
    getMessage: _react2['default'].PropTypes.func
};

exports['default'] = VersionPolicyEditor;
module.exports = exports['default'];

},{"./VersionPolicyPeriods":12,"material-ui":"material-ui","pydio":"pydio","pydio/http/api":"pydio/http/api","pydio/http/resources-manager":"pydio/http/resources-manager","pydio/http/rest-api":"pydio/http/rest-api","pydio/util/xml":"pydio/util/xml","react":"react"}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUi = require('material-ui');

var VersionPolicyPeriods = (function (_React$Component) {
    _inherits(VersionPolicyPeriods, _React$Component);

    function VersionPolicyPeriods() {
        _classCallCheck(this, VersionPolicyPeriods);

        _get(Object.getPrototypeOf(VersionPolicyPeriods.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(VersionPolicyPeriods, [{
        key: 'render',
        value: function render() {
            var _ref = this.props || [];

            var periods = _ref.periods;
            var rendering = _ref.rendering;
            var pydio = _ref.pydio;

            var m = function m(id) {
                return pydio.MessageHash['ajxp_admin.versions.period.' + id] || id;
            };

            if (rendering === 'short') {

                var text = undefined;
                if (periods.length === 1) {
                    var p = periods[0];
                    if (p.MaxNumber === -1) {
                        text = m('keep-all.always');
                    } else {
                        text = m('keep-n').replace('%s', p.MaxNumber);
                    }
                } else {
                    text = m('retentions-n').replace('%s', periods.length);
                    var last = periods[periods.length - 1];
                    if (last.MaxNumber === 0 || last.MaxNumber === undefined) {
                        text += ' ' + m('remove-all-after').replace('%s', last.IntervalStart);
                    } else {
                        text += '' + m('keep-n-after').replace('%1', last.MaxNumber).replace('%2', last.IntervalStart);
                    }
                }

                return _react2['default'].createElement(
                    'span',
                    null,
                    text
                );
            }

            var steps = periods.map(function (p) {
                var label = p.MaxNumber;
                var timeLabel = undefined;
                var icon = _react2['default'].createElement(_materialUi.FontIcon, { className: 'mdi mdi-ray-start-arrow' });
                var style = {};
                if (p.IntervalStart === undefined || p.IntervalStart === "0") {
                    icon = _react2['default'].createElement(_materialUi.FontIcon, { className: 'mdi mdi-clock-start' });
                } else {
                    timeLabel = _react2['default'].createElement(
                        'span',
                        { style: { fontWeight: 500, fontSize: 16 } },
                        p.IntervalStart,
                        ' '
                    );
                }
                if (p.MaxNumber === -1) {
                    label = m('keep-all');
                } else if (!p.MaxNumber) {
                    label = m('remove-all');
                    icon = _react2['default'].createElement(_materialUi.FontIcon, { className: 'mdi mdi-delete', style: { color: '#c62828' } });
                    style = { color: '#c62828' };
                } else {
                    label = m('max-n').replace('%s', label);
                }
                return _react2['default'].createElement(
                    _materialUi.Step,
                    null,
                    _react2['default'].createElement(
                        _materialUi.StepLabel,
                        { icon: icon, style: style },
                        timeLabel,
                        label
                    )
                );
            });

            return _react2['default'].createElement(
                _materialUi.Stepper,
                { activeStep: periods.length - 1, linear: false },
                steps
            );
        }
    }]);

    return VersionPolicyPeriods;
})(_react2['default'].Component);

exports['default'] = VersionPolicyPeriods;
module.exports = exports['default'];

},{"material-ui":"material-ui","react":"react"}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUi = require('material-ui');

var _lodashDebounce = require('lodash.debounce');

var _lodashDebounce2 = _interopRequireDefault(_lodashDebounce);

var _pydioUtilPath = require('pydio/util/path');

var _pydioUtilPath2 = _interopRequireDefault(_pydioUtilPath);

var _pydioHttpRestApi = require("pydio/http/rest-api");

var WsAutoComplete = (function (_React$Component) {
    _inherits(WsAutoComplete, _React$Component);

    function WsAutoComplete(props) {
        _classCallCheck(this, WsAutoComplete);

        _get(Object.getPrototypeOf(WsAutoComplete.prototype), 'constructor', this).call(this, props);
        this.debounced = (0, _lodashDebounce2['default'])(this.loadValues.bind(this), 300);
        this.state = { searchText: props.value, value: props.value };
        console.log(this.state);
    }

    _createClass(WsAutoComplete, [{
        key: 'handleUpdateInput',
        value: function handleUpdateInput(searchText) {
            this.debounced();
            this.setState({ searchText: searchText });
        }
    }, {
        key: 'handleNewRequest',
        value: function handleNewRequest(chosenValue) {
            var key = undefined;
            var chosenNode = undefined;
            var nodes = this.state.nodes;

            if (chosenValue.key === undefined) {
                if (chosenValue === '') {
                    this.props.onChange('');
                }
                key = chosenValue;
                var ok = false;
                nodes.map(function (node) {
                    if (node.Path === key) {
                        chosenNode = node;
                        ok = true;
                    }
                });
                if (!ok) {
                    nodes.map(function (node) {
                        if (node.Path.indexOf(key) === 0) {
                            key = node.Path;
                            chosenNode = node;
                            ok = true;
                        }
                    });
                }
                if (!ok) {
                    return;
                }
            } else {
                key = chosenValue.key;
                chosenNode = chosenValue.node;
            }
            this.setState({ value: key });
            this.props.onChange(key, chosenNode);
            this.loadValues(key);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.lastSearch = null;
            var value = "";
            if (this.props.value) {
                value = this.props.value;
            }
            this.loadValues(value);
        }
    }, {
        key: 'loadValues',
        value: function loadValues() {
            var _this = this;

            var value = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
            var searchText = this.state.searchText;

            var basePath = value;
            if (!value && searchText) {
                var last = searchText.lastIndexOf('/');
                basePath = searchText.substr(0, last);
            }
            if (this.lastSearch !== null && this.lastSearch === basePath) {
                return;
            }
            this.lastSearch = basePath;

            var api = new _pydioHttpRestApi.AdminTreeServiceApi(PydioApi.getRestClient());
            var listRequest = new _pydioHttpRestApi.TreeListNodesRequest();
            var treeNode = new _pydioHttpRestApi.TreeNode();
            treeNode.Path = basePath;
            listRequest.Node = treeNode;
            this.setState({ loading: true });
            api.listAdminTree(listRequest).then(function (nodesColl) {
                _this.setState({ nodes: nodesColl.Children || [], loading: false });
            })['catch'](function () {
                _this.setState({ loading: false });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props;
            var onDelete = _props.onDelete;
            var skipTemplates = _props.skipTemplates;
            var label = _props.label;
            var zDepth = _props.zDepth;
            var pydio = _props.pydio;

            var m = function m(id) {
                return pydio.MessageHash['ajxp_admin.' + id] || id;
            };
            var _state = this.state;
            var nodes = _state.nodes;
            var loading = _state.loading;

            var dataSource = [];
            if (nodes) {
                (function () {
                    var categs = {};
                    nodes.forEach(function (node) {
                        if (node.MetaStore && node.MetaStore["resolution"] && node.Uuid === "cells") {
                            // Skip "Cells" Template Path
                            return;
                        } else if (_pydioUtilPath2['default'].getBasename(node.Path).startsWith(".")) {
                            // Skip hidden files
                            return;
                        }
                        var data = WsAutoComplete.renderNode(node, m);
                        if (!categs[data.categ]) {
                            categs[data.categ] = [];
                        }
                        categs[data.categ].push(data);
                    });
                    if (Object.keys(categs).length > 1) {
                        dataSource.push({ key: "h1", text: '', value: _react2['default'].createElement(_materialUi.MenuItem, { primaryText: m('ws.complete.datasources'), style: { fontSize: 13, fontWeight: 500 }, disabled: true }) });
                        var dValues = categs[Object.keys(categs)[0]];
                        dValues.sort(LangUtils.arraySorter("text"));
                        dataSource.push.apply(dataSource, _toConsumableArray(dValues));
                        if (!skipTemplates) {
                            dataSource.push({ key: "h2", text: '', value: _react2['default'].createElement(_materialUi.MenuItem, { primaryText: m('ws.complete.templates'), style: { fontSize: 13, fontWeight: 500 }, disabled: true }) });
                            var tValues = categs[Object.keys(categs)[1]];
                            tValues.sort(LangUtils.arraySorter("text"));
                            dataSource.push.apply(dataSource, _toConsumableArray(tValues));
                        }
                    } else if (Object.keys(categs).length === 1) {
                        dataSource.push.apply(dataSource, _toConsumableArray(categs[Object.keys(categs)[0]]));
                    }
                })();
            }

            var displayText = this.state.value;
            var depth = 0;
            if (zDepth !== undefined) {
                depth = zDepth;
            }

            return _react2['default'].createElement(
                _materialUi.Paper,
                { zDepth: depth, style: _extends({ display: 'flex', alignItems: 'baseline', margin: '10px 0 0 -8px', padding: '0 8px 10px', backgroundColor: '#fafafa' }, this.props.style) },
                _react2['default'].createElement(
                    'div',
                    { style: { position: 'relative', flex: 1, marginTop: -5 } },
                    _react2['default'].createElement(
                        'div',
                        { style: { position: 'absolute', right: 0, top: 30, width: 30 } },
                        _react2['default'].createElement(_materialUi.RefreshIndicator, {
                            size: 30,
                            left: 0,
                            top: 0,
                            status: loading ? "loading" : "hide"
                        })
                    ),
                    _react2['default'].createElement(_materialUi.AutoComplete, {
                        fullWidth: true,
                        searchText: displayText,
                        onUpdateInput: this.handleUpdateInput.bind(this),
                        onNewRequest: this.handleNewRequest.bind(this),
                        dataSource: dataSource,
                        floatingLabelText: label || m('ws.complete.label'),
                        floatingLabelStyle: { whiteSpace: 'nowrap' },
                        floatingLabelFixed: true,
                        filter: function (searchText, key) {
                            return key.toLowerCase().indexOf(searchText.toLowerCase()) === 0;
                        },
                        openOnFocus: true,
                        menuProps: { maxHeight: 200 }
                    })
                ),
                onDelete && _react2['default'].createElement(_materialUi.IconButton, { iconClassName: "mdi mdi-delete", onTouchTap: onDelete })
            );
        }
    }], [{
        key: 'renderNode',
        value: function renderNode(node, m) {
            var label = _react2['default'].createElement(
                'span',
                null,
                node.Path
            );
            var icon = "mdi mdi-folder";
            var categ = "folder";
            if (node.MetaStore && node.MetaStore["resolution"]) {
                icon = "mdi mdi-file-tree";
                categ = "templatePath";
                var resolutionPart = node.MetaStore["resolution"].split("\n").pop();
                label = _react2['default'].createElement(
                    'span',
                    null,
                    node.Path,
                    ' ',
                    _react2['default'].createElement(
                        'i',
                        { style: { color: '#9e9e9e' } },
                        '- ',
                        m('ws.complete.resolves'),
                        ' ',
                        resolutionPart
                    )
                );
            } else if (node.Type === 'LEAF') {
                icon = "mdi mdi-file";
            }
            return {
                key: node.Path,
                text: node.Path,
                node: node,
                categ: categ,
                value: _react2['default'].createElement(
                    _materialUi.MenuItem,
                    null,
                    _react2['default'].createElement(_materialUi.FontIcon, { className: icon, color: '#607d8b', style: { float: 'left', marginRight: 8 } }),
                    ' ',
                    label
                )
            };
        }
    }]);

    return WsAutoComplete;
})(_react2['default'].Component);

exports['default'] = WsAutoComplete;
module.exports = exports['default'];

},{"lodash.debounce":"lodash.debounce","material-ui":"material-ui","pydio/http/rest-api":"pydio/http/rest-api","pydio/util/path":"pydio/util/path","react":"react"}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _pydio = require('pydio');

var _pydio2 = _interopRequireDefault(_pydio);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUi = require('material-ui');

var _modelWs = require('../model/Ws');

var _modelWs2 = _interopRequireDefault(_modelWs);

var _WsAutoComplete = require('./WsAutoComplete');

var _WsAutoComplete2 = _interopRequireDefault(_WsAutoComplete);

var _Pydio$requireLib = _pydio2['default'].requireLib('components');

var PaperEditorLayout = _Pydio$requireLib.PaperEditorLayout;

var WsEditor = (function (_React$Component) {
    _inherits(WsEditor, _React$Component);

    function WsEditor(props) {
        var _this = this;

        _classCallCheck(this, WsEditor);

        _get(Object.getPrototypeOf(WsEditor.prototype), 'constructor', this).call(this, props);
        var workspace = new _modelWs2['default'](props.workspace);
        workspace.observe('update', function () {
            _this.forceUpdate();
        });
        this.state = {
            workspace: workspace.getModel(),
            container: workspace,
            newFolderKey: Math.random()
        };
    }

    _createClass(WsEditor, [{
        key: 'revert',
        value: function revert() {
            var _this2 = this;

            var container = this.state.container;

            container.revert();
            this.setState({ workspace: container.getModel() }, function () {
                _this2.forceUpdate();
            });
        }
    }, {
        key: 'save',
        value: function save() {
            var _this3 = this;

            var container = this.state.container;
            var _props = this.props;
            var reloadList = _props.reloadList;
            var closeEditor = _props.closeEditor;

            this.setState({ saving: true });
            var create = container.create;

            container.save().then(function () {
                reloadList();
                _this3.setState({
                    workspace: container.getModel(),
                    saving: false }, function () {
                    _this3.forceUpdate();
                });
                if (create) {
                    closeEditor();
                }
            })['catch'](function () {
                _this3.setState({ saving: false });
            });
        }
    }, {
        key: 'remove',
        value: function remove() {
            var container = this.state.container;
            var _props2 = this.props;
            var closeEditor = _props2.closeEditor;
            var reloadList = _props2.reloadList;
            var pydio = _props2.pydio;

            if (confirm(pydio.MessageHash['settings.35'])) {
                container.remove().then(function () {
                    reloadList();
                    closeEditor();
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var _props3 = this.props;
            var closeEditor = _props3.closeEditor;
            var pydio = _props3.pydio;
            var _state = this.state;
            var workspace = _state.workspace;
            var container = _state.container;
            var newFolderKey = _state.newFolderKey;
            var saving = _state.saving;

            var m = function m(id) {
                return pydio.MessageHash['ajxp_admin.' + id] || id;
            };
            var mS = function mS(id) {
                return pydio.MessageHash['settings.' + id] || id;
            };

            var buttons = [];
            if (!container.create) {
                buttons.push(PaperEditorLayout.actionButton(m('plugins.6'), "mdi mdi-undo", function () {
                    _this4.revert();
                }, !container.isDirty()));
            }
            buttons.push(PaperEditorLayout.actionButton(pydio.MessageHash['53'], "mdi mdi-content-save", function () {
                _this4.save();
            }, saving || !(container.isDirty() && container.isValid())));

            var delButton = undefined;
            if (!container.create) {
                delButton = _react2['default'].createElement(
                    'div',
                    { style: { padding: 16, textAlign: 'center' } },
                    m('ws.editor.help.delete'),
                    _react2['default'].createElement('br', null),
                    _react2['default'].createElement('br', null),
                    _react2['default'].createElement(_materialUi.RaisedButton, { secondary: true, label: m('ws.23'), onTouchTap: function () {
                            _this4.remove();
                        } })
                );
            }
            var leftNav = _react2['default'].createElement(
                'div',
                null,
                _react2['default'].createElement(
                    'div',
                    { style: { padding: 16, color: '#9e9e9e' } },
                    _react2['default'].createElement(
                        'div',
                        { style: { fontSize: 120, textAlign: 'center', paddingBottom: 10 } },
                        _react2['default'].createElement('i', { className: "mdi mdi-folder-open" })
                    ),
                    m('ws.editor.help.1'),
                    _react2['default'].createElement('br', null),
                    _react2['default'].createElement('br', null),
                    m('ws.editor.help.2')
                ),
                delButton && _react2['default'].createElement(_materialUi.Divider, null),
                delButton
            );

            var styles = {
                title: {
                    fontSize: 20,
                    paddingTop: 20,
                    marginBottom: 0
                },
                legend: { color: '#9E9E9E', paddingTop: 10 },
                section: { padding: '0 20px 20px' },
                toggleDiv: { height: 50, display: 'flex', alignItems: 'flex-end' }
            };

            var roots = workspace.RootNodes;
            var completers = Object.keys(roots).map(function (k) {
                var label = m('ws.editor.path.folder');
                if (_modelWs2['default'].rootIsTemplatePath(roots[k])) {
                    label = m('ws.editor.path.template');
                }
                return _react2['default'].createElement(_WsAutoComplete2['default'], {
                    key: roots[k].Uuid,
                    pydio: pydio,
                    label: label,
                    value: roots[k].Path,
                    onDelete: function () {
                        delete roots[k];_this4.forceUpdate();
                    },
                    onChange: function (key, node) {
                        delete roots[k];
                        if (key !== '') {
                            roots[node.Uuid] = node;
                        }
                    },
                    skipTemplates: container.hasFolderRoots()
                });
            });
            if (!container.hasTemplatePath()) {
                completers.push(_react2['default'].createElement(_WsAutoComplete2['default'], {
                    key: newFolderKey,
                    pydio: pydio,
                    value: "",
                    onChange: function (k, node) {
                        if (node) {
                            roots[node.Uuid] = node;_this4.setState({ newFolderKey: Math.random() });
                        }
                    },
                    skipTemplates: container.hasFolderRoots()
                }));
            }

            return _react2['default'].createElement(
                PaperEditorLayout,
                {
                    title: workspace.Label || mS('90'),
                    titleActionBar: buttons,
                    closeAction: closeEditor,
                    leftNav: leftNav,
                    className: 'workspace-editor',
                    contentFill: false
                },
                _react2['default'].createElement(
                    'div',
                    { style: styles.section },
                    _react2['default'].createElement(
                        'div',
                        { style: styles.title },
                        m('ws.30')
                    ),
                    _react2['default'].createElement(
                        'div',
                        { style: styles.legend },
                        m('ws.editor.options.legend')
                    ),
                    _react2['default'].createElement(_materialUi.TextField, { fullWidth: true, floatingLabelFixed: true,
                        errorText: workspace.Label ? "" : m('ws.editor.label.legend'),
                        floatingLabelText: mS('8'),
                        value: workspace.Label, onChange: function (e, v) {
                            workspace.Label = v;
                        }
                    }),
                    _react2['default'].createElement(_materialUi.TextField, { fullWidth: true, floatingLabelFixed: true,
                        errorText: workspace.Label && !workspace.Slug ? m('ws.editor.slug.legend') : "",
                        floatingLabelText: m('ws.5'),
                        value: workspace.Slug,
                        onChange: function (e, v) {
                            workspace.Slug = v;
                        }
                    }),
                    _react2['default'].createElement(_materialUi.TextField, { fullWidth: true, floatingLabelFixed: true,
                        floatingLabelText: m("ws.editor.description"),
                        value: workspace.Description, onChange: function (e, v) {
                            workspace.Description = v;
                        } })
                ),
                _react2['default'].createElement(_materialUi.Divider, null),
                _react2['default'].createElement(
                    'div',
                    { style: styles.section },
                    _react2['default'].createElement(
                        'div',
                        { style: styles.title },
                        m('ws.editor.data.title')
                    ),
                    _react2['default'].createElement(
                        'div',
                        { style: styles.legend },
                        m('ws.editor.data.legend')
                    ),
                    completers,
                    _react2['default'].createElement(
                        'div',
                        { style: styles.legend },
                        m('ws.editor.default_rights')
                    ),
                    _react2['default'].createElement(
                        _materialUi.SelectField,
                        {
                            fullWidth: true,
                            value: workspace.Attributes['DEFAULT_RIGHTS'],
                            onChange: function (e, i, v) {
                                workspace.Attributes['DEFAULT_RIGHTS'] = v;
                            }
                        },
                        _react2['default'].createElement(_materialUi.MenuItem, { primaryText: m('ws.editor.default_rights.none'), value: "" }),
                        _react2['default'].createElement(_materialUi.MenuItem, { primaryText: m('ws.editor.default_rights.read'), value: "r" }),
                        _react2['default'].createElement(_materialUi.MenuItem, { primaryText: m('ws.editor.default_rights.readwrite'), value: "rw" }),
                        _react2['default'].createElement(_materialUi.MenuItem, { primaryText: m('ws.editor.default_rights.write'), value: "w" })
                    )
                ),
                _react2['default'].createElement(_materialUi.Divider, null),
                _react2['default'].createElement(
                    'div',
                    { style: styles.section },
                    _react2['default'].createElement(
                        'div',
                        { style: styles.title },
                        m('ws.editor.other')
                    ),
                    _react2['default'].createElement(
                        'div',
                        { style: styles.toggleDiv },
                        _react2['default'].createElement(_materialUi.Toggle, { label: m('ws.editor.other.sync'), toggled: workspace.Attributes['ALLOW_SYNC'], onToggle: function (e, v) {
                                workspace.Attributes['ALLOW_SYNC'] = v;
                            } })
                    ),
                    _react2['default'].createElement(
                        _materialUi.SelectField,
                        { fullWidth: true, floatingLabelFixed: true, floatingLabelText: m('ws.editor.other.layout'), value: workspace.Attributes['META_LAYOUT'] || "", onChange: function (e, i, v) {
                                workspace.Attributes['META_LAYOUT'] = v;
                            } },
                        _react2['default'].createElement(_materialUi.MenuItem, { primaryText: m('ws.editor.other.layout.default'), value: "" }),
                        _react2['default'].createElement(_materialUi.MenuItem, { primaryText: m('ws.editor.other.layout.easy'), value: "meta.layout_sendfile" })
                    )
                )
            );
        }
    }]);

    return WsEditor;
})(_react2['default'].Component);

exports['default'] = WsEditor;
module.exports = exports['default'];

},{"../model/Ws":21,"./WsAutoComplete":13,"material-ui":"material-ui","pydio":"pydio","react":"react"}],15:[function(require,module,exports){
/*
 * Copyright 2007-2017 Charles du Jeu - Abstrium SAS <team (at) pyd.io>
 * This file is part of Pydio.
 *
 * Pydio is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Pydio is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Pydio.  If not, see <http://www.gnu.org/licenses/>.
 *
 * The latest code can be found at <https://pydio.com>.
 */

'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _metaMetaSourceForm = require('./meta/MetaSourceForm');

var _metaMetaSourceForm2 = _interopRequireDefault(_metaMetaSourceForm);

var _boardWsDashboard = require('./board/WsDashboard');

var _boardWsDashboard2 = _interopRequireDefault(_boardWsDashboard);

var _metaMetaList = require('./meta/MetaList');

var _metaMetaList2 = _interopRequireDefault(_metaMetaList);

var _boardVirtualNodes = require('./board/VirtualNodes');

var _boardVirtualNodes2 = _interopRequireDefault(_boardVirtualNodes);

var _boardDataSourcesBoard = require('./board/DataSourcesBoard');

var _boardDataSourcesBoard2 = _interopRequireDefault(_boardDataSourcesBoard);

var _boardMetadataBoard = require('./board/MetadataBoard');

var _boardMetadataBoard2 = _interopRequireDefault(_boardMetadataBoard);

var _editorDataSourceEditor = require('./editor/DataSourceEditor');

var _editorDataSourceEditor2 = _interopRequireDefault(_editorDataSourceEditor);

var _modelWs = require('./model/Ws');

var _modelWs2 = _interopRequireDefault(_modelWs);

var _editorWsAutoComplete = require('./editor/WsAutoComplete');

var _editorWsAutoComplete2 = _interopRequireDefault(_editorWsAutoComplete);

var _virtualNodeCard = require('./virtual/NodeCard');

var _virtualNodeCard2 = _interopRequireDefault(_virtualNodeCard);

var _modelVirtualNode = require('./model/VirtualNode');

var _modelVirtualNode2 = _interopRequireDefault(_modelVirtualNode);

window.AdminWorkspaces = {
  MetaSourceForm: _metaMetaSourceForm2['default'],
  MetaList: _metaMetaList2['default'],
  VirtualNodes: _boardVirtualNodes2['default'],
  WsDashboard: _boardWsDashboard2['default'],
  DataSourcesBoard: _boardDataSourcesBoard2['default'],
  MetadataBoard: _boardMetadataBoard2['default'],
  DataSourceEditor: _editorDataSourceEditor2['default'],
  WsAutoComplete: _editorWsAutoComplete2['default'],
  TemplatePathEditor: _virtualNodeCard2['default'],
  TemplatePath: _modelVirtualNode2['default'],
  Workspace: _modelWs2['default']
};

},{"./board/DataSourcesBoard":2,"./board/MetadataBoard":4,"./board/VirtualNodes":5,"./board/WsDashboard":7,"./editor/DataSourceEditor":8,"./editor/WsAutoComplete":13,"./meta/MetaList":16,"./meta/MetaSourceForm":17,"./model/VirtualNode":20,"./model/Ws":21,"./virtual/NodeCard":22}],16:[function(require,module,exports){
/*
 * Copyright 2007-2017 Charles du Jeu - Abstrium SAS <team (at) pyd.io>
 * This file is part of Pydio.
 *
 * Pydio is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Pydio is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Pydio.  If not, see <http://www.gnu.org/licenses/>.
 *
 * The latest code can be found at <https://pydio.com>.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUi = require('material-ui');

exports['default'] = _react2['default'].createClass({
    displayName: 'MetaList',

    mixins: [AdminComponents.MessagesConsumerMixin],

    propTypes: {
        currentMetas: _react2['default'].PropTypes.object,
        edit: _react2['default'].PropTypes.string,
        metaSourceProvider: _react2['default'].PropTypes.object,
        closeCurrent: _react2['default'].PropTypes.func,
        setEditState: _react2['default'].PropTypes.func,
        featuresEditable: _react2['default'].PropTypes.bool
    },

    render: function render() {
        var features = [];
        var metas = Object.keys(this.props.currentMetas);
        metas.sort(function (k1, k2) {
            var type1 = k1.split('.').shift();
            var type2 = k2.split('.').shift();
            if (type1 == 'metastore' || type2 == 'index') return -1;
            if (type1 == 'index' || type2 == 'metastore') return 1;
            return k1 > k2 ? 1 : -1;
        });
        if (metas) {
            features = metas.map((function (k) {
                var removeButton, description;
                if (this.props.edit == k && this.props.featuresEditable) {
                    var remove = (function (event) {
                        event.stopPropagation();
                        this.props.metaSourceProvider.removeMetaSource(k);
                    }).bind(this);
                    removeButton = _react2['default'].createElement(
                        'div',
                        { style: { textAlign: 'right' } },
                        _react2['default'].createElement(_materialUi.FlatButton, { label: this.context.getMessage('ws.31'), primary: true, onTouchTap: remove })
                    );
                }
                description = _react2['default'].createElement(
                    'div',
                    { className: 'legend' },
                    this.props.metaSourceProvider.getMetaSourceDescription(k)
                );
                return _react2['default'].createElement(
                    PydioComponents.PaperEditorNavEntry,
                    { key: k, keyName: k, selectedKey: this.props.edit, onClick: this.props.setEditState },
                    this.props.metaSourceProvider.getMetaSourceLabel(k),
                    description,
                    removeButton
                );
            }).bind(this));
        }
        if (this.props.featuresEditable) {
            features.push(_react2['default'].createElement(
                'div',
                { className: 'menu-entry', key: 'add-feature', onClick: this.props.metaSourceProvider.showMetaSourceForm.bind(this.props.metaSourceProvider) },
                '+ ',
                this.context.getMessage('ws.32')
            ));
        }

        return _react2['default'].createElement(
            'div',
            null,
            features
        );
    }

});
module.exports = exports['default'];

},{"material-ui":"material-ui","react":"react"}],17:[function(require,module,exports){
/*
 * Copyright 2007-2017 Charles du Jeu - Abstrium SAS <team (at) pyd.io>
 * This file is part of Pydio.
 *
 * Pydio is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Pydio is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Pydio.  If not, see <http://www.gnu.org/licenses/>.
 *
 * The latest code can be found at <https://pydio.com>.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var React = require('react');

var _require = require('material-ui');

var MenuItem = _require.MenuItem;
var SelectField = _require.SelectField;

var _require$requireLib = require('pydio').requireLib('boot');

var ActionDialogMixin = _require$requireLib.ActionDialogMixin;
var CancelButtonProviderMixin = _require$requireLib.CancelButtonProviderMixin;
var SubmitButtonProviderMixin = _require$requireLib.SubmitButtonProviderMixin;
var _AdminComponents = AdminComponents;
var MessagesConsumerMixin = _AdminComponents.MessagesConsumerMixin;

var MetaSourceForm = React.createClass({
    displayName: 'MetaSourceForm',

    mixins: [MessagesConsumerMixin, ActionDialogMixin, CancelButtonProviderMixin, SubmitButtonProviderMixin],

    propTypes: {
        model: React.PropTypes.object,
        editor: React.PropTypes.object,
        modalData: React.PropTypes.object
    },

    getDefaultProps: function getDefaultProps() {
        return {
            dialogTitleId: 'ajxp_admin.ws.46',
            dialogSize: 'sm'
        };
    },

    getInitialState: function getInitialState() {
        return { step: 'chooser' };
    },

    setModal: function setModal(pydioModal) {
        this.setState({ modal: pydioModal });
    },

    submit: function submit() {
        if (this.state.pluginId && this.state.pluginId !== -1) {
            this.dismiss();
            this.props.editor.addMetaSource(this.state.pluginId);
        }
    },

    render: function render() {
        var model = this.props.model;
        var currentMetas = model.getOption("META_SOURCES", true);
        var allMetas = model.getAllMetaSources();

        var menuItems = [];
        allMetas.map(function (metaSource) {
            var id = metaSource['id'];
            var type = id.split('.').shift();
            if (type == 'metastore' || type == 'index') {
                var already = false;
                Object.keys(currentMetas).map(function (metaKey) {
                    if (metaKey.indexOf(type) === 0) already = true;
                });
                if (already) return;
            } else {
                if (currentMetas[id]) return;
            }
            menuItems.push(React.createElement(MenuItem, { value: metaSource['id'], primaryText: metaSource['label'] }));
        });
        var change = (function (event, index, value) {
            if (value !== -1) {
                this.setState({ pluginId: value });
            }
        }).bind(this);
        return React.createElement(
            'div',
            { style: { width: '100%' } },
            React.createElement(
                SelectField,
                { value: this.state.pluginId, fullWidth: true, onChange: change },
                menuItems
            )
        );
    }

});

exports['default'] = MetaSourceForm;
module.exports = exports['default'];

},{"material-ui":"material-ui","pydio":"pydio","react":"react"}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _pydioUtilLang = require('pydio/util/lang');

var _pydioUtilLang2 = _interopRequireDefault(_pydioUtilLang);

var _pydioHttpRestApi = require('pydio/http/rest-api');

var Observable = require('pydio/lang/observable');
var PydioApi = require('pydio/http/api');

var DataSource = (function (_Observable) {
    _inherits(DataSource, _Observable);

    _createClass(DataSource, [{
        key: 'buildProxy',
        value: function buildProxy(object) {
            var _this = this;

            return new Proxy(object, {
                set: function set(target, p, value) {
                    var val = value;
                    if (p === 'StorageType') {
                        target['StorageConfiguration'] = {};
                        if (val === 'LOCAL') {
                            target['StorageConfiguration'] = { "folder": "", "normalize": "false" };
                        } else if (val === 'S3') {
                            target['StorageConfiguration'] = { "customEndpoint": "" };
                        } else if (val === 'GCS') {
                            target['StorageConfiguration'] = { "jsonCredentials": "" };
                        }
                        _this.internalInvalid = false;
                        target['ApiKey'] = target['ApiSecret'] = ''; // reset values
                    } else if (p === 'Name') {
                            val = _pydioUtilLang2['default'].computeStringSlug(val).replace("-", "").substr(0, 50);
                        } else if (p === 'folder') {
                            if (val[0] !== '/') {
                                val = '/' + val;
                            }
                        } else if (p === 'invalid') {
                            _this.internalInvalid = value;
                            _this.notify('update');
                            return true;
                        }
                    target[p] = val;
                    _this.notify('update');
                    return true;
                },
                get: function get(target, p) {
                    var out = target[p];
                    if (out instanceof Array) {
                        return out;
                    } else if (out instanceof Object) {
                        return _this.buildProxy(out);
                    } else if (p === 'StorageType') {
                        return out || 'LOCAL';
                    } else {
                        return out;
                    }
                }
            });
        }
    }]);

    function DataSource(model) {
        _classCallCheck(this, DataSource);

        _get(Object.getPrototypeOf(DataSource.prototype), 'constructor', this).call(this);
        this.internalInvalid = false;
        if (model) {
            this.model = model;
            if (!model.StorageConfiguration) {
                model.StorageConfiguration = {};
            }
            this.snapshot = JSON.parse(JSON.stringify(model));
        } else {
            this.model = new _pydioHttpRestApi.ObjectDataSource();
            this.model.EncryptionMode = _pydioHttpRestApi.ObjectEncryptionMode.constructFromObject('CLEAR');
            this.model.StorageType = _pydioHttpRestApi.ObjectStorageType.constructFromObject('LOCAL');
            this.model.StorageConfiguration = { "folder": "", "normalize": "false" };
        }
        this.observableModel = this.buildProxy(this.model);
    }

    /**
     * @return {ObjectDataSource}
     */

    _createClass(DataSource, [{
        key: 'getModel',
        value: function getModel() {
            return this.observableModel;
        }
    }, {
        key: 'isValid',
        value: function isValid() {
            if (this.internalInvalid) {
                return false;
            }
            if (this.model.StorageType === 'S3' || this.model.StorageType === 'AZURE') {
                return this.model.ApiKey && this.model.ApiSecret && this.model.Name && this.model.ObjectsBucket;
            } else if (this.model.StorageType === 'GCS') {
                return this.model.Name && this.model.ObjectsBucket && this.model.StorageConfiguration && this.model.StorageConfiguration['jsonCredentials'];
            } else {
                return this.model.Name && this.model.StorageConfiguration && this.model.StorageConfiguration['folder'];
            }
        }
    }, {
        key: 'deleteSource',
        value: function deleteSource() {
            var api = new _pydioHttpRestApi.ConfigServiceApi(PydioApi.getRestClient());
            return api.deleteDataSource(this.model.Name);
        }
    }, {
        key: 'resyncSource',
        value: function resyncSource() {
            var api = new _pydioHttpRestApi.JobsServiceApi(PydioApi.getRestClient());
            var req = new _pydioHttpRestApi.RestUserJobRequest();
            req.JobName = "datasource-resync";
            req.JsonParameters = JSON.stringify({ dsName: this.model.Name });
            return api.userCreateJob("datasource-resync", req);
        }
    }, {
        key: 'revert',
        value: function revert() {
            this.model = this.snapshot;
            this.observableModel = this.buildProxy(this.model);
            this.snapshot = JSON.parse(JSON.stringify(this.model));
            return this.observableModel;
        }
    }, {
        key: 'saveSource',
        value: function saveSource() {
            var _this2 = this;

            var api = new _pydioHttpRestApi.ConfigServiceApi(PydioApi.getRestClient());
            return api.putDataSource(this.model.Name, this.model).then(function (res) {
                _this2.snapshot = JSON.parse(JSON.stringify(_this2.model));
                _this2.notify('update');
            });
        }
    }, {
        key: 'stripPrefix',
        value: function stripPrefix(data) {
            var prefix = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

            if (!prefix) {
                return data;
            }
            var obj = {};
            Object.keys(data).map(function (k) {
                obj[k.replace(prefix, '')] = data[k];
            });
            return obj;
        }
    }, {
        key: 'getDataWithPrefix',
        value: function getDataWithPrefix() {
            var _this3 = this;

            var prefix = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

            if (prefix === '') {
                return this.model;
            }
            var data = {};
            Object.keys(this.model).forEach(function (k) {
                data[prefix + k] = _this3.model[k];
                if (k === 'EncryptionMode' && !_this3.model[k]) {
                    data[prefix + k] = 'CLEAR';
                }
            });
            return data;
        }
    }], [{
        key: 'loadDatasources',
        value: function loadDatasources() {
            var api = new _pydioHttpRestApi.ConfigServiceApi(PydioApi.getRestClient());
            return api.listDataSources();
        }
    }, {
        key: 'loadVersioningPolicies',
        value: function loadVersioningPolicies() {
            var api = new _pydioHttpRestApi.ConfigServiceApi(PydioApi.getRestClient());
            return api.listVersioningPolicies();
        }
    }, {
        key: 'loadStatuses',
        value: function loadStatuses() {
            var api = new _pydioHttpRestApi.ConfigServiceApi(PydioApi.getRestClient());
            return api.listServices('STARTED');
        }
    }, {
        key: 'loadEncryptionKeys',
        value: function loadEncryptionKeys() {
            var api = new _pydioHttpRestApi.ConfigServiceApi(PydioApi.getRestClient());
            return api.listEncryptionKeys(new _pydioHttpRestApi.EncryptionAdminListKeysRequest());
        }
    }]);

    return DataSource;
})(Observable);

exports['default'] = DataSource;
module.exports = exports['default'];

},{"pydio/http/api":"pydio/http/api","pydio/http/rest-api":"pydio/http/rest-api","pydio/lang/observable":"pydio/lang/observable","pydio/util/lang":"pydio/util/lang"}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _pydioHttpApi = require('pydio/http/api');

var _pydioHttpApi2 = _interopRequireDefault(_pydioHttpApi);

var _pydioHttpResourcesManager = require('pydio/http/resources-manager');

var _pydioHttpResourcesManager2 = _interopRequireDefault(_pydioHttpResourcesManager);

var _pydioHttpRestApi = require('pydio/http/rest-api');

var Metadata = (function () {
    function Metadata() {
        _classCallCheck(this, Metadata);
    }

    _createClass(Metadata, null, [{
        key: 'loadNamespaces',
        value: function loadNamespaces() {
            var api = new _pydioHttpRestApi.UserMetaServiceApi(_pydioHttpApi2['default'].getRestClient());
            return api.listUserMetaNamespace();
        }

        /**
         * @param namespace {IdmUserMetaNamespace}
         * @return {Promise}
         */
    }, {
        key: 'putNS',
        value: function putNS(namespace) {
            var api = new _pydioHttpRestApi.UserMetaServiceApi(_pydioHttpApi2['default'].getRestClient());
            var request = new _pydioHttpRestApi.IdmUpdateUserMetaNamespaceRequest();
            request.Operation = _pydioHttpRestApi.UpdateUserMetaNamespaceRequestUserMetaNsOp.constructFromObject('PUT');
            request.Namespaces = [namespace];
            Metadata.clearLocalCache();
            return api.updateUserMetaNamespace(request);
        }

        /**
         * @param namespace {IdmUserMetaNamespace}
         * @return {Promise}
         */
    }, {
        key: 'deleteNS',
        value: function deleteNS(namespace) {
            var api = new _pydioHttpRestApi.UserMetaServiceApi(_pydioHttpApi2['default'].getRestClient());
            var request = new _pydioHttpRestApi.IdmUpdateUserMetaNamespaceRequest();
            request.Operation = _pydioHttpRestApi.UpdateUserMetaNamespaceRequestUserMetaNsOp.constructFromObject('DELETE');
            request.Namespaces = [namespace];
            Metadata.clearLocalCache();
            return api.updateUserMetaNamespace(request);
        }

        /**
         * Clear ReactMeta cache if it exists
         */
    }, {
        key: 'clearLocalCache',
        value: function clearLocalCache() {
            try {
                if (window.ReactMeta) {
                    ReactMeta.Renderer.getClient().clearConfigs();
                }
            } catch (e) {
                //console.log(e)
            }
        }
    }]);

    return Metadata;
})();

Metadata.MetaTypes = {
    "string": "Text",
    "textarea": "Long Text",
    "stars_rate": "Stars Rating",
    "css_label": "Color Labels",
    "tags": "Extensible Tags",
    "choice": "Selection"
};

exports['default'] = Metadata;
module.exports = exports['default'];

},{"pydio/http/api":"pydio/http/api","pydio/http/resources-manager":"pydio/http/resources-manager","pydio/http/rest-api":"pydio/http/rest-api"}],20:[function(require,module,exports){
/*
 * Copyright 2007-2017 Charles du Jeu - Abstrium SAS <team (at) pyd.io>
 * This file is part of Pydio.
 *
 * Pydio is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Pydio is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Pydio.  If not, see <http://www.gnu.org/licenses/>.
 *
 * The latest code can be found at <https://pydio.com>.
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _pydio = require('pydio');

var _pydio2 = _interopRequireDefault(_pydio);

var _pydioUtilLang = require('pydio/util/lang');

var _pydioUtilLang2 = _interopRequireDefault(_pydioUtilLang);

var _pydioLangObservable = require('pydio/lang/observable');

var _pydioLangObservable2 = _interopRequireDefault(_pydioLangObservable);

var _pydioHttpApi = require('pydio/http/api');

var _pydioHttpApi2 = _interopRequireDefault(_pydioHttpApi);

var _pydioHttpResourcesManager = require('pydio/http/resources-manager');

var _pydioHttpResourcesManager2 = _interopRequireDefault(_pydioHttpResourcesManager);

var _pydioHttpRestApi = require('pydio/http/rest-api');

var VirtualNode = (function (_Observable) {
    _inherits(VirtualNode, _Observable);

    _createClass(VirtualNode, null, [{
        key: 'loadNodes',
        value: function loadNodes(callback) {
            var api = new _pydioHttpRestApi.ConfigServiceApi(_pydioHttpApi2['default'].getRestClient());
            _pydio2['default'].startLoading();
            api.listVirtualNodes().then(function (response) {
                _pydio2['default'].endLoading();
                var result = [];
                if (response.Children) {
                    response.Children.map(function (treeNode) {
                        result.push(new VirtualNode(treeNode));
                    });
                }
                callback(result);
            })['catch'](function () {
                _pydio2['default'].endLoading();
            });
        }
    }]);

    function VirtualNode(data) {
        _classCallCheck(this, VirtualNode);

        _get(Object.getPrototypeOf(VirtualNode.prototype), 'constructor', this).call(this);
        if (data) {
            this.data = data;
        } else {
            this.data = new _pydioHttpRestApi.TreeNode();
            this.data.Type = _pydioHttpRestApi.TreeNodeType.constructFromObject('COLLECTION');
            this.data.MetaStore = {
                name: "",
                resolution: "",
                contentType: "text/javascript"
            };
        }
    }

    _createClass(VirtualNode, [{
        key: 'getName',
        value: function getName() {
            return this.data.MetaStore.name;
        }
    }, {
        key: 'setName',
        value: function setName(name) {
            this.data.MetaStore.name = name;
            var slug = _pydioUtilLang2['default'].computeStringSlug(name);
            this.data.Uuid = slug;
            this.data.Path = slug;
            this.notify('update');
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            return this.data.MetaStore.resolution;
        }
    }, {
        key: 'setValue',
        value: function setValue(value) {
            this.data.MetaStore.resolution = value;
            this.notify('update');
        }
    }, {
        key: 'save',
        value: function save(callback) {
            var _this = this;

            _pydioHttpResourcesManager2['default'].loadClass('EnterpriseSDK').then(function (sdk) {
                var api = new sdk.EnterpriseConfigServiceApi(_pydioHttpApi2['default'].getRestClient());
                api.putVirtualNode(_this.data.Uuid, _this.data).then(function () {
                    callback();
                });
            });
        }
    }, {
        key: 'remove',
        value: function remove(callback) {
            var _this2 = this;

            _pydioHttpResourcesManager2['default'].loadClass('EnterpriseSDK').then(function (sdk) {
                var api = new sdk.EnterpriseConfigServiceApi(_pydioHttpApi2['default'].getRestClient());
                api.deleteVirtualNode(_this2.data.Uuid).then(function () {
                    callback();
                });
            });
        }
    }]);

    return VirtualNode;
})(_pydioLangObservable2['default']);

exports['default'] = VirtualNode;
module.exports = exports['default'];

},{"pydio":"pydio","pydio/http/api":"pydio/http/api","pydio/http/resources-manager":"pydio/http/resources-manager","pydio/http/rest-api":"pydio/http/rest-api","pydio/lang/observable":"pydio/lang/observable","pydio/util/lang":"pydio/util/lang"}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _pydio = require('pydio');

var _pydio2 = _interopRequireDefault(_pydio);

var _pydioHttpApi = require("pydio/http/api");

var _pydioHttpApi2 = _interopRequireDefault(_pydioHttpApi);

var _pydioUtilLang = require('pydio/util/lang');

var _pydioUtilLang2 = _interopRequireDefault(_pydioUtilLang);

var _pydioLangObservable = require("pydio/lang/observable");

var _pydioLangObservable2 = _interopRequireDefault(_pydioLangObservable);

var _pydioHttpRestApi = require('pydio/http/rest-api');

var Workspace = (function (_Observable) {
    _inherits(Workspace, _Observable);

    _createClass(Workspace, [{
        key: 'buildProxy',
        value: function buildProxy(object) {
            var _this = this;

            return new Proxy(object, {
                set: function set(target, p, value) {
                    var val = value;
                    if (p === 'Slug') {
                        val = _pydioUtilLang2['default'].computeStringSlug(val);
                    } else if (p === 'Label' && _this.create) {
                        target['Slug'] = _pydioUtilLang2['default'].computeStringSlug(val);
                    }
                    target[p] = val;
                    _this.dirty = true;
                    _this.notify('update');
                    return true;
                },
                get: function get(target, p) {
                    var out = target[p];
                    if (p === 'Attributes') {
                        out = _this.internalAttributes;
                    }
                    if (out instanceof Array) {
                        return out;
                    } else if (out instanceof Object) {
                        return _this.buildProxy(out);
                    } else {
                        return out;
                    }
                }
            });
        }

        /**
         * @param model {IdmWorkspace}
         */
    }]);

    function Workspace(model) {
        _classCallCheck(this, Workspace);

        _get(Object.getPrototypeOf(Workspace.prototype), 'constructor', this).call(this);
        this.internalAttributes = {};
        this.dirty = false;
        if (model) {
            this.initModel(model);
        } else {
            this.create = true;
            this.model = new _pydioHttpRestApi.IdmWorkspace();
            this.model.Scope = _pydioHttpRestApi.IdmWorkspaceScope.constructFromObject('ADMIN');
            this.model.RootNodes = {};
            this.internalAttributes = { "DEFAULT_RIGHTS": "r" };
            this.model.Attributes = JSON.stringify(this.internalAttributes);
        }
        this.observableModel = this.buildProxy(this.model);
    }

    _createClass(Workspace, [{
        key: 'initModel',
        value: function initModel(model) {
            this.create = false;
            this.dirty = false;
            this.model = model;
            this.snapshot = JSON.parse(JSON.stringify(model));
            if (model.Attributes) {
                var atts = JSON.parse(model.Attributes);
                if (typeof atts === "object" && Object.keys(atts).length) {
                    this.internalAttributes = atts;
                }
            } else {
                this.internalAttributes = {};
            }
            if (!model.RootNodes) {
                model.RootNodes = {};
            }
        }

        /**
         * @return {IdmWorkspace}
         */
    }, {
        key: 'getModel',
        value: function getModel() {
            return this.observableModel;
        }

        /**
         * @return {boolean}
         */
    }, {
        key: 'hasTemplatePath',
        value: function hasTemplatePath() {
            var _this2 = this;

            return Object.keys(this.model.RootNodes).filter(function (k) {
                return Workspace.rootIsTemplatePath(_this2.model.RootNodes[k]);
            }).length > 0;
        }

        /**
         * @return {boolean}
         */
    }, {
        key: 'hasFolderRoots',
        value: function hasFolderRoots() {
            var _this3 = this;

            return Object.keys(this.model.RootNodes).filter(function (k) {
                return !Workspace.rootIsTemplatePath(_this3.model.RootNodes[k]);
            }).length > 0;
        }

        /**
         *
         * @return {Promise<any>}
         */
    }, {
        key: 'save',
        value: function save() {
            var _this4 = this;

            // If Policies are not set, REST service will add default policies
            console.log('Saving model', this.model);
            this.model.Attributes = JSON.stringify(this.internalAttributes);
            var api = new _pydioHttpRestApi.WorkspaceServiceApi(_pydioHttpApi2['default'].getRestClient());
            return api.putWorkspace(this.model.Slug, this.model).then(function (ws) {
                _this4.initModel(ws);
                _this4.observableModel = _this4.buildProxy(_this4.model);
            });
        }

        /**
         *
         * @return {Promise}
         */
    }, {
        key: 'remove',
        value: function remove() {
            var api = new _pydioHttpRestApi.WorkspaceServiceApi(_pydioHttpApi2['default'].getRestClient());
            return api.deleteWorkspace(this.model.Slug);
        }

        /**
         * Revert state
         */
    }, {
        key: 'revert',
        value: function revert() {
            var revert = _pydioHttpRestApi.IdmWorkspace.constructFromObject(this.snapshot || {});
            this.initModel(revert);
            this.observableModel = this.buildProxy(this.model);
        }

        /**
         * @return {boolean}
         */
    }, {
        key: 'isValid',
        value: function isValid() {
            return this.model.Slug && this.model.Label && Object.keys(this.model.RootNodes).length > 0;
        }
    }, {
        key: 'isDirty',
        value: function isDirty() {
            return this.dirty;
        }

        /**
         *
         * @param node {TreeNode}
         * @return bool
         */
    }], [{
        key: 'rootIsTemplatePath',
        value: function rootIsTemplatePath(node) {
            return !!(node.MetaStore && node.MetaStore['resolution']);
        }
    }, {
        key: 'listWorkspaces',
        value: function listWorkspaces() {
            var api = new _pydioHttpRestApi.WorkspaceServiceApi(_pydioHttpApi2['default'].getRestClient());
            var request = new _pydioHttpRestApi.RestSearchWorkspaceRequest();
            var single = new _pydioHttpRestApi.IdmWorkspaceSingleQuery();
            single.scope = _pydioHttpRestApi.IdmWorkspaceScope.constructFromObject('ADMIN');
            request.Queries = [single];
            return api.searchWorkspaces(request);
        }
    }]);

    return Workspace;
})(_pydioLangObservable2['default']);

exports['default'] = Workspace;
module.exports = exports['default'];

},{"pydio":"pydio","pydio/http/api":"pydio/http/api","pydio/http/rest-api":"pydio/http/rest-api","pydio/lang/observable":"pydio/lang/observable","pydio/util/lang":"pydio/util/lang"}],22:[function(require,module,exports){
/*
 * Copyright 2007-2017 Charles du Jeu - Abstrium SAS <team (at) pyd.io>
 * This file is part of Pydio.
 *
 * Pydio is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Pydio is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Pydio.  If not, see <http://www.gnu.org/licenses/>.
 *
 * The latest code can be found at <https://pydio.com>.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUi = require('material-ui');

var NodeCard = (function (_React$Component) {
    _inherits(NodeCard, _React$Component);

    function NodeCard(props) {
        _classCallCheck(this, NodeCard);

        _get(Object.getPrototypeOf(NodeCard.prototype), 'constructor', this).call(this, props);
        var value = props.node.getValue();
        if (!value) {
            value = "// Compute the Path variable that this node must resolve to. \n// Use Ctrl+Space to see the objects available for completion.\nPath = \"\";";
        }
        this.state = { value: value, dirty: false };
    }

    _createClass(NodeCard, [{
        key: 'onChange',
        value: function onChange(event, newValue) {
            this.setState({
                value: newValue,
                dirty: true
            });
        }
    }, {
        key: 'save',
        value: function save() {
            var _this = this;

            var node = this.props.node;
            node.setValue(this.state.value);
            node.save(function () {
                _this.setState({ dirty: false });
            });
        }
    }, {
        key: 'remove',
        value: function remove() {
            var _this2 = this;

            this.props.node.remove(function () {
                _this2.props.reloadList();
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props;
            var dataSources = _props.dataSources;
            var node = _props.node;
            var readonly = _props.readonly;
            var oneLiner = _props.oneLiner;

            var ds = {};
            if (dataSources) {
                dataSources.map(function (d) {
                    ds[d.Name] = d.Name;
                });
            }
            var globalScope = {
                Path: '',
                DataSources: ds,
                User: { Name: '' }
            };

            var codeMirrorField = _react2['default'].createElement(AdminComponents.CodeMirrorField, {
                mode: 'javascript',
                globalScope: globalScope,
                value: this.state.value,
                onChange: this.onChange.bind(this),
                readOnly: readonly
            });

            if (oneLiner) {
                return _react2['default'].createElement(
                    'div',
                    { style: { display: 'flex' } },
                    _react2['default'].createElement(
                        'div',
                        { style: { flex: 1 } },
                        codeMirrorField
                    ),
                    _react2['default'].createElement(
                        'div',
                        null,
                        _react2['default'].createElement(_materialUi.IconButton, { iconClassName: "mdi mdi-content-save", onClick: this.save.bind(this), disabled: !this.state.dirty, tooltip: "Save" })
                    )
                );
            } else {
                var titleComponent = _react2['default'].createElement(
                    'div',
                    { style: { display: 'flex', alignItems: 'baseline' } },
                    _react2['default'].createElement(
                        'div',
                        { style: { flex: 1 } },
                        node.getName()
                    ),
                    !readonly && _react2['default'].createElement(
                        'div',
                        null,
                        _react2['default'].createElement(_materialUi.IconButton, { iconClassName: "mdi mdi-content-save", onClick: this.save.bind(this), disabled: !this.state.dirty, tooltip: "Save" }),
                        _react2['default'].createElement(_materialUi.IconButton, { iconClassName: "mdi mdi-delete", onClick: this.remove.bind(this), tooltip: "Delete", disabled: node.getName() === 'cells' || node.getName() === 'my-files' })
                    )
                );
                return _react2['default'].createElement(
                    'div',
                    { style: { marginBottom: 10 } },
                    _react2['default'].createElement(AdminComponents.SubHeader, { title: titleComponent }),
                    _react2['default'].createElement(
                        _materialUi.Paper,
                        { zDepth: 1, style: { margin: '0 20px' } },
                        codeMirrorField
                    )
                );
            }
        }
    }]);

    return NodeCard;
})(_react2['default'].Component);

exports['default'] = NodeCard;
module.exports = exports['default'];

},{"material-ui":"material-ui","react":"react"}]},{},[15]);
