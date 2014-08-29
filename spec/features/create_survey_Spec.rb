require "spec_helper"

feature "user can create survey" do
  it "displays a link to the new survey form", js: true do
    visit surveys_path
    click_link "Create New Survey"
    current_path.should == new_survey_path
  end
end