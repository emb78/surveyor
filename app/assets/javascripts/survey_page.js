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

        this.elements.find('.answer-option').click($.proxy(function (event) {
            this.elements.find('.answer-option').removeClass('selected');
            var clickedAnswer = $(event.currentTarget);
            clickedAnswer.addClass('selected');
            var answerId = clickedAnswer.data('answer-id');
            this.setAnswer(answerId);
            this.survey.enableNextButton();
        }, this));

    },


    setAnswer: function (answerId) {
        this.question.response.answer_id = answerId;
    },

    shouldEnableNextButton: function () {
        if (this.question.response.answer_id) {
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
        this.survey.post(this.usersChoiceUrl, { question_id: this.question.id, answer_id: this.question.response.answer_id });
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
