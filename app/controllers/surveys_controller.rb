class SurveysController < ApplicationController
  def index
    @surveys = Survey.all
  end

  def show
    @survey = Survey.find params[:id]
  end

  def results
    @survey = Survey.find params[:survey_id]
  end
end
