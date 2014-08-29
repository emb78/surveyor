class SurveysController < ApplicationController
  def index
    @surveys = Survey.all
  end

  def show
    @survey = Survey.find params[:id]
    @survey_questions_and_choices = @survey.questions_and_answers
  end

  def new

  end


  def results
    @survey = Survey.find params[:survey_id]
  end

end
