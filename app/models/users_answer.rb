class UsersAnswer < ActiveRecord::Base
  belongs_to :question
  belongs_to :choice

  def api_object
    {
       choice_id: choice_id,
       choice_text: choice.try(:text),
       question_text: question.try(:text)
    }
  end

  def self.blank_api_object
    {
       choice_id: nil
    }
  end
end
