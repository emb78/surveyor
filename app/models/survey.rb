class Survey < ActiveRecord::Base
  has_many :questions

  def questions_and_answers
    #responses = @member_tool.answers.each_with_object({}) do |response, accum|
    #  accum[response.question.id] = response.api_object
    #  accum
    #end

    questions.map do |question|
      question.api_object.merge({
                    choices: question.choices.map(&:api_object),
                    response: UsersAnswer.blank_api_object
                              #responses[question.id] ||
                })
    end
  end
end
