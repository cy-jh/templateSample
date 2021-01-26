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

			this._registeHandleBarRfcName();
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
			
			// Input Form Grid
			var oPopupYNGrid = new sap.ui.layout.Grid();
			var oPopupNameGrid = new sap.ui.layout.Grid();
			
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
					var aGrids = oEvent.getSource().getParent().getParent().getContent();
					
					if(oEvent.getSource().getSelectedKey() === "Y") {
						aGrids[1].setVisible(true);
						oModel.setProperty("/basicSAPUI5ApplicationProject/parameters/popupYN", true);
						
						var sPopupName = oModel.getProperty("/basicSAPUI5ApplicationProject/parameters/popupName");
						if(!sPopupName) {
							this.fireValidation({
								isValid: false
							});
						} else {
							this.fireValidation({
								isValid: true
							});
						}
					} else {
						aGrids[1].setVisible(false);
						oModel.setProperty("/basicSAPUI5ApplicationProject/parameters/popupYN", false);
						
						this.fireValidation({
							isValid: true
						});
					}
				}.bind(this)
				// selectedkey : "{/popupYN}"
			});
			
			var oLabelForPopup2 = new sap.m.Label({
				text: "팝업 RFC명을 입력해주세요"
			});
			var oInputForPopup = new sap.m.Input({
				value:"{/popupName}",
				liveChange: function(oEvent) {
					var oInput = oEvent.getSource();
					var sValue = oInput.getValue();
					// var sValue = oInput.getValue().replace(/^[a-zA-Z_]+[a-zA-Z0-9\\-_]*$/, "");
					
					if(!sValue.trim()) {
						oInput.setValueState("Error");
						
						this.fireValidation({
							isValid: false
						});
					} else {
						oInput.setValueState("None");
						
						this.fireValidation({
							isValid: true
						});
					}
					
					var oModel = this.getModel();
					oModel.setProperty("/basicSAPUI5ApplicationProject/parameters/popupName", sValue);
				}.bind(this)
			});
			
			
			// popup
			oPopupYNGrid.addContent(oLabelForPopup);
			oPopupYNGrid.addContent(oPopupYNSelect);
			oPopupNameGrid.addContent(oLabelForPopup2);
			oPopupNameGrid.addContent(oInputForPopup);
			
			lVLayout.addContent(oPopupYNGrid);
			lVLayout.addContent(oPopupNameGrid);
			
			return lVLayout;
		},
		
		_registeHandleBarRfcName : function() {
			HandleBar.registerHelper('rfcName', function(options) {
				
			})
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