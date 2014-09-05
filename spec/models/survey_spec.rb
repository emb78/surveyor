require 'spec_helper'

describe Survey do

  it "should require a title" do
    Survey.new(title: "").should_not be_valid
  end

  describe 'questions_and_answers' do
    let(:survey){ create :survey_with_question }
    let(:questions_and_answers){ survey.questions_and_answers }

    it 'has the correct number of questions' do
      questions_and_answers.count.should eq(1)
    end

    it 'provides the choices' do
      questions_and_answers.first.should include :choices
      questions_and_answers.first[:choices].count.should eq(3)
      questions_and_answers.first[:choices].first.should include order: 1
      questions_and_answers.first[:choices].first.should include :text
    end

    it 'has a blank record for the users answer' do
      questions_and_answers.first[:response].should == {choice_id: nil}
    end

  end

end
