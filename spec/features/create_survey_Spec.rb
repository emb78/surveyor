require "spec_helper"

feature "user can create survey" do
  it "displays a link to the new survey form", js: true do
    visit surveys_path
    click_link "Create New Survey"
    current_path.should == new_survey_path
  end

  it "creates a new survey with name and question with choices", js: true do
    visit new_survey_path
    fill_in "Survey title:", with: "What would you do..."
    fill_in "survey_questions_attributes_0_text", with: "...with a month off?"
    fill_in "survey_questions_attributes_0_choices_attributes_0_text", with: "Travel galore"
    fill_in "survey_questions_attributes_0_choices_attributes_1_text", with: "Staycation - play video games"
    fill_in "survey_questions_attributes_0_choices_attributes_2_text", with: "Visit friends and family"
    click_on "Create"
    page.find(".surveys").should have_content("What would you do...")
  end
end