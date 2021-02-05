define(["worklisttemplate/control/PanelStep"], function(PanelStep){
       "use strict"
       return{
        getContent : function() {
	        
	        var oMyStepContent = new PanelStep({
	               context : this.context
	        });
	
	        var sTitle = this.context.i18n.getText("Config_template_mycustomwizard_desc");
	        var sDescription = this.context.i18n.getText("myStep_description");
	        
	        return this.context.service.wizard.createWizardStep(oMyStepContent, sTitle, sDescription); // service/PanelStepd으로 createWizardStep한다.
        }
    }
});