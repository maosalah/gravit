(function (_) {

    /**
     * Action for cutting the current selection to the clipboard
     * @class GCutAction
     * @extends GUIAction
     * @constructor
     */
    function GCutAction() {
    };
    GObject.inherit(GCutAction, GUIAction);

    GCutAction.ID = 'edit.cut';
    GCutAction.TITLE = new GLocale.Key(GCutAction, "title");

    /**
     * @override
     */
    GCutAction.prototype.getId = function () {
        return GCutAction.ID;
    };

    /**
     * @override
     */
    GCutAction.prototype.getTitle = function () {
        return GCutAction.TITLE;
    };

    /**
     * @override
     */
    GCutAction.prototype.getCategory = function () {
        return EXApplication.CATEGORY_EDIT;
    };

    /**
     * @override
     */
    GCutAction.prototype.getGroup = function () {
        return "ccp";
    };

    /**
     * @override
     */
    GCutAction.prototype.getShortcut = function () {
        return [GUIKey.Constant.META, 'X'];
    };

    /**
     * @override
     */
    GCutAction.prototype.isEnabled = function () {
        var document = gApp.getActiveDocument();
        return document && !!document.getEditor().getSelection();
    };

    /**
     * @override
     */
    GCutAction.prototype.execute = function () {
        var editor = gApp.getActiveDocument().getEditor();

        // Run copy action, first
        gApp.executeAction(GCopyAction.ID);

        // Delete selection now
        editor.beginTransaction();
        try {
            editor.deleteSelection(true);
        } finally {
            // TODO : I18N
            editor.commitTransaction('Cut Selection');
        }
    };

    /** @override */
    GCutAction.prototype.toString = function () {
        return "[Object GCutAction]";
    };

    _.GCutAction = GCutAction;
})(this);