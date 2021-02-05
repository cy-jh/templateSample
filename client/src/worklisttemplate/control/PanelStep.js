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

			this._registeHandleBarHBoxCount();
		},
		renderer: {},
		onBeforeRendering: function () {
			// Make sure to first call this method implementation in the
            // WizardStepContent base class
            if (sap.watt.ideplatform.plugin.template.ui.wizard.WizardStepContent.prototype.onBeforeRendering){
             sap.watt.ideplatform.plugin.template.ui.wizard.WizardStepContent.prototype.onBeforeRendering.apply(this, arguments);
            }
            // Implement your logic here
			// this.fireValidation({
			// 	isValid: true
			// });
		},
		
		_validationCheck : function(oEvent) {
			var oInput = oEvent.getSource();
			var sValue = oInput.getValue();
			if(!sValue.trim()) {
				this.fireValidation({
					isValid: false
				});
			} else {
				this.fireValidation({
					isValid: true 
				});
			}
		},
		
		_createPageContent: function () {
			var lVLayout = new sap.ui.layout.VerticalLayout({
				width:"100%",
				class:"sapUiContentPadding"
			});
			
			var oRfcNameGrid = new sap.ui.layout.Grid();
			
			var oLabelForRfcName = new sap.m.Label({
				text: "조회할 RFC명을 입력해주세요."
			});
			
			var oInputForRfcName = new sap.m.Input({
				value : "{/rfcName}",
				liveChange: function(oEvent) {
					this._validationCheck(oEvent);
				}.bind(this)
			})
			
			oRfcNameGrid
			.addContent(oLabelForRfcName)
			.addContent(oInputForRfcName);
			
			lVLayout.addContent(oRfcNameGrid);
			// Form Grid
			// var oPopupYNGrid = new sap.ui.layout.Grid();
			// var oPopupNameGrid = new sap.ui.layout.Grid();
			// var oPopupRfcNameGrid = new sap.ui.layout.Grid();
			
			// // popupYN
			// var oLabelForPopupYN = new sap.m.Label({
			// 	text: "공통팝업을 생성하시겠습니까?"
			// });
			// var oSelectForPopupYN = new sap.m.Select({
			// 	items: [
			// 		new sap.ui.core.Item({
			// 			text: "예",
			// 			key : true
			// 		}),
			// 		new sap.ui.core.Item({
			// 			text: "아니오",
			// 			key : false
			// 		})
			// 	],
			// 	change: function(oEvent) {
			// 		var oModel = this.getModel();
			// 		var aGrids = oEvent.getSource().getParent().getParent().getContent();
					
			// 		if(JSON.parse(oEvent.getSource().getSelectedKey())) {
			// 			aGrids[1].setVisible(true);
			// 			aGrids[2].setVisible(true);
			// 			oModel.setProperty("/basicSAPUI5ApplicationProject/parameters/popupYN", true);
						
			// 			// popupRFC명을 select로 바꾸고 사용할 필요 없어짐
			// 			// var sPopupName = oModel.getProperty("/basicSAPUI5ApplicationProject/parameters/popupName");
			// 			// if(!sPopupName) {
			// 			// 	this.fireValidation({
			// 			// 		isValid: false
			// 			// 	});
			// 			// } else {
			// 			// 	this.fireValidation({
			// 			// 		isValid: true
			// 			// 	});
			// 			// }
			// 		} else {
			// 			aGrids[1].setVisible(false);
			// 			aGrids[2].setVisible(false);
			// 			oModel.setProperty("/basicSAPUI5ApplicationProject/parameters/popupYN", false);
						
			// 			this.fireValidation({
			// 				isValid: true
			// 			});
			// 		}
			// 	}.bind(this),
			// 	selectedkey : "{/popupYN}"
			// });
			
			// // popupName
			// var oLabelForPopupName = new sap.m.Label({
			// 	text: "팝업 파일명을 입력해주세요."
			// })
			// var oInputForPopupName = new sap.m.Input({
			// 	value:"{/popupName}",
			// 	liveChange: function(oEvent) {
			// 		var oInput = oEvent.getSource();
			// 		var sValue = oInput.getValue();
					
			// 		if(!sValue.trim()) {
			// 			oInput.setValueState("Error");
						
			// 			this.fireValidation({
			// 				isValid: false
			// 			});
			// 		} else {
			// 			oInput.setValueState("None");
						
			// 			this.fireValidation({
			// 				isValid: true
			// 			});
			// 		}
					
			// 		var oModel = this.getModel();
			// 		oModel.setProperty("/basicSAPUI5ApplicationProject/parameters/popupName", sValue);
			// 	}.bind(this)
			// })
			
			// // popupRfcName
			// var oLabelForRfcName = new sap.m.Label({
			// 	text: "팝업 RFC명을 선택해주세요"
			// });
			// var oSelectForRfcName = new sap.m.Select({
			// 	items: [
			// 		new sap.ui.core.Item({
			// 			text: "ZRFC_DEMO_1",
			// 			key : "ZRFC_DEMO_1"
			// 		}),
			// 		new sap.ui.core.Item({
			// 			text: "ZRFC_DEMO_2",
			// 			key : "ZRFC_DEMO_2"
			// 		}),
			// 		new sap.ui.core.Item({
			// 			text: "ZRFC_DEMO_3",
			// 			key : "ZRFC_DEMO_3"
			// 		})
			// 	],
			// 	change: function(oEvent) {
			// 		var oModel = this.getModel();
			// 		var sSelectedKey = oEvent.getSource().getSelectedKey(); 
			// 		oModel.setProperty("/basicSAPUI5ApplicationProject/parameters/popupRfcName", sSelectedKey);
					
			// 		this.fireValidation({
			// 			isValid: true
			// 		});
			// 	}.bind(this),
			// 	selectedkey : "{/popupRfcName}"
			// });
			
			// oPopupYNGrid
			// .addContent(oLabelForPopupYN)
			// .addContent(oSelectForPopupYN);
			
			// oPopupNameGrid
			// .addContent(oLabelForPopupName)
			// .addContent(oInputForPopupName);
			
			// oPopupRfcNameGrid
			// .addContent(oLabelForRfcName)
			// .addContent(oSelectForRfcName);
			
			// lVLayout
			// .addContent(oPopupYNGrid)
			// .addContent(oPopupNameGrid)
			// .addContent(oPopupRfcNameGrid);
			
			return lVLayout;
		},
		
		_registeHandleBarHBoxCount : function() {
			Handlebars.registerHelper('customHBoxHelper', function(options) {
				var sControl;
				switch (options) {
					case "Select" :
						sContol = '<HBox class="cFormItem w90 flex1"><Label text="사용자" tooltip="사용자" required="true" /><Select items="{filterModel>/PT_AGENT}"><core:ListItem key="{filterModel>EPID}" text="{filterModel>AGENT_DESC}" /></Select><layoutData><l:GridData span="XL3 L3 M12 S12" /></layoutData></HBox>';
						break;
					case "DateRangePicker" :
						sControl = '<HBox class="cFormItem w90 flex0"><Label text="승인일자" tooltip="승인일자" required="true" /><DateRangeSelectiondelimiter=" ~ "displayFormat="yyyy.MM.dd"dateValue="{dateModel>/fromDate}"secondDateValue="{dateModel>/toDate}"change=".onSearch" /><layoutData><l:GridData span="XL3 L3 M12 S12" /></layoutData></HBox>'
						break;
					default:
						
				}
				
				return new Handlebars.SafeString(sControl);
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