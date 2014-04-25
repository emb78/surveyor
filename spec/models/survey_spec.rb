require 'spec_helper'

describe Survey do

  describe 'questions_and_answers' do
    let(:survey){ Survey.last }
    let(:questions_and_answers){ survey.questions_and_answers }

    it 'has the correct number of questions' do
      questions_and_answers.count.should eq(2)
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
