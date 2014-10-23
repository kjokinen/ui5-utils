jQuery.sap.declare("util.undoRedo");

  util.undoRedo = (function(jsonModel){
    
    var _jsonModel = jsonModel;
    var _undoStack = [];
    var _redoStack = [];

    var updateModelValue = function(sPath, oValue, oContext) {
      _jsonModel.setProperty(sPath, oValue, oContext);
    };

    return {
      setProperty: function(sPath, oValue, oContext) {            
        var oldValue = _jsonModel.getProperty(sPath);
        updateModelValue(sPath, oValue, oContext)
        window.console&&console.log("Updating stack with newvalue " + oValue + " old value " + oldValue);
        // TODO also keep track of oldContext and newContext
        // TODO should propably make a deep copy of oValue so that tracking works for objects also
        // var newValue = JSON.parse(JSON.stringify(oValue));
        // add new entry into the undoStack
        _undoStack.unshift({"path": sPath, "oldValue": oldValue, "newValue": oValue});
        window.console&&console.log("Undo stack is now: " + JSON.stringify(_undoStack));
        // clear redo stack if needed
        if (_redoStack.length > 0) {
          _redoStack = [];
        }
      },

      undo: function() {
        var undoItem = (_undoStack.length > 0) ? _undoStack.shift() : null;
        if (undoItem !== null) {
          window.console&&console.log("Undo item is " + JSON.stringify(undoItem));
          updateModelValue(undoItem.path, undoItem.oldValue);
          // add item to redoStack
          _redoStack.unshift(undoItem);
        }            
      },
      redo: function() {
        // TODO get item from redoStack
        var redoItem = (_redoStack.length > 0) ? _redoStack.shift() : null;
        if (redoItem !== null) {
          window.console&&console.log("Redo item is " + JSON.stringify(redoItem));
          updateModelValue(redoItem.path, redoItem.newValue);
          // add item to undoStack
          _undoStack.unshift(redoItem);
        } 
      },
    };
});