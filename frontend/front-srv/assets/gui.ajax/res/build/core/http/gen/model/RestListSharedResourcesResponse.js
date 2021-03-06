/**
 * Pydio Cells Rest API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 */

'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _ApiClient = require('../ApiClient');

var _ApiClient2 = _interopRequireDefault(_ApiClient);

var _ListSharedResourcesResponseSharedResource = require('./ListSharedResourcesResponseSharedResource');

var _ListSharedResourcesResponseSharedResource2 = _interopRequireDefault(_ListSharedResourcesResponseSharedResource);

/**
* The RestListSharedResourcesResponse model module.
* @module model/RestListSharedResourcesResponse
* @version 1.0
*/

var RestListSharedResourcesResponse = (function () {
    /**
    * Constructs a new <code>RestListSharedResourcesResponse</code>.
    * @alias module:model/RestListSharedResourcesResponse
    * @class
    */

    function RestListSharedResourcesResponse() {
        _classCallCheck(this, RestListSharedResourcesResponse);

        this.Resources = undefined;
        this.Offset = undefined;
        this.Limit = undefined;
        this.Total = undefined;
    }

    /**
    * Constructs a <code>RestListSharedResourcesResponse</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:model/RestListSharedResourcesResponse} obj Optional instance to populate.
    * @return {module:model/RestListSharedResourcesResponse} The populated <code>RestListSharedResourcesResponse</code> instance.
    */

    RestListSharedResourcesResponse.constructFromObject = function constructFromObject(data, obj) {
        if (data) {
            obj = obj || new RestListSharedResourcesResponse();

            if (data.hasOwnProperty('Resources')) {
                obj['Resources'] = _ApiClient2['default'].convertToType(data['Resources'], [_ListSharedResourcesResponseSharedResource2['default']]);
            }
            if (data.hasOwnProperty('Offset')) {
                obj['Offset'] = _ApiClient2['default'].convertToType(data['Offset'], 'Number');
            }
            if (data.hasOwnProperty('Limit')) {
                obj['Limit'] = _ApiClient2['default'].convertToType(data['Limit'], 'Number');
            }
            if (data.hasOwnProperty('Total')) {
                obj['Total'] = _ApiClient2['default'].convertToType(data['Total'], 'Number');
            }
        }
        return obj;
    };

    /**
    * @member {Array.<module:model/ListSharedResourcesResponseSharedResource>} Resources
    */
    return RestListSharedResourcesResponse;
})();

exports['default'] = RestListSharedResourcesResponse;
module.exports = exports['default'];

/**
* @member {Number} Offset
*/

/**
* @member {Number} Limit
*/

/**
* @member {Number} Total
*/
