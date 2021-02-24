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
				isValid: true
			});
			
			
			// this.getParent()._nextButton.attachPress(function(oEvent) {
			// 	var oModel = this.getModel();
			// 	var oLayout = this.getContent()[0];
			// 	var oList = oLayout.getContent()[2];
			// 	var aListItems = oList.getItems();
			// 	var aData = [];
				
			// 	aListItems.forEach(function(oItem) {
			// 		var oHBoxItems = oItem.getContent()[0].getItems();
			// 		var oInput = oHBoxItems[1];
			// 		var oSelect = oHBoxItems[2];
			// 		aData.push({
			// 			labelText: oInput.getValue(),
			// 			controlName: oSelect.getSelectedKey()
			// 		})
			// 	});
			// 	oModel.setProperty("/basicSAPUI5ApplicationProject/parameters/panelDataList", aData);
			// }.bind(this));
			
		},
		
		_createList : function(oImportParameter) {
			var that = this;
			var oLayout = this.getContent()[0];
			var oList = oLayout.getContent()[2];
			var oModel = this.getModel();
			var aRfcReturnDataFieldNames = Object.keys(oImportParameter);
			// var aListItems = aRfcReturnDataFieldNames.map(function(sColumnName) {
			// 	return this._createColumnListItem(sColumnName);
			// }.bind(this));
			// oList.addItem(aListItems);
			aRfcReturnDataFieldNames.forEach(function(sColumnName) {
				oList.addItem(that._createColumnListItem(sColumnName));
			});
			
		},
		
		_createList2 : function(oImportParameter) {
			var that = this;
			var oLayout = this.getContent()[0];
			var oList = oLayout.getContent()[2];
			var oModel = this.getModel();
			var aRfcReturnDataFieldNames = Object.keys(oImportParameter);
			// var aListItems = aRfcReturnDataFieldNames.map(function(sColumnName) {
			// 	return this._createColumnListItem(sColumnName);
			// }.bind(this));
			// oList.addItem(aListItems);
			aRfcReturnDataFieldNames.forEach(function(sColumnName) {
				oList.addItem(that._createColumnListItem(sColumnName));
			});
			
		},
		
		_createColumnListItem : function(sColoumnName) {
			return new sap.m.CustomListItem({
					content: [
						new sap.m.HBox({
							alignContent: sap.m.FlexAlignContent.SpaceBetween,
							items: [
								new sap.m.Label({
									text: sColoumnName + " : "
								}),
								new sap.m.Input({
									value:"",
									placeholder: "enter column header name",
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
		
		_createPageContent: function () {
			var oModel = this.getModel();
			var lVLayout = new sap.ui.layout.VerticalLayout({
				id: "vlayout",
				width:"100%",
				class:"sapUiContentPadding"
			});
			
			var oRfcCallButton = new sap.m.Button({
				text : "조회",
				press : function(oEvent) {
					var sRfcName = "BAPI_FLIGHT_GETDETAIL";
					// var sRfcName = oModel.getProperty("/rfcName");
					
					new Promise(function(resolve, reject) { // RFC Metadata Call(SearchCondition쪽 만들어줄 데이터)
						$.ajax({
						    // url: "https://vm-rndnpd.wdf.sap.corp:44320/fmcall/" + sRfcName + "?airlineid=LH&connectionid=2402&flightdate=20130128&format=json",
						    url: "http://cyep75.koreasouth.cloudapp.azure.com:50000/DSServices/RfcMetaData?DestinationName=ZDS_RFC&FunctionName=" + sRfcName,
						    dataType: "jsonp",
						    success: function(data) {
						      resolve(data);
						    },
						    error: function(xhr) {
						      reject(xhr);
						    }
						});
					}).then(function(reponse) {
						// console.log("성공 - ", reponse);
						// sap.m.MessageBox.success("RFC 조회에 성공했습니다.", {
						//     title: "Success",
						// });
						// oModel.setProperty("/rfcReturnData", reponse.RETURN);
						
						// // List컨트롤 item채우기
						// this._createList();
						
						// this.setBusy(false);
						// this.fireValidation({
						// 	isValid: true
						// });
					}.bind(this), function(reponse) {
						// console.log("Unknown RFC name", reponse);
						// sap.m.MessageBox.error("RFC를 찾을 수 없습니다.", {
						//     title: "Error",
						// });
						// this.setBusy(false);
					}.bind(this))
					.finally(function() { 
						// Metadata 임시로 하드코딩해서 진행
						var oModel = this.getModel();
						var oImportParmater = {
							CONNECTIONID: {
								DESCRIPTION: "Flight connection code",
								LENGTH: 4,
								TYPE: "NUM"
							},
							AIRLINEID: {
								DESCRIPTION: "Airline Code",
								LENGTH: 3,
								TYPE: "CHAR"
							},
							FLIGHTDATE: {
								DESCRIPTION: "Departure date",
								LENGTH: 8,
								TYPE: "DATE"
							}
						};
						var oReturnTableField = {
							SYSTEM: {
								DESCRIPTION: "Logical system from which message originates",
								LENGTH: 10,
								TYPE: "CHAR"
							},
							NUMBER: {
								DESCRIPTION: "Message Number",
								LENGTH: 3,
								TYPE: "NUM"
							},
							FIELD: {
								DESCRIPTION: "Field in parameter",
								LENGTH: 30,
								TYPE: "CHAR"
							},
							MESSAGE_V2: {
								DESCRIPTION: "Message Variable",
								LENGTH: 50,
								TYPE: "CHAR"
							},
							MESSAGE: {
								DESCRIPTION: "Message Text",
								LENGTH: 220,
								TYPE: "CHAR"
							},
							MESSAGE_V3: {
								DESCRIPTION: "Message Variable",
								LENGTH: 50,
								TYPE: "CHAR"
							},
							MESSAGE_V4: {
								DESCRIPTION: "Message Variable",
								LENGTH: 50,
								TYPE: "CHAR"
							},
							LOG_NO: {
								DESCRIPTION: "Application log: log number",
								LENGTH: 20,
								TYPE: "CHAR"
							},
							MESSAGE_V1: {
								DESCRIPTION: "Message Variable",
								LENGTH: 50,
								TYPE: "CHAR"
							},
							ID: {
								DESCRIPTION: "Message Class",
								LENGTH: 20,
								TYPE: "CHAR"
							},
							ROW: {
								DESCRIPTION: "Lines in parameter",
								LENGTH: 4,
								TYPE: "INT"
							},
							TYPE: {
								DESCRIPTION: "Message type: S Success, E Error, W Warning, I Info, A Abort",
								LENGTH: 1,
								TYPE: "CHAR"
							},
							LOG_MSG_NO: {
								DESCRIPTION: "Application log: Internal message serial number",
								LENGTH: 6,
								TYPE: "NUM"
							},
							PARAMETER: {
								DESCRIPTION: "Parameter Name",
								LENGTH: 32,
								TYPE: "CHAR"
							}
						}
						oModel.setProperty("/rfcImportdata", oImportParmater);
						
						var aImportParameterEntries = Object.entries(oImportParmater);
						var aImportParameter = aImportParameterEntries.map(function(entry) {
							return { PARAMNAME: entry[0], ...entry[1] };
						});
						var aExportTableFieldNames = Object.keys(oReturnTableField);
						oModel.setProperty("/basicSAPUI5ApplicationProject/parameters/importParameter", aImportParameter);
						oModel.setProperty("/basicSAPUI5ApplicationProject/parameters/exportTableFieldName", aExportTableFieldNames);
						
						sap.m.MessageBox.success("RFC 조회에 성공했습니다.", {
						    title: "Success",
						});
						// List컨트롤 item채우기
						// this._createList2(oImportParmater);
					}.bind(this));
				}.bind(this)
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
			.addContent(oRfcCallButton);
			// .addContent(oButton)
			// .addContent(oList);
			
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
			var oList = oLayout.getContent()[2];
			var aListItems = oList.getItems();
			var bErrorFlag;
			
			aListItems.forEach(function(oItem) {
				var oInput = oItem.getContent()[0].getItems()[1];
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
			// Handlebars.registerHelper("customHBoxHelper", function() {
			// 		var sControl;
					
			// 		switch(this.TYPE) {
			// 			case "NUM" :
			// 				sControl = '<HBox alignItems="Center" class="cFormItem w90 flex1"><Label text="' + this.PARAMNAME + '" required="true" /><Input value="{importParameter>/' + this.PARAMNAME + '}" /><layoutData><l:GridData span="XL3 L3 M12 S12" /></layoutData></HBox>';
			// 				break;
			// 			case "CHAR" :
			// 				sControl = '<HBox alignItems="Center" class="cFormItem w90 flex1"><Label text="' + this.PARAMNAME + '" required="true" /><Input value="{importParameter>/' + this.PARAMNAME + '}" /><layoutData><l:GridData span="XL3 L3 M12 S12" /></layoutData></HBox>';
			// 				break;
			// 			case "DATE" :
			// 				sControl = '<HBox alignItems="Center" class="cFormItem w90 flex0"><Label text="' + this.PARAMNAME + '" required="true" /><DatePicker displayFormat="yyyy.MM.dd" dateValue="{importParameter>/' + this.PARAMNAME + '}"change=".onDateChange" /><layoutData><l:GridData span="XL3 L3 M12 S12" /></layoutData></HBox>'
			// 				break;
			// 			default:
							
			// 		}
			// 		return new Handlebars.SafeString(sControl);
			// 	}
			// );
		
		
			// Handlebars.registerHelper("customHBoxHelper", function(){console.log('customHBoxHelper');});
			// Handlebars.registerHelper("customTableHelper", function(){console.log('customTableHelper');});
		
			Handlebars.registerHelper({
				customHBoxHelper : function() {
					var sControl;
					switch(this.TYPE) {
						case "NUM" :
							sControl = '<HBox alignItems="Center" class="cFormItem w90 flex1"><Label text="' + this.PARAMNAME + '" required="true" /><Input value="{/importParameter/' + this.PARAMNAME + '}" /><layoutData><l:GridData span="XL3 L3 M12 S12" /></layoutData></HBox>';
							break;
						case "CHAR" :
							sControl = '<HBox alignItems="Center" class="cFormItem w90 flex1"><Label text="' + this.PARAMNAME + '" required="true" /><Input value="{/importParameter/' + this.PARAMNAME + '}" /><layoutData><l:GridData span="XL3 L3 M12 S12" /></layoutData></HBox>';
							break;
						case "DATE" :
							sControl = '<HBox alignItems="Center" class="cFormItem w90 flex0"><Label text="' + this.PARAMNAME + '" required="true" /><DatePicker displayFormat="yyyy.MM.dd" dateValue="{/importParameter/' + this.PARAMNAME + '}"change=".onDateChange" /><layoutData><l:GridData span="XL3 L3 M12 S12" /></layoutData></HBox>'
							break;
						default:
							
					}
					return new Handlebars.SafeString(sControl);
				},
				
				customTableHelper : function() {
					return new Handlebars.SafeString('<Text text="{'+ this + '}"/>');
				},
				
				customImportParamModelHelper: function() {
					var sSet = this.PARAMNAME + ': "",';
					if(this.TYPE === "DATE") {
						sSet = this.PARAMNAME + ": new Date(),";
					} 
					return new Handlebars.SafeString(sSet);
				},
				
				customExportTableModelHelper: function() {
					return new Handlebars.SafeString(this + ': "",');
				}
			});
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