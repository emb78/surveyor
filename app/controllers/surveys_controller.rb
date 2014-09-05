class SurveysController < ApplicationController
  def index
    @surveys = Survey.all
  end

  def show
    @survey = Survey.find params[:id]
    @survey_questions_and_choices = @survey.questions_and_answers
  end

  def new
    @survey = Survey.new
    question = @survey.questions.new
    3.times { question.choices.new }
  end

  def create
    @survey = Survey.new(survey_params)
    if @survey.save
      redirect_to surveys_path
    else
      render :new
    end
  end

  def results
    @survey = Survey.find params[:survey_id]
  end

  private

  def survey_params
    params.require(:survey).permit(:title, questions_attributes: [:id, :text, :_destroy, choices_attributes: [:id, :text, :_destroy]])
  end

end
