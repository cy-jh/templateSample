sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function(JSONModel, Device) {
	"use strict";

	return {

		createDeviceModel: function() {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},

		loadData: function(sUrl, oParameters) {
			var oPromise;
			
			if(!sUrl) {
				throw Error("Required URL");
			}
			
			oPromise = $.ajax({
				type: "post",
				url: sUrl,
				data: oParameters.importData,
			});
			oPromise.then(function(oData) {
				if(oParameters && oParameters.success && typeof oParameters.success === "function") {
					oParameters.success(oData);
				}
			}, function(XMLHttpRequest, textStatus, errorThrown) {
				if(oParameters && oParameters.failed && typeof oParameters.failed === "function") {
					oParameters.failed(XMLHttpRequest, textStatus, errorThrown);
				}
			});
		}
	};
});