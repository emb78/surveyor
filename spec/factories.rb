FactoryGirl.define do
  factory :survey do
    title "Best Survey Ever"
  end

  factory :survey_with_question, :parent => :survey do |survey|
    questions { build_list :question_with_choices, 1 }
  end

  factory :question do
    text "What is your fave color?"
    order 1
  end

  factory :question_with_choices, :parent => :question do |question|
    choices { build_list :choice, 3 }
  end

  factory :choice do
    text "Blue"
    order 1
  end
end