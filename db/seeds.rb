require 'open-uri'
require 'active_record/fixtures'

survey = Survey.find_or_create_by(title: "Preferences")

questions = [
    {text: "What's your favorite color?", choices: ["Blue", "Green", "Pink"]},
    {text: "The best way I learn something new is if I", choices: ["Read about it", "See an example of it", "Have a conversation about it"]},
]

questions.each_with_index do |question_text, index|
  question = Question.find_or_create_by(survey_id: survey.id, order: index+1, text: question_text[:text])
  question_text[:choices].each_with_index do |choice_text, choice_index|
    Choice.find_or_create_by(question_id: question.id, order: choice_index+1, text: choice_text)
  end
end