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
		root.Console = factory({});
	}

} (this, function (Console) {
	
	var w_isLoggingEnabled = true;		//TODO: get this from JSHelper.getConfig()
	var w_isTraceEnabled = true;		//TODO: get this from JSHelper.getConfig()
	
	Console = {
		log: function () {
			if (w_isLoggingEnabled) {
				console.log(arguments);
			
				if (w_isTraceEnabled) {
					console.log(_getLastStack());
				}
			}
		},
		
		warn: function () {
			console.warn(arguments);
			
			console.log(_getLastStack());
		},
		
		error: function () {
			console.error(arguments);
			console.log(_getLastStack());
		}
	};
	
	var _getLastStack = function () {
		var w_error = new Error();
		var w_stack = w_error.stack.split('at ');
		
		if (w_stack.length >= 4) {
			w_lastStack = w_stack[3];
			w_lastStack = w_lastStack.substring(w_lastStack.indexOf('(') + 1, w_lastStack.indexOf(')'));
			
			if (!w_lastStack) {
				w_lastStack = w_stack[3];
				w_lastStack = w_lastStack.split('\n')[0];
			}
		}
		
		return w_lastStack;
	}
	
	return Console;
}));
