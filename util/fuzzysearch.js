jQuery.sap.declare("util.fuzzysearch");
jQuery.sap.require("util/fuse");

util.fuzzysearch = (function(jsonModel, path, options){
    
	var _jsonModel = jsonModel;
	var _options = options;
	var _path = path;

 	return {
		search: function(value) {
			if (!value) {
				return null;
			}
			var propertyVal = _jsonModel.getProperty(_path);
			
    		var f = new Fuse(propertyVal, options);
			var result = f.search(value);
			return result;
    	},
 	};
});