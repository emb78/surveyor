require 'spec_helper'

describe SurveysController do

  describe 'show' do
    it 'assigns the survey' do
      survey = Survey.last
      get :show, :id => survey.id
      assigns[:survey].should eq(survey)
    end

  end

end
