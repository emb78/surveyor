require 'spec_helper'

describe SurveysController do

  describe 'show' do
    it 'assigns the survey' do
      survey = create :survey
      get :show, :id => survey.id
      assigns[:survey].should eq(survey)
    end
  end

  describe 'create' do
    it "should redirect to index when creation successful" do
      allow_any_instance_of(Survey).to receive(:valid?).and_return(true)
      post 'create', survey: {title: "Best Survey Ever"}
      response.should redirect_to(surveys_path)
    end

    it "should stay on form when creation unsuccessful" do
      post 'create', survey: {title: ""}
      response.should render_template('new')
    end
  end

end
