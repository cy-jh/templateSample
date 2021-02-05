define(["worklisttemplate/control/HBoxStep"], function(HBoxStep){
       "use strict"
       return{
        getContent : function() {
			// service/PanelStep.js는 위자드 step화면 자체를 형성
			// control/PanelStep.js는 화면 내에 들어가는 컨트롤들을 구성
	        
	        var oMyStepContent = new HBoxStep({
	               context : this.context
	        });
	
	        var sTitle = this.context.i18n.getText("Config_template_myHBoxStep_desc");
	        var sDescription = this.context.i18n.getText("myHBoxStep_description");
	        
	        return this.context.service.wizard.createWizardStep(oMyStepContent, sTitle, sDescription); // service/PanelStepd으로 createWizardStep한다.
        }
    }
});