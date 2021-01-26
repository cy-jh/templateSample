sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/Fragment"
], function(Controller, JSONModel, Fragment) {
	"use strict";

	return Controller.extend("{{basicSAPUI5ApplicationProject.parameters.namespace.value}}.{{projectName}}.controller.{{basicSAPUI5ApplicationProject.parameters.name.value}}", {
		onInit: function () {
			this._modelSetting();
		},
		
		onOpenDialog : function() {
			var oView = this.getView();

			// create dialog lazily
			if (!this.pDialog) {
				this.pDialog = Fragment.load({
					id: oView.getId(),
					name: "{{basicSAPUI5ApplicationProject.parameters.namespace.value}}.{{projectName}}.view.fragment.{{popupName}}"
				}).then(function (oDialog) {
					// connect dialog to the root view of this component (models, lifecycle)
					oView.addDependent(oDialog);
					return oDialog;
				});
			} 
			this.pDialog.then(function(oDialog) {
				oDialog.open();
			});
		},
		
		_modelSetting : function() {
			var oPopupData = {
				"ZRFC_ONE" : [
					{
						"col1" : "1",
						"col2" : "A",
						"col3" : "가",
					},
					{
						"col1" : "2",
						"col2" : "B",
						"col3" : "나",
					},
					{
						"col1" : "3",
						"col2" : "C",
						"col3" : "다",
					},
				],
				"ZRFC_TWO" : [
					{
						"col1" : "1",
						"col2" : "A",
						"col3" : "가",
						"col4" : "AA",
						"col5" : "가가",
					},
					{
						"col1" : "2",
						"col2" : "B",
						"col3" : "나",
						"col4" : "BB",
						"col5" : "나나",
					},
					{
						"col1" : "3",
						"col2" : "C",
						"col3" : "다",
						"col4" : "CC",
						"col5" : "다다",
					},
					{
						"col1" : "4",
						"col2" : "D",
						"col3" : "라",
						"col4" : "DD",
						"col5" : "라라",
					}
				]
			};
			var oModel = new JSONModel(oPopupData);
			this.getView().setModel(oModel);
		}
	});
});