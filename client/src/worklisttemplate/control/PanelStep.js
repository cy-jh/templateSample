define(["sap.watt.ideplatform.template/ui/wizard/WizardStepContent",
	"sap/ui/model/json/JSONModel"
],
	function (WizardStepContent, JSONModel) {
	"use strict";

	jQuery.sap.declare("worklisttemplate.control.PanelStep");
	return WizardStepContent.extend("worklisttemplate.control.PanelStep", {

		init: function () {
			var oPageStepContent = this._createPageContent();
			this.addContent(oPageStepContent);
		},
		renderer: {},
		onBeforeRendering: function () {
			// Make sure to first call this method implementation in the
            // WizardStepContent base class
            if (sap.watt.ideplatform.plugin.template.ui.wizard.WizardStepContent.prototype.onBeforeRendering){
             sap.watt.ideplatform.plugin.template.ui.wizard.WizardStepContent.prototype.onBeforeRendering.apply(this, arguments);
            }
            // Implement your logic here
		},
		_createPageContent: function () {
			var lVLayout = new sap.ui.layout.VerticalLayout({
				width:"100%",
				class:"sapUiContentPadding"
			});
			
			// var oHBox = new sap.m.HBox({
			// 	width:"100%",
			// 	class:"sapUiContentPadding"
			// });
			// var oLabel = new sap.m.Label({
			// 	text: "Service명을 입력하세요."
			// });
			// var oInput = new sap.m.Input({
			// 	value:"{/CustomInputValue}",
			// 	change: function() { 
			// 		this.fireValidation({
			// 			isValid: true
			// 		});
			// 	}.bind(this)
			// });
			// var that = this;
			// var oBtn = new sap.m.Button({
			// 	text: "테스트",
			// 	press: function(){
			// 		var oModel = new sap.ui.model.json.JSONModel();
			// 		var jsonTemplate = new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("test/data", "/jsonData.json"));
			// 		jsonTemplate.attachRequestCompleted(function(oJsonEvent){  
			// 			oModel= oJsonEvent.getSource(); 
			// 			// that.getView().setModel(oModel);
			// 		});
			// 	}
			// });
			
			// oHBox.addItem(oLabel);
			// oHBox.addItem(oInput);
			// oHBox.addItem(oBtn);
			
			
			var oHBoxForPopup = new sap.m.HBox({
				width:"100%",
				class:"sapUiContentPadding"
			});
			var oLabelForPopup = new sap.m.Label({
				text: "popup을 생성하시겠습니까?"
			});
			
			var oPopupYNSelect = new sap.m.Select({
				items: [
					new sap.ui.core.Item({
						text: "예",
						key : "Y"
					}),
					new sap.ui.core.Item({
						text: "아니오",
						key : "N"
					})
				],
				change: function(oEvent) {
					var oModel = this.getModel();
					var aHBoxItems = oEvent.getSource().getParent().getItems();
					
					if(oEvent.getSource().getSelectedKey() === "Y") {
						aHBoxItems[2].setVisible(true); //oLabelForPopup2
						aHBoxItems[3].setVisible(true); //oInputForPopup
						oModel.setProperty("/basicSAPUI5ApplicationProject/parameters/popupYN", true);
					} else {
						aHBoxItems[2].setVisible(false); //oLabelForPopup2
						aHBoxItems[3].setVisible(false); //oInputForPopup
						oModel.setProperty("/basicSAPUI5ApplicationProject/parameters/popupYN", false);
					}
				}
				// selectedkey : "{/popupYN}"
			});
			
			var oLabelForPopup2 = new sap.m.Label({
				text: "팝업 RFC명을 입력해주세요"
			});
			var oInputForPopup = new sap.m.Input({
				value:"{/popupName}",
				change: function(oEvent) {
					var oModel = this.getModel();
					oModel.setProperty("/basicSAPUI5ApplicationProject/parameters/popupName", oEvent.getSource().getValue());
					this.fireValidation({
						isValid: true
					});
				}.bind(this)
			});
			
			
			// popup
			oHBoxForPopup.addItem(oLabelForPopup);
			oHBoxForPopup.addItem(oPopupYNSelect);
			oHBoxForPopup.addItem(oLabelForPopup2);
			oHBoxForPopup.addItem(oInputForPopup);
			
			// lVLayout.addContent(oHBox);
			lVLayout.addContent(oHBoxForPopup);
			
			return lVLayout;
		},
		
		
		validateStepContent: function () {
			// Return a Q-promise which is resolved if the step content 
			// is currently in valid state, and is rejected if not.
		},
		cleanStep: function () {
			// 1. Clean properties that were added to this.getModel().getData().
			// 2. Clean the control's private members.
			// 3. Clean the UI controls created by this control
			//    that are not currently displayed.
			//    Currently displayed content is destroyed by the wizard before
			//    this step is displayed again.
		}
	});
});