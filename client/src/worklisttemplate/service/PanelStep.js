define(["worklisttemplate/control/PanelStep"], function(PanelStep){
       "use strict"
       return{
        getContent : function() {
			// service/PanelStep.js는 위자드 step화면 자체를 형성
			// control/PanelStep.js는 화면 내에 들어가는 컨트롤들을 구성
	        
	        var oMyStepContent = new PanelStep({
	               context : this.context
	        });
	
	        var sTitle = this.context.i18n.getText("Config_template_mycustomwizard_desc");
	        var sDescription = this.context.i18n.getText("myStep_description");
	        
	        return this.context.service.wizard.createWizardStep(oMyStepContent, sTitle, sDescription); // service/PanelStepd으로 createWizardStep한다.
        }
    }
});