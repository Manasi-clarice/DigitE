    define([
        'jquery',
        'underscore',
        'Backbone',
    ], function ($, _, Backbone) {

        var WorkItem = Backbone.Model.extend({
            defaults: {
                projectId : "hidden",
                projectName :"Infosys Implementaion",
                itemType : "w_itemType - internal to be kept	(DFT, CHR)",
                itemTypeName : "Defect",
                itemId : "w_itemid - internal",
                itemCode : "DEF123",
                itemName : "Error Encountered on Refresh",
                priority : "w_priority - display		(Inner circle)",
                stage : "Performer",
                dueDate : "w_duDate - display label",
                receivedDate : "w_receivedDate - display label",
                status	: "w_status - display label			(icon for work item)",
                priorityColor : "w_prioritycolor (hexa format)",
                percentcomplete : "w_percentcomplete (null do not render, for taskget it from autoplan task and for workflow			(Not in Sprint)",
                statusCls : "wstatusCls	(cls name for icon of work item)",
                lastcommentId: "internal",
                lastcomment : "Install configurration failed on recursive testing",
                lastCommentType : "Rejected",
                lastCommentBy : "Amit Kumar",
                isPinned : "Y/N"
            }
        });

        return WorkItem;
    })