function SurveyPage(question, num, total, usersChoiceUrl, reportUrl) {
    this.num = num;
    this.total = total;
    this.question = question;
    this.usersChoiceUrl = usersChoiceUrl;
    this.reportUrl = reportUrl;
}

SurveyPage.prototype = {
    afterInit: function (elements) {
        this.elements = elements;

        this.elements.find('.choice').click($.proxy(function (event) {
            this.elements.find('.choice').removeClass('selected');
            var clickedAnswer = $(event.currentTarget);
            clickedAnswer.addClass('selected');
            var choiceId = clickedAnswer.data('choice-id');
            this.setChoice(choiceId);
            this.survey.enableNextButton();
        }, this));

    },


    setChoice: function (choiceId) {
        this.question.response.choice_id = choiceId;
    },

    shouldEnableNextButton: function () {
        if (this.question.response.choice_id) {
            this.survey.enableNextButton();
        }
        else {
            this.survey.disableNextButton();
        }
    },

    elements: function () {
        return renderJSTemplate('.templates .survey-page', this.question);
    },

    canAdvance: function () {
        return true;
    },

    nextClicked: function () {
        $.post(this.usersChoiceUrl, { question_id: this.question.id, choice_id: this.question.response.choice_id });
    },

    prepForDisplay: function () {
        this.shouldEnableNextButton();

        if ((this.num === this.total) && this.survey.isLastPage(this)) {
            this.survey.setNextLabelHtml('See results');
        }
        else {
            this.survey.setNextLabelHtml('Next');
        }
    },

    containerClass: function () {
        return 'survey-page';
    }
};
