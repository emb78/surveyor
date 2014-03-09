require 'open-uri'
require 'active_record/fixtures'

survey = Survey.find_or_create_by_title("Preferences")

questions = [
    {text: "What's your favorite color?", choices: ["Blue", "Green", "Pink"]},
    {text: "The best way I can learn is if I", choices: ["Read about it", "See an example of it", "Have a conversation about it"]},
]

questions.each_with_index do |question_text, index|
  question = Question.find_or_create_by_survey_id_and_order_and_text(survey.id, index, question_text[:text])
  question_text[:choices].each_with_index do |choice_text, choice_index|
    Choice.find_or_create_by_question_id_and_order_and_text(question.id, choice_index, choice_text)
  end
end