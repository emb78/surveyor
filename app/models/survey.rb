class Survey < ActiveRecord::Base
  validates_presence_of :title
  has_many :questions
  accepts_nested_attributes_for :questions, :allow_destroy => true

  def questions_and_answers
    questions.map do |question|
      question.api_object.merge({
                    choices: question.choices.map(&:api_object),
                    response: UsersAnswer.blank_api_object
                })
    end
  end
end
