define(["sap.watt.ideplatform.template/ui/wizard/WizardStepContent",
	"sap/ui/model/json/JSONModel"
],
	function (WizardStepContent, JSONModel) {
	"use strict";

	jQuery.sap.declare("worklisttemplate.control.HBoxStep");
	return WizardStepContent.extend("worklisttemplate.control.HBoxStep", {

		init: function () {
			var oPageStepContent = this._createPageContent();
			this.addContent(oPageStepContent);

			this._registerHandleBarHBoxCount();
		},
		
		renderer: {},
		
		onBeforeRendering: function () {
			// Make sure to first call this method implementation in the
            // WizardStepContent base class
            if (sap.watt.ideplatform.plugin.template.ui.wizard.WizardStepContent.prototype.onBeforeRendering){
             sap.watt.ideplatform.plugin.template.ui.wizard.WizardStepContent.prototype.onBeforeRendering.apply(this, arguments);
            }
            
            // Implement your logic here
			this.fireValidation({
				isValid: false
			});
			
			this.getParent()._nextButton.attachPress(function(oEvent) {
				var oModel = this.getModel();
				var oLayout = this.getContent()[0];
				var oList = oLayout.getContent()[1];
				var aListItems = oList.getItems();
				var aData = [];
				
				aListItems.forEach(function(oItem) {
					var oHBoxItems = oItem.getContent()[0].getItems();
					var oInput = oHBoxItems[0];
					var oSelect = oHBoxItems[1];
					aData.push({
						labelText: oInput.getValue(),
						controlName: oSelect.getSelectedKey()
					})
				});
				oModel.setProperty("/basicSAPUI5ApplicationProject/parameters/panelDataList", aData);
			}.bind(this));
			
		},
		
		_createPageContent: function () {
			var lVLayout = new sap.ui.layout.VerticalLayout({
				id: "vlayout",
				width:"100%",
				class:"sapUiContentPadding"
			});
			var oButton = new sap.m.Button({
				icon: "sap-icon://add",
				press: function(oEvent) {
					this.fireValidation({
						isValid: false
					});
					
					this._makeNewLine();
				}.bind(this)
			})
			
			var oList = new sap.m.List({
				items: [
					new sap.m.CustomListItem({
						content: [
							new sap.m.HBox({
								alignContent: sap.m.FlexAlignContent.SpaceBetween,
								items: [
									new sap.m.Input({
										value:"",
										liveChange: function(oEvent) {
											this._validationCheck();
										}.bind(this)
									}),
									new sap.m.Select({
										items: [
											new sap.ui.core.Item({
												text: "Select",
												key : "Select"
											}),
											new sap.ui.core.Item({
												text: "Input",
												key : "Input"
											}),
											new sap.ui.core.Item({
												text: "DateRangeSelection",
												key : "DateRangeSelection"
											})
										],
										change: function(oEvent) {
											// var oModel = this.getModel();
											// oModel.setProperty("/basicSAPUI5ApplicationProject/parameters/", oEvent.getSource().getSelectedKey());
										}.bind(this),
									}),
									new sap.m.Button({
										icon: "sap-icon://less",
										press: function(oEvent) {
											this._deleteThisLine(oEvent);
										}.bind(this)
									})
								]
							})
						]
					}),
				]
			});
			
			return lVLayout
			.addContent(oButton)
			.addContent(oList);
			
		},
		
		_makeNewLine: function() {
			var oLayout = this.getContent()[0];
			var oList = oLayout.getContent()[1];
			var oNewList = this._createLabelAndControl();
			oList.addItem(oNewList); 
		},
		
		_validationCheck: function() {
			var that = this;
			var oLayout = this.getContent()[0];
			var oList = oLayout.getContent()[1];
			var aListItems = oList.getItems();
			var bErrorFlag;
			
			aListItems.forEach(function(oItem) {
				var oInput = oItem.getContent()[0].getItems()[0];
				if(!oInput.getValue().trim()) {
					bErrorFlag = true;
					that.fireValidation({
						isValid: false
					});
				}
			})
			
			if(!bErrorFlag) {
				that.fireValidation({
					isValid: true
				});
			}
		},
		
		_createLabelAndControl : function() {
			return new sap.m.CustomListItem({
						content: [
							new sap.m.HBox({
								alignContent: sap.m.FlexAlignContent.SpaceBetween,
								items: [
									new sap.m.Input({
										value:"",
										liveChange: function(oEvent) {
											this._validationCheck();
										}.bind(this)
									}),
									new sap.m.Select({
										items: [
											new sap.ui.core.Item({
												text: "Select",
												key : "Select"
											}),
											new sap.ui.core.Item({
												text: "Input",
												key : "Input"
											}),
											new sap.ui.core.Item({
												text: "DateRangeSelection",
												key : "DateRangeSelection"
											})
										],
										change: function(oEvent) {
											// var oModel = this.getModel();
											// oModel.setProperty("/basicSAPUI5ApplicationProject/parameters/", oEvent.getSource().getSelectedKey());
										}.bind(this),
									}),
									new sap.m.Button({
										icon: "sap-icon://less",
										press: function(oEvent) {
											this._deleteThisLine(oEvent);
										}.bind(this)
									})
								]
							})
						]
					})
		},
		
		_deleteThisLine : function(oEvent) {
			var oThisLine = oEvent.getSource().getParent().getParent(); //HBox
			var oList = oThisLine.getParent();
			var aListItems = oList.getItems();
			var iIndex;
			aListItems.some(function(oItem, index) {
				iIndex = index;
				return !(oItem.getId() === oThisLine.getId());
			});
			oList.removeItem(iIndex);
		},
		
		_makeNewSet : function() {
			var oNewHBoxGrid = new sap.ui.layout.Grid();
			var oNewHBoxGrid2 = new sap.ui.layout.Grid();
			
			var oNewLabelForLabel = new sap.m.Label({
				text: "Label에 들어갈 텍스트를 입력해주세요."
			});
			var oNewInputForLabel = new sap.m.Input({
				value:"",
				liveChange: function(oEvent) {
					var oInput = oEvent.getSource();
					var sValue = oInput.getValue();
					
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
					// var oModel = this.getModel();
					// oModel.setProperty("/basicSAPUI5ApplicationProject/parameters/popupName", sValue);
				}.bind(this)
				
			});
			
			var oNewLabelForControlName = new sap.m.Label({
				text: "컨트롤을 선택해주세요."
			});
			var oNewSelectForControlName = new sap.m.Select({
				items: [
					new sap.ui.core.Item({
						text: "Select",
						key : "Select"
					}),
					new sap.ui.core.Item({
						text: "Input",
						key : "Input"
					}),
					new sap.ui.core.Item({
						text: "DateRangeSelection",
						key : "DateRangeSelection"
					})
				],
				change: function(oEvent) {
					// var oModel = this.getModel();
					// oModel.setProperty("/basicSAPUI5ApplicationProject/parameters/", oEvent.getSource().getSelectedKey());
				}.bind(this),
				// selectedkey : "{/popupYN}"
			});
			
			oNewHBoxGrid
			.addContent(oNewLabelForLabel)
			.addContent(oNewInputForLabel);
			
			oNewHBoxGrid2
			.addContent(oNewLabelForControlName)
			.addContent(oNewSelectForControlName);
			
			var oLayout = this.getContent()[0];
			oLayout
			.addContent(oNewHBoxGrid)
			.addContent(oNewHBoxGrid2);
		},
		
		
		_registerHandleBarHBoxCount : function() {
			Handlebars.registerHelper('customHBoxHelper', function(labelText, controlName) {
				var sControl;
				
				switch (this.controlName) {
					case "Select" :
						if(this.labelText === "언어") {
							sControl = '<HBox alignItems="Center" class="cFormItem w90 flex1"><Label text="' + this.labelText + '" required="true" /><Select items="{searchModel>/lang}" selectedKey="{filterModel>/lang}"><core:ListItem key="{searchModel>key}" text="{searchModel>text}" /></Select><layoutData><l:GridData span="XL3 L3 M12 S12" /></layoutData></HBox>';
						} else if(this.labelText === "개발언어") {
							sControl = '<HBox alignItems="Center" class="cFormItem w90 flex1"><Label text="' + this.labelText + '" required="true" /><Select items="{searchModel>/devlang}" selectedKey="{filterModel>/devlang}"><core:ListItem key="{searchModel>key}" text="{searchModel>text}" /></Select><layoutData><l:GridData span="XL3 L3 M12 S12" /></layoutData></HBox>';
						} else if(this.labelText === "회사") {
							sControl = '<HBox alignItems="Center" class="cFormItem w90 flex1"><Label text="' + this.labelText + '" required="true" /><Select items="{searchModel>/company}" selectedKey="{filterModel>/company}"><core:ListItem key="{searchModel>key}" text="{searchModel>text}" /></Select><layoutData><l:GridData span="XL3 L3 M12 S12" /></layoutData></HBox>';
						}
						
						break;
					case "DateRangeSelection" :
						sControl = '<HBox alignItems="Center" class="cFormItem w90 flex0"><Label text="' + this.labelText + '" required="true" /><DateRangeSelection delimiter=" ~ " displayFormat="yyyy.MM.dd" dateValue="{dateModel>/fromDate}" secondDateValue="{dateModel>/toDate}" change=".onSearch" /><layoutData><l:GridData span="XL3 L3 M12 S12" /></layoutData></HBox>'
						break;
					case "Input" : 
						sControl = '<HBox alignItems="Center" class="cFormItem w90 flex1"><Label text="' + this.labelText + '" required="true" /><Input value="{filterModel>/name}" /><layoutData><l:GridData span="XL3 L3 M12 S12" /></layoutData></HBox>';
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