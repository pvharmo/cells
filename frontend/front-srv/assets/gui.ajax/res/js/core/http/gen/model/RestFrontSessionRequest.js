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


import ApiClient from '../ApiClient';





/**
* The RestFrontSessionRequest model module.
* @module model/RestFrontSessionRequest
* @version 1.0
*/
export default class RestFrontSessionRequest {
    /**
    * Constructs a new <code>RestFrontSessionRequest</code>.
    * @alias module:model/RestFrontSessionRequest
    * @class
    */

    constructor() {
        

        
        

        

        
    }

    /**
    * Constructs a <code>RestFrontSessionRequest</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:model/RestFrontSessionRequest} obj Optional instance to populate.
    * @return {module:model/RestFrontSessionRequest} The populated <code>RestFrontSessionRequest</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new RestFrontSessionRequest();

            
            
            

            if (data.hasOwnProperty('ClientTime')) {
                obj['ClientTime'] = ApiClient.convertToType(data['ClientTime'], 'Number');
            }
            if (data.hasOwnProperty('AuthInfo')) {
                obj['AuthInfo'] = ApiClient.convertToType(data['AuthInfo'], {'String': 'String'});
            }
            if (data.hasOwnProperty('Logout')) {
                obj['Logout'] = ApiClient.convertToType(data['Logout'], 'Boolean');
            }
        }
        return obj;
    }

    /**
    * @member {Number} ClientTime
    */
    ClientTime = undefined;
    /**
    * @member {Object.<String, String>} AuthInfo
    */
    AuthInfo = undefined;
    /**
    * @member {Boolean} Logout
    */
    Logout = undefined;








}


