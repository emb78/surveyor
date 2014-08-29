class Survey < ActiveRecord::Base
  has_many :questions
  validates_presence_of :title

  def questions_and_answers
    questions.map do |question|
      question.api_object.merge({
                    choices: question.choices.map(&:api_object),
                    response: UsersAnswer.blank_api_object
                })
    end
  end
end
