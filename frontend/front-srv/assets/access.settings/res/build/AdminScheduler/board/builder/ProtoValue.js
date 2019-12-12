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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUi = require('material-ui');

var _FormLoader = require("./FormLoader");

var _FormLoader2 = _interopRequireDefault(_FormLoader);

var _pydio = require('pydio');

var _pydio2 = _interopRequireDefault(_pydio);

var PydioForm = _pydio2['default'].requireLib('form');

var ProtoValue = (function (_React$Component) {
    _inherits(ProtoValue, _React$Component);

    function ProtoValue(props) {
        var _this = this;

        _classCallCheck(this, ProtoValue);

        _get(Object.getPrototypeOf(ProtoValue.prototype), 'constructor', this).call(this, props);
        this.state = { fieldName: props.fieldName };
        // load params
        var singleQuery = this.props.singleQuery;

        _FormLoader2['default'].loadAction("proto:switch:" + singleQuery).then(function (params) {
            var formValues = {};
            if (props.fieldName) {
                var notProps = {};
                if (props.proto.value["Not"]) {
                    notProps["Not"] = true;
                } else if (props.proto.value["not"]) {
                    notProps["not"] = true;
                }
                formValues = ProtoValue.protoValueToFormValues(params, props.fieldName, props.proto.value[props.fieldName], notProps);
            }
            _this.setState({ formParams: ProtoValue.filterNot(params), formValues: formValues });
        });
    }

    _createClass(ProtoValue, [{
        key: 'onFormChange',
        value: function onFormChange(newValues) {
            var formParams = this.state.formParams;

            console.log(ProtoValue.formValuesToProtoValue(formParams, newValues));
            this.setState({ formValues: newValues });
        }
    }, {
        key: 'onSubmit',
        value: function onSubmit() {
            var _state = this.state;
            var formParams = _state.formParams;
            var formValues = _state.formValues;

            var _ProtoValue$formValuesToProtoValue = ProtoValue.formValuesToProtoValue(formParams, formValues);

            var fieldName = _ProtoValue$formValuesToProtoValue.fieldName;
            var value = _ProtoValue$formValuesToProtoValue.value;
            var notProps = _ProtoValue$formValuesToProtoValue.notProps;

            this.props.onChange(fieldName, value, notProps);
            this.props.onDismiss();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props;
            var onDismiss = _props.onDismiss;
            var style = _props.style;
            var _state2 = this.state;
            var formParams = _state2.formParams;
            var _state2$formValues = _state2.formValues;
            var formValues = _state2$formValues === undefined ? {} : _state2$formValues;

            if (formParams) {
                return _react2['default'].createElement(
                    _materialUi.Paper,
                    { zDepth: 2, style: _extends({ position: 'absolute', borderRadius: 10, zIndex: 10, border: '2px solid #fac684', width: 300 }, style) },
                    _react2['default'].createElement(PydioForm.FormPanel, {
                        depth: -1,
                        style: { margin: -10 },
                        parameters: formParams,
                        values: formValues,
                        onChange: this.onFormChange.bind(this)
                    }),
                    _react2['default'].createElement(
                        'div',
                        { style: { textAlign: 'right' } },
                        _react2['default'].createElement(_materialUi.FlatButton, { label: "Ok", onTouchTap: function () {
                                return _this2.onSubmit();
                            } }),
                        _react2['default'].createElement(_materialUi.FlatButton, { label: "Cancel", onTouchTap: onDismiss })
                    )
                );
            } else {
                return _react2['default'].createElement(
                    'div',
                    null,
                    'Loading form...'
                );
            }
        }
    }], [{
        key: 'filterNot',
        value: function filterNot(params) {
            return params.filter(function (p) {
                return !(p.group_switch_label === 'Not' && p.name === '@value');
            }).map(function (p) {
                if (p.group_switch_label === 'Not') {
                    delete p.group_switch_label;
                    delete p.group_switch_value;
                    delete p.group_switch_name;
                }
                return p;
            });
        }
    }, {
        key: 'protoValueToFormValues',
        value: function protoValueToFormValues(params, fieldName, value, notProps) {
            var data = _extends({
                fieldname: {
                    '@value': fieldName
                }
            }, notProps);
            data.fieldname[fieldName] = value;
            var repParams = params.filter(function (p) {
                return p.group_switch_value === fieldName && p.replicationGroup && p.name !== '@value';
            });
            if (repParams.length && typeof value === "object") {
                (function () {
                    // Spread values as field, field_1, field_2 ...
                    var i = 0;
                    value.forEach(function (v) {
                        repParams.forEach(function (p) {
                            data.fieldname[p.name + (i === 0 ? '' : '_' + i)] = typeof v === 'object' ? v[p.name] : v;
                        });
                        i++;
                    });
                })();
            }
            return PydioForm.Manager.JsonToSlashes(data);
        }
    }, {
        key: 'formValuesToProtoValue',
        value: function formValuesToProtoValue(params, values) {
            var fieldName = undefined,
                value = undefined;
            var json = PydioForm.Manager.SlashesToJson(values);
            if (json.fieldname && json.fieldname['@value']) {
                fieldName = json.fieldname['@value'];
                var repParams = params.filter(function (p) {
                    return p.group_switch_value === fieldName && p.replicationGroup && p.name !== '@value';
                });
                if (repParams.length) {
                    value = ProtoValue.replicatedValue(repParams, json.fieldname, fieldName);
                } else {
                    value = json.fieldname[fieldName];
                }
            }
            var notProps = {};
            if (json["Not"]) {
                notProps.Not = true;
            } else if (json["not"]) {
                notProps.not = true;
            } else {
                notProps = null;
            }
            return { fieldName: fieldName, value: value, notProps: notProps };
        }
    }, {
        key: 'replicatedValue',
        value: function replicatedValue(params, jsonObject, fieldName) {
            var data = [];
            var i = 0;
            var suffix = '';
            var refName = params[0].name;
            while (jsonObject[refName + suffix]) {
                if (params.length > 1) {
                    (function () {
                        var obj = {};
                        params.forEach(function (param) {
                            obj[param.name] = jsonObject[param.name + suffix];
                        });
                        data.push(obj);
                    })();
                } else {
                    data.push(jsonObject[refName + suffix]);
                }
                i++;
                suffix = '_' + i;
            }
            return data;
        }
    }]);

    return ProtoValue;
})(_react2['default'].Component);

exports['default'] = ProtoValue;
module.exports = exports['default'];
