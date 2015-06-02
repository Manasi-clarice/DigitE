/**
 * NOTE: This file is AMD supported
 * 
 * This file will only contain methods written in plain javascript
 * 
 **/

(function (root, factory) {
	
	if (typeof define != 'undefined' && define.amd) {
		
		define(factory({}));
		
	} else {
		root.JSHelper = factory({});
	}

} (this, function (JSHelper) {
	var w_config;
	var w_origin = this.location.origin + '/';
	var w_context = '/' + this.location.href.substring(w_origin.length, w_origin.length + w_origin.indexOf('/') + 1);
	
	JSHelper = {
		
		/**
		 * This api will return the secured url.
		 * 
		 * a_key: key of the url
		 */
		getURL: function (a_key) {
			return w_config.URLs[a_key];
		},
		
		/**
		 * This api will return the text locale set for the logged in user.
		 */
		getLocaleText: function () {
			return w_config.preference.localeText;
		},
		
		/**
		 * This api will return the Number locale set for the logged in user.
		 */
		getLocaleNumber: function () {
			return w_config.preference.localeText;
		},
		
		/**
		 * This api will return the Date locale set for the logged in user.
		 */
		getLocaleDate: function () {
			return w_config.preference.localeDate;
		},
		
		/**
		 * It will return the context Path of the application
		 */
		getContextPath: function () {
			return w_context;
		},
		
		/**
		 * This method will send an ajax call to get the application/user related config from the server
		 *
		 */
		initConfig: function () {
			JSHelper.ajaxRequest({
				url: this.getContextPath() + 'app/data/appConfig.json',
				async: false,
				/*params: {
					action: 'config.AppConfig.getConfig'
				},*/
				
				success: function (a_response) {
					w_config = JSON.parse(a_response.responseText);
					console.log('load the app config');
				},
				
				failure: function (a_response) {
					console.error('unable to load application config...application may not work properly!!\n' + a_response.responseText);
				}
			});
		},
		
		/**
		 * This will send the ajax request to specified url
		 * 
		 * a_config.url: url to which data needs to be sent
		 * a_config.method: method of sending data to server: default: POST
		 * a_config.async: whether call asynchronous or synchronous: default: async
		 * a_config.timeout: timeout or ajax call response: default: 300000
		 * a_config.success: a callback function which will be called after ajax call returns successfully.
		 * a_config.failure: a callback function which will be invoked in case of any failure
		 */
		ajaxRequest: function (a_config) {
			var w_config = a_config;
			
			if (!a_config.url) {
				w_config.url = this.getContextPath() + '/Request?Key=ALMLiteService';
			}
			
			if (!a_config.method) {
				w_config.method = 'GET';
			}
			
			if (a_config.async == undefined) {
				w_config.async = true;
			}
			
			if (a_config.timeout == undefined) {
				w_config.timeout = 300000;
			}
			
			if (!a_config.failure) {
				w_config.failure = function (a_response) {
				    
					var w_message = a_response.responseText ? a_response.responseText : a_response.statusText;
					
					throw new Error(w_message);
				}
			}
			
			var w_successFn = w_config.success;
			
			w_config.success = function (a_response) {
				var w_jsonObject;
				
				if(a_config.responseType == 'xml') {
					
					w_successFn(a_response);
					
				} else if (a_config.responseType == 'void') {
					
					w_successFn(a_response);
					
				} else {
					
					if ((a_response.responseText).trim()) {
						w_jsonObject = JSON.parse(a_response.responseText);
					}
					
					if(a_config.responseType == 'json' && w_jsonObject.success == undefined) {
						
						w_successFn(w_jsonObject);
						
					} else if (w_jsonObject && w_jsonObject.success != undefined) {

						if (w_jsonObject.success == true) {
							w_successFn(a_response);
						} else {
							w_config.failure(a_response);
						}
						
					} else {
						w_successFn(a_response);
					}
				}
			}
			
			var w_paramString = "";
			var w_xmlHttp;
			var w_params = w_config.params;
			
			if (w_params && (w_params.substr || w_params.substring)) {
				w_paramString = w_params;
				w_paramString += "&ajaxRequest=true";
			} else {
				for(var w_paramName in w_params) {
					var w_paramValue = w_params[w_paramName];
					
					if (w_paramValue != undefined && w_paramValue != null) {
						w_paramValue = encodeURIComponent(w_paramValue);
						w_paramString += w_paramName + "=" + w_paramValue + "&";
					}
				}
				
				w_paramString += "ajaxRequest=true";
			}
			
			if(window.XMLHttpRequest) {
				w_xmlHttp = new XMLHttpRequest();
			} else {
				w_xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
			}
			
			w_xmlHttp.onreadystatechange = function() {
				if(this.readyState == 4)  {
					var w_errorOccred = this.getResponseHeader('errorOccured');
					
					if(this.status == 200 && !w_errorOccred) {
						
						if (w_config.responseType != 'xml' && this.responseText.indexOf('"sessionTimeout":true') > -1) {
							var w_json = JSON.parse(this.responseText);
							
							if (w_json.sessionTimeout) {
								if (!window.opener) {
									top.location = w_json.url;
								} else {
									window.close();
									window.opener.location = w_json.url;
								}
								
								return;
							}
						}
						
						w_config.success(this);
						
					} else {
						w_config.failure(this);
					}
				}
			}
			
			w_xmlHttp.open(w_config.method, w_config.url, w_config.async);
			w_xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			w_xmlHttp.send(w_paramString);
			w_xmlHttp = null;
		}
	};
	
	/**
	 * initialize the configuration needed in the application
	 */
	JSHelper.initConfig();
	
	return JSHelper;
}));
