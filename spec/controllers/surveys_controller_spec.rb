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

    it "should create one new survey with one new question and three choices" do
      expect {
        expect {
          expect {
            post 'create', survey: {title: "Best Survey Ever", questions_attributes: [text: "Why?", choices_attributes: [{text: "Just because"}, {text: "Why not?"}, {text: "For fun"}]]}
          }.to change(Survey, :count).by(1)
        }.to change(Question, :count).by(1)
      }.to change(Choice, :count).by(3)
    end

    it "should only create a survey not a question nor choices" do
      expect {
        expect {
          expect {
            post 'create', survey: {title: "Best Survey Ever"}
          }.to change(Survey, :count).by(1)
        }.to change(Question, :count).by(0)
      }.to change(Choice, :count).by(0)
    end
  end

  describe 'new' do

  end

end
